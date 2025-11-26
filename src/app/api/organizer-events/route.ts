import { NextRequest, NextResponse } from 'next/server'
import { createPublicClient, http } from 'viem'
import { polygonAmoy } from 'viem/chains'
import { serverContractAddresses } from '@/config/server'

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


// Create public client
const publicClient = createPublicClient({
  chain: polygonAmoy,
  transport: http()
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const organizerAddress = searchParams.get('organizer')
    
    if (!organizerAddress) {
      return NextResponse.json(
        { error: 'Organizer address is required' },
        { status: 400 }
      )
    }

    // Get total number of events
    const totalEvents = await publicClient.readContract({
      address: serverContractAddresses.EventManager,
      abi: EVENT_MANAGER_ABI,
      functionName: 'getTotalEvents',
    })

    const organizerEvents = []
    const now = Math.floor(Date.now() / 1000)

    // Fetch all events and filter for this organizer
    for (let i = 1; i <= Number(totalEvents); i++) {
      try {
        const eventInfo = await publicClient.readContract({
          address: serverContractAddresses.EventManager,
          abi: EVENT_MANAGER_ABI,
          functionName: 'getEventInfo',
          args: [BigInt(i)]
        })

        const [eventAddress, organizer, date, ticketPrice, totalTickets, soldTickets] = eventInfo

        // Only include events from this organizer
        if (organizer.toLowerCase() === organizerAddress.toLowerCase()) {
          organizerEvents.push({
            id: i,
            eventAddress,
            organizer,
            date: date.toString(),
            ticketPrice: ticketPrice.toString(),
            totalTickets: totalTickets.toString(),
            soldTickets: soldTickets.toString(),
            isPast: Number(date) < now,
            isSoldOut: soldTickets >= totalTickets
          })
        }
      } catch (error) {
        console.error(`Error fetching event ${i}:`, error)
        // Continue with other events even if one fails
      }
    }

    return NextResponse.json({
      events: organizerEvents,
      total: organizerEvents.length
    })
  } catch (error) {
    console.error('Error fetching organizer events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch organizer events' },
      { status: 500 }
    )
  }
}
