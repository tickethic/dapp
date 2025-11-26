'use client'

import { useState, useEffect } from 'react'
import { useReadContract } from 'wagmi'
import { contractAddresses } from '@/config'

// Ticket ABI
const TICKET_ABI = [
  {
    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "uint256", "name": "index", "type": "uint256"}
    ],
    "name": "tokenOfOwnerByIndex",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "getTicketInfo",
    "outputs": [
      {"internalType": "address", "name": "eventAddress", "type": "address"},
      {"internalType": "uint256", "name": "price", "type": "uint256"},
      {"internalType": "bool", "name": "isUsed", "type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const

// Event ABI
const EVENT_ABI = [
  {
    "inputs": [],
    "name": "date",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "metadataURI",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const

export interface Ticket {
  id: string
  eventName: string
  eventDate: string
  eventLocation: string
  price: string
  status: 'valid' | 'used' | 'expired'
  eventAddress: string
}

export function useUserTickets(userAddress: string) {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // Get user's ticket balance
  const { data: balance, isLoading: isLoadingBalance } = useReadContract({
    address: contractAddresses.Ticket,
    abi: TICKET_ABI,
    functionName: 'balanceOf',
    args: [userAddress as `0x${string}`],
    query: {
      enabled: !!userAddress
    }
  })

  useEffect(() => {
    if (!userAddress || !balance || balance === 0n) {
      setTickets([])
      return
    }

    const fetchTickets = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        const tickets: Ticket[] = []
        
        for (let i = 0; i < Number(balance); i++) {
          try {
            // Get ticket ID at index
            const tokenId = await (window as any).viem.readContract({
              address: contractAddresses.Ticket,
              abi: TICKET_ABI,
              functionName: 'tokenOfOwnerByIndex',
              args: [userAddress, BigInt(i)]
            })
            
            // Get ticket info
            const ticketInfo = await (window as any).viem.readContract({
              address: contractAddresses.Ticket,
              abi: TICKET_ABI,
              functionName: 'getTicketInfo',
              args: [tokenId]
            })
            
            // Get event details
            const eventDate = await (window as any).viem.readContract({
              address: ticketInfo[0],
              abi: EVENT_ABI,
              functionName: 'date',
              args: []
            })
            
            const metadataURI = await (window as any).viem.readContract({
              address: ticketInfo[0],
              abi: EVENT_ABI,
              functionName: 'metadataURI',
              args: []
            })
            
            // Fetch metadata from IPFS if available
            let eventName = `Événement #${tokenId}`
            let eventLocation = ''
            
            if (metadataURI) {
              try {
                const { fetchMetadata } = await import('@/lib/ipfs')
                const meta = await fetchMetadata(metadataURI)
                eventName = meta.name || eventName
                eventLocation = meta.location || ''
              } catch (error) {
                console.log(`Error fetching metadata for token ${tokenId}:`, error)
              }
            }
            
            const eventDateObj = new Date(Number(eventDate) * 1000)
            const isPastEvent = eventDateObj < new Date()
            
            tickets.push({
              id: tokenId.toString(),
              eventName,
              eventDate: eventDateObj.toISOString(),
              eventLocation,
              price: ticketInfo[1].toString(),
              status: ticketInfo[2] ? 'used' : (isPastEvent ? 'expired' : 'valid'),
              eventAddress: ticketInfo[0]
            })
          } catch (err) {
            console.error(`Error fetching ticket ${i}:`, err)
            // Continue with next ticket
          }
        }
        
        setTickets(tickets)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTickets()
  }, [userAddress, balance])

  return { 
    tickets, 
    isLoading: isLoading || isLoadingBalance, 
    error 
  }
}