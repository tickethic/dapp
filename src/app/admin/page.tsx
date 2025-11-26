'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { AdminArtistsList } from '@/components/AdminArtistsList'
import { AdminAddArtistForm } from '@/components/AdminAddArtistForm'
import { OrganizerAdmin } from '@/components/OrganizerAdmin'
import { useIsContractOwner } from '@/hooks/useIsContractOwner'
import { useAllArtists } from '@/hooks/useAllArtists'
import { Shield, Lock, User, AlertCircle, Users } from 'lucide-react'
import { useState } from 'react'

export default function AdminPage() {
  const { isOwner, isLoading: isLoadingOwner, contractOwner, userAddress } = useIsContractOwner()
  const { artists, isLoading: isLoadingArtists, error, totalCount } = useAllArtists()
  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'organizers'>('list')

  if (isLoadingOwner) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        
        <div className="w-full flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="bg-white rounded-lg shadow-md p-12 max-w-2xl mx-auto">
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    )
  }

  if (!isOwner) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        
        <div className="w-full flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="bg-white rounded-lg shadow-md p-12 max-w-2xl mx-auto">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-12 h-12 text-red-600" />
                </div>
                
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  Accès refusé
                </h1>
                
                <p className="text-lg text-gray-600 mb-8">
                  Cette page est réservée au propriétaire du contrat.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-6 text-left">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Informations de connexion :
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Votre adresse :</span>
                      <span className="font-mono text-gray-800">
                        {userAddress ? `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}` : 'Non connecté'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Propriétaire du contrat :</span>
                      <span className="font-mono text-gray-800">
                        {contractOwner ? `${contractOwner.slice(0, 6)}...${contractOwner.slice(-4)}` : 'Chargement...'}
                      </span>
                    </div>
                  </div>
                </div>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Administration</h1>
                <p className="text-gray-600">Gestion des artistes et du contrat</p>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
              <div className="flex items-center justify-center text-green-800">
                <User className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">
                  Connecté en tant que propriétaire du contrat
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{totalCount}</div>
              <div className="text-gray-600">Artistes enregistrés</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {contractOwner ? `${contractOwner.slice(0, 6)}...${contractOwner.slice(-4)}` : 'N/A'}
              </div>
              <div className="text-gray-600">Propriétaire du contrat</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">Actif</div>
              <div className="text-gray-600">Statut du contrat</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 max-w-2xl mx-auto">
            <button
              onClick={() => setActiveTab('list')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                activeTab === 'list'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Liste des artistes
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                activeTab === 'add'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Ajouter un artiste
            </button>
            <button
              onClick={() => setActiveTab('organizers')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                activeTab === 'organizers'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Organisateurs
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'list' ? (
            <AdminArtistsList 
              artists={artists}
              isLoading={isLoadingArtists}
              error={error}
            />
          ) : activeTab === 'add' ? (
            <AdminAddArtistForm />
          ) : (
            <OrganizerAdmin />
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
