'use client'

import { useReadContract } from 'wagmi'
import { contractAddresses } from '@/config'
import { useState, useEffect } from 'react'

// Artist ABI
const ARTIST_ABI = [
  {
    "inputs": [],
    "name": "nextArtistId",
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

export interface ArtistInfo {
  id: number
  name: string
  metadataURI: string
  owner: string
}

// Hook to get total number of artists
export function useTotalArtists() {
  const { data: nextArtistId, isLoading } = useReadContract({
    address: contractAddresses.Artist,
    abi: ARTIST_ABI,
    functionName: 'nextArtistId',
  })

  return {
    totalArtists: nextArtistId ? Number(nextArtistId) - 1 : 0,
    isLoading
  }
}

// Hook to get info for a specific artist
export function useArtistInfo(artistId: number) {
  const { data: artistData, isLoading, error } = useReadContract({
    address: contractAddresses.Artist,
    abi: ARTIST_ABI,
    functionName: 'getArtistInfo',
    args: [BigInt(artistId)],
    query: {
      enabled: artistId > 0,
    },
  })

  const { data: owner, isLoading: isLoadingOwner } = useReadContract({
    address: contractAddresses.Artist,
    abi: ARTIST_ABI,
    functionName: 'ownerOf',
    args: [BigInt(artistId)],
    query: {
      enabled: artistId > 0,
    },
  })

  const artistInfo: ArtistInfo | undefined = artistData ? {
    id: artistId,
    name: artistData[0],
    metadataURI: artistData[1],
    owner: owner || '0x...'
  } : undefined

  return {
    artistInfo,
    isLoading: isLoading || isLoadingOwner,
    error
  }
}

// Hook to get all artists (this will be expensive for many artists)
export function useAllArtists() {
  const { totalArtists, isLoading: isLoadingTotal } = useTotalArtists()
  const [allArtists, setAllArtists] = useState<ArtistInfo[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (totalArtists > 0) {
      setIsLoading(true)
      setError(null)
      
      // Fetch all artists info from the real contract
      const fetchAllArtists = async () => {
        const artists: ArtistInfo[] = []
        for (let i = 1; i <= totalArtists; i++) {
          try {
            const [name, metadataURI] = await (window as any).viem.readContract({
              address: contractAddresses.Artist,
              abi: ARTIST_ABI,
              functionName: 'getArtistInfo',
              args: [BigInt(i)]
            })
            const owner = await (window as any).viem.readContract({
              address: contractAddresses.Artist,
              abi: ARTIST_ABI,
              functionName: 'ownerOf',
              args: [BigInt(i)]
            })
            artists.push({
              id: i,
              name,
              metadataURI,
              owner
            })
          } catch (err) {
            artists.push({
              id: i,
              name: `Artiste #${i}`,
              metadataURI: '',
              owner: ''
            })
          }
        }
        setAllArtists(artists)
        setIsLoading(false)
      }
      fetchAllArtists()
    } else {
      setAllArtists([])
    }
  }, [totalArtists])

  return {
    allArtists,
    isLoading: isLoading || isLoadingTotal,
    error
  }
}
