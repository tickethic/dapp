import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CheckoutPageClient } from '@/components/CheckoutPageClient'

// Generate static params for static export
export async function generateStaticParams() {
  // For static export, we'll generate a few common event IDs
  // In a real app, you might want to fetch this from your contract
  return [
    { eventId: '1' },
    { eventId: '2' },
    { eventId: '3' },
    { eventId: '4' },
    { eventId: '5' }
  ]
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CheckoutPageClient />
      <Footer />
    </div>
  )
}