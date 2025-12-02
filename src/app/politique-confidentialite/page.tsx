'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Eye, Database, Lock, UserCheck, AlertCircle } from 'lucide-react'

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="w-full flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Politique de Confidentialité</h1>
            <p className="text-xl text-gray-600">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-blue-600" />
                  Article 1 - Introduction
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Cette politique de confidentialité décrit comment <strong>Tickethic</strong> collecte, 
                  utilise et protège vos informations personnelles dans le cadre de &lsquo;utilisation de notre 
                  plateforme décentralisée de gestion &lsquo;événements.
                </p>
                <p className="text-gray-700">
                  En tant qu&lsquo;application décentralisée (dApp), Tickethic &lsquo;engage à respecter votre vie privée 
                  tout en exploitant les avantages de la technologie blockchain pour garantir transparence et sécurité.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2 text-blue-600" />
                  Article 2 - Informations collectées
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">2.1 Informations de wallet</h4>
                    <p className="text-gray-700">
                      Nous collectons uniquement &lsquo;adresse de votre wallet Ethereum, nécessaire pour :
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                      <li>Identifier votre profil sur la plateforme</li>
                      <li>Exécuter les transactions blockchain</li>
                      <li>Distribuer les revenus aux artistes</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">2.2 Informations &lsquo;événement</h4>
                    <p className="text-gray-700">
                      Les données &lsquo;événements créés sur la plateforme (nom, description, dates, prix) 
                      sont stockées de manière décentralisée et transparente.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">2.3 Données de profil artiste</h4>
                    <p className="text-gray-700">
                      Les informations de profil artiste (nom, description, image) sont stockées 
                      sous forme de NFT sur la blockchain.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-blue-600" />
                  Article 3 - Utilisation des données
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Vos données sont utilisées exclusivement pour :
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Fournir les services de la plateforme Tickethic</li>
                  <li>Exécuter les smart contracts et transactions blockchain</li>
                  <li>Distribuer automatiquement les revenus aux artistes</li>
                  <li>Maintenir la transparence des événements et transactions</li>
                  <li>Améliorer &lsquo;expérience utilisateur de la plateforme</li>
                </ul>
                <p className="text-gray-700">
                  <strong>Nous ne vendons, ne louons, ni ne partageons vos données personnelles avec des tiers.</strong>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Article 4 - Stockage et sécurité</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">4.1 Blockchain et décentralisation</h4>
                    <p className="text-gray-700">
                      Les données critiques sont stockées sur la blockchain Ethereum, garantissant :
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                      <li>Immutabilité et transparence des transactions</li>
                      <li>Absence de point de défaillance unique</li>
                      <li>Résistance à la censure</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">4.2 Sécurité des wallets</h4>
                    <p className="text-gray-700">
                      Tickethic ne stocke jamais vos clés privées. La sécurité de votre wallet 
                      dépend entièrement de votre gestion des clés privées.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserCheck className="h-5 w-5 mr-2 text-blue-600" />
                  Article 5 - Vos droits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Conformément au RGPD, vous disposez des droits suivants :
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>Droit &lsquo;accès :</strong> Consulter vos données stockées sur la blockchain</li>
                  <li><strong>Droit de rectification :</strong> Modifier vos informations de profil</li>
                  <li><strong>Droit à &lsquo;effacement :</strong> Supprimer votre profil (sous réserve des contraintes blockchain)</li>
                  <li><strong>Droit à la portabilité :</strong> Exporter vos données NFT</li>
                  <li><strong>Droit &lsquo;opposition :</strong> Cesser &lsquo;utiliser la plateforme</li>
                </ul>
                <p className="text-gray-700">
                  <strong>Note :</strong> Certaines données blockchain ne peuvent être modifiées ou supprimées 
                  en raison de la nature immuable de la blockchain.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Article 6 - Cookies et technologies de suivi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Tickethic utilise des cookies techniques essentiels pour :
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Maintenir votre session de connexion wallet</li>
                  <li>Améliorer les performances de &lsquo;interface</li>
                  <li>Mémoriser vos préférences &lsquo;affichage</li>
                </ul>
                <p className="text-gray-700">
                  Nous &lsquo;utilisons pas de cookies de tracking publicitaire ou de profilage.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Article 7 - Partage avec des tiers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Tickethic ne partage vos données qu&lsquo;avec :
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>Réseau Ethereum :</strong> Pour &lsquo;exécution des smart contracts</li>
                  <li><strong>Fournisseurs de wallets :</strong> Pour la connexion (MetaMask, WalletConnect, etc.)</li>
                  <li><strong>Services &lsquo;infrastructure :</strong> Pour &lsquo;hébergement de &lsquo;interface (sans accès aux données blockchain)</li>
                </ul>
                <p className="text-gray-700">
                  Aucun partage commercial ou publicitaire &lsquo;est effectué.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-orange-600" />
                  Article 8 - Risques et limitations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  L&lsquo;utilisation de Tickethic implique des risques liés à la technologie blockchain :
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Les transactions blockchain sont publiques et traçables</li>
                  <li>Les adresses de wallet peuvent être associées à votre identité</li>
                  <li>Les smart contracts sont immutables une fois déployés</li>
                  <li>Les frais de gas sont publics et visibles</li>
                </ul>
                <p className="text-gray-700">
                  En utilisant Tickethic, vous acceptez ces caractéristiques de la technologie blockchain.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Article 9 - Modifications de la politique</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Cette politique de confidentialité peut être modifiée à tout moment. 
                  Les modifications importantes seront notifiées aux utilisateurs via la plateforme 
                  ou les canaux de communication officiels.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Article 10 - Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Pour toute question concernant cette politique de confidentialité ou vos données :
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li>• Discord : <a href="https://discord.gg/Sp92nBqX" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://discord.gg/Sp92nBqX</a></li>
                  <li>• GitHub : <a href="https://github.com/tickethic/tickethic" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://github.com/tickethic/tickethic</a></li>
                </ul>
                <p className="text-gray-700">
                  Vous pouvez également exercer vos droits RGPD en nous contactant via ces canaux.
                </p>
              </CardContent>
            </Card>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                Engagement Tickethic
              </h3>
              <p className="text-blue-700">
                Tickethic &lsquo;engage à maintenir la transparence et la décentralisation au cœur de ses valeurs. 
                Cette politique reflète notre philosophie open-source et notre respect de la vie privée des utilisateurs.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
