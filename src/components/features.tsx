import { Calendar, Music, Users, Check } from 'lucide-react'

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Une plateforme pour tous
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez comment Tickethic facilite &lsquo;organisation et la participation aux événements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Organizers Feature */}
          <div className="feature-card bg-white p-8 rounded-xl shadow-md border border-gray-100 transition duration-300" data-aos="fade-up" data-aos-delay="100">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <Calendar className="text-purple-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Pour les organisateurs</h3>
            <p className="text-gray-600 mb-4">Organisez des événements avec des contrats intelligents transparents.</p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <Check className="text-green-500 mr-2 w-4 h-4" />
                <span>Smart contracts automatisés</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-2 w-4 h-4" />
                <span>Paiements garantis aux artistes</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-2 w-4 h-4" />
                <span>Transparence totale des fonds</span>
              </li>
            </ul>
          </div>

          {/* Artists Feature */}
          <div className="feature-card bg-white p-8 rounded-xl shadow-md border border-gray-100 transition duration-300" data-aos="fade-up" data-aos-delay="200">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Music className="text-blue-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Pour les artistes</h3>
            <p className="text-gray-600 mb-4">Recevez directement vos revenus sans intermédiaire.</p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <Check className="text-green-500 mr-2 w-4 h-4" />
                <span>Paiements instantanés en crypto</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-2 w-4 h-4" />
                <span>0% de commission sur vos revenus</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-2 w-4 h-4" />
                <span>Contrats transparents et immuables</span>
              </li>
            </ul>
          </div>

          {/* Attendees Feature */}
          <div className="feature-card bg-white p-8 rounded-xl shadow-md border border-gray-100 transition duration-300" data-aos="fade-up" data-aos-delay="300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Users className="text-green-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Pour les participants</h3>
            <p className="text-gray-600 mb-4">Participez à des événements en soutenant directement les artistes.</p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <Check className="text-green-500 mr-2 w-4 h-4" />
                <span>Billets NFT uniques et traçables</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-2 w-4 h-4" />
                <span>Paiement en crypto ou fiat</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-2 w-4 h-4" />
                <span>Impact direct sur la scène locale</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
