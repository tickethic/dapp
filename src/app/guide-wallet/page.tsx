'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Wallet, Download, Smartphone, Shield, Key, ExternalLink, CheckCircle, AlertTriangle } from 'lucide-react'

export default function GuideWalletPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="w-full flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Wallet className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Guide des Wallets Web3</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Apprenez à configurer et utiliser un wallet pour acheter des billets NFT sur Tickethic
            </p>
          </div>

          <div className="space-y-8">
            {/* What is a wallet */}
            <Card>
              <CardHeader>
                <CardTitle>Qu&lsquo;est-ce qu&lsquo;un wallet Web3 ?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Un wallet Web3 est un portefeuille numérique qui vous permet de stocker, envoyer et recevoir 
                  des cryptomonnaies et des NFT. C&lsquo;est l&lsquo;équivalent d&lsquo;un compte bancaire pour l&lsquo;écosystème blockchain.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Key className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-800">Clés privées</h4>
                    <p className="text-sm text-gray-600">Contrôle total de vos actifs</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-800">Sécurité</h4>
                    <p className="text-sm text-gray-600">Protection par cryptographie</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <ExternalLink className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-800">Interopérabilité</h4>
                    <p className="text-sm text-gray-600">Fonctionne sur toutes les dApps</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommended wallets */}
            <Card>
              <CardHeader>
                <CardTitle>Wallets recommandés</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* MetaMask */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-orange-600 font-bold text-lg">🦊</span>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-gray-800">MetaMask</h4>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">Recommandé</Badge>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Le wallet le plus populaire et le plus facile à utiliser. Extension navigateur et app mobile.
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Extension navigateur
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Application mobile
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Interface intuitive
                      </div>
                    </div>
                    <a 
                      href="https://metamask.io" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 transition"
                    >
                      Télécharger MetaMask
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>

                  {/* WalletConnect */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-blue-600 font-bold text-lg">WC</span>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-gray-800">WalletConnect</h4>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">Mobile</Badge>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Connecte votre wallet mobile à des applications web via QR code.
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Compatible mobile
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        QR code de connexion
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Multi-wallets
                      </div>
                    </div>
                    <a 
                      href="https://walletconnect.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 transition"
                    >
                      En savoir plus
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Setup guide */}
            <Card>
              <CardHeader>
                <CardTitle>Comment configurer MetaMask</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                      1
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2">Télécharger l&lsquo;extension</h4>
                      <p className="text-gray-600 mb-3">
                        Allez sur metamask.io et installez l&lsquo;extension pour votre navigateur (Chrome, Firefox, Edge).
                      </p>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-blue-700">
                          <strong>Important :</strong> Téléchargez toujours depuis le site officiel pour éviter les contrefaçons.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                      2
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2">Créer un nouveau wallet</h4>
                      <p className="text-gray-600 mb-3">
                        Cliquez sur &ldquo;Créer un nouveau wallet&ldquo; et suivez les instructions. Vous devrez créer un mot de passe fort.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                      3
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2">Sauvegarder la phrase de récupération</h4>
                      <p className="text-gray-600 mb-3">
                        MetaMask vous donnera 12 mots de récupération. Écrivez-les sur papier et gardez-les en sécurité.
                      </p>
                      <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                        <p className="text-sm text-red-700">
                          <strong>⚠️ CRITIQUE :</strong> Sans ces mots, vous perdrez définitivement l&lsquo;accès à votre wallet !
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                      4
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2">Ajouter des ETH</h4>
                      <p className="text-gray-600 mb-3">
                        Achetez des ETH sur un exchange (Coinbase, Binance, etc.) et envoyez-les à votre adresse MetaMask.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-600" />
                  Conseils de sécurité
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 text-green-700">✅ Bonnes pratiques</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                        Sauvegardez votre phrase de récupération sur papier
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                        Utilisez un mot de passe fort et unique
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                        Activez l&lsquo;authentification à deux facteurs
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                        Vérifiez toujours l&lsquo;URL du site
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                        Ne partagez jamais vos clés privées
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 text-red-700">❌ À éviter</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                        Ne stockez pas vos clés sur votre ordinateur
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                        Ne cliquez pas sur des liens suspects
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                        Ne donnez jamais votre phrase de récupération
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                        N&lsquo;utilisez pas de wallets non vérifiés
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                        Ne connectez pas votre wallet à des sites non fiables
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Troubleshooting */}
            <Card>
              <CardHeader>
                <CardTitle>Résolution de problèmes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Mon wallet ne se connecte pas</h4>
                    <p className="text-gray-600 text-sm mb-2">
                      Vérifiez que :
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 ml-4">
                      <li>L&lsquo;extension MetaMask est installée et activée</li>
                      <li>Vous êtes sur le bon réseau (Ethereum Mainnet)</li>
                      <li>Votre navigateur est à jour</li>
                      <li>Les pop-ups ne sont pas bloqués</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Transaction échouée</h4>
                    <p className="text-gray-600 text-sm mb-2">
                      Causes possibles :
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 ml-4">
                      <li>Frais de gas insuffisants</li>
                      <li>Solde ETH insuffisant</li>
                      <li>Réseau congestionné</li>
                      <li>Transaction annulée par l&lsquo;utilisateur</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">J&lsquo;ai perdu ma phrase de récupération</h4>
                    <p className="text-gray-600 text-sm">
                      Malheureusement, sans la phrase de récupération, il est impossible de récupérer l&lsquo;accès à votre wallet. 
                      C&lsquo;est pourquoi il est crucial de la sauvegarder en sécurité dès la création.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
              <h3 className="text-2xl font-bold mb-4">Prêt à commencer ?</h3>
              <p className="text-blue-100 mb-6">
                Maintenant que vous savez comment configurer un wallet, découvrez comment acheter vos premiers billets.
              </p>
              <div className="space-x-4">
                <a 
                  href="/comment-acheter" 
                  className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition inline-block"
                >
                  Guide d&lsquo;achat
                </a>
                <a 
                  href="/events" 
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 transition inline-block"
                >
                  Voir les événements
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
