'use client'

import { useReadContract } from 'wagmi'
import { contractAddresses } from '@/config'
import { useMemo } from 'react'

// EventManager ABI
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

export interface OrganizerEvent {
  id: number
  eventAddress: string
  organizer: string
  date: bigint
  ticketPrice: bigint
  totalTickets: bigint
  soldTickets: bigint
  isPast: boolean
  isSoldOut: boolean
}

export function useOrganizerEvents(organizerAddress: string) {
  // Get total number of events
  const { data: totalEvents, isLoading: isLoadingTotal } = useReadContract({
    address: contractAddresses.EventManager,
    abi: EVENT_MANAGER_ABI,
    functionName: 'getTotalEvents',
  })

  // Generate array of event IDs
  const eventIds = useMemo(() => 
    Array.from({ length: totalEvents ? Number(totalEvents) : 0 }, (_, i) => i + 1),
    [totalEvents]
  )

  // Filter events for this organizer
  const organizerEvents = useMemo(() => {
    if (!totalEvents || !organizerAddress) return []
    
    const events: OrganizerEvent[] = []
    const now = Math.floor(Date.now() / 1000)
    
    // In a real implementation, you would fetch each event info using useReadContract
    // For now, we'll return an empty array until we implement the real data fetching
    // This would require fetching each event individually using the event ID
    
    return events
  }, [totalEvents, organizerAddress])

  // Group events by future/past
  const futureEvents = useMemo(() => 
    organizerEvents.filter(event => !event.isPast),
    [organizerEvents]
  )
  
  const pastEvents = useMemo(() => 
    organizerEvents.filter(event => event.isPast),
    [organizerEvents]
  )

  return {
    allEvents: organizerEvents,
    futureEvents,
    pastEvents,
    totalEvents: organizerEvents.length,
    isLoading: isLoadingTotal
  }
}
