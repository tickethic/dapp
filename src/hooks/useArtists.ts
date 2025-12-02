'use client'

import { useReadContract } from 'wagmi'
import { contractAddresses } from '@/config'

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

export function useArtistInfo(artistId: number) {
  const { data: artistInfoRaw, isLoading: artistInfoLoading } = useReadContract({
    address: contractAddresses.Artist,
    abi: ARTIST_ABI,
    functionName: 'getArtistInfo',
    args: [BigInt(artistId)],
    query: {
      enabled: artistId > 0,
    }
  })

  const { data: owner, isLoading: ownerLoading } = useReadContract({
    address: contractAddresses.Artist,
    abi: ARTIST_ABI,
    functionName: 'ownerOf',
    args: [BigInt(artistId)],
    query: {
      enabled: artistId > 0,
    }
  })

  // Type guard pour s'assurer que artistInfoRaw est un tuple [string, string]
  const artistInfo = Array.isArray(artistInfoRaw) && artistInfoRaw.length === 2 
    ? {
        id: artistId,
        name: artistInfoRaw[0] as string,
        metadataURI: artistInfoRaw[1] as string,
        owner: owner as string || ''
      }
    : null

  const isLoading = artistInfoLoading || ownerLoading

  return {
    artistInfo,
    isLoading
  }
}
