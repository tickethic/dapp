'use client'

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { contractAddresses } from '@/config'

// Event ABI for buying tickets
const EVENT_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_quantity",
        "type": "uint256"
      }
    ],
    "name": "buyTicket",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
] as const

export interface BuyTicketParams {
  eventAddress: string
  ticketPrice: bigint
  quantity: number
  buyerInfo: {
    walletAddress: string
  }
}

export function useBuyTicket() {
  const { writeContract, data: hash, error, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed, data: receipt } = useWaitForTransactionReceipt({
    hash,
  })

  // Déclarez explicitement le typage de log
  type Log = {
    topics: string[]
    data: string
  }

  // Extract ticket ID from transaction receipt
  const ticketId = receipt?.logs?.find((log: Log) => {
    try {
      // Look for TicketPurchased event (remplacez '0x...' par le vrai event signature)
      return log.topics[0] === '0x...' 
    } catch {
      return false
    }
  })?.data ? BigInt(receipt.logs[0].data) : null

  const buyTicket = async (params: BuyTicketParams) => {
    try {
      console.log('=== DEBUG BUY TICKET ===')
      console.log('Event Address:', params.eventAddress)
      console.log('Quantity:', params.quantity)
      console.log('Ticket Price (wei):', params.ticketPrice.toString())
      console.log('Ticket Price (ETH):', (Number(params.ticketPrice) / 1e18).toString())
      console.log('Total Price (wei):', (params.ticketPrice * BigInt(params.quantity)).toString())
      console.log('Total Price (ETH):', (Number(params.ticketPrice) / 1e18 * params.quantity).toString())
      console.log('Buyer Address:', params.buyerInfo.walletAddress)
      console.log('Gas Limit: 1,500,000')
      console.log('========================')
      
      // Call the buyTicket function on the Event contract
      writeContract({
        address: params.eventAddress as `0x${string}`,
        abi: EVENT_ABI,
        functionName: 'buyTicket',
        args: [BigInt(params.quantity)],
        value: params.ticketPrice * BigInt(params.quantity), // Envoyer le total ETH en paiement
        gasLimit: 1500000, // Remplacez 1500000n (BigInt) par un nombre (number) pour compatibilité ES5
      })
    } catch (err) {
      console.error('Error buying ticket:', err)
      console.error('Error details:', JSON.stringify(err, null, 2))
      throw err
    }
  }

  return {
    buyTicket,
    hash,
    error,
    isPending,
    isConfirming,
    isConfirmed,
    isLoading: isPending || isConfirming,
    receipt,
    ticketId
  }
}
