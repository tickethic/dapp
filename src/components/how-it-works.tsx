export function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Connexion Wallet",
      description: "Connectez votre wallet Ethereum pour accéder à la plateforme",
      color: "purple"
    },
    {
      number: 2,
      title: "Créer un Profil",
      description: "Artistes : Créez votre NFT d'artiste. Organisateurs : Enregistrez-vous comme organisateur",
      color: "blue"
    },
    {
      number: 3,
      title: "Créer un Événement",
      description: "Les organisateurs créent des événements avec répartition automatique des revenus",
      color: "green"
    },
    {
      number: 4,
      title: "Achat de Billets",
      description: "Les participants achètent des billets NFT, les paiements sont automatiquement distribués",
      color: "yellow"
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Comment ça marche
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez en quelques étapes comment Tickethic révolutionne votre expérience événementielle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="text-center" data-aos="fade-up" data-aos-delay={`${(index + 1) * 100}`}>
              <div className={`w-20 h-20 bg-${step.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <span className={`text-${step.color}-600 font-bold text-2xl`}>
                  {step.number}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
