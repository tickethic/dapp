import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { polygonAmoy } from '@reown/appkit/networks'
import type { AppKitNetwork } from '@reown/appkit/networks'

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "" // this is a public projectId only to use on localhost
if (projectId === "") {
  throw new Error('Project ID is not defined')
}

export const networks = [polygonAmoy] as [AppKitNetwork, ...AppKitNetwork[]]

// Configuration pour Reown AppKit
export const appKitConfig = {
  projectId,
  networks,
  metadata: {
    name: 'Tickethic',
    description: 'Tickethic - Plateforme de tickets NFT',
    url: typeof window !== 'undefined' ? window.location.origin : 'https://tickethic.ch',
    icons: ['https://tickethic.ch/favicon.ico']
  }
}

// Set up the Wagmi Adapter (Config) — retirez `metadata` ici car il n'est pas supporté
export const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  projectId,
  networks,
  // metadata: appKitConfig.metadata // <-- A priori wagmi ne prend pas en charge de metadata?
})

export const config = wagmiAdapter.wagmiConfig

// Contract addresses with fallbacks
export const contractAddresses = {
  Artist: process.env.NEXT_PUBLIC_CONTRACT_ARTIST || "",
  Organizator: process.env.NEXT_PUBLIC_CONTRACT_ORGANIZATOR || "",
  Ticket: process.env.NEXT_PUBLIC_CONTRACT_TICKET || "",
  Event: process.env.NEXT_PUBLIC_CONTRACT_EVENT || "",
  EventManager: process.env.NEXT_PUBLIC_CONTRACT_EVENT_MANAGER || ""
} as const
