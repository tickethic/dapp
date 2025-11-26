import { NextRequest, NextResponse } from 'next/server'
import { createPublicClient, http } from 'viem'
import { polygonAmoy } from 'viem/chains'
import { serverContractAddresses } from '@/config/server'

const TICKET_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "uint256", "name": "index", "type": "uint256"}
    ],
    "name": "tokenOfOwnerByIndex",
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "tokenId", "type": "uint256"}
    ],
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get('address')
    const index = searchParams.get('index')

    if (!address || !index) {
      return NextResponse.json({ error: 'Address and index are required' }, { status: 400 })
    }

    const client = createPublicClient({
      chain: polygonAmoy,
      transport: http()
    })

    // Get ticket ID at the given index
    const tokenId = await client.readContract({
      address: serverContractAddresses.Ticket,
      abi: TICKET_ABI,
      functionName: 'tokenOfOwnerByIndex',
      args: [address as `0x${string}`, BigInt(index)]
    })

    // Get ticket info
    const ticketInfo = await client.readContract({
      address: serverContractAddresses.Ticket,
      abi: TICKET_ABI,
      functionName: 'getTicketInfo',
      args: [tokenId]
    })

    return NextResponse.json({
      tokenId: tokenId.toString(),
      eventAddress: ticketInfo[0],
      price: ticketInfo[1].toString(),
      isUsed: ticketInfo[2]
    })
  } catch (error) {
    console.error('Error fetching user ticket:', error)
    return NextResponse.json({ error: 'Failed to fetch ticket' }, { status: 500 })
  }
}
