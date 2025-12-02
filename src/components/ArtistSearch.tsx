'use client'

import { useState, useEffect } from 'react'
import { useAllArtists, ArtistInfo } from '@/hooks/useRealArtists'
import { Search, User, Plus, X } from 'lucide-react'

interface ArtistSearchProps {
  onArtistSelect: (artist: ArtistInfo) => void
  selectedArtists: ArtistInfo[]
  onArtistRemove?: (artistId: number) => void
}

export function ArtistSearch({ onArtistSelect, selectedArtists, onArtistRemove }: ArtistSearchProps) {
  const { allArtists, isLoading: isLoadingArtists, totalArtists } = useAllArtists()
  const [searchTerm, setSearchTerm] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [searchResults, setSearchResults] = useState<ArtistInfo[]>([])
  const [loadingArtists, setLoadingArtists] = useState<Set<number>>(new Set())

  // Filter artists based on search term
  useEffect(() => {
    if (searchTerm.length >= 2 && allArtists.length > 0) {
      setShowResults(true)
      // Search by ID or name
      const filteredArtists = allArtists.filter(artist => 
        artist.id.toString().includes(searchTerm) || 
        artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        searchTerm.toLowerCase().includes(artist.id.toString())
      )
      setSearchResults(filteredArtists)
    } else {
      setShowResults(false)
      setSearchResults([])
    }
  }, [searchTerm, allArtists])

  const handleArtistClick = async (artist: ArtistInfo) => {
    // Check if artist is already selected
    if (selectedArtists.some(selectedArtist => selectedArtist.id === artist.id)) {
      return
    }

    setLoadingArtists(prev => new Set(prev).add(artist.id))
    
    try {
      onArtistSelect(artist)
      setSearchTerm('')
      setShowResults(false)
    } finally {
      setLoadingArtists(prev => {
        const newSet = new Set(prev)
        newSet.delete(artist.id)
        return newSet
      })
    }
  }

  const removeArtist = (artistId: number) => {
    if (onArtistRemove) {
      onArtistRemove(artistId)
    }
  }

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Rechercher un artiste par nom ou ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* Search Results */}
      {showResults && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {searchResults.length === 0 ? (
            <div className="p-4 text-gray-500 text-center">
              Aucun artiste trouve
            </div>
          ) : (
            <div className="py-1">
              {searchResults.slice(0, 10).map((artist) => (
                <button
                  key={artist.id}
                  onClick={() => handleArtistClick(artist)}
                  disabled={loadingArtists.has(artist.id) || selectedArtists.some(a => a.id === artist.id)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 disabled:bg-gray-50 disabled:cursor-not-allowed flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-gray-400" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{artist.name}</span>
                      <span className="text-xs text-gray-500">ID: {artist.id}</span>
                      {loadingArtists.has(artist.id) && (
                        <span className="text-xs text-gray-500">Chargement...</span>
                      )}
                    </div>
                  </div>
                  {selectedArtists.some(a => a.id === artist.id) ? (
                    <span className="text-xs text-green-600">Selectionne</span>
                  ) : (
                    <Plus className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Selected Artists */}
      {selectedArtists.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Artistes selectionnes :</h4>
          {selectedArtists.map((artist) => (
            <div key={artist.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-sm font-medium">{artist.name}</span>
                <span className="ml-2 text-xs text-gray-500">ID: {artist.id}</span>
              </div>
              <button
                onClick={() => removeArtist(artist.id)}
                className="text-red-600 hover:text-red-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Total Artists Info */}
      <div className="mt-2 text-xs text-gray-500">
        {isLoadingArtists ? (
          'Chargement...'
        ) : (
          `${totalArtists} artiste${totalArtists > 1 ? 's' : ''} disponible${totalArtists > 1 ? 's' : ''}`
        )}
      </div>
    </div>
  )
}
