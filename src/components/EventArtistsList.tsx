'use client'

import { useState, useEffect } from 'react'
import { useEventArtists, EventArtist } from '@/hooks/useEventArtists'

interface EventArtistsListProps {
  eventAddress: string
}

export function EventArtistsList({ eventAddress }: EventArtistsListProps) {
  const { artists, isLoading, totalArtists } = useEventArtists(eventAddress)
  const [artistDetails, setArtistDetails] = useState<EventArtist[]>([])

  // Fetch artist names from blockchain
  useEffect(() => {
    if (artists.length > 0) {
      const fetchArtistNames = async () => {
        const details = await Promise.all(
          artists.map(async (artist) => {
            try {
              // Utiliser les appels blockchain directs au lieu de l'API
              // Pour l'instant, on utilise le nom par défaut
              return {
                ...artist,
                name: `Artiste #${artist.id}`
              }
            } catch (error) {
              console.error(`Error fetching artist ${artist.id}:`, error)
              return artist // Return original if blockchain call fails
            }
          })
        )
        setArtistDetails(details)
      }
      fetchArtistNames()
    }
  }, [artists])

  if (isLoading) {
    return (
      <div>
        <strong>Artistes :</strong>
        <div className="text-gray-500">Chargement...</div>
      </div>
    )
  }

  if (totalArtists === 0) {
    return (
      <div>
        <strong>Artistes :</strong>
        <div className="text-gray-500">Aucun artiste configuré</div>
      </div>
    )
  }

  return (
    <div>
      <strong>Artistes ({totalArtists}) :</strong>
      <div className="mt-1 space-y-1">
        {artistDetails.map((artist, index) => (
          <div key={artist.id} className="flex justify-between items-center text-xs">
            <span className="font-medium">{artist.name}</span>
            <span className="text-gray-600">{artist.share}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
