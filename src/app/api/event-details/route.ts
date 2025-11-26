import { NextRequest, NextResponse } from 'next/server'
import { createPublicClient, http } from 'viem'
import { polygonAmoy } from 'viem/chains'
import { serverContractAddresses } from '@/config/server'

const EVENT_ABI = [
  {
    "inputs": [],
    "name": "organizer",
    "outputs": [
      {"internalType": "address", "name": "", "type": "address"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "date",
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "ticketPrice",
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalTickets",
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "soldTickets",
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "metadataURI",
    "outputs": [
      {"internalType": "string", "name": "", "type": "string"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get('address')

    if (!address) {
      return NextResponse.json({ error: 'Event address is required' }, { status: 400 })
    }

    const client = createPublicClient({
      chain: polygonAmoy,
      transport: http()
    })

    // Get event details
    const [organizer, date, ticketPrice, totalTickets, soldTickets, metadataURI] = await Promise.all([
      client.readContract({
        address: address as `0x${string}`,
        abi: EVENT_ABI,
        functionName: 'organizer'
      }),
      client.readContract({
        address: address as `0x${string}`,
        abi: EVENT_ABI,
        functionName: 'date'
      }),
      client.readContract({
        address: address as `0x${string}`,
        abi: EVENT_ABI,
        functionName: 'ticketPrice'
      }),
      client.readContract({
        address: address as `0x${string}`,
        abi: EVENT_ABI,
        functionName: 'totalTickets'
      }),
      client.readContract({
        address: address as `0x${string}`,
        abi: EVENT_ABI,
        functionName: 'soldTickets'
      }),
      client.readContract({
        address: address as `0x${string}`,
        abi: EVENT_ABI,
        functionName: 'metadataURI'
      })
    ])

    // Try to fetch metadata
    let name = `Événement ${address.slice(0, 6)}...${address.slice(-4)}`
    let location = ''

    if (metadataURI && metadataURI !== '') {
      try {
        let metadata
        if (metadataURI.startsWith('ipfs://')) {
          const ipfsHash = metadataURI.replace('ipfs://', '')
          const ipfsGateways = [
            `https://ipfs.io/ipfs/${ipfsHash}`,
            `https://dweb.link/ipfs/${ipfsHash}`,
            `https://ipfs.fleek.co/ipfs/${ipfsHash}`,
            `https://gateway.originprotocol.com/ipfs/${ipfsHash}`
          ]
          
          for (const ipfsUrl of ipfsGateways) {
            try {
              const response = await fetch(ipfsUrl)
              if (response.ok) {
                metadata = await response.json()
                break
              }
            } catch (error) {
              console.log(`Gateway failed:`, ipfsUrl)
            }
          }
        } else {
          const response = await fetch(`/api/event-metadata?uri=${encodeURIComponent(metadataURI)}`)
          metadata = await response.json()
        }
        
        if (metadata) {
          name = metadata.name || name
          location = metadata.location || ''
        }
      } catch (error) {
        console.error('Error fetching event metadata:', error)
      }
    }

    return NextResponse.json({
      organizer,
      date: date.toString(),
      ticketPrice: ticketPrice.toString(),
      totalTickets: totalTickets.toString(),
      soldTickets: soldTickets.toString(),
      name,
      location
    })
  } catch (error) {
    console.error('Error fetching event details:', error)
    return NextResponse.json({ error: 'Failed to fetch event details' }, { status: 500 })
  }
}
