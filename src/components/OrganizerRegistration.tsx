'use client'

import { useState } from 'react'
import { useWallet } from '@/hooks/useWallet'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { contractAddresses } from '@/config'
import { CheckCircle, UserPlus, AlertCircle } from 'lucide-react'

// Organizator contract ABI
const ORGANIZATOR_ABI = [
  {
    "inputs": [{"internalType": "address", "name": "organizator", "type": "address"}],
    "name": "addOrganizator",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "organizator", "type": "address"}],
    "name": "isOrganizator",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const

export function OrganizerRegistration() {
  const { address } = useWallet()
  const [isRegistered, setIsRegistered] = useState(false)
  
  const { writeContract, data: hash, error, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const handleRegister = async () => {
    if (!address) return
    
    try {
      // Note: This will fail if the user is not the owner of the Organizator contract
      // In a real deployment, the contract owner would need to register organizers
      writeContract({
        address: contractAddresses.Organizator,
        abi: ORGANIZATOR_ABI,
        functionName: 'addOrganizator',
        args: [address],
      })
    } catch (err) {
      console.error('Registration error:', err)
    }
  }

  if (isConfirmed) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Enregistrement réussi !</h2>
          <p className="text-gray-600 mb-6">
            Vous êtes maintenant enregistré comme organisateur. Vous pouvez créer des événements.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Continuer
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserPlus className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Enregistrement Organisateur
        </h2>
        <p className="text-gray-600">
          Vous devez &lsquo;abord vous enregistrer comme organisateur pour créer des événements.
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              ⚠️ Problème &lsquo;enregistrement
            </h3>
            <p className="text-yellow-700 text-sm mb-2">
              Pour créer des événements, vous devez être enregistré comme organisateur dans le contrat blockchain.
            </p>
            <p className="text-yellow-700 text-sm">
              <strong>Solution :</strong> Contactez &lsquo;administrateur du contrat pour vous enregistrer, ou utilisez le wallet du déployeur du contrat.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Pourquoi &lsquo;enregistrer ?
            </h3>
            <ul className="text-blue-700 space-y-1 text-sm">
              <li>• Permet de créer et gérer des événements</li>
              <li>• Accès aux fonctionnalités &lsquo;organisation</li>
              <li>• Suivi des statistiques de vos événements</li>
              <li>• Gestion des revenus et paiements</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="text-sm text-gray-600">
          <p className="font-medium mb-2">Adresse de votre wallet :</p>
          <p className="font-mono text-xs break-all bg-white p-2 rounded border">
            {address}
          </p>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
          <p className="text-red-800 text-sm">
            Erreur: {error.message}
          </p>
        </div>
      )}

      <button
        onClick={handleRegister}
        disabled={isPending || isConfirming}
        className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isPending ? 'Enregistrement en cours...' : 
         isConfirming ? 'Confirmation...' : 
         'S\'enregistrer comme organisateur'}
      </button>

      {hash && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-sm mb-2">
            ✅ Transaction envoyée ! En attente de confirmation...
          </p>
          <p className="text-xs font-mono text-green-600 break-all">
            Hash: {hash}
          </p>
        </div>
      )}
    </div>
  )
}
