'use client'

import { useState, useEffect, useMemo } from 'react'

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
              const response = await fetch(`/api/artist/${artistId}`)
              
              if (response.ok) {
                const data = await response.json()
                return {
                  id: artistId,
                  name: data.name || `Artiste #${artistId}`,
                  share: Math.round((memoizedArtistShares[index] || 0) / 100) // Convert from basis points to percentage
                }
              } else {
                return {
                  id: artistId,
                  name: `Artiste #${artistId}`,
                  share: Math.round((memoizedArtistShares[index] || 0) / 100) // Convert from basis points to percentage
                }
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
