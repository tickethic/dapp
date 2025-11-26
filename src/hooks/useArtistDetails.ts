'use client'

import { useState, useEffect, useMemo } from 'react'
import { useReadContract } from 'wagmi'
import { getArtistInfo } from '@/lib/blockchain'

export interface ArtistDetail {
  id: number
  name: string
  share: number
}

export function useArtistDetails(artistIds: number[], artistShares: number[]) {
  const [artistDetails, setArtistDetails] = useState<ArtistDetail[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Memoize the dependencies to prevent infinite loops
  const memoizedArtistIds = useMemo(() => artistIds, [JSON.stringify(artistIds)])
  const memoizedArtistShares = useMemo(() => artistShares, [JSON.stringify(artistShares)])

  useEffect(() => {
    if (memoizedArtistIds.length === 0) {
      setArtistDetails([])
      return
    }

    const fetchArtistDetails = async () => {
      setIsLoading(true)
      
      try {
        const details = await Promise.all(
          memoizedArtistIds.map(async (artistId, index) => {
            try {
              // Utiliser les appels blockchain directs au lieu de l'API
              const artistInfo = await getArtistInfo(artistId, (params: any) => {
                // Cette fonction sera appelée par le hook useReadContract
                return new Promise((resolve, reject) => {
                  // Simuler un appel blockchain - dans un vrai cas, ceci serait géré par wagmi
                  resolve(null)
                })
              })
              
              return {
                id: artistId,
                name: artistInfo?.name || `Artiste #${artistId}`,
                share: Math.round((memoizedArtistShares[index] || 0) / 100) // Convert from basis points to percentage
              }
            } catch (error) {
              console.error(`Error fetching artist ${artistId}:`, error)
              return {
                id: artistId,
                name: `Artiste #${artistId}`,
                share: Math.round((memoizedArtistShares[index] || 0) / 100) // Convert from basis points to percentage
              }
            }
          })
        )
        setArtistDetails(details)
      } catch (error) {
        console.error('Error fetching artist details:', error)
        setArtistDetails([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchArtistDetails()
  }, [memoizedArtistIds, memoizedArtistShares])

  return { artistDetails, isLoading }
}
