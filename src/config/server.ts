// Server-side contract addresses (for API routes) with fallbacks
import './envConfig'

// These use environment variables without NEXT_PUBLIC_ prefix
export const serverContractAddresses = {
  Artist: process.env.ARTIST_CONTRACT,
  Organizator: process.env.ORGANIZATOR_CONTRACT,
  Ticket: process.env.TICKET_CONTRACT,
  Event: process.env.EVENT_CONTRACT,
  EventManager: process.env.EVENT_MANAGER_CONTRACT
} as const
