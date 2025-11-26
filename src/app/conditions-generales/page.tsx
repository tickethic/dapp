'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Shield, Users, AlertTriangle } from 'lucide-react'

export default function ConditionsGeneralesPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="w-full flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Conditions Générales d'Utilisation</h1>
            <p className="text-xl text-gray-600">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-purple-600" />
                  Article 1 - Objet et acceptation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Les présentes conditions générales d'utilisation (CGU) régissent l'utilisation de la plateforme 
                  <strong> Tickethic</strong>, une application décentralisée (dApp) permettant la gestion d'événements 
                  et de billets sous forme de NFT (Non-Fungible Tokens) sur la blockchain Ethereum.
                </p>
                <p className="text-gray-700">
                  L'utilisation de la plateforme Tickethic implique l'acceptation pleine et entière des présentes CGU. 
                  Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-purple-600" />
                  Article 2 - Définitions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <strong>Plateforme Tickethic :</strong> Application décentralisée permettant la création, 
                    la gestion et la vente de billets d'événements sous forme de NFT.
                  </div>
                  <div>
                    <strong>Utilisateur :</strong> Toute personne physique ou morale utilisant la plateforme.
                  </div>
                  <div>
                    <strong>Organisateur :</strong> Utilisateur créant et gérant des événements sur la plateforme.
                  </div>
                  <div>
                    <strong>Artiste :</strong> Utilisateur participant à des événements et recevant des revenus.
                  </div>
                  <div>
                    <strong>Smart Contract :</strong> Contrat intelligent déployé sur la blockchain Ethereum.
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Article 3 - Fonctionnalités de la plateforme</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Tickethic propose les fonctionnalités suivantes :
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Création et gestion d'événements par les organisateurs</li>
                  <li>Émission de billets sous forme de NFT</li>
                  <li>Répartition automatique et transparente des revenus entre artistes et organisateurs</li>
                  <li>Gestion des profils artistes et organisateurs</li>
                  <li>Interface de paiement intégrée via wallet Web3</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Article 4 - Utilisation de la plateforme</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">4.1 Conditions d'accès</h4>
                    <p className="text-gray-700">
                      L'utilisation de Tickethic nécessite la connexion d'un wallet Web3 compatible 
                      (MetaMask, WalletConnect, etc.) et l'acceptation des présentes CGU.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">4.2 Obligations de l'utilisateur</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Fournir des informations exactes et à jour</li>
                      <li>Respecter les lois et réglementations applicables</li>
                      <li>Ne pas utiliser la plateforme à des fins illégales ou frauduleuses</li>
                      <li>Maintenir la sécurité de son wallet et de ses clés privées</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Article 5 - Smart Contracts et blockchain</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Tickethic fonctionne sur la blockchain Ethereum via des smart contracts. 
                  Les utilisateurs reconnaissent que :
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Les transactions sont irréversibles une fois confirmées sur la blockchain</li>
                  <li>Les frais de gas (frais de transaction) sont à la charge de l'utilisateur</li>
                  <li>La plateforme ne peut être tenue responsable des dysfonctionnements de la blockchain</li>
                  <li>Les smart contracts sont open-source et auditable par tous</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Article 6 - Répartition des revenus</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  La répartition des revenus des billets est gérée automatiquement par les smart contracts :
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Les pourcentages sont définis lors de la création de l'événement</li>
                  <li>La distribution est automatique et transparente</li>
                  <li>Aucun intermédiaire ne prélève de commission</li>
                  <li>Les artistes reçoivent leurs revenus directement sur leur wallet</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
                  Article 7 - Limitation de responsabilité
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Tickethic est fourni "en l'état" sans garantie d'aucune sorte. La plateforme ne peut être tenue responsable de :
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>La perte de fonds due à une mauvaise utilisation du wallet</li>
                  <li>Les dysfonctionnements de la blockchain Ethereum</li>
                  <li>Les variations de prix des cryptomonnaies</li>
                  <li>Les annulations d'événements par les organisateurs</li>
                  <li>Les pertes dues à des attaques ou bugs des smart contracts</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Article 8 - Propriété intellectuelle</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Tickethic est un projet open-source sous licence GNU GPL v3. Les utilisateurs peuvent :
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Consulter, modifier et distribuer le code source</li>
                  <li>Contribuer au développement du projet</li>
                  <li>Utiliser le code dans leurs propres projets (sous réserve de la licence GPL)</li>
                </ul>
                <p className="text-gray-700">
                  Les NFT créés sur la plateforme appartiennent à leurs détenteurs légitimes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Article 9 - Modification des CGU</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Tickethic se réserve le droit de modifier les présentes CGU à tout moment. 
                  Les modifications seront notifiées aux utilisateurs et entreront en vigueur 
                  dès leur publication sur la plateforme.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Article 10 - Droit applicable et juridiction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Les présentes CGU sont régies par le droit français. En cas de litige, 
                  les tribunaux français seront seuls compétents.
                </p>
              </CardContent>
            </Card>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-800 mb-3">
                Contact et support
              </h3>
              <p className="text-purple-700 mb-4">
                Pour toute question concernant ces conditions générales ou l'utilisation de la plateforme :
              </p>
              <ul className="text-purple-700 space-y-2">
                <li>• Discord : <a href="https://discord.gg/Sp92nBqX" target="_blank" rel="noopener noreferrer" className="underline">https://discord.gg/Sp92nBqX</a></li>
                  <li>• GitHub : <a href="https://github.com/tickethic/tickethic" target="_blank" rel="noopener noreferrer" className="underline">https://github.com/tickethic/tickethic</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
