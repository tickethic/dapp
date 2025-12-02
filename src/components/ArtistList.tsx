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

interface ArtistListProps {
  artistAddress: string
  onStatsUpdate: (stats: { totalArtists: number; totalEvents: number; totalRevenue: number }) => void
}

export function ArtistList({ artistAddress, onStatsUpdate }: ArtistListProps) {
  const [userArtists, setUserArtists] = useState<ArtistInfo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Get total number of artists
  const { data: nextArtistId, isLoading: isLoadingTotal } = useReadContract({
    address: contractAddresses.Artist,
    abi: ARTIST_ABI,
    functionName: 'nextArtistId',
  })

  useEffect(() => {
    const fetchUserArtists = async () => {
      if (!nextArtistId || !artistAddress) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)

        const totalArtists = Number(nextArtistId) - 1
        const artists: ArtistInfo[] = []

        // For now, we'll create placeholder data
        // In a real implementation, you would iterate through all artists and check ownership
        // This is a simplified version for demonstration
        
        // Simulate finding user's artists (in reality, you'd need to check ownership for each artist)
        if (totalArtists > 0) {
          // Placeholder: assume user has one artist profile
          artists.push({
            id: 1,
            name: "Mon Profil Artiste",
            metadataURI: "ipfs://artist-1",
            owner: artistAddress
          })
        }

        setUserArtists(artists)
        
        // Update stats
        onStatsUpdate({
          totalArtists: artists.length,
          totalEvents: 0, // This would come from event participation data
          totalRevenue: 0 // This would come from revenue tracking
        })

      } catch (err) {
        console.error('Error fetching user artists:', err)
        setError('Erreur lors du chargement des profils artistes')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserArtists()
  }, [nextArtistId, artistAddress, onStatsUpdate])

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
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
      <div className="max-w-4xl mx-auto">
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

  if (userArtists.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Music className="w-8 h-8 text-gray-400" />
          </div>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Aucun profil artiste trouvé
          </h3>
          
          <p className="text-gray-600 mb-6">
            Vous &lsquo;avez pas encore de profil artiste. Créez votre premier profil dans l&lsquo;onglet &ldquo;S&lsquo;inscrire&ldquo;.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              💡 <strong>Astuce :</strong> Une fois votre profil créé, vous pourrez participer à des événements et gérer vos performances.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Mes Profils Artistes</h2>
        <p className="text-gray-600">
          Gérez vos profils artistes et suivez vos performances
        </p>
      </div>

      <div className="space-y-6">
        {userArtists.map((artist) => (
          <div key={artist.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Music className="w-8 h-8 text-purple-600" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {artist.name}
                  </h3>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      <span>ID: #{artist.id}</span>
                    </div>
                    <div className="flex items-center">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      <span>NFT Token</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center mb-1">
                        <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-sm font-medium text-gray-700">Événements</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-800">0</div>
                      <div className="text-xs text-gray-500">Participations</div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center mb-1">
                        <DollarSign className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-sm font-medium text-gray-700">Revenus</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-800">0.0000</div>
                      <div className="text-xs text-gray-500">ETH gagnés</div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center mb-1">
                        <Music className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-sm font-medium text-gray-700">Statut</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">Actif</div>
                      <div className="text-xs text-gray-500">Profil vérifié</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition">
                  Modifier
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
                  Voir sur Explorer
                </button>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Propriétaire: {artist.owner.slice(0, 6)}...{artist.owner.slice(-4)}</span>
                <span>URI: {artist.metadataURI}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-blue-800 mb-3">
          Prochaines étapes
        </h4>
        <ul className="space-y-2 text-blue-700">
          <li className="flex items-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
            Participez à des événements organisés sur la plateforme
          </li>
          <li className="flex items-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
            Gérez vos performances et suivez vos revenus
          </li>
          <li className="flex items-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
            Connectez-vous avec &lsquo;autres artistes et organisateurs
          </li>
        </ul>
      </div>
    </div>
  )
}
