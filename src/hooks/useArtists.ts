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
  const { data: artistInfo, isLoading } = useReadContract({
    address: contractAddresses.Artist,
    abi: ARTIST_ABI,
    functionName: 'getArtistInfo',
    args: [BigInt(artistId)],
    query: {
      enabled: artistId > 0,
    }
  })

  const { data: owner } = useReadContract({
    address: contractAddresses.Artist,
    abi: ARTIST_ABI,
    functionName: 'ownerOf',
    args: [BigInt(artistId)],
    query: {
      enabled: artistId > 0,
    }
  })

  return {
    artistInfo: artistInfo ? {
      id: artistId,
      name: artistInfo[0],
      metadataURI: artistInfo[1],
      owner: owner || ''
    } : null,
    isLoading
  }
}
