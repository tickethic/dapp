'use client'

import { useReadContract } from 'wagmi'
import { contractAddresses } from '@/config'

const ARTIST_ABI = [
  {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "ownerOf",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "getArtistInfo",
    "outputs": [
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "string", "name": "image", "type": "string"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const

export function useArtistValidation(artistId: number) {
  const { data: owner, error: ownerError } = useReadContract({
    address: contractAddresses.Artist as `0x${string}`,
    abi: ARTIST_ABI,
    functionName: 'ownerOf',
    args: [BigInt(artistId)],
  })

  // Temporarily disable getArtistInfo due to data corruption error
  // const { data: artistInfo, error: infoError } = useReadContract({
  //   address: contractAddresses.Artist as `0x${string}`,
  //   abi: ARTIST_ABI,
  //   functionName: 'getArtistInfo',
  //   args: [BigInt(artistId)],
  // })
  const artistInfo = null
  const infoError = null

  const isValid = owner && owner !== '0x0000000000000000000000000000000000000000'
  const hasError = ownerError || infoError

  console.log('=== ARTIST VALIDATION ===')
  console.log('Artist ID:', artistId)
  console.log('Owner:', owner)
  console.log('Artist Info:', artistInfo)
  console.log('Is Valid:', isValid)
  console.log('Has Error:', hasError)
  console.log('========================')

  return {
    isValid,
    owner,
    artistInfo,
    hasError,
    error: ownerError || infoError
  }
}
