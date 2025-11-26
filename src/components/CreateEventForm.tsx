'use client'

import { useState, useEffect } from 'react'
import { useWallet } from '@/hooks/useWallet'
import { useCreateEvent } from '@/hooks/useEventManager'
import { useOrganizerStatus } from '@/hooks/useOrganizerStatus'
import { useOrganizerRegistration } from '@/hooks/useOrganizerRegistration'
import { ArtistSearch } from './ArtistSearch'
import { ArtistInfo } from '@/hooks/useArtists'
import { Calendar, DollarSign, Users, Plus, X, CheckCircle, UserPlus, AlertCircle } from 'lucide-react'

interface Artist {
  id: number
  share: number
  name: string
}

export function CreateEventForm() {
  const { address } = useWallet()
  const { createEvent, isLoading, isConfirmed, error, hash, eventAddress, eventId } = useCreateEvent()
  const { isOrganizer, isLoading: isLoadingStatus } = useOrganizerStatus(address)
  const { registerAsOrganizer, isLoading: isRegistering, isConfirmed: isRegistrationConfirmed } = useOrganizerRegistration()
  
  // État local pour gérer l'affichage après enregistrement
  const [justRegistered, setJustRegistered] = useState(false)
  
  // Détecter quand l'enregistrement est confirmé
  useEffect(() => {
    if (isRegistrationConfirmed) {
      setJustRegistered(true)
      // Réinitialiser l'état après un délai pour permettre au hook de se mettre à jour
      setTimeout(() => {
        setJustRegistered(false)
      }, 2000)
    }
  }, [isRegistrationConfirmed])
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    ticketPrice: '',
    totalTickets: '',
    metadataURI: ''
  })
  
  const [artists, setArtists] = useState<Artist[]>([])
  const [selectedArtists, setSelectedArtists] = useState<ArtistInfo[]>([])
  const [newArtist, setNewArtist] = useState({ id: '', share: '' })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleArtistSelect = (artistInfo: ArtistInfo) => {
    setSelectedArtists(prev => [...prev, artistInfo])
  }

  const removeSelectedArtist = (artistId: number) => {
    setSelectedArtists(prev => prev.filter(artist => artist.id !== artistId))
    setArtists(prev => prev.filter(artist => artist.id !== artistId))
  }

  const addArtist = () => {
    if (newArtist.id && newArtist.share) {
      const artist: Artist = {
        id: parseInt(newArtist.id),
        share: parseInt(newArtist.share),
        name: `Artiste #${newArtist.id}`
      }
      setArtists(prev => [...prev, artist])
      setNewArtist({ id: '', share: '' })
    }
  }

  const removeArtist = (index: number) => {
    setArtists(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!address) return

    // Combine date and time
    const eventDateTime = new Date(`${formData.date}T${formData.time}`)
    const timestamp = Math.floor(eventDateTime.getTime() / 1000)

    // Convert ticket price to wei (assuming ETH)
    const ticketPriceInWei = BigInt(Math.floor(parseFloat(formData.ticketPrice) * 1e18))

    // Create event metadata with the title and description from the form
    const eventMetadata = {
      name: formData.title,
      description: formData.description || `Un événement organisé par ${address.slice(0, 6)}...${address.slice(-4)}`,
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjN2MzYWVkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1pemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkV2ZW50PC90ZXh0Pjwvc3ZnPg==',
      date: eventDateTime.toISOString(),
      location: 'À définir',
      category: 'Musique'
    }

    // For now, we'll use a placeholder URI since we can't upload to IPFS from the frontend
    // In a real app, you'd upload the metadata to IPFS and get the hash
    const eventSlug = formData.title.replace(/\s+/g, '-').toLowerCase()
    const descriptionSlug = formData.description ? 
      encodeURIComponent(formData.description.substring(0, 100)).replace(/%/g, '') : 
      'no-description'
    const metadataURI = formData.metadataURI || `event://${eventSlug}-${descriptionSlug}-${Date.now()}`

    // Combine all artists (from search and manual addition)
    const allArtists = [...artists]
    selectedArtists.forEach(selectedArtist => {
      if (!allArtists.find(a => a.id === selectedArtist.id)) {
        allArtists.push({ id: selectedArtist.id, share: 0, name: selectedArtist.name })
      }
    })

    if (allArtists.length === 0) {
      alert('Veuillez sélectionner au moins un artiste pour créer l\'événement')
      return
    }

    const params = {
      artistIds: allArtists.map(a => a.id),
      artistShares: allArtists.map(a => a.share),
      organizer: address,
      date: timestamp,
      metadataURI: metadataURI,
      ticketPrice: ticketPriceInWei,
      totalTickets: parseInt(formData.totalTickets)
    }

    await createEvent(params)
  }

  const totalArtistShare = artists.reduce((sum, artist) => sum + artist.share, 0)
  const organizerShare = 100 - totalArtistShare

  // Show loading state while checking organizer status
  if (isLoadingStatus) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification du statut d'organisateur...</p>
        </div>
      </div>
    )
  }

  // Show registration prompt if not an organizer and not just registered
  if (!isOrganizer && !justRegistered) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Enregistrement requis</h2>
          <p className="text-gray-600 mb-6">
            Vous devez être enregistré comme organisateur pour créer des événements.
          </p>
          <button 
            onClick={registerAsOrganizer}
            disabled={isRegistering}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center mx-auto"
          >
            {isRegistering ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Enregistrement en cours...
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                S'enregistrer comme organisateur
              </>
            )}
          </button>
        </div>
      </div>
    )
  }

  // Show success message and transition to form if just registered
  if (justRegistered) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Enregistrement réussi !</h2>
          <p className="text-gray-600 mb-6">
            Vous êtes maintenant enregistré comme organisateur. Créez votre premier événement !
          </p>
          <div className="animate-pulse">
            <div className="text-sm text-gray-500">Chargement du formulaire...</div>
          </div>
        </div>
      </div>
    )
  }

  if (isConfirmed) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Événement créé !</h2>
          <p className="text-gray-600 mb-6">
            Votre événement a été créé avec succès sur la blockchain.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Créer un autre événement
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {justRegistered ? "Créer votre premier événement" : "Créer un nouvel événement"}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Titre de l'événement *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Ex: Concert Jazz au Parc"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prix du billet (ETH) *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="number"
                name="ticketPrice"
                value={formData.ticketPrice}
                onChange={handleInputChange}
                required
                step="0.001"
                min="0"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="0.1"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Décrivez votre événement..."
          />
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date de l'événement *
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Heure de l'événement *
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Tickets */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre de billets disponibles *
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="number"
              name="totalTickets"
              value={formData.totalTickets}
              onChange={handleInputChange}
              required
              min="1"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="100"
            />
          </div>
        </div>

        {/* Artists */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Artistes participants
          </label>
          
          {/* Artist Search */}
          <div className="mb-4">
            <ArtistSearch 
              onArtistSelect={handleArtistSelect}
              selectedArtists={selectedArtists}
              onArtistRemove={removeSelectedArtist}
            />
          </div>

          {/* Selected Artists with Shares */}
          <div className="space-y-4">
            {selectedArtists.map((artistInfo, index) => {
              const artist = artists.find(a => a.id === artistInfo.id)
              return (
                <div key={artistInfo.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <span className="text-sm font-medium">{artistInfo.name}</span>
                    <span className="ml-2 text-xs text-gray-500">ID: {artistInfo.id}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="Part (%)"
                      value={artist?.share || ''}
                      onChange={(e) => {
                        const share = parseInt(e.target.value) || 0
                        if (artist) {
                          setArtists(prev => prev.map(a => 
                            a.id === artistInfo.id ? { ...a, share } : a
                          ))
                        } else {
                          setArtists(prev => [...prev, {
                            id: artistInfo.id,
                            share,
                            name: artistInfo.name
                          }])
                        }
                      }}
                      className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      min="0"
                      max="100"
                    />
                    <span className="text-xs text-gray-500">%</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSelectedArtist(artistInfo.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )
            })}
          </div>
          
          {artists.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="text-sm text-blue-800">
                <div>Part totale des artistes: {totalArtistShare}%</div>
                <div>Part de l'organisateur: {organizerShare}%</div>
                {totalArtistShare > 100 && (
                  <div className="text-red-600 font-medium">
                    ⚠️ La part totale des artistes ne peut pas dépasser 100%
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Metadata URI */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URI des métadonnées (optionnel)
          </label>
          <input
            type="text"
            name="metadataURI"
            value={formData.metadataURI}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="ipfs://..."
          />
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">
              Erreur: {error.message}
            </p>
          </div>
        )}

        {/* Success Message */}
        {isConfirmed && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-sm mb-2">
              ✅ Événement créé avec succès ! Votre événement est maintenant disponible.
            </p>
            {(eventAddress || eventId) && (
              <div className="mt-2 p-3 bg-white rounded border space-y-3">
                {eventId && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">ID de l'événement :</p>
                    <p className="text-sm font-mono text-gray-600">
                      #{eventId.toString()}
                    </p>
                  </div>
                )}
                {eventAddress && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Adresse de l'événement :</p>
                    <p className="text-xs font-mono text-gray-600 break-all">
                      {eventAddress}
                    </p>
                    <button
                      onClick={() => navigator.clipboard.writeText(eventAddress)}
                      className="mt-2 text-xs text-purple-600 hover:text-purple-800 underline"
                    >
                      📋 Copier l'adresse
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || totalArtistShare > 100}
          className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Création en cours...' : 'Créer l\'événement'}
        </button>
      </form>
    </div>
  )
}
