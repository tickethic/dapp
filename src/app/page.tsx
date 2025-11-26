'use client'

import { useEffect } from 'react'
import { Hero } from '@/components/hero'
import { Navbar } from '@/components/navbar'
import { Features } from '@/components/features'
import { HowItWorks } from '@/components/how-it-works'
import { Events } from '@/components/events'
import { Testimonials } from '@/components/testimonials'
import { CallToAction } from '@/components/call-to-action'
import { Footer } from '@/components/footer'

declare global {
  interface Window {
    AOS: any
  }
}

export default function Home() {
  useEffect(() => {
    // Initialize AOS
    if (typeof window !== 'undefined' && window.AOS) {
      window.AOS.init({
        duration: 800,
        once: true
      })
    }
  }, [])

  return (
    <div className="min-h-screen">
      <Hero />
      <Navbar />
      {/* <Features /> */}
      <HowItWorks />
      <Events />
      <Testimonials />
      {/* <CallToAction /> */}
      <Footer />
    </div>
  )
}