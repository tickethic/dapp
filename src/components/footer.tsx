import { Ticket } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          <div>
            <a href="#" className="flex items-center mb-6">
              <Ticket className="text-purple-400 mr-2 w-6 h-6" />
              <span className="text-xl font-bold">Tickethic</span>
            </a>
            <p className="text-gray-400 mb-4">La première plateforme événementielle décentralisée et éthique.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Pour les organisateurs</h3>
            <ul className="space-y-2">
              <li><a href="/organizers" className="text-gray-400 hover:text-white transition">Créer un événement</a></li>
              <li><a href="/organizers" className="text-gray-400 hover:text-white transition">Mes événements</a></li>
              <li><a href="/analytics" className="text-gray-400 hover:text-white transition">Analytics</a></li>
              <li><a href="/pricing" className="text-gray-400 hover:text-white transition">Tarifs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Pour les artistes</h3>
            <ul className="space-y-2">
              <li><a href="/artists" className="text-gray-400 hover:text-white transition">Créer un profil</a></li>
              <li><a href="/artist-payments" className="text-gray-400 hover:text-white transition">Gestion des paiements</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Pour les participants</h3>
            <ul className="space-y-2">
              <li><a href="/events" className="text-gray-400 hover:text-white transition">Découvrir les événements</a></li>
              <li><a href="/profile" className="text-gray-400 hover:text-white transition">Mes billets</a></li>
              <li><a href="/comment-acheter" className="text-gray-400 hover:text-white transition">Comment acheter</a></li>
              <li><a href="/guide-wallet" className="text-gray-400 hover:text-white transition">Guide Wallet</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <a href="https://discord.gg/Sp92nBqX" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 pb-0 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">© 2023 Tickethic. Tous droits réservés.</p>
          <div className="flex space-x-6">
            <a href="/conditions-generales" className="text-gray-400 hover:text-white transition">Conditions générales</a>
            <a href="/politique-confidentialite" className="text-gray-400 hover:text-white transition">Politique de confidentialité</a>
            <a href="/mentions-legales" className="text-gray-400 hover:text-white transition">Mentions légales</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
