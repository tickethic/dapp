'use client'

import { useState, useEffect } from 'react'
import { OrganizerEvent } from '@/hooks/useOrganizerEvents'
import { Calendar, Users, Ticket, TrendingUp, Eye } from 'lucide-react'

interface OrganizerEventsListProps {
  organizerAddress: string
  onStatsUpdate?: (stats: { totalEvents: number, totalSold: number, totalRevenue: number }) => void
}

export function OrganizerEventsList({ organizerAddress, onStatsUpdate }: OrganizerEventsListProps) {
  const [allEvents, setAllEvents] = useState<OrganizerEvent[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'all' | 'future' | 'past'>('all')

  // Fetch organizer events from API
  useEffect(() => {
    if (!organizerAddress) {
      setAllEvents([])
      return
    }

    setIsLoading(true)
    
    fetch(`/api/organizer-events?organizer=${encodeURIComponent(organizerAddress)}`)
      .then(response => response.json())
      .then((data: { events?: Array<{
        id: string | number
        date: string
        ticketPrice: string
        totalTickets: string
        soldTickets: string
        isPast: boolean
        isSoldOut: boolean
      }> }) => {
        if (data.events) {
          // Convert string values back to BigInt for consistency
          const events = data.events.map((event) => ({
            ...event,
            date: BigInt(event.date),
            ticketPrice: BigInt(event.ticketPrice),
            totalTickets: BigInt(event.totalTickets),
            soldTickets: BigInt(event.soldTickets)
          })) as OrganizerEvent[]
          setAllEvents(events)
        }
      })
      .catch(error => {
        console.error('Error fetching organizer events:', error)
        setAllEvents([])
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [organizerAddress])

  // Group events by future/past
  const futureEvents = allEvents.filter(event => !event.isPast)
  const pastEvents = allEvents.filter(event => event.isPast)
  const totalEvents = allEvents.length

  // Update stats when events change
  useEffect(() => {
    if (onStatsUpdate) {
      const totalSold = allEvents.reduce((sum, event) => sum + Number(event.soldTickets), 0)
      const totalRevenue = allEvents.reduce((sum, event) => 
        sum + Number(event.soldTickets * event.ticketPrice) / 1e18, 0
      )
      
      onStatsUpdate({
        totalEvents,
        totalSold,
        totalRevenue
      })
    }
  }, [allEvents, totalEvents, onStatsUpdate])

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) * 1000)
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatPrice = (price: bigint) => {
    const priceInEth = Number(price) / 1e18
    return priceInEth > 0 ? `${priceInEth.toFixed(4)} ETH` : 'Gratuit'
  }

  const getEventStatus = (event: OrganizerEvent) => {
    if (event.isPast) return { label: 'Termine', color: 'bg-gray-100 text-gray-600' }
    if (event.isSoldOut) return { label: 'Complet', color: 'bg-red-100 text-red-600' }
    return { label: 'Actif', color: 'bg-green-100 text-green-600' }
  }

  const getEventsToShow = () => {
    switch (activeTab) {
      case 'future': return futureEvents
      case 'past': return pastEvents
      default: return allEvents
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Mes evenements</h2>
          <p className="text-gray-600 mt-1">
            {totalEvents} evenement{totalEvents > 1 ? 's' : ''} au total
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <TrendingUp className="w-4 h-4" />
          <span>Gestion des evenements</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
            activeTab === 'all'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Tous ({totalEvents})
        </button>
        <button
          onClick={() => setActiveTab('future')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
            activeTab === 'future'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          A venir ({futureEvents.length})
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
            activeTab === 'past'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Passes ({pastEvents.length})
        </button>
      </div>

      {/* Events List */}
      {getEventsToShow().length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {activeTab === 'future' ? 'Aucun evenement a venir' : 
             activeTab === 'past' ? 'Aucun evenement passe' : 
             'Aucun evenement cree'}
          </h3>
          <p className="text-gray-500">
            {activeTab === 'all' ? 'Creez votre premier evenement pour commencer !' : 
             'Vos evenements apparaitront ici.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {getEventsToShow().map((event) => {
            const status = getEventStatus(event)
            const progressPercentage = event.totalTickets > 0 
              ? (Number(event.soldTickets) / Number(event.totalTickets)) * 100 
              : 0

            return (
              <div key={event.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Evenement #{event.id}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${status.color}`}>
                        {status.label}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Ticket className="w-4 h-4 mr-2" />
                        <span className="text-sm">{formatPrice(event.ticketPrice)}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span className="text-sm">
                          {event.soldTickets.toString()} / {event.totalTickets.toString()} billets
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        {progressPercentage.toFixed(1)}% vendu
                      </div>
                      <div className="flex space-x-2">
                        <button className="flex items-center space-x-1 px-3 py-1 text-sm text-purple-600 hover:text-purple-800 transition">
                          <Eye className="w-4 h-4" />
                          <span>Voir</span>
                        </button>
                        {!event.isPast && (
                          <button className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-800 transition">
                            <TrendingUp className="w-4 h-4" />
                            <span>Gerer</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
