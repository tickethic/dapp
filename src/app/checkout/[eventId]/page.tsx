'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useWallet } from '@/hooks/useWallet'
import { useEventInfo, useEventMetadata } from '@/hooks/useEvents'
import { CheckoutForm } from '@/components/CheckoutForm'
import { EventArtistsList } from '@/components/EventArtistsList'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Calendar, MapPin, Users, Ticket, Clock, ArrowLeft } from 'lucide-react'

export default function CheckoutPage() {
  const params = useParams()
  const router = useRouter()
  const { address, isConnected } = useWallet()
  const eventId = Number(params.eventId)
  
  const { eventInfo, isLoading } = useEventInfo(eventId)
  const { metadataURI, artistIds, artistShares } = useEventMetadata(eventInfo?.[0] || '')
  
  const [eventName, setEventName] = useState<string>('')
  const [eventDescription, setEventDescription] = useState<string>('')
  const [eventImage, setEventImage] = useState<string>('')
  const [eventLocation, setEventLocation] = useState<string>('')
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false)

  // Redirect if not connected
  useEffect(() => {
    if (!isConnected) {
      router.push('/events')
    }
  }, [isConnected, router])

  // Fetch event metadata
  useEffect(() => {
    if (metadataURI && metadataURI !== '') {
      setIsLoadingMetadata(true)
      
      if (metadataURI.startsWith('ipfs://')) {
        const ipfsHash = metadataURI.replace('ipfs://', '')
        const ipfsGateways = [
          `https://ipfs.io/ipfs/${ipfsHash}`,
          `https://dweb.link/ipfs/${ipfsHash}`,
          `https://ipfs.fleek.co/ipfs/${ipfsHash}`,
          `https://gateway.originprotocol.com/ipfs/${ipfsHash}`
        ]
        
        const tryGateways = async () => {
          for (const ipfsUrl of ipfsGateways) {
            try {
              const response = await fetch(ipfsUrl)
              if (response.ok) {
                const data = await response.json()
                setEventName(data.name || `Événement #${eventId}`)
                setEventDescription(data.description || '')
                setEventImage(data.image || '')
                setEventLocation(data.location || '')
                return
              }
            } catch (error) {
              console.log(`Gateway failed:`, ipfsUrl)
            }
          }
          
          // Fallback to API
          try {
            const response = await fetch(`/api/event-metadata?uri=${encodeURIComponent(metadataURI)}`)
            const data = await response.json()
            setEventName(data.name || `Événement #${eventId}`)
            setEventDescription(data.description || '')
            setEventImage(data.image || '')
            setEventLocation(data.location || '')
          } catch (error) {
            console.error('Error fetching event metadata:', error)
            setEventName(`Événement #${eventId}`)
          }
        }
        
        tryGateways().finally(() => {
          setIsLoadingMetadata(false)
        })
      } else {
        fetch(`/api/event-metadata?uri=${encodeURIComponent(metadataURI)}`)
          .then(response => response.json())
          .then(data => {
            setEventName(data.name || `Événement #${eventId}`)
            setEventDescription(data.description || '')
            setEventImage(data.image || '')
            setEventLocation(data.location || '')
          })
          .catch(error => {
            console.error('Error fetching event metadata:', error)
            setEventName(`Événement #${eventId}`)
          })
          .finally(() => {
            setIsLoadingMetadata(false)
          })
      }
    } else {
      setEventName(`Événement #${eventId}`)
    }
  }, [metadataURI, eventId])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!eventInfo) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Événement non trouvé</h1>
            <p className="text-gray-600 mb-8">L&lsquo;événement que vous recherchez &lsquo;existe pas.</p>
            <button
              onClick={() => router.push('/events')}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Retour aux événements
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const [eventAddress, organizer, date, ticketPrice, totalTickets, soldTickets] = eventInfo
  const eventDate = new Date(Number(date) * 1000)
  const isPastEvent = eventDate < new Date()
  const isSoldOut = soldTickets >= totalTickets
  const priceInEth = Number(ticketPrice) / 1e18
  const formattedPrice = priceInEth > 0 ? `${priceInEth.toFixed(4)} ETH` : 'Gratuit'

  // Check if event is available for purchase
  if (isPastEvent) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Événement terminé</h1>
            <p className="text-gray-600 mb-8">Cet événement a déjà eu lieu.</p>
            <button
              onClick={() => router.push('/events')}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Retour aux événements
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (isSoldOut) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Événement complet</h1>
            <p className="text-gray-600 mb-8">Tous les billets ont été vendus pour cet événement.</p>
            <button
              onClick={() => router.push('/events')}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Retour aux événements
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/events')}
            className="flex items-center text-gray-600 hover:text-purple-600 transition mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux événements
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Finaliser votre commande</h1>
          <p className="text-gray-600 mt-2">Remplissez vos informations pour acheter votre billet</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Event Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Résumé de &lsquo;événement</h2>
            
            {/* Event Image */}
            {eventImage && (
              <div className="h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                <img 
                  src={eventImage} 
                  alt={eventName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            )}

            {/* Event Details */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">
                {isLoadingMetadata ? 'Chargement...' : eventName}
              </h3>
              
              {eventDescription && (
                <p className="text-gray-600 text-sm">
                  {eventDescription}
                </p>
              )}

              <div className="space-y-2">
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

                {eventLocation && (
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{eventLocation}</span>
                  </div>
                )}

                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>Organisateur: {organizer.slice(0, 6)}...{organizer.slice(-4)}</span>
                </div>
              </div>

              {/* Artists List */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <EventArtistsList eventAddress={eventAddress} />
              </div>

              {/* Price */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">Prix du billet</span>
                  <span className="text-2xl font-bold text-purple-600">{formattedPrice}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {soldTickets.toString()} / {totalTickets.toString()} billets vendus
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <CheckoutForm 
              eventId={eventId}
              eventAddress={eventAddress}
              ticketPrice={ticketPrice}
              eventName={eventName}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
