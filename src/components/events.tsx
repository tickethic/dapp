import { ArrowRight } from 'lucide-react'
import { useAllEvents } from '@/hooks/useAllEvents'

export function Events() {
  const { events, loading } = useAllEvents()

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Musique":
        return "bg-purple-100 text-purple-800"
      case "Art":
        return "bg-blue-100 text-blue-800"
      case "Gastronomie":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div data-aos="fade-right">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Événements à venir</h2>
            <p className="text-gray-600">Découvrez les prochains événements près de chez vous</p>
          </div>
          <a href="/events" className="text-purple-600 font-semibold hover:text-purple-700 transition flex items-center" data-aos="fade-left">
            Voir tout <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des événements...</p>
          </div>
        ) : events && events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.slice(0, 6).map((event, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-md border border-gray-100 transition hover:shadow-lg" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="h-48 bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">🎫</span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Événement
                    </span>
                    <span className="text-gray-500 text-sm">
                      {new Date(Number(event.date) * 1000).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {event.name || `Événement ${index + 1}`}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Prix: {event.ticketPrice} ETH • Billets: {event.soldTickets}/{event.totalTickets}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">
                      {event.soldTickets}/{event.totalTickets} vendus
                    </span>
                    <a href="/events" className="text-purple-600 hover:text-purple-700 font-medium">Voir détails</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎫</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun événement disponible</h3>
            <p className="text-gray-600 mb-6">
              Il n&lsquo;y a pas encore &lsquo;événements sur la plateforme.
            </p>
            <a href="/organizers" className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
              Créer le premier événement
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
