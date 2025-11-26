'use client'

import { useState, useEffect } from 'react'
import { useReadContract } from 'wagmi'
import { contractAddresses } from '@/config'
import { Music, User, ExternalLink, Calendar, DollarSign, AlertCircle } from 'lucide-react'

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

interface ArtistInfo {
  id: number
  name: string
  metadataURI: string
  owner: string
}

export function AllArtistsList() {
  const [allArtists, setAllArtists] = useState<ArtistInfo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Get total number of artists
  const { data: nextArtistId, isLoading: isLoadingTotal } = useReadContract({
    address: contractAddresses.Artist,
    abi: ARTIST_ABI,
    functionName: 'nextArtistId',
  })

  useEffect(() => {
    const fetchAllArtists = async () => {
      if (!nextArtistId) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)

        const totalArtists = Number(nextArtistId) - 1
        const artists: ArtistInfo[] = []

        // For now, we'll create placeholder data
        // In a real implementation, you would iterate through all artists and fetch their info
        if (totalArtists > 0) {
          for (let i = 1; i <= totalArtists; i++) {
            // Placeholder data - in reality you'd call getArtistInfo and ownerOf for each artist
            artists.push({
              id: i,
              name: `Artiste #${i}`,
              metadataURI: `ipfs://artist-${i}`,
              owner: '0x...' // This would come from ownerOf(i)
            })
          }
        }

        setAllArtists(artists)

      } catch (err) {
        console.error('Error fetching all artists:', err)
        setError('Erreur lors du chargement des artistes')
      } finally {
        setIsLoading(false)
      }
    }

    fetchAllArtists()
  }, [nextArtistId])

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Erreur</h3>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (allArtists.length === 0) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Music className="w-8 h-8 text-gray-400" />
          </div>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Aucun artiste trouvé
          </h3>
          
          <p className="text-gray-600 mb-6">
            Aucun artiste n'a encore été créé sur la plateforme.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Tous les Artistes</h2>
        <p className="text-gray-600">
          Découvrez tous les artistes inscrits sur la plateforme
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allArtists.map((artist) => (
          <div key={artist.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Music className="w-6 h-6 text-purple-600" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {artist.name}
                </h3>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span>ID: #{artist.id}</span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center mb-1">
                      <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Événements</span>
                    </div>
                    <div className="text-xl font-bold text-gray-800">0</div>
                    <div className="text-xs text-gray-500">Participations</div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-purple-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition">
                    Voir profil
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Propriétaire: {artist.owner.slice(0, 6)}...{artist.owner.slice(-4)}</span>
                <span>NFT #{artist.id}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-blue-800 mb-3">
          Statistiques de la plateforme
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-blue-700">
          <div className="text-center">
            <div className="text-2xl font-bold">{allArtists.length}</div>
            <div className="text-sm">Artistes inscrits</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">0</div>
            <div className="text-sm">Événements organisés</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">0</div>
            <div className="text-sm">Billets vendus</div>
          </div>
        </div>
      </div>
    </div>
  )
}
