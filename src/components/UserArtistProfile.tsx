'use client'

import { UserArtistInfo } from '@/hooks/useUserArtist'
import { Music, User, ExternalLink, Calendar, DollarSign, Edit, Share } from 'lucide-react'

interface UserArtistProfileProps {
  userArtist: UserArtistInfo
}

export function UserArtistProfile({ userArtist }: UserArtistProfileProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Mon Profil Artiste</h2>
        <p className="text-gray-600">
          Gérez votre profil artiste et suivez vos performances
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start space-x-6">
            <div className="w-20 h-20 bg-purple-100 rounded-lg flex items-center justify-center">
              <Music className="w-10 h-10 text-purple-600" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {userArtist.name}
              </h3>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  <span>ID: #{userArtist.id}</span>
                </div>
                <div className="flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  <span>NFT Token</span>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Métadonnées</h4>
                <p className="text-xs text-gray-600 break-all">{userArtist.metadataURI}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition flex items-center">
              <Edit className="w-4 h-4 mr-2" />
              Modifier
            </button>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition flex items-center">
              <Share className="w-4 h-4 mr-2" />
              Partager
            </button>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
            <div className="flex items-center mb-3">
              <Calendar className="w-6 h-6 text-purple-600 mr-3" />
              <span className="text-lg font-semibold text-purple-800">Événements</span>
            </div>
            <div className="text-3xl font-bold text-purple-900 mb-1">0</div>
            <div className="text-sm text-purple-700">Participations</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
            <div className="flex items-center mb-3">
              <DollarSign className="w-6 h-6 text-green-600 mr-3" />
              <span className="text-lg font-semibold text-green-800">Revenus</span>
            </div>
            <div className="text-3xl font-bold text-green-900 mb-1">0.0000</div>
            <div className="text-sm text-green-700">ETH gagnés</div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
            <div className="flex items-center mb-3">
              <Music className="w-6 h-6 text-blue-600 mr-3" />
              <span className="text-lg font-semibold text-blue-800">Statut</span>
            </div>
            <div className="text-3xl font-bold text-blue-900 mb-1">Actif</div>
            <div className="text-sm text-blue-700">Profil vérifié</div>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Activité récente</h4>
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <div className="text-6xl mb-4">🎵</div>
            <h5 className="text-lg font-medium text-gray-700 mb-2">Aucune activité récente</h5>
            <p className="text-gray-500">
              Vos participations aux événements et vos revenus apparaîtront ici.
            </p>
          </div>
        </div>
        
        {/* NFT Info */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              <span className="font-medium">Propriétaire:</span> {userArtist.owner.slice(0, 6)}...{userArtist.owner.slice(-4)}
            </div>
            <div>
              <span className="font-medium">Token ID:</span> #{userArtist.id}
            </div>
          </div>
        </div>
      </div>
      
      {/* Next Steps */}
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
