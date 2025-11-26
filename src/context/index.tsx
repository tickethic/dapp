'use client'

import { wagmiAdapter, projectId, networks } from '@/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import React, { type ReactNode } from 'react'
import { WagmiProvider, type Config } from 'wagmi'


// Set up queryClient
const queryClient = new QueryClient()

// Set up metadata
const metadata = {
  name: 'Tickethic',
  description: 'dApp allowing to manage tickets as NFTs. Open source project to share tickets revenue with artists in a faire and open way.',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://tickethic.ch', // Dynamic URL for dev/prod
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// Create the modal
export const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks,
  metadata,
  themeMode: 'light',
  features: {
    analytics: false // Disable analytics to avoid 401/403 errors
  },
  themeVariables: {
    '--w3m-accent': '#7c3aed', // Purple accent to match your design
    '--w3m-accent-fill': '#7c3aed',
    '--w3m-background': '#ffffff',
    '--w3m-background-border-radius': '12px',
    '--w3m-container-border-radius': '12px',
    '--w3m-wallet-icon-border-radius': '8px',
    '--w3m-wallet-icon-large-border-radius': '12px',
    '--w3m-input-border-radius': '8px',
    '--w3m-button-border-radius': '8px',
    '--w3m-secondary-button-border-radius': '8px',
    '--w3m-notification-border-radius': '8px',
    '--w3m-icon-border-radius': '6px',
    '--w3m-font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    '--w3m-font-size-master': '14px',
    '--w3m-z-index': '1000'
  }
})

function ContextProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider
