'use client'

import { useEventSearch } from '@/hooks/useEventSearch'
import { EventCard } from '@/components/EventCard'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Calendar, Filter, Search, X } from 'lucide-react'

export default function EventsPage() {
  const { 
    totalEvents, 
    isLoadingTotal, 
    eventIds, 
    filters, 
    updateFilters, 
    clearFilters 
  } = useEventSearch()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Filters and Search */}
      <div className="w-full flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-0">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Rechercher un evenement..."
                    value={filters.searchTerm}
                    onChange={(e) => updateFilters({ searchTerm: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filters.status}
                  onChange={(e) => updateFilters({ status: e.target.value as 'all' | 'available' | 'soldout' | 'past' })}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">Tous les evenements</option>
                  <option value="available">Disponibles</option>
                  <option value="soldout">Complets</option>
                  <option value="past">Termines</option>
                </select>
              </div>

              {/* Clear Filters */}
              {(filters.searchTerm || filters.status !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition"
                >
                  <X className="w-4 h-4" />
                  <span>Effacer</span>
                </button>
              )}
            </div>
          </div>

          {/* Events Count */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <span className="text-lg font-semibold text-gray-800">
                {isLoadingTotal ? 'Chargement...' : `${totalEvents} evenement${totalEvents > 1 ? 's' : ''} trouve${totalEvents > 1 ? 's' : ''}`}
              </span>
            </div>
          </div>

          {/* Events Grid */}
          {isLoadingTotal ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                    <div className="h-8 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : totalEvents === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Aucun evenement trouve
              </h3>
              <p className="text-gray-500">
                Il ny a pas encore d evenements disponibles. Revenez plus tard !
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventIds.map((eventId) => (
                <EventCard key={eventId} eventId={eventId} />
              ))}
            </div>
          )}

          {/* Load More Button (for future pagination) */}
          {totalEvents > 0 && (
            <div className="text-center mt-12">
              <button className="bg-purple-600 text-white px-8 py-3 rounded-md hover:bg-purple-700 transition">
                Charger plus d evenements
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
