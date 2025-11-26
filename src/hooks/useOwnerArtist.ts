'use client'

import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { contractAddresses } from '@/config'
import { useState } from 'react'

// Artist ABI
const ARTIST_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "string", "name": "artistName", "type": "string"},
      {"internalType": "string", "name": "artistMetadataURI", "type": "string"}
    ],
    "name": "mintArtist",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const

export interface OwnerArtistData {
  artistName: string
  metadataURI: string
}

export function useOwnerArtist() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const addArtist = async (artistData: OwnerArtistData, recipientAddress: string) => {
    try {
      setIsLoading(true)
      setError(null)
      setSuccess(null)

      // Call the mintArtist function
      writeContract({
        address: contractAddresses.Artist,
        abi: ARTIST_ABI,
        functionName: 'mintArtist',
        args: [
          recipientAddress as `0x${string}`, 
          artistData.artistName, 
          artistData.metadataURI
        ],
      })

    } catch (err) {
      console.error('Error adding artist:', err)
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de l\'ajout de l\'artiste')
    } finally {
      setIsLoading(false)
    }
  }

  // Update success/error states based on transaction status
  if (isSuccess && !success) {
    setSuccess('Artiste ajouté avec succès !')
  }

  return {
    addArtist,
    isLoading: isLoading || isPending || isConfirming,
    error,
    success,
    hash,
    isSuccess
  }
}

// Hook to check if current user is the owner
export function useIsOwner(userAddress?: string) {
  const { data: ownerAddress, isLoading } = useReadContract({
    address: contractAddresses.Artist,
    abi: ARTIST_ABI,
    functionName: 'owner',
  })

  return {
    isOwner: userAddress && ownerAddress && userAddress.toLowerCase() === (ownerAddress as string).toLowerCase(),
    isLoading,
    ownerAddress: ownerAddress as string
  }
}
