'use client'

import { useWallet } from '@/hooks/useWallet'
import { useEvents } from '@/hooks/useEvents'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Ticket, Users, TrendingUp, DollarSign, Wallet } from 'lucide-react'

// Types pour les événements (ajustez selon votre interface réelle)
interface Event {
  name?: string
  date: bigint | string | number
  ticketPrice: string | number | bigint
  totalTickets: string | number | bigint
  soldTickets: string | number | bigint
}

export default function AnalyticsPage() {
  const { address, isConnected, connect } = useWallet()
  const { events, loading } = useEvents() as { events: Event[]; loading: boolean }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        
        <div className="w-full flex-1">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="bg-white rounded-lg shadow-md p-12 max-w-2xl mx-auto">
                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Wallet className="w-12 h-12 text-purple-600" />
                </div>
                
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  Connexion requise
                </h1>
                
                <p className="text-lg text-gray-600 mb-8">
                  Connectez votre wallet pour voir vos metriques personnalisees
                </p>
                
                <Button onClick={connect} className="bg-purple-600 hover:bg-purple-700">
                  Connecter mon wallet
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    )
  }

  // Calculer les métriques basées sur les événements
  const totalEvents = events.length
  const totalTickets = events.reduce((sum, event) => {
    const tickets = Number(event.totalTickets || 0)
    return sum + tickets
  }, 0)
  
  const totalSold = events.reduce((sum, event) => {
    const sold = Number(event.soldTickets || 0)
    return sum + sold
  }, 0)
  
  const totalRevenue = events.reduce((sum, event) => {
    const price = Number(event.ticketPrice || 0)
    const sold = Number(event.soldTickets || 0)
    return sum + (price * sold)
  }, 0)

  const soldPercentage = totalTickets > 0 ? (totalSold / totalTickets) * 100 : 0

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="w-full flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Analytics
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Metriques personnalisees pour votre wallet
            </p>
            <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Wallet className="w-4 h-4" />
              <span>Wallet: {address?.slice(0, 6)}...{address?.slice(-4)}</span>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Chargement des donnees...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Evenements</CardTitle>
                  <Ticket className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalEvents}</div>
                  <p className="text-xs text-muted-foreground">
                    Total des evenements
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Billets vendus</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalSold}</div>
                  <p className="text-xs text-muted-foreground">
                    Sur {totalTickets} disponibles
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Taux de vente</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{soldPercentage.toFixed(1)}%</div>
                  <p className="text-xs text-muted-foreground">
                    Moyenne de vente
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenus totaux</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalRevenue.toFixed(2)} ETH</div>
                  <p className="text-xs text-muted-foreground">
                    Volume genere
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {events.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Detail des evenements</CardTitle>
                <CardDescription>
                  Liste de tous les evenements avec leurs metriques
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.map((event, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{event.name || `Evenement ${index + 1}`}</h3>
                        <span className="text-sm text-gray-500">
                          {new Date(Number(event.date) * 1000).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Prix:</span> {Number(event.ticketPrice || 0).toFixed(4)} ETH
                        </div>
                        <div>
                          <span className="text-gray-500">Vendus :</span> {Number(event.soldTickets || 0)}/{Number(event.totalTickets || 0)}
                        </div>
                        <div>
                          <span className="text-gray-500">Revenus:</span> {((Number(event.ticketPrice || 0) * Number(event.soldTickets || 0)).toFixed(2))} ETH
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {!loading && events.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Ticket className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun evenement trouve</h3>
                <p className="text-gray-600 mb-4">
                  Il ny a pas encore d evenements sur la plateforme.
                </p>
                <Button asChild>
                  <Link href="/organizers">Creer un evenement</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
