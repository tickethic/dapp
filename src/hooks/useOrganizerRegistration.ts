import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { contractAddresses } from '@/config'

const ORGANIZATOR_ABI = [
  {
    "inputs": [],
    "name": "registerAsOrganizer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "", "type": "address"}],
    "name": "isOrganizator",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const

export function useOrganizerRegistration() {
  const { writeContract, data: hash, error, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const registerAsOrganizer = () => {
    writeContract({
      address: contractAddresses.Organizator as `0x${string}`,
      abi: ORGANIZATOR_ABI,
      functionName: 'registerAsOrganizer',
      args: [],
    })
  }

  return {
    registerAsOrganizer,
    hash,
    error,
    isPending,
    isConfirming,
    isConfirmed,
    isLoading: isPending || isConfirming,
  }
}
