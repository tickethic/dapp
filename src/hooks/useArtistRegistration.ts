'use client'

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { contractAddresses } from '@/config'
import { useWallet } from '@/hooks/useWallet'
import { useState } from 'react'

// Artist ABI - Updated version (allows anyone to mint)
const ARTIST_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "artistName", "type": "string"},
      {"internalType": "string", "name": "artistMetadataURI", "type": "string"}
    ],
    "name": "mintArtist",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "userAddress", "type": "address"}],
    "name": "hasAddressMintedArtist",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const

export interface ArtistRegistrationData {
  name: string
  description?: string
  genre?: string
  socialLinks?: {
    website?: string
    twitter?: string
    instagram?: string
    spotify?: string
  }
  imageUrl?: string
}

export function useArtistRegistration() {
  const { address } = useWallet()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const mintArtist = async (artistData: ArtistRegistrationData, customIpfsUrl?: string) => {
    try {
      setIsLoading(true)
      setError(null)
      setSuccess(null)

      // Use custom IPFS URL if provided, otherwise generate a placeholder
      const metadataURI = customIpfsUrl || `ipfs://artist-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

      if (!address) {
        throw new Error('Wallet non connecté')
      }
      
      writeContract({
        address: contractAddresses.Artist,
        abi: ARTIST_ABI,
        functionName: 'mintArtist',
        args: [artistData.name, metadataURI], // New version: no address parameter, mints to msg.sender
      })

    } catch (err) {
      console.error('Error minting artist:', err)
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de la création de l\'artiste')
    } finally {
      setIsLoading(false)
    }
  }

  // Update success/error states based on transaction status
  if (isSuccess && !success) {
    setSuccess('Artiste créé avec succès !')
  }

  return {
    mintArtist,
    isLoading: isLoading || isPending || isConfirming,
    error,
    success,
    hash,
    isSuccess
  }
}
