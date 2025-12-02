'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, Code, Globe, Users, FileText, ExternalLink } from 'lucide-react'

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="w-full flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Mentions Légales</h1>
            <p className="text-xl text-gray-600">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2 text-green-600" />
                  Article 1 - Éditeur de la plateforme
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <strong>Nom de la plateforme :</strong> Tickethic
                  </div>
                  <div>
                    <strong>Type :</strong> Application décentralisée (dApp) open-source
                  </div>
                  <div>
                    <strong>Domaine :</strong> tickethic.ch
                  </div>
                  <div>
                    <strong>Licence :</strong> GNU General Public License v3.0
                  </div>
                  <div>
                    <strong>Code source :</strong> 
                    <a href="https://github.com/tickethic/tickethic" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-2">
                      https://github.com/tickethic/tickethic
                      <ExternalLink className="w-4 h-4 inline ml-1" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-green-600" />
                  Article 2 - Équipe de développement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Tickethic est développé par une équipe de contributeurs open-source. 
                  Le projet est maintenu de manière décentralisée et collaborative.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Contributeurs principaux :</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• <strong>Tickethic Team</strong> - Développeurs et mainteneurs</li>
                    <li>• <strong>Communauté open-source</strong> - Contributeurs et auditeurs</li>
                  </ul>
                </div>
                <p className="text-gray-700">
                  <strong>Contact :</strong> 
                  <a href="https://discord.gg/Sp92nBqX" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-2">
                    Discord Community
                    <ExternalLink className="w-4 h-4 inline ml-1" />
                  </a>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-green-600" />
                  Article 3 - Hébergement et infrastructure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <strong>Interface web :</strong> Hébergée sur des serveurs statiques
                  </div>
                  <div>
                    <strong>Blockchain :</strong> Réseau Ethereum (mainnet et testnets)
                  </div>
                  <div>
                    <strong>Smart contracts :</strong> Déployés sur Ethereum et audités
                  </div>
                  <div>
                    <strong>CDN :</strong> Distribution mondiale via CDN
                  </div>
                </div>
                <p className="text-gray-700">
                  L&lsquo;infrastructure de Tickethic est conçue pour être résiliente et décentralisée, 
                  réduisant les risques de panne et de censure.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="h-5 w-5 mr-2 text-green-600" />
                  Article 4 - Technologies utilisées
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Frontend</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Next.js 15 (React framework)</li>
                      <li>• TypeScript</li>
                      <li>• Tailwind CSS</li>
                      <li>• wagmi (Web3 hooks)</li>
                      <li>• viem (Ethereum client)</li>
                      <li>• Reown AppKit</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Blockchain</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Solidity (smart contracts)</li>
                      <li>• Hardhat (développement)</li>
                      <li>• OpenZeppelin (bibliothèques)</li>
                      <li>• Ethereum (réseau principal)</li>
                      <li>• Polygon (testnet)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Article 5 - Propriété intellectuelle</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">5.1 Code source</h4>
                    <p className="text-gray-700">
                      Le code source de Tickethic est publié sous licence 
                      <strong> GNU General Public License v3.0</strong>. Cette licence garantit :
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                      <li>Liberté d&lsquo;utilisation, d&lsquo;étude, de modification et de distribution</li>
                      <li>Obligation de partager les modifications sous la même licence</li>
                      <li>Transparence totale du code source</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">5.2 Contenu utilisateur</h4>
                    <p className="text-gray-700">
                      Les NFT créés sur la plateforme appartiennent à leurs détenteurs légitimes. 
                      Les organisateurs et artistes conservent leurs droits sur leur contenu.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">5.3 Marque et logo</h4>
                    <p className="text-gray-700">
                      La marque &ldquo;Tickethic&ldquo; et son logo sont utilisés sous licence open-source. 
                      L&lsquo;utilisation commerciale est autorisée sous réserve du respect de la licence GPL.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Article 6 - Responsabilité et limitations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">6.1 Nature décentralisée</h4>
                    <p className="text-gray-700">
                      Tickethic est une application décentralisée. Les développeurs ne peuvent être tenus responsables de :
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                      <li>Dysfonctionnements de la blockchain Ethereum</li>
                      <li>Pertes dues à des bugs dans les smart contracts</li>
                      <li>Variations de prix des cryptomonnaies</li>
                      <li>Mauvaise utilisation de la plateforme par les utilisateurs</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">6.2 Absence de garantie</h4>
                    <p className="text-gray-700">
                      La plateforme est fournie &ldquo;en l&lsquo;état&ldquo; sans garantie d&lsquo;aucune sorte. 
                      Les utilisateurs utilisent Tickethic à leurs propres risques.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Article 7 - Conformité réglementaire</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">7.1 Cryptomonnaies et tokens</h4>
                    <p className="text-gray-700">
                      Tickethic utilise des tokens ERC-721 (NFT) et ERC-20 (ETH) sur Ethereum. 
                      Les utilisateurs doivent se conformer aux réglementations locales concernant 
                      les cryptomonnaies et les NFT.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">7.2 Protection des données</h4>
                    <p className="text-gray-700">
                      La plateforme respecte le RGPD dans la mesure du possible, tout en exploitant 
                      les caractéristiques de transparence de la blockchain.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">7.3 Événements et responsabilité</h4>
                    <p className="text-gray-700">
                      Les organisateurs d&lsquo;événements sont responsables du respect des lois locales 
                      et de la sécurité de leurs événements.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Article 8 - Modifications et mises à jour</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Ces mentions légales peuvent être modifiées à tout moment. Les modifications 
                  importantes seront communiquées via la plateforme ou les canaux officiels. 
                  L&lsquo;utilisation continue de Tickethic après modification vaut acceptation des nouvelles mentions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Article 9 - Droit applicable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Les présentes mentions légales sont régies par le droit français. 
                  En cas de litige, les tribunaux français seront seuls compétents.
                </p>
              </CardContent>
            </Card>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-3">
                Philosophie Tickethic
              </h3>
              <p className="text-green-700 mb-4">
                Tickethic incarne les valeurs de l&lsquo;open-source et de la décentralisation :
              </p>
              <ul className="text-green-700 space-y-2">
                <li>• <strong>Transparence :</strong> Code source ouvert et auditable</li>
                <li>• <strong>Décentralisation :</strong> Aucun point de contrôle central</li>
                <li>• <strong>Équité :</strong> Répartition transparente des revenus</li>
                <li>• <strong>Communauté :</strong> Développement collaboratif et participatif</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Contact et support
              </h3>
              <p className="text-gray-700 mb-4">
                Pour toute question concernant ces mentions légales ou le projet Tickethic :
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <strong>Communauté :</strong>
                  <a href="https://discord.gg/Sp92nBqX" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-2">
                    Discord
                    <ExternalLink className="w-4 h-4 inline ml-1" />
                  </a>
                </div>
                <div>
                  <strong>Code source :</strong>
                  <a href="https://github.com/tickethic/tickethic" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-2">
                    GitHub
                    <ExternalLink className="w-4 h-4 inline ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
