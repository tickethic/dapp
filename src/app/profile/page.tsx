'use client'

import { useState, useEffect } from 'react'
import { useWallet } from '@/hooks/useWallet'
import { useUserTickets } from '@/hooks/useUserTickets'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Ticket, Calendar, MapPin, Users, Clock, ExternalLink, CheckCircle, XCircle, Clock as ClockIcon } from 'lucide-react'

export default function ProfilePage() {
  const { address, isConnected } = useWallet()
  const { tickets, isLoading, error } = useUserTickets(address || '')
  const [activeTab, setActiveTab] = useState<'tickets' | 'events'>('tickets')

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Connexion requise</h1>
            <p className="text-gray-600 mb-8">Veuillez connecter votre wallet pour voir vos billets.</p>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Retour à &lsquo;accueil
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
          <h1 className="text-3xl font-bold text-gray-800">Mes Billets</h1>
          <p className="text-gray-600 mt-2">
            Adresse: {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('tickets')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'tickets'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Mes Billets
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'events'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Mes Événements
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'tickets' && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-6">Mes Billets</h2>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded w-full"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-600 mb-4">Erreur lors du chargement des billets</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  Réessayer
                </button>
              </div>
            ) : tickets.length === 0 ? (
              <div className="text-center py-12">
                <Ticket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">Aucun billet trouvé</h3>
                <p className="text-gray-600 mb-6">Vous &lsquo;avez pas encore acheté de billets.</p>
                <a
                  href="/events"
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  Découvrir les événements
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'events' && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-6">Mes Événements</h2>
            <p className="text-gray-600 mb-6">Les événements auxquels vous participez</p>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded w-full"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-600 mb-4">Erreur lors du chargement des événements</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  Réessayer
                </button>
              </div>
            ) : tickets.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">Aucun événement trouvé</h3>
                <p className="text-gray-600 mb-6">Vous ne participez à aucun événement pour le moment.</p>
                <a
                  href="/events"
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  Découvrir les événements
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tickets.map((ticket) => (
                  <EventParticipationCard key={ticket.id} ticket={ticket} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

interface TicketCardProps {
  ticket: {
    id: string
    eventName: string
    eventDate: string
    eventLocation?: string
    price: string
    status: 'valid' | 'used' | 'expired'
    eventAddress: string
  }
}

function TicketCard({ ticket }: TicketCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid':
        return 'bg-green-100 text-green-800'
      case 'used':
        return 'bg-gray-100 text-gray-800'
      case 'expired':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'valid':
        return 'Valide'
      case 'used':
        return 'Utilisé'
      case 'expired':
        return 'Expiré'
      default:
        return 'Inconnu'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <Ticket className="w-6 h-6 text-purple-600 mr-2" />
          <span className="font-semibold text-gray-800">Billet #{ticket.id}</span>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
          {getStatusText(ticket.status)}
        </span>
      </div>

      <h3 className="text-lg font-bold text-gray-800 mb-2">{ticket.eventName}</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{new Date(ticket.eventDate).toLocaleDateString('fr-FR')}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span>{new Date(ticket.eventDate).toLocaleTimeString('fr-FR')}</span>
        </div>
        
        {ticket.eventLocation && (
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{ticket.eventLocation}</span>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-600">Prix payé</span>
          <span className="font-bold text-purple-600">{ticket.price}</span>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => {
              // TODO: Implement ticket sharing/display
              alert('Fonctionnalité de partage à venir')
            }}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-md hover:bg-gray-200 transition text-sm"
          >
            Partager
          </button>
          <button
            onClick={() => {
              // TODO: Implement ticket verification
              alert('Fonctionnalité de vérification à venir')
            }}
            className="flex-1 bg-purple-100 text-purple-700 py-2 px-3 rounded-md hover:bg-purple-200 transition text-sm"
          >
            Vérifier
          </button>
        </div>
      </div>
    </div>
  )
}

interface EventParticipationCardProps {
  ticket: {
    id: string
    eventName: string
    eventDate: string
    eventLocation?: string
    price: string
    status: 'valid' | 'used' | 'expired'
    eventAddress: string
  }
}

function EventParticipationCard({ ticket }: EventParticipationCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'used':
        return <XCircle className="w-5 h-5 text-gray-600" />
      case 'expired':
        return <ClockIcon className="w-5 h-5 text-red-600" />
      default:
        return <ClockIcon className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'valid':
        return 'À venir'
      case 'used':
        return 'Participé'
      case 'expired':
        return 'Terminé'
      default:
        return 'Inconnu'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid':
        return 'bg-green-100 text-green-800'
      case 'used':
        return 'bg-blue-100 text-blue-800'
      case 'expired':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const eventDate = new Date(ticket.eventDate)
  const isPastEvent = eventDate < new Date()

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <Calendar className="w-6 h-6 text-purple-600 mr-2" />
          <span className="font-semibold text-gray-800">{ticket.eventName}</span>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon(ticket.status)}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
            {getStatusText(ticket.status)}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
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
        
        {ticket.eventLocation && (
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{ticket.eventLocation}</span>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-600">Prix payé</span>
          <span className="font-bold text-purple-600">{ticket.price}</span>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => {
              // TODO: Implement event details view
              alert('Fonctionnalité de détails à venir')
            }}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-md hover:bg-gray-200 transition text-sm"
          >
            Voir détails
          </button>
          {ticket.status === 'valid' && (
            <button
              onClick={() => {
                // TODO: Implement ticket sharing
                alert('Fonctionnalité de partage à venir')
              }}
              className="flex-1 bg-purple-100 text-purple-700 py-2 px-3 rounded-md hover:bg-purple-200 transition text-sm"
            >
              Partager
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
