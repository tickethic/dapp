'use client'

import { useEvents } from '@/hooks/useEvents'
import { useState, useEffect } from 'react'
import { useMemo } from 'react'

export interface EventInfo {
  id: number
  name?: string
  date?: bigint | number
  location?: string
  ticketPrice?: bigint | number
  totalTickets?: bigint | number
  soldTickets?: bigint | number
  eventAddress?: string
}

export function useEventSearch() {
  const { events, loading, totalEvents } = useEvents()
  
  const [searchTerm, setSearchTerm] = useState('')

  // Filtrage mémorisé pour éviter les re-rendus inutiles
  const filteredEvents = useMemo(() => {
    if (loading || !events || events.length === 0) {
      return []
    }

    if (!searchTerm.trim()) {
      return events
    }

    return events.filter(event => {
      const term = searchTerm.toLowerCase().trim()
      
      // Recherche dans le nom
      if (event.name && event.name.toLowerCase().includes(term)) {
        return true
      }
      
      // Recherche dans la localisation
      if (event.location && event.location.toLowerCase().includes(term)) {
        return true
      }
      
      // Recherche dans la date (format flexible)
      if (event.date) {
        const dateStr = new Date(Number(event.date) * 1000).toLocaleDateString('fr-FR')
        if (dateStr.toLowerCase().includes(term)) {
          return true
        }
      }
      
      return false
    })
  }, [events, searchTerm, loading])

  return {
    searchTerm,
    setSearchTerm,
    filteredEvents,
    totalFilteredEvents: filteredEvents.length,
    isLoading: loading,
    totalEvents,
    hasResults: filteredEvents.length > 0,
    noResults: !loading && filteredEvents.length === 0 && searchTerm.trim() !== ''
  }
}
