'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useOwnerArtist, OwnerArtistData } from '@/hooks/useOwnerArtist'
import { useWallet } from '@/hooks/useWallet'
import { Music, User, Link as LinkIcon, CheckCircle, AlertCircle, Crown } from 'lucide-react'

export function OwnerArtistForm() {
  const { addArtist, isLoading, error, success, hash } = useOwnerArtist()
  const { address } = useWallet()
  const router = useRouter()
  
  const [formData, setFormData] = useState<OwnerArtistData>({
    artistName: '',
    metadataURI: ''
  })

  const [errors, setErrors] = useState<Partial<OwnerArtistData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<OwnerArtistData> = {}

    if (!formData.artistName.trim()) {
      newErrors.artistName = 'Le nom de l artiste est requis'
    }

    if (!formData.metadataURI.trim()) {
      newErrors.metadataURI = 'L URI des metadonnees est requise'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    if (!address) {
      setErrors({ artistName: 'Adresse wallet non disponible' })
      return
    }
    
    await addArtist(formData, address)
  }

  const handleInputChange = (field: keyof OwnerArtistData, value: string) => {
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

  if (success) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Artiste ajoute avec succes !
          </h2>
          
          <p className="text-gray-600 mb-6">
            L artiste "{formData.artistName}" a ete cree et le NFT a ete transfere a votre adresse.
          </p>
          
          {hash && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">Transaction hash :</p>
              <p className="text-xs font-mono text-gray-800 break-all">{hash}</p>
            </div>
          )}
          
          <div className="space-y-3">
            <Link
              href="/admin"
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition font-semibold block text-center"
            >
              Retour au dashboard
            </Link>
            <button
              onClick={() => router.push('/admin')}
              className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition font-semibold block text-center"
            >
              Ajouter un autre artiste
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
            <Crown className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Ajouter un Artiste</h2>
            <p className="text-gray-600">En tant que proprietaire du contrat, ajoutez un nouvel artiste</p>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            ⚠️ Fonction Owner uniquement
          </h3>
          <p className="text-yellow-700 text-sm">
            Seul le proprietaire du contrat Artist peut ajouter de nouveaux artistes. 
            Cette action cree un NFT unique qui sera transfere a votre adresse.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nom de l'artiste */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom de l artiste *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.artistName}
                onChange={(e) => handleInputChange('artistName', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.artistName ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Nom de l artiste"
              />
            </div>
            {errors.artistName && <p className="text-red-600 text-sm mt-1">{errors.artistName}</p>}
          </div>

          {/* URI des métadonnées */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URI des metadonnees *
            </label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="url"
                value={formData.metadataURI}
                onChange={(e) => handleInputChange('metadataURI', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.metadataURI ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="ipfs://Qm... ou https://..."
              />
            </div>
            {errors.metadataURI && <p className="text-red-600 text-sm mt-1">{errors.metadataURI}</p>}
            <p className="text-gray-500 text-sm mt-1">
              URI vers les metadonnees JSON de l artiste (IPFS ou HTTPS)
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
                Creation en cours...
              </div>
            ) : (
              'Creer l artiste'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
