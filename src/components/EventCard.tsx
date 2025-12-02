'use client'

import { Calendar, MapPin, Users, Ticket, Clock } from 'lucide-react'
import { useEventInfo, useEventMetadata } from '@/hooks/useEvents'
import { useArtistDetails } from '@/hooks/useArtistDetails'
import { Tooltip } from './Tooltip'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface EventCardProps {
  eventId: number
}

export function EventCard({ eventId }: EventCardProps) {
  const router = useRouter()
  const { eventInfo, isLoading } = useEventInfo(eventId)
  const { metadataURI, artistIds, artistShares } = useEventMetadata(eventInfo?.[0] || '')
  const [eventName, setEventName] = useState<string>('')
  const [eventDescription, setEventDescription] = useState<string>('')
  const [eventImage, setEventImage] = useState<string>('')
  const [eventLocation, setEventLocation] = useState<string>('')
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false)
  
  // Get artist details for tooltip
  const { artistDetails, isLoading: isLoadingArtists } = useArtistDetails(
    artistIds ? artistIds.map(id => Number(id)) : [], 
    artistShares ? artistShares.map(share => Number(share)) : []
  )

  // Fetch event metadata when metadataURI is available
  useEffect(() => {
    if (metadataURI && metadataURI !== '') {
      console.log(`EventCard ${eventId}: Fetching metadata for URI:`, metadataURI)
      setIsLoadingMetadata(true)
      
      // Try to fetch directly from IPFS first, then fallback to API
      if (metadataURI.startsWith('ipfs://')) {
        const ipfsHash = metadataURI.replace('ipfs://', '')
        const ipfsGateways = [
          `https://ipfs.io/ipfs/${ipfsHash}`,
          `https://dweb.link/ipfs/${ipfsHash}`,
          `https://ipfs.fleek.co/ipfs/${ipfsHash}`,
          `https://gateway.originprotocol.com/ipfs/${ipfsHash}`
        ]
        
        // Try each gateway until one works
        const tryGateways = async () => {
          for (const ipfsUrl of ipfsGateways) {
            try {
              console.log(`EventCard ${eventId}: Trying IPFS gateway:`, ipfsUrl)
              const response = await fetch(ipfsUrl)
              if (response.ok) {
                const data = await response.json()
                console.log(`EventCard ${eventId}: Received IPFS metadata:`, data)
                setEventName(data.name || `Evenement #${eventId}`)
                setEventDescription(data.description || '')
                setEventImage(data.image || '')
                setEventLocation(data.location || '')
                return // Success, exit
              }
            } catch (error) {
              console.log(`EventCard ${eventId}: Gateway failed:`, ipfsUrl, error instanceof Error ? error.message : 'Unknown error')
            }
          }
          
          // All gateways failed, try API fallback
          console.log(`EventCard ${eventId}: All IPFS gateways failed, trying API fallback`)
          try {
            const response = await fetch(`/api/event-metadata?uri=${encodeURIComponent(metadataURI)}`)
            const data = await response.json()
            console.log(`EventCard ${eventId}: Received API metadata:`, data)
            setEventName(data.name || `Evenement #${eventId}`)
            setEventDescription(data.description || '')
            setEventImage(data.image || '')
            setEventLocation(data.location || '')
          } catch (error) {
            console.error('Error fetching event metadata:', error)
            setEventName(`Evenement #${eventId}`)
            setEventDescription('')
            setEventImage('')
            setEventLocation('')
          }
        }
        
        tryGateways().finally(() => {
          setIsLoadingMetadata(false)
        })
      } else {
        // Use API for non-IPFS URIs
        fetch(`/api/event-metadata?uri=${encodeURIComponent(metadataURI)}`)
          .then(response => response.json())
          .then(data => {
            console.log(`EventCard ${eventId}: Received metadata:`, data)
            setEventName(data.name || `Evenement #${eventId}`)
            setEventDescription(data.description || '')
            setEventImage(data.image || '')
            setEventLocation(data.location || '')
          })
          .catch(error => {
            console.error('Error fetching event metadata:', error)
            setEventName(`Evenement #${eventId}`)
            setEventDescription('')
            setEventImage('')
            setEventLocation('')
          })
          .finally(() => {
            setIsLoadingMetadata(false)
          })
      }
    } else {
      setEventName(`Evenement #${eventId}`)
    }
  }, [metadataURI, eventId])

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="h-8 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    )
  }

  if (!eventInfo) {
    return null
  }

  const [eventAddress, organizer, date, ticketPrice, totalTickets, soldTickets] = eventInfo

  // Format date
  const eventDate = new Date(Number(date) * 1000)
  const isPastEvent = eventDate < new Date()
  const isSoldOut = soldTickets >= totalTickets

  // Format price (assuming price is in wei)
  const priceInEth = Number(ticketPrice) / 1e18
  const formattedPrice = priceInEth > 0 ? `${priceInEth.toFixed(4)} ETH` : 'Gratuit'

  // Format address
  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 ${
      isPastEvent ? 'opacity-60' : ''
    }`}>
      {/* Event Image */}
      {eventImage && (
        <div className="h-48 bg-gray-200">
          <img 
            src={eventImage} 
            alt={eventName || `Evenement #${eventId}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Hide image if it fails to load
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
      )}
      
      <div className="p-6">
        {/* Event Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {isLoadingMetadata ? 'Chargement...' : (eventName || `Evenement #${eventId}`)}
        </h3>

        {/* Event Description */}
        {eventDescription && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {eventDescription}
          </p>
        )}

        {/* Event Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{eventDate.toLocaleDateString('fr-FR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>{eventDate.toLocaleTimeString('fr-FR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            <span>Organisateur: {formatAddress(organizer)}</span>
          </div>

          {eventLocation && (
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{eventLocation}</span>
            </div>
          )}

          {artistIds && artistIds.length > 0 && (
            <div className="flex items-center text-gray-600">
              <Ticket className="w-4 h-4 mr-2" />
              <Tooltip
                content={
                  <div className="space-y-1">
                    <div className="font-semibold text-white mb-2">Artistes participants</div>
                    {isLoadingArtists ? (
                      <div className="text-gray-300">Chargement...</div>
                    ) : artistDetails.length > 0 ? (
                      artistDetails.map((artist, index) => (
                        <div key={artist.id} className="flex justify-between items-center text-sm">
                          <span className="text-white">{artist.name}</span>
                          <span className="text-purple-300 font-medium">{artist.share}%</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-300">Aucun detail disponible</div>
                    )}
                  </div>
                }
                position="top"
              >
                <span className="cursor-help hover:text-purple-600 transition-colors">
                  {artistIds.length} artiste{artistIds.length > 1 ? 's' : ''}
                </span>
              </Tooltip>
            </div>
          )}
        </div>

        {/* Ticket Info */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-500">
            {soldTickets.toString()} / {totalTickets.toString()} billets vendus
          </div>
          <div className="text-lg font-bold text-purple-600">
            {formattedPrice}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${totalTickets > 0 ? (Number(soldTickets) / Number(totalTickets)) * 100 : 0}%` 
            }}
          />
        </div>

        {/* Status and Actions */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {isPastEvent && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                Termine
              </span>
            )}
            {isSoldOut && !isPastEvent && (
              <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                Complet
              </span>
            )}
            {!isPastEvent && !isSoldOut && (
              <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                Disponible
              </span>
            )}
          </div>

          {!isPastEvent && !isSoldOut && (
            <button 
              onClick={() => router.push(`/checkout/${eventId}`)}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
            >
              Acheter un billet
            </button>
          )}
        </div>

        {/* Metadata URI if available */}
        {metadataURI && (
          <div className="px-6 pb-6">
            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Metadonnees: {metadataURI}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
