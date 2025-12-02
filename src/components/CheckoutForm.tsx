'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWallet } from '@/hooks/useWallet'
import { useBuyTicket } from '@/hooks/useBuyTicket'
import { useEventStatus } from '@/hooks/useEventStatus'
import { CreditCard, CheckCircle, Shield, AlertCircle } from 'lucide-react'

interface CheckoutFormProps {
  eventId: number
  eventAddress: string
  ticketPrice: bigint
  eventName: string
}

export function CheckoutForm({ eventId, eventAddress, ticketPrice, eventName }: CheckoutFormProps) {
  const router = useRouter()
  const { address, isConnected } = useWallet()
  const { buyTicket, isLoading, isConfirmed, error, hash, ticketId } = useBuyTicket()
  const { 
    date, 
    ticketPrice: contractTicketPrice, 
    totalTickets, 
    soldTickets, 
    organizer,
    isLoading: isLoadingStatus, 
    hasError: hasContractError,
    isEventValid, 
    validationError 
  } = useEventStatus(eventAddress)

  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [quantity, setQuantity] = useState(1)

  // Calculate total price
  const totalPrice = contractTicketPrice ? contractTicketPrice * BigInt(quantity) : 0n
  const totalPriceETH = contractTicketPrice ? (Number(contractTicketPrice) / 1e18) * quantity : 0
  const remainingTickets = totalTickets && soldTickets ? Number(totalTickets) - Number(soldTickets) : 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isConnected || !address) {
      alert('Veuillez connecter votre wallet pour continuer')
      return
    }

    if (!agreedToTerms) {
      alert('Veuillez accepter les conditions generales')
      return
    }

    if (quantity > remainingTickets) {
      alert(`Pas assez de billets disponibles. Il reste ${remainingTickets} billet${remainingTickets > 1 ? 's' : ''}.`)
      return
    }

    // Check if event is valid
    if (!isEventValid) {
      console.error('Event validation failed:', validationError)
      alert(`Erreur de validation de leventement : ${validationError}`)
      return
    }

    // Debug: Log the values being sent
    console.log('=== DEBUG ACHAT BILLET ===')
    console.log('Event Address:', eventAddress)
    console.log('Quantity:', quantity)
    console.log('Ticket Price from props (wei):', ticketPrice.toString())
    console.log('Ticket Price from props (ETH):', (Number(ticketPrice) / 1e18).toString())
    console.log('Contract Ticket Price (wei):', contractTicketPrice?.toString() || 'Loading...')
    console.log('Contract Ticket Price (ETH):', contractTicketPrice ? (Number(contractTicketPrice) / 1e18).toString() : 'Loading...')
    console.log('Total Price (wei):', totalPrice.toString())
    console.log('Total Price (ETH):', totalPriceETH.toString())
    console.log('User Address:', address)
    console.log('Event Valid:', isEventValid)
    console.log('Validation Error:', validationError)
    console.log('Sold Tickets:', soldTickets?.toString() || 'Loading...')
    console.log('Total Tickets:', totalTickets?.toString() || 'Loading...')
    console.log('Remaining Tickets:', remainingTickets)
    console.log('Event Date:', date ? new Date(Number(date) * 1000).toISOString() : 'Loading...')
    console.log('Current Time:', new Date().toISOString())
    console.log('Organizer:', organizer || 'Loading...')
    console.log('Has Contract Error:', hasContractError)
    console.log('========================')

    // Use total price for the selected quantity
    const finalTicketPrice = totalPrice
    
    console.log('Using total price (wei):', finalTicketPrice.toString())
    console.log('Using total price (ETH):', totalPriceETH.toString())

    try {
      await buyTicket({
        eventAddress,
        ticketPrice: finalTicketPrice,
        quantity: quantity,
        buyerInfo: {
          walletAddress: address
        }
      })
    } catch (error) {
      console.error('Error buying ticket:', error)
    }
  }

  // Success state
  if (isConfirmed) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Billet achete !</h2>
        <p className="text-gray-600 mb-6">
          Votre billet pour <strong>{eventName}</strong> a ete achete avec succes.
        </p>
        
        {ticketId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm font-medium text-gray-700 mb-1">ID du billet :</p>
            <p className="text-lg font-mono text-gray-800">#{ticketId.toString()}</p>
          </div>
        )}

        {hash && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm font-medium text-gray-700 mb-1">Transaction :</p>
            <p className="text-xs font-mono text-gray-600 break-all">{hash}</p>
            <button
              onClick={() => navigator.clipboard.writeText(hash)}
              className="mt-2 text-xs text-purple-600 hover:text-purple-800 underline"
            >
              📋 Copier hash
            </button>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => router.push('/events')}
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition font-semibold"
          >
            Retour aux evenements
          </button>
          <button
            onClick={() => router.push('/profile')}
            className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition font-semibold"
          >
            Voir mes billets
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Confirmer achat</h2>
      
      {/* Quantity Selection */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-medium text-gray-700">Nombre de billets</label>
          <span className="text-sm text-gray-500">
            {remainingTickets} billets disponibles
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center justify-center"
          >
            -
          </button>
          
          <span className="text-lg font-semibold min-w-[2rem] text-center">{quantity}</span>
          
          <button
            type="button"
            onClick={() => setQuantity(Math.min(remainingTickets, quantity + 1))}
            disabled={quantity >= remainingTickets}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center justify-center"
          >
            +
          </button>
        </div>
        
        <div className="mt-3 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Prix unitaire :</span>
            <span>{contractTicketPrice ? (Number(contractTicketPrice) / 1e18).toFixed(4) : '0.0000'} ETH</span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Total :</span>
            <span className="text-purple-600">{totalPriceETH.toFixed(4)} ETH</span>
          </div>
        </div>
      </div>
      
      {/* Wallet Info */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center mb-2">
          <Shield className="w-5 h-5 text-purple-600 mr-2" />
          <span className="font-medium text-gray-800">Wallet connecte</span>
        </div>
        <p className="text-sm text-gray-600 font-mono">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </p>
      </div>

      {/* Event Status Debug */}
      {isLoadingStatus ? (
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
            <span className="text-blue-800 text-sm">Verification de leventement...</span>
          </div>
        </div>
      ) : hasContractError ? (
        <div className="bg-red-50 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-2">
            <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
            <span className="font-medium text-red-800">Erreur de lecture du contrat</span>
          </div>
          <p className="text-red-700 text-sm">
            Impossible de lire les donnees de leventement. Verifiez que ladresse du contrat est correcte.
          </p>
          <p className="text-red-600 text-xs mt-2 font-mono">
            Adresse: {eventAddress}
          </p>
        </div>
      ) : !isEventValid ? (
        <div className="bg-red-50 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-2">
            <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
            <span className="font-medium text-red-800">Evenement non disponible</span>
          </div>
          <p className="text-red-700 text-sm">{validationError}</p>
        </div>
      ) : (
        <div className="bg-green-50 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-2">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-medium text-green-800">Evenement disponible</span>
          </div>
          <div className="text-sm text-green-700 space-y-1">
            <p>Prix: {contractTicketPrice ? (Number(contractTicketPrice) / 1e18).toFixed(4) : '...'} ETH</p>
            <p>Billets: {soldTickets?.toString() || '...'} / {totalTickets?.toString() || '...'}</p>
            <p>Date: {date ? new Date(Number(date) * 1000).toLocaleString('fr-FR') : '...'}</p>
            <p>Organisateur: {organizer ? `${organizer.slice(0, 6)}...${organizer.slice(-4)}` : '...'}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Terms and Conditions */}
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="terms"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            J&lsquo;accepte les{' '}
            <a 
              href="/conditions-generales" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800 underline"
            >
              conditions generales
            </a>{' '}
            et la{' '}
            <a 
              href="/politique-confidentialite" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800 underline"
            >
              politique de confidentialite
            </a>
          </label>
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm font-medium mb-2">
              Erreur lors de lachat
            </p>
            <p className="text-red-700 text-sm">
              {error.message || 'Une erreur inattendue s est produite. Veuillez reessayer.'}
            </p>
            <div className="mt-2 text-xs text-red-600">
              <p>Verifiez que :</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Votre wallet a suffisamment d ETH</li>
                <li>Levenement nest pas complet</li>
                <li>Levenement na pas encore eu lieu</li>
                <li>Le montant envoye correspond au prix du billet</li>
              </ul>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !agreedToTerms || !isEventValid || isLoadingStatus}
          className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Achat en cours...
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4 mr-2" />
              Acheter {quantity} billet{quantity > 1 ? 's' : ''} ({totalPriceETH.toFixed(4)} ETH)
            </>
          )}
        </button>
      </form>
    </div>
  )
}
