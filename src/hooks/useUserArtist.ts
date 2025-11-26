'use client'

import { useReadContract } from 'wagmi'
import { contractAddresses } from '@/config'
import { useState, useEffect } from 'react'

// Artist ABI - Updated version
const ARTIST_ABI = [
  {
    "inputs": [{"internalType": "address", "name": "userAddress", "type": "address"}],
    "name": "hasAddressMintedArtist",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "userAddress", "type": "address"}],
    "name": "getArtistIdByAddress",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "artistId", "type": "uint256"}],
    "name": "getArtistInfo",
    "outputs": [
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "string", "name": "metadataURI", "type": "string"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "ownerOf",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const

export interface UserArtistInfo {
  id: number
  name: string
  metadataURI: string
  owner: string
}

export function useUserArtist(userAddress?: string) {
  const [userArtist, setUserArtist] = useState<UserArtistInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check if user has minted an artist
  const { data: hasMinted, isLoading: isLoadingMinted } = useReadContract({
    address: contractAddresses.Artist,
    abi: ARTIST_ABI,
    functionName: 'hasAddressMintedArtist',
    args: userAddress ? [userAddress as `0x${string}`] : undefined,
    query: {
      enabled: !!userAddress
    }
  })

  // Get artist ID if user has minted
  const { data: artistId, isLoading: isLoadingId } = useReadContract({
    address: contractAddresses.Artist,
    abi: ARTIST_ABI,
    functionName: 'getArtistIdByAddress',
    args: userAddress ? [userAddress as `0x${string}`] : undefined,
    query: {
      enabled: !!userAddress && !!hasMinted
    }
  })

  // Get artist info if we have an ID
  const { data: artistInfo, isLoading: isLoadingInfo } = useReadContract({
    address: contractAddresses.Artist,
    abi: ARTIST_ABI,
    functionName: 'getArtistInfo',
    args: artistId ? [artistId as bigint] : undefined,
    query: {
      enabled: !!artistId && Number(artistId) > 0
    }
  })

  // Get owner of the NFT
  const { data: owner, isLoading: isLoadingOwner } = useReadContract({
    address: contractAddresses.Artist,
    abi: ARTIST_ABI,
    functionName: 'ownerOf',
    args: artistId ? [artistId as bigint] : undefined,
    query: {
      enabled: !!artistId && Number(artistId) > 0
    }
  })

  useEffect(() => {
    if (!userAddress) {
      setUserArtist(null)
      setIsLoading(false)
      return
    }

    if (isLoadingMinted || isLoadingId || isLoadingInfo || isLoadingOwner) {
      setIsLoading(true)
      return
    }

    if (hasMinted && artistId && Number(artistId) > 0 && artistInfo && owner) {
      const [name, metadataURI] = artistInfo as [string, string]
      setUserArtist({
        id: Number(artistId),
        name,
        metadataURI,
        owner: owner as string
      })
    } else {
      setUserArtist(null)
    }

    setIsLoading(false)
  }, [userAddress, hasMinted, artistId, artistInfo, owner, isLoadingMinted, isLoadingId, isLoadingInfo, isLoadingOwner])

  return {
    userArtist,
    hasMinted: !!hasMinted,
    isLoading,
    error
  }
}