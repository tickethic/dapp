'use client'

import { useReadContract } from 'wagmi'

const EVENT_ABI = [
  {
    "inputs": [],
    "name": "getArtistIds",
    "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getArtistShares",
    "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "organizer",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const

const ARTIST_ABI = [
  {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "ownerOf",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const

export interface EventValidationResult {
  isEventValid: boolean
  validationErrors: string[]
  artistIds: bigint[]
  artistShares: bigint[]
  organizer: `0x${string}` | undefined
  isLoading: boolean
}

export function useEventValidation(eventAddress: string): EventValidationResult {
  const { data: artistIdsRaw, isLoading: artistIdsLoading } = useReadContract({
    address: eventAddress as `0x${string}`,
    abi: EVENT_ABI,
    functionName: 'getArtistIds',
  })

  const { data: artistSharesRaw, isLoading: artistSharesLoading } = useReadContract({
    address: eventAddress as `0x${string}`,
    abi: EVENT_ABI,
    functionName: 'getArtistShares',
  })

  const { data: organizer, isLoading: organizerLoading } = useReadContract({
    address: eventAddress as `0x${string}`,
    abi: EVENT_ABI,
    functionName: 'organizer',
  })

  const isLoading = artistIdsLoading || artistSharesLoading || organizerLoading

  // Type guards pour vérifier que les données sont des arrays
  const artistIds = Array.isArray(artistIdsRaw) ? artistIdsRaw : []
  const artistShares = Array.isArray(artistSharesRaw) ? artistSharesRaw : []

  // Debug logs
  console.log('=== EVENT VALIDATION DEBUG ===')
  console.log('Event Address:', eventAddress)
  console.log('Artist IDs:', artistIds)
  console.log('Artist Shares:', artistShares)
  console.log('Organizer:', organizer)
  console.log('==============================')

  // Check if organizer address is valid (not zero address)
  const isOrganizerValid = organizer && 
    typeof organizer === 'string' && 
    organizer !== '0x0000000000000000000000000000000000000000'

  // Check if artists exist and have valid shares
  const hasValidArtists = artistIds.length > 0 && 
    artistShares.length > 0 && 
    artistIds.length === artistShares.length

  const validationErrors: string[] = []
  if (!isOrganizerValid) {
    validationErrors.push('Adresse organisateur invalide')
  }
  if (!hasValidArtists) {
    validationErrors.push('Aucun artiste configure ou parts invalides')
  }

  const isEventValid = isOrganizerValid && hasValidArtists && !isLoading

  return {
    isEventValid,
    validationErrors,
    artistIds,
    artistShares,
    organizer,
    isLoading
  }
}
