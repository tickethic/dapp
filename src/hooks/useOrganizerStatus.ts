import { useReadContract } from 'wagmi'
import { contractAddresses } from '@/config'

const ORGANIZATOR_ABI = [
  {
    "inputs": [{"internalType": "address", "name": "", "type": "address"}],
    "name": "isOrganizator",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const

export function useOrganizerStatus(address?: string) {
  const { data: isOrganizer, isLoading, error } = useReadContract({
    address: contractAddresses.Organizator as `0x${string}`,
    abi: ORGANIZATOR_ABI,
    functionName: 'isOrganizator',
    args: address ? [address as `0x${string}`] : undefined,
    query: {
      enabled: !!address,
    },
  })

  return {
    isOrganizer: isOrganizer || false,
    isLoading,
    error,
  }
}
