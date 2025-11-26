'use client'

import { ArtistInfo } from '@/hooks/useAllArtists'
import { Music, User, ExternalLink, Copy, CheckCircle } from 'lucide-react'
import { useState } from 'react'

interface AdminArtistsListProps {
  artists: ArtistInfo[]
  isLoading: boolean
  error: string | null
}

export function AdminArtistsList({ artists, isLoading, error }: AdminArtistsListProps) {
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const copyToClipboard = async (text: string, id: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Music className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Erreur</h3>
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Gestion des Artistes</h2>
          <p className="text-gray-600">
            {artists.length} artiste{artists.length > 1 ? 's' : ''} enregistré{artists.length > 1 ? 's' : ''}
          </p>
        </div>

        {artists.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Aucun artiste</h3>
            <p className="text-gray-500">Aucun artiste n'a encore été créé.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {artists.map((artist) => (
              <div key={artist.id} className="p-6 hover:bg-gray-50 transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Music className="w-6 h-6 text-purple-600" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {artist.name}
                        </h3>
                        <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">
                          ID: #{artist.id}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          <span className="font-mono">
                            {artist.owner.slice(0, 6)}...{artist.owner.slice(-4)}
                          </span>
                          <button
                            onClick={() => copyToClipboard(artist.owner, artist.id)}
                            className="ml-2 p-1 hover:bg-gray-200 rounded"
                            title="Copier l'adresse"
                          >
                            {copiedId === artist.id ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <div className="text-sm text-gray-500 mb-1">Métadonnées</div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono text-gray-600 max-w-xs truncate">
                          {artist.metadataURI}
                        </span>
                        <button
                          onClick={() => copyToClipboard(artist.metadataURI, artist.id + 1000)}
                          className="p-1 hover:bg-gray-200 rounded"
                          title="Copier l'URL IPFS"
                        >
                          {copiedId === artist.id + 1000 ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => window.open(artist.metadataURI, '_blank')}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                      title="Ouvrir les métadonnées"
                    >
                      <ExternalLink className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

