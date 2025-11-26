'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { DollarSign, Users, Percent, Shield } from 'lucide-react'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="w-full flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Tarifs et Répartition</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez comment les revenus des billets sont répartis de manière transparente et équitable
            </p>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                Répartition des Revenus
              </CardTitle>
              <CardDescription>
                Comment les paiements sont automatiquement distribués
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-green-600" />
                  <span className="font-medium">Artistes</span>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Variable
                </Badge>
              </div>
              <p className="text-sm text-gray-600 ml-6">
                Les artistes reçoivent un pourcentage défini lors de la création de l'événement. 
                Ce pourcentage est négocié entre l'organisateur et les artistes.
              </p>

              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-blue-600" />
                  <span className="font-medium">Organisateur</span>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Reste
                </Badge>
              </div>
              <p className="text-sm text-gray-600 ml-6">
                L'organisateur reçoit le montant restant après distribution aux artistes. 
                Il couvre les frais d'organisation, de location, etc.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Percent className="h-5 w-5 mr-2 text-purple-600" />
                Exemple de Répartition
              </CardTitle>
              <CardDescription>
                Cas concret avec un événement à 0.1 ETH
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Événement: Concert Électronique</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Prix du billet:</span>
                    <span className="font-medium">0.1 ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Artiste principal (60%):</span>
                    <span className="font-medium text-green-600">0.06 ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DJ support (20%):</span>
                    <span className="font-medium text-green-600">0.02 ETH</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Organisateur (20%):</span>
                    <span className="font-medium text-blue-600">0.02 ETH</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Transparence Totale</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Tous les pourcentages sont définis lors de la création de l'événement 
                et sont visibles par tous les participants.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Paiements Automatiques</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Les paiements sont automatiquement distribués dès l'achat d'un billet, 
                sans intermédiaire ni frais cachés.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Smart Contracts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                La répartition est gérée par des smart contracts sur la blockchain, 
                garantissant l'exécution automatique et sécurisée.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Comment ça fonctionne techniquement</CardTitle>
            <CardDescription>
              Détails techniques de la répartition des revenus
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">1. Création de l'événement</h4>
                <p className="text-sm text-gray-600">
                  L'organisateur définit les pourcentages de répartition pour chaque artiste. 
                  La somme des pourcentages artistes ne peut pas dépasser 100%.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">2. Achat d'un billet</h4>
                <p className="text-sm text-gray-600">
                  Quand un utilisateur achète un billet, le smart contract calcule automatiquement 
                  les montants à envoyer à chaque artiste et à l'organisateur.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">3. Distribution automatique</h4>
                <p className="text-sm text-gray-600">
                  Les ETH sont immédiatement transférés aux adresses des artistes et de l'organisateur 
                  selon les pourcentages définis.
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
