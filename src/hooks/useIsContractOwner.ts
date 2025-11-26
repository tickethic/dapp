'use client'

import { useReadContract } from 'wagmi'
import { contractAddresses } from '@/config'
import { useWallet } from '@/hooks/useWallet'

// Artist ABI
const ARTIST_ABI = [
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const

export function useIsContractOwner() {
  const { address } = useWallet()
  
  const { data: contractOwner, isLoading } = useReadContract({
    address: contractAddresses.Artist,
    abi: ARTIST_ABI,
    functionName: 'owner',
  })

  const isOwner = address && contractOwner && 
    address.toLowerCase() === (contractOwner as string).toLowerCase()

  return {
    isOwner: !!isOwner,
    isLoading,
    contractOwner: contractOwner as string | undefined,
    userAddress: address
  }
}

