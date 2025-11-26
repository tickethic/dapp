'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CreateArtistForm } from '@/components/CreateArtistForm'
import { UserArtistProfile } from '@/components/UserArtistProfile'
import { useWallet } from '@/hooks/useWallet'
import { useUserArtist } from '@/hooks/useUserArtist'
import { User, Music, Plus, Wallet } from 'lucide-react'

export default function ArtistsPage() {
  const { isConnected, address } = useWallet()
  const { userArtist, hasMinted, isLoading: isLoadingUserArtist } = useUserArtist(address)

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        
        <div className="w-full flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="bg-white rounded-lg shadow-md p-12 max-w-2xl mx-auto">
                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Wallet className="w-12 h-12 text-purple-600" />
                </div>
                
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  Connexion requise
                </h1>
                
                <p className="text-lg text-gray-600 mb-8">
                  Pour accéder à l'espace artistes, vous devez d'abord connecter votre wallet.
                </p>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">
                    Fonctionnalités disponibles pour les artistes :
                  </h3>
                  <ul className="text-left text-purple-700 space-y-2">
                    <li className="flex items-center">
                      <Plus className="w-4 h-4 mr-2" />
                      Créer un profil artiste NFT
                    </li>
                    <li className="flex items-center">
                      <Music className="w-4 h-4 mr-2" />
                      Gérer son profil artiste
                    </li>
                    <li className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Suivre ses performances et revenus
                    </li>
                  </ul>
                </div>
                
                <p className="text-sm text-gray-500">
                  Utilisez le bouton "Connecter mon wallet" dans la barre de navigation pour commencer.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="w-full flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Espace Artistes
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Créez votre profil artiste NFT et gérez votre profil sur la plateforme
            </p>
            <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-500">
              <User className="w-4 h-4" />
              <span>Connecté en tant que : {address?.slice(0, 6)}...{address?.slice(-4)}</span>
            </div>
          </div>

          {/* Content */}
          {isLoadingUserArtist ? (
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
          ) : hasMinted && userArtist ? (
            <UserArtistProfile userArtist={userArtist} />
          ) : (
            <CreateArtistForm />
          )}

        </div>
      </div>
      
      <Footer />
    </div>
  )
}
