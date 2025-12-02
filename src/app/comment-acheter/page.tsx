'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Wallet, CreditCard, Smartphone, Shield, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react'

export default function CommentAcheterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="w-full flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CreditCard className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Comment acheter des billets</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Guide complet pour acheter vos premiers billets NFT sur Tickethic
            </p>
          </div>

          <div className="space-y-8">
            {/* Prerequisites */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wallet className="h-5 w-5 mr-2 text-purple-600" />
                  Prérequis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Avant d&lsquo;acheter des billets sur Tickethic, vous devez avoir :
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Un wallet Web3</h4>
                      <p className="text-sm text-gray-600">MetaMask, WalletConnect, ou autre wallet compatible</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Des ETH</h4>
                      <p className="text-sm text-gray-600">Ether pour payer les billets et les frais de transaction</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Connexion Internet</h4>
                      <p className="text-sm text-gray-600">Stable pour les transactions blockchain</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Navigateur moderne</h4>
                      <p className="text-sm text-gray-600">Chrome, Firefox, Safari ou Edge récent</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step by step */}
            <Card>
              <CardHeader>
                <CardTitle>Étapes d&lsquo;achat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold">
                      1
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2">Connecter votre wallet</h4>
                      <p className="text-gray-600 mb-3">
                        Cliquez sur &ldquo;Connecter mon wallet&ldquo; dans la barre de navigation et sélectionnez votre wallet préféré.
                      </p>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">
                          <strong>Conseil :</strong> Assurez-vous que votre wallet est connecté au bon réseau (Ethereum Mainnet).
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold">
                      2
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2">Parcourir les événements</h4>
                      <p className="text-gray-600 mb-3">
                        Explorez la page des événements pour trouver celui qui vous intéresse. Utilisez les filtres pour affiner votre recherche.
                      </p>
                      <a 
                        href="/events" 
                        className="inline-flex items-center text-purple-600 hover:text-purple-700 transition"
                      >
                        Voir les événements
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold">
                      3
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2">Sélectionner un billet</h4>
                      <p className="text-gray-600 mb-3">
                        Cliquez sur l&lsquo;événement de votre choix et sélectionnez le type de billet (Standard, VIP, etc.).
                      </p>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-blue-700">
                          <strong>Info :</strong> Chaque billet est un NFT unique avec un prix en ETH.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold">
                      4
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2">Confirmer l&lsquo;achat</h4>
                      <p className="text-gray-600 mb-3">
                        Vérifiez les détails de votre achat et confirmez la transaction dans votre wallet.
                      </p>
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <p className="text-sm text-yellow-700">
                          <strong>Attention :</strong> Les transactions blockchain sont irréversibles. Vérifiez bien avant de confirmer.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold">
                      5
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2">Recevoir votre billet NFT</h4>
                      <p className="text-gray-600 mb-3">
                        Une fois la transaction confirmée, votre billet NFT apparaîtra dans votre collection.
                      </p>
                      <a 
                        href="/mes-billets" 
                        className="inline-flex items-center text-purple-600 hover:text-purple-700 transition"
                      >
                        Voir mes billets
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment methods */}
            <Card>
              <CardHeader>
                <CardTitle>Méthodes de paiement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-orange-600 font-bold text-sm">Ξ</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Ether (ETH)</h4>
                        <p className="text-sm text-gray-600">Méthode principale</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Paiement direct en Ether via votre wallet. Le plus simple et le plus rapide.
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <Smartphone className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Wallet Mobile</h4>
                        <p className="text-sm text-gray-600">Via WalletConnect</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Connectez votre wallet mobile pour acheter directement depuis votre téléphone.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-600" />
                  Sécurité et bonnes pratiques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 text-green-700">✅ À faire</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                        Vérifiez toujours l&lsquo;adresse de l&lsquo;événement
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                        Gardez vos clés privées secrètes
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                        Vérifiez les frais de gas avant de confirmer
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                        Sauvegardez votre wallet régulièrement
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 text-red-700">❌ À éviter</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <AlertCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                        Ne partagez jamais vos clés privées
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                        Ne cliquez pas sur des liens suspects
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                        Ne confirmez pas sans vérifier
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                        N&lsquo;utilisez pas de wallets non vérifiés
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle>Questions fréquentes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Combien coûtent les frais de transaction ?</h4>
                    <p className="text-gray-600 text-sm">
                      Les frais de gas varient selon la congestion du réseau Ethereum. Ils sont généralement entre 0.001 et 0.01 ETH.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Puis-je annuler un achat ?</h4>
                    <p className="text-gray-600 text-sm">
                      Non, les transactions blockchain sont irréversibles. Vérifiez bien avant de confirmer.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Que se passe-t-il si l&lsquo;événement est annulé ?</h4>
                    <p className="text-gray-600 text-sm">
                      L&lsquo;organisateur peut proposer un remboursement ou un report. Contactez-le directement.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Puis-je revendre mon billet ?</h4>
                    <p className="text-gray-600 text-sm">
                      Oui, vous pouvez transférer votre NFT à quelqu&lsquo;un d&lsquo;autre via votre wallet.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-center text-white">
              <h3 className="text-2xl font-bold mb-4">Prêt à acheter vos premiers billets ?</h3>
              <p className="text-purple-100 mb-6">
                Découvrez tous les événements disponibles et achetez vos billets NFT en quelques clics.
              </p>
              <a 
                href="/events" 
                className="bg-white text-purple-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition inline-block"
              >
                Voir les événements
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
