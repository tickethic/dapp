'use client'

import { useReadContract } from 'wagmi'
import { contractAddresses } from '@/config'
import { useState, useEffect } from 'react'

interface Ticket {
  id: string
  eventName: string
  eventDate: string
  eventLocation?: string
  price: string
  status: 'valid' | 'used' | 'expired'
  eventAddress: string
}

// Ticket ABI for reading user tickets
const TICKET_ABI = [
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'uint256', name: 'index', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'getTicketInfo',
    outputs: [
      { internalType: 'address', name: 'eventAddress', type: 'address' },
      { internalType: 'uint256', name: 'price', type: 'uint256' },
      { internalType: 'bool', name: 'isUsed', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const

export function useUserTickets(userAddress: string) {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // Get user's ticket balance
  const { data: balanceRaw, isLoading: isLoadingBalance } = useReadContract({
    address: contractAddresses.Ticket,
    abi: TICKET_ABI,
    functionName: 'balanceOf',
    args: [userAddress as `0x${string}`],
    query: {
      enabled: !!userAddress,
    },
  })

  // Convert balance to number safely
  const balance = balanceRaw ? Number(balanceRaw) : 0

  useEffect(() => {
    if (!userAddress || balance === 0) {
      setTickets([])
      return
    }

    const fetchTickets = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        const ticketPromises: Promise<any>[] = []
        
        // Get all ticket IDs owned by the user
        for (let i = 0; i < balance; i++) {
          ticketPromises.push(
            fetch(`/api/user-ticket?address=${userAddress}&index=${i}`).then(res => res.json())
          )
        }

        const ticketData = await Promise.all(ticketPromises)
        
        // Process ticket data
        const processedTickets: Ticket[] = await Promise.all(
          ticketData.map(async (ticketInfo: any) => {
            try {
              // Get event details
              const eventResponse = await fetch(`/api/event-details?address=${ticketInfo.eventAddress}`)
              const eventData = await eventResponse.json()
              
              const eventDate = new Date(Number(eventData.date) * 1000)
              const isPastEvent = eventDate < new Date()
              
              return {
                id: ticketInfo.tokenId.toString(),
                eventName: eventData.name || `Evenement #${ticketInfo.tokenId}`,
                eventDate: eventDate.toISOString(),
                eventLocation: eventData.location,
                price: `${(Number(ticketInfo.price) / 1e18).toFixed(4)} ETH`,
                status: ticketInfo.isUsed ? 'used' : (isPastEvent ? 'expired' : 'valid'),
                eventAddress: ticketInfo.eventAddress,
              }
            } catch (eventErr) {
              console.error('Error fetching event details:', eventErr)
              return {
                id: ticketInfo.tokenId.toString(),
                eventName: `Evenement #${ticketInfo.tokenId}`,
                eventDate: new Date().toISOString(),
                eventLocation: 'Non disponible',
                price: `${(Number(ticketInfo.price) / 1e18).toFixed(4)} ETH`,
                status: ticketInfo.isUsed ? 'used' : 'valid',
                eventAddress: ticketInfo.eventAddress,
              }
            }
          })
        )
        
        setTickets(processedTickets)
      } catch (err) {
        console.error('Error fetching tickets:', err)
        setError(err instanceof Error ? err : new Error('Erreur lors du chargement des billets'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchTickets()
  }, [userAddress, balance])

  return {
    tickets,
    isLoading: isLoading || isLoadingBalance,
    error,
    balance,
  }
}
