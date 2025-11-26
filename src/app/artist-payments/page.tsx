'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { DollarSign, Users, Clock, Shield, TrendingUp } from 'lucide-react'

export default function ArtistPaymentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="w-full flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Gestion des Paiements</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comment les artistes reçoivent leurs paiements de manière transparente et automatique
            </p>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                Paiements Automatiques
              </CardTitle>
              <CardDescription>
                Vos revenus sont transférés instantanément
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-sm">1</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Achat de billet</h4>
                  <p className="text-sm text-gray-600">
                    Un spectateur achète un billet pour votre événement
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-sm">2</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Calcul automatique</h4>
                  <p className="text-sm text-gray-600">
                    Le smart contract calcule votre part selon le pourcentage défini
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-sm">3</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Transfert immédiat</h4>
                  <p className="text-sm text-gray-600">
                    Les ETH sont automatiquement envoyés à votre wallet
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-600" />
                Sécurité et Transparence
              </CardTitle>
              <CardDescription>
                Vos paiements sont protégés par la blockchain
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Shield className="h-5 w-5 text-blue-600" />
                <div>
                  <h4 className="font-semibold">Smart Contracts</h4>
                  <p className="text-sm text-gray-600">
                    Code immuable sur la blockchain Ethereum
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <div>
                  <h4 className="font-semibold">Traçabilité</h4>
                  <p className="text-sm text-gray-600">
                    Tous les paiements sont visibles sur la blockchain
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                <Clock className="h-5 w-5 text-purple-600" />
                <div>
                  <h4 className="font-semibold">Instantané</h4>
                  <p className="text-sm text-gray-600">
                    Pas d'attente, paiement immédiat
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Exemple de Répartition</CardTitle>
              <CardDescription>
                Comment vos revenus sont calculés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Événement: Votre Concert</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Prix du billet:</span>
                      <span className="font-medium">0.1 ETH</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Votre pourcentage:</span>
                      <span className="font-medium">60%</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span>Votre revenu par billet:</span>
                      <span className="font-medium text-green-600">0.06 ETH</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-green-800">100 billets vendus</h4>
                  <div className="text-2xl font-bold text-green-600">
                    6.0 ETH
                  </div>
                  <p className="text-sm text-green-700">
                    Revenus totaux automatiquement transférés
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Avantages pour les Artistes</CardTitle>
              <CardDescription>
                Pourquoi choisir Tickethic
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Paiements directs</h4>
                    <p className="text-sm text-gray-600">
                      Pas d'intermédiaire, vous recevez directement vos revenus
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Transparence totale</h4>
                    <p className="text-sm text-gray-600">
                      Vous savez exactement combien vous recevez et quand
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Pas de frais cachés</h4>
                    <p className="text-sm text-gray-600">
                      Seuls les frais de gas Ethereum s'appliquent
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Contrôle total</h4>
                    <p className="text-sm text-gray-600">
                      Vous négociez directement vos pourcentages avec l'organisateur
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Comment commencer</CardTitle>
            <CardDescription>
              Étapes pour recevoir vos premiers paiements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">1. Créer votre profil</h3>
                <p className="text-sm text-gray-600">
                  Enregistrez-vous comme artiste sur la plateforme
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">2. Négocier vos tarifs</h3>
                <p className="text-sm text-gray-600">
                  Définissez vos pourcentages avec les organisateurs
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">3. Recevoir vos paiements</h3>
                <p className="text-sm text-gray-600">
                  Les revenus arrivent automatiquement dans votre wallet
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
