'use client'

import { useState } from 'react'
import { useWallet } from '@/hooks/useWallet'
import { useArtistRegistration, ArtistRegistrationData } from '@/hooks/useArtistRegistration'
import { useUserArtist } from '@/hooks/useUserArtist'
import { Music, User, CheckCircle, AlertCircle, Link } from 'lucide-react'

export function CreateArtistForm() {
  const { address } = useWallet()
  const { mintArtist, isLoading, error, success, hash } = useArtistRegistration()
  const { hasArtist, artistId, isLoading: isCheckingArtist } = useUserArtist()
  
  const [formData, setFormData] = useState<ArtistRegistrationData>({
    name: '',
    description: '',
    genre: '',
    socialLinks: {
      website: '',
      twitter: '',
      instagram: '',
      spotify: ''
    },
    imageUrl: ''
  })

  const [ipfsUrl, setIpfsUrl] = useState('')

  const [errors, setErrors] = useState<Partial<ArtistRegistrationData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<ArtistRegistrationData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom de l\'artiste est requis'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!address) {
      alert('Veuillez connecter votre wallet')
      return
    }

    if (!validateForm()) {
      return
    }

    await mintArtist(formData, ipfsUrl)
  }

  const handleInputChange = (field: keyof ArtistRegistrationData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  // Show loading state while checking if user has artist
  if (isCheckingArtist) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification de votre profil artiste...</p>
        </div>
      </div>
    )
  }

  // Show message if user already has an artist
  if (hasArtist) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Music className="w-8 h-8 text-blue-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Vous avez déjà un profil artiste !
          </h2>
          
          <p className="text-gray-600 mb-6">
            Votre profil artiste #{artistId} est déjà enregistré sur la blockchain. Chaque wallet ne peut créer qu&lsquo;un seul profil artiste.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 text-sm">
              <strong>Limite :</strong> Un seul profil artiste par wallet. Si vous voulez créer un nouveau profil, vous devez utiliser un autre wallet.
            </p>
          </div>
          
          <button
            onClick={() => window.location.href = '/profile'}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Voir mon profil
          </button>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Artiste créé avec succès !
          </h2>
          
          <p className="text-gray-600 mb-6">
            Votre profil artiste a été créé avec succès sur la blockchain. Vous pouvez maintenant participer aux événements.
          </p>
          
          {hash && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">Transaction hash :</p>
              <p className="text-xs font-mono text-gray-800 break-all">{hash}</p>
            </div>
          )}
          
          <button
            onClick={() => window.location.reload()}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Voir mon profil
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
            <Music className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Créer un Profil Artiste</h2>
            <p className="text-gray-600">Créez votre profil artiste NFT sur la blockchain</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            Comment ça marche ?
          </h3>
          <p className="text-blue-700 text-sm mb-2">
            Créez directement votre profil artiste NFT sur la blockchain. Chaque wallet peut créer un seul profil artiste.
          </p>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Remplissez le formulaire ci-dessous</li>
            <li>• Votre profil NFT sera créé instantanément</li>
            <li>• Vous pourrez participer aux événements</li>
            <li>• Limite : 1 profil artiste par wallet</li>
          </ul>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nom de &lsquo;artiste */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom de &lsquo;artiste *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Votre nom &lsquo;artiste"
              />
            </div>
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* URL IPFS (optionnel) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL IPFS (optionnel)
            </label>
            <div className="relative">
              <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="url"
                value={ipfsUrl}
                onChange={(e) => setIpfsUrl(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="ipfs://QmXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx"
              />
            </div>
            <p className="text-gray-500 text-sm mt-1">
              Laissez vide pour générer automatiquement une URL IPFS
            </p>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Création en cours...
              </div>
            ) : (
              'Créer mon profil artiste'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}