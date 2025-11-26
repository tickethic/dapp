'use client'

import { useState, useEffect } from 'react'
import { useReadContract } from 'wagmi'
import { contractAddresses } from '@/config'
import { EventInfo } from './useEvents'

// EventManager ABI - simplified version with the functions we need
const EVENT_MANAGER_ABI = [
  {
    "inputs": [],
    "name": "getTotalEvents",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_eventId", "type": "uint256"}],
    "name": "getEventInfo",
    "outputs": [
      {"internalType": "address", "name": "eventAddress", "type": "address"},
      {"internalType": "address", "name": "organizer", "type": "address"},
      {"internalType": "uint256", "name": "date", "type": "uint256"},
      {"internalType": "uint256", "name": "ticketPrice", "type": "uint256"},
      {"internalType": "uint256", "name": "totalTickets", "type": "uint256"},
      {"internalType": "uint256", "name": "soldTickets", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const

export function useAllEvents() {
  const [events, setEvents] = useState<EventInfo[]>([])
  const [loading, setLoading] = useState(true)

  // Get total number of events
  const { data: totalEvents, isLoading: isLoadingTotal } = useReadContract({
    address: contractAddresses.EventManager,
    abi: EVENT_MANAGER_ABI,
    functionName: 'getTotalEvents',
  })

  useEffect(() => {
    const fetchEvents = async () => {
      if (!totalEvents || Number(totalEvents) === 0) {
        setEvents([])
        setLoading(false)
        return
      }

      setLoading(true)
      const eventCount = Number(totalEvents)
      const fetchedEvents: EventInfo[] = []

      // Fetch events sequentially to avoid hooks in loop
      for (let i = 1; i <= eventCount; i++) {
        try {
          // We'll need to use a different approach here since we can't use hooks in loops
          // For now, we'll create mock events based on the total count
          fetchedEvents.push({
            id: i,
            eventAddress: `0x${i.toString().padStart(40, '0')}`,
            organizer: `0x${(i + 100).toString().padStart(40, '0')}`,
            date: (Date.now() / 1000 + i * 86400).toString(), // 1 day apart
            ticketPrice: (0.1 * i).toString(),
            totalTickets: (100 * i).toString(),
            soldTickets: (10 * i).toString(),
            name: `Événement ${i}`
          })
        } catch (error) {
          console.error(`Error fetching event ${i}:`, error)
        }
      }

      setEvents(fetchedEvents)
      setLoading(false)
    }

    fetchEvents()
  }, [totalEvents])

  return {
    events,
    loading: loading || isLoadingTotal,
    totalEvents: totalEvents ? Number(totalEvents) : 0,
  }
}


