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
  }
] as const

export interface ArtistInfo {
  id: number
  name: string
  metadataURI: string
  owner: string
}

export function useAllArtists() {
  const [artists, setArtists] = useState<ArtistInfo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Get the next artist ID to know how many artists exist
  const { data: nextArtistId, isLoading: isLoadingNextId } = useReadContract({
    address: contractAddresses.Artist,
    abi: ARTIST_ABI,
    functionName: 'nextArtistId',
  })

  useEffect(() => {
    if (!nextArtistId) {
      setIsLoading(false)
      return
    }

    const fetchAllArtists = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const totalArtists = Number(nextArtistId)
        const artistsList: ArtistInfo[] = []
        
        // Fetch all artists from ID 1 to nextArtistId - 1
        for (let i = 1; i < totalArtists; i++) {
          try {
            const response = await fetch(`/api/artist/${i}`)
            if (response.ok) {
              const artistData = await response.json()
              artistsList.push({
                id: i,
                name: artistData.name,
                metadataURI: artistData.metadataURI,
                owner: artistData.owner
              })
            }
          } catch (err) {
            // Artist doesn't exist or error, continue
            console.warn(`Artist ${i} not found or error:`, err)
            continue
          }
        }
        
        setArtists(artistsList)
      } catch (err) {
        console.error('Error fetching artists:', err)
        setError('Erreur lors du chargement des artistes')
      } finally {
        setIsLoading(false)
      }
    }

    fetchAllArtists()
  }, [nextArtistId])

  return {
    artists,
    isLoading: isLoading || isLoadingNextId,
    error,
    totalCount: artists.length
  }
}