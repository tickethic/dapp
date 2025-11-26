'use client'

import { useReadContract } from 'wagmi'
import { contractAddresses } from '@/config'

const EVENT_ABI = [
  {
    "inputs": [],
    "name": "getArtistIds",
    "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getArtistShares",
    "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const

const ARTIST_ABI = [
  {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "getArtistInfo",
    "outputs": [
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "string", "name": "image", "type": "string"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const

export interface EventArtist {
  id: number
  name: string
  share: number
}

export function useEventArtists(eventAddress: string) {
  const { data: artistIds } = useReadContract({
    address: eventAddress as `0x${string}`,
    abi: EVENT_ABI,
    functionName: 'getArtistIds',
  })

  const { data: artistShares } = useReadContract({
    address: eventAddress as `0x${string}`,
    abi: EVENT_ABI,
    functionName: 'getArtistShares',
  })

  // Fetch artist details for each artist ID
  const artistDetails = []
  if (artistIds && artistShares) {
    console.log('=== EVENT ARTISTS DEBUG ===')
    console.log('Artist IDs:', artistIds)
    console.log('Artist Shares (raw):', artistShares)
    console.log('Artist Shares (numbers):', artistShares.map(s => Number(s)))
    
    for (let i = 0; i < artistIds.length; i++) {
      const artistId = Number(artistIds[i])
      const rawShare = Number(artistShares[i])
      
      // Debug: Check if shares are in basis points (0-10000) or percentage (0-100)
      console.log(`Artist ${artistId}: raw share = ${rawShare}`)
      
      // If shares are stored as basis points (0-10000), convert to percentage
      // If shares are stored as percentage (0-100), use as is
      const share = rawShare > 100 ? Math.round(rawShare / 100) : rawShare
      
      console.log(`Artist ${artistId}: final share = ${share}%`)
      
      artistDetails.push({
        id: artistId,
        name: `Artiste #${artistId}`, // Placeholder, will be replaced by API call
        share: share
      })
    }
    console.log('========================')
  }

  return {
    artists: artistDetails,
    isLoading: !artistIds || !artistShares,
    totalArtists: artistIds?.length || 0
  }
}
