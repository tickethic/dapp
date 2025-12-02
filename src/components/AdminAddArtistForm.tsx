'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { contractAddresses } from '@/config'
import { Music, User, Link, CheckCircle, AlertCircle, Plus } from 'lucide-react'

// Artist ABI - Current deployed version
const ARTIST_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "string", "name": "artistName", "type": "string"},
      {"internalType": "string", "name": "artistMetadataURI", "type": "string"}
    ],
    "name": "mintArtist",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const

export function AdminAddArtistForm() {
  const [formData, setFormData] = useState({
    artistName: '',
    recipientAddress: '',
    metadataURI: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.artistName.trim()) {
      setError('Le nom de l\'artiste est requis')
      return
    }

    if (!formData.recipientAddress.trim()) {
      setError('L\'adresse du destinataire est requise')
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      setSuccess(null)

      const metadataURI = formData.metadataURI || `ipfs://artist-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

      writeContract({
        address: contractAddresses.Artist,
        abi: ARTIST_ABI,
        functionName: 'mintArtist',
        args: [formData.recipientAddress as `0x${string}`, formData.artistName, metadataURI],
      })

    } catch (err) {
      console.error('Error minting artist:', err)
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de la création de l\'artiste')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (error) {
      setError(null)
    }
  }

  // Update success state based on transaction status
  if (isSuccess && !success) {
    setSuccess('Artiste créé avec succès !')
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
            L&lsquo;artiste a été créé avec succès sur la blockchain.
          </p>
          
          {hash && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">Transaction hash :</p>
              <p className="text-xs font-mono text-gray-800 break-all">{hash}</p>
            </div>
          )}
          
          <button
            onClick={() => {
              setSuccess(null)
              setFormData({ artistName: '', recipientAddress: '', metadataURI: '' })
            }}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Créer un autre artiste
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
            <Plus className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Ajouter un Artiste</h2>
            <p className="text-gray-600">Créer un nouveau profil artiste NFT</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            Fonctionnalité Admin
          </h3>
          <p className="text-blue-700 text-sm">
            En tant que propriétaire du contrat, vous pouvez créer des profils artistes pour &lsquo;autres utilisateurs.
          </p>
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
                value={formData.artistName}
                onChange={(e) => handleInputChange('artistName', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Nom de &lsquo;artiste"
              />
            </div>
          </div>

          {/* Adresse du destinataire */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adresse du destinataire *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.recipientAddress}
                onChange={(e) => handleInputChange('recipientAddress', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="0x..."
              />
            </div>
            <p className="text-gray-500 text-sm mt-1">
              Adresse Ethereum qui recevra le NFT artiste
            </p>
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
                value={formData.metadataURI}
                onChange={(e) => handleInputChange('metadataURI', e.target.value)}
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
            disabled={isLoading || isPending || isConfirming}
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isLoading || isPending || isConfirming ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Création en cours...
              </div>
            ) : (
              'Créer l\'artiste'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

