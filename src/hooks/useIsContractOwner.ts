'use client'

import { useReadContract } from 'wagmi'
import { contractAddresses } from '@/config'
import { useWallet } from '@/hooks/useWallet'

// EventManager ABI - Vérifie le propriétaire du contrat EventManager
const EVENT_MANAGER_ABI = [
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
    address: contractAddresses.EventManager, // ← Vérifie le EventManager au lieu de &lsquo;Artist
    abi: EVENT_MANAGER_ABI,
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

