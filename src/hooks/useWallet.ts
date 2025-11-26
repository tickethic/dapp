'use client'

import { useAccount, useDisconnect } from 'wagmi'
import { modal } from '@/context'

export function useWallet() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const connect = () => {
    modal.open()
  }

  const handleDisconnect = () => {
    disconnect()
  }

  // Format address to show only first 6 and last 4 characters
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return {
    address,
    isConnected,
    connect,
    disconnect: handleDisconnect,
    formatAddress
  }
}
