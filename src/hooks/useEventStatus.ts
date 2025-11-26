'use client'

import { useReadContract } from 'wagmi'
import { contractAddresses } from '@/config'

const EVENT_ABI = [
  {
    "inputs": [],
    "name": "date",
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "ticketPrice",
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalTickets",
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "soldTickets",
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "organizer",
    "outputs": [
      {"internalType": "address", "name": "", "type": "address"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const

export function useEventStatus(eventAddress: string) {
  const { data: date, isLoading: isLoadingDate, error: dateError } = useReadContract({
    address: eventAddress as `0x${string}`,
    abi: EVENT_ABI,
    functionName: 'date',
    query: {
      enabled: !!eventAddress
    }
  })

  const { data: ticketPrice, isLoading: isLoadingPrice, error: priceError } = useReadContract({
    address: eventAddress as `0x${string}`,
    abi: EVENT_ABI,
    functionName: 'ticketPrice',
    query: {
      enabled: !!eventAddress
    }
  })

  const { data: totalTickets, isLoading: isLoadingTotal, error: totalError } = useReadContract({
    address: eventAddress as `0x${string}`,
    abi: EVENT_ABI,
    functionName: 'totalTickets',
    query: {
      enabled: !!eventAddress
    }
  })

  const { data: soldTickets, isLoading: isLoadingSold, error: soldError } = useReadContract({
    address: eventAddress as `0x${string}`,
    abi: EVENT_ABI,
    functionName: 'soldTickets',
    query: {
      enabled: !!eventAddress
    }
  })

  const { data: organizer, isLoading: isLoadingOrganizer, error: organizerError } = useReadContract({
    address: eventAddress as `0x${string}`,
    abi: EVENT_ABI,
    functionName: 'organizer',
    query: {
      enabled: !!eventAddress
    }
  })

  const isLoading = isLoadingDate || isLoadingPrice || isLoadingTotal || isLoadingSold || isLoadingOrganizer
  const hasError = dateError || priceError || totalError || soldError || organizerError

  // Check if event is valid for purchase
  const isEventValid = () => {
    if (!date || !totalTickets || soldTickets === undefined) return false
    
    const eventDate = new Date(Number(date) * 1000)
    const now = new Date()
    const isNotPast = eventDate > now
    const isNotSoldOut = Number(soldTickets) < Number(totalTickets)
    
    return isNotPast && isNotSoldOut
  }

  const getValidationError = () => {
    if (!date || !totalTickets || soldTickets === undefined) return 'Chargement des données...'
    
    const eventDate = new Date(Number(date) * 1000)
    const now = new Date()
    
    if (eventDate <= now) return 'Cet événement a déjà eu lieu'
    if (Number(soldTickets) >= Number(totalTickets)) return 'Cet événement est complet'
    
    return null
  }

  return {
    date,
    ticketPrice,
    totalTickets,
    soldTickets,
    organizer,
    isLoading,
    hasError,
    isEventValid: isEventValid(),
    validationError: getValidationError()
  }
}
