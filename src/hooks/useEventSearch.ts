'use client'

import { useState, useMemo } from 'react'
import { useEvents } from './useEvents'

export interface EventSearchFilters {
  searchTerm: string
  status: 'all' | 'available' | 'soldout' | 'past'
  priceRange: [number, number]
  dateRange: [Date | null, Date | null]
}

export function useEventSearch() {
  const { totalEvents, isLoadingTotal } = useEvents()
  const [filters, setFilters] = useState<EventSearchFilters>({
    searchTerm: '',
    status: 'all',
    priceRange: [0, 1000],
    dateRange: [null, null]
  })

  // Generate array of event IDs
  const eventIds = useMemo(() => 
    Array.from({ length: totalEvents }, (_, i) => i + 1),
    [totalEvents]
  )

  const updateFilters = (newFilters: Partial<EventSearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      status: 'all',
      priceRange: [0, 1000],
      dateRange: [null, null]
    })
  }

  return {
    totalEvents,
    isLoadingTotal,
    eventIds,
    filters,
    updateFilters,
    clearFilters
  }
}
