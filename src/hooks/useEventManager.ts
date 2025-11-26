'use client'

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { contractAddresses } from '@/config'
import { useEventLogs } from './useEventLogs'

// EventManager ABI for write functions
const EVENT_MANAGER_ABI = [
  {
    "inputs": [
      {"internalType": "uint256[]", "name": "_artistIds", "type": "uint256[]"},
      {"internalType": "uint256[]", "name": "_artistShares", "type": "uint256[]"},
      {"internalType": "address", "name": "_organizer", "type": "address"},
      {"internalType": "uint256", "name": "_date", "type": "uint256"},
      {"internalType": "string", "name": "_metadataURI", "type": "string"},
      {"internalType": "uint256", "name": "_ticketPrice", "type": "uint256"},
      {"internalType": "uint256", "name": "_totalTickets", "type": "uint256"}
    ],
    "name": "createEvent",
    "outputs": [
      {"internalType": "uint256", "name": "eventId", "type": "uint256"},
      {"internalType": "address", "name": "eventAddress", "type": "address"}
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const

export interface CreateEventParams {
  artistIds: number[]
  artistShares: number[]
  organizer: string
  date: number
  metadataURI: string
  ticketPrice: bigint
  totalTickets: number
}

export function useCreateEvent() {
  const { writeContract, data: hash, error, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed, data: receipt } = useWaitForTransactionReceipt({
    hash,
  })

  // Extract event data from transaction receipt
  const eventLogs = useEventLogs(receipt)
  const eventAddress = eventLogs?.eventAddress || null
  const eventId = eventLogs?.eventId || null

  const createEvent = async (params: CreateEventParams) => {
    try {
      writeContract({
        address: contractAddresses.EventManager,
        abi: EVENT_MANAGER_ABI,
        functionName: 'createEvent',
        args: [
          params.artistIds.map(id => BigInt(id)),
          params.artistShares.map(share => BigInt(share)),
          params.organizer as `0x${string}`,
          BigInt(params.date),
          params.metadataURI,
          params.ticketPrice,
          BigInt(params.totalTickets)
        ],
      })
    } catch (err) {
      console.error('Error creating event:', err)
    }
  }

  return {
    createEvent,
    hash,
    error,
    isPending,
    isConfirming,
    isConfirmed,
    isLoading: isPending || isConfirming,
    receipt,
    eventAddress,
    eventId
  }
}
