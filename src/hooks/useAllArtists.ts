'use client'

import { useReadContract } from 'wagmi'
import { contractAddresses } from '@/config'
import { useState, useEffect } from 'react'
import { getAllArtistsInfo, ARTIST_ABI, type ArtistInfo } from '@/lib/blockchain'

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
        
        // Utiliser les appels blockchain directs au lieu de l'API
        const artistsList = await getAllArtistsInfo(nextArtistId, (params: any) => {
          // Cette fonction sera appelée par le hook useReadContract
          return new Promise((resolve, reject) => {
            // Simuler un appel blockchain - dans un vrai cas, ceci serait géré par wagmi
            resolve(null)
          })
        })
        
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