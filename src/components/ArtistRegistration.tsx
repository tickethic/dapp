'use client'

import { CreateArtistForm } from './CreateArtistForm'
import { Music, User, CheckCircle, Star } from 'lucide-react'

export function ArtistRegistration() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Devenir Artiste</h2>
        <p className="text-gray-600">
          Créez votre profil artiste NFT et rejoignez la communauté Tickethic
        </p>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8 mb-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Pourquoi devenir artiste ?</h3>
          <p className="text-gray-600">Rejoignez une plateforme décentralisée qui valorise les artistes</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Music className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Profil NFT Unique</h4>
            <p className="text-sm text-gray-600">Créez votre profil artiste sous forme de NFT unique sur la blockchain</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Participation aux Événements</h4>
            <p className="text-sm text-gray-600">Participez à des événements et recevez automatiquement votre part des revenus</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Communauté</h4>
            <p className="text-sm text-gray-600">Connectez-vous avec d'autres artistes et organisateurs d'événements</p>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Comment ça marche ?</h3>
        
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Créez votre profil</h4>
              <p className="text-gray-600 text-sm">Remplissez le formulaire avec vos informations artistiques et vos liens sociaux</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Mint NFT</h4>
              <p className="text-gray-600 text-sm">Votre profil artiste est créé sous forme de NFT unique sur la blockchain Polygon</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Participez aux événements</h4>
              <p className="text-gray-600 text-sm">Les organisateurs peuvent vous sélectionner pour leurs événements et vous recevrez automatiquement votre part</p>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Créer mon profil artiste</h3>
          <CreateArtistForm />
        </div>
      </div>
    </div>
  )
}
