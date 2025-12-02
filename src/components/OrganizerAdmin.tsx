'use client'

import { useState } from 'react'
import { useWallet } from '@/hooks/useWallet'
import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { contractAddresses } from '@/config'
import { CheckCircle, UserPlus, AlertCircle, Users } from 'lucide-react'

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
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const

export function OrganizerAdmin() {
  const { address } = useWallet()
  const [newOrganizerAddress, setNewOrganizerAddress] = useState('')
  
  const { writeContract, data: hash, error, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  // Check if current user is the owner
  const { data: owner } = useReadContract({
    address: contractAddresses.Organizator,
    abi: ORGANIZATOR_ABI,
    functionName: 'owner',
  })

  // Check if current user is organizer
  const { data: isCurrentUserOrganizer } = useReadContract({
    address: contractAddresses.Organizator,
    abi: ORGANIZATOR_ABI,
    functionName: 'isOrganizator',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  })

  const isOwner = owner && address && owner.toLowerCase() === address.toLowerCase()

  const handleAddOrganizer = async () => {
    if (!newOrganizerAddress || !isOwner) return
    
    try {
      writeContract({
        address: contractAddresses.Organizator,
        abi: ORGANIZATOR_ABI,
        functionName: 'addOrganizator',
        args: [newOrganizerAddress as `0x${string}`],
      })
    } catch (err) {
      console.error('Add organizer error:', err)
    }
  }

  const handleSelfRegister = async () => {
    if (!address || !isOwner) return
    
    try {
      writeContract({
        address: contractAddresses.Organizator,
        abi: ORGANIZATOR_ABI,
        functionName: 'addOrganizator',
        args: [address],
      })
    } catch (err) {
      console.error('Self registration error:', err)
    }
  }

  if (isConfirmed) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Organisateur ajouté !</h2>
          <p className="text-gray-600 mb-6">
            L&lsquo;organisateur a été enregistré avec succès.
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
          <Users className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Administration des Organisateurs
        </h2>
        <p className="text-gray-600">
          Gestion des organisateurs enregistrés
        </p>
      </div>

      {/* Status Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-2">Propriétaire du contrat</h3>
          <p className="text-sm font-mono text-gray-600 break-all">
            {owner ? `${owner.slice(0, 6)}...${owner.slice(-4)}` : 'Chargement...'}
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-2">Votre statut</h3>
          <div className="flex items-center space-x-2">
            {isCurrentUserOrganizer ? (
              <span className="text-green-600 text-sm">✅ Organisateur enregistré</span>
            ) : (
              <span className="text-red-600 text-sm">❌ Non enregistré</span>
            )}
            {isOwner && <span className="text-blue-600 text-sm">👑 Propriétaire</span>}
          </div>
        </div>
      </div>

      {/* Self Registration for Owner */}
      {isOwner && !isCurrentUserOrganizer && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Vous êtes le propriétaire du contrat
              </h3>
              <p className="text-blue-700 text-sm mb-4">
                Vous pouvez vous enregistrer comme organisateur.
              </p>
              <button
                onClick={handleSelfRegister}
                disabled={isPending || isConfirming}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm disabled:bg-gray-400"
              >
                {isPending ? 'Enregistrement...' : 
                 isConfirming ? 'Confirmation...' : 
                 'M\'enregistrer comme organisateur'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Organizer (Owner only) */}
      {isOwner && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Ajouter un organisateur</h3>
          
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="0x..."
              value={newOrganizerAddress}
              onChange={(e) => setNewOrganizerAddress(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              onClick={handleAddOrganizer}
              disabled={isPending || isConfirming || !newOrganizerAddress}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition disabled:bg-gray-400"
            >
              Ajouter
            </button>
          </div>
        </div>
      )}

      {/* Not Owner Message */}
      {!isOwner && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                Accès limité
              </h3>
              <p className="text-yellow-700 text-sm">
                Seul le propriétaire du contrat peut ajouter de nouveaux organisateurs.
                Contactez &lsquo;administrateur pour vous enregistrer.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg mt-6">
          <p className="text-red-800 text-sm">
            Erreur: {error.message}
          </p>
        </div>
      )}

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