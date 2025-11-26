import { Star } from 'lucide-react'

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Marie Dubois",
      role: "Organisatrice d'événements",
      content: "Tickethic a révolutionné la façon dont je gère mes événements. La plateforme est intuitive et complète, me permettant de tout gérer en un seul endroit.",
      avatar: "http://static.photos/people/200x200/1"
    },
    {
      id: 2,
      name: "Jean Martin",
      role: "Musicien",
      content: "Grâce à Tickethic, j'ai pu me concentrer sur ma musique tout en ayant une gestion transparente de mes participations et paiements. Une vraie bouffée d'air frais !",
      avatar: "http://static.photos/people/200x200/2"
    },
    {
      id: 3,
      name: "Sophie Lambert",
      role: "Participante",
      content: "Je trouve toujours des événements intéressants sur Tickethic. L'achat de billets est simple et sécurisé, et je peux gérer toutes mes réservations en un clin d'œil.",
      avatar: "http://static.photos/people/200x200/3"
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Une économie plus juste
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Notre technologie blockchain redonne le pouvoir aux créateurs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100" data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="flex items-center mb-4">
                <div 
                  className="w-12 h-12 rounded-full bg-cover bg-center mr-4" 
                  style={{ backgroundImage: `url(${testimonial.avatar})` }}
                />
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
