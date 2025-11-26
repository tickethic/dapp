'use client'

import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'

declare global {
  interface Window {
    VANTA: any
    THREE: any
  }
}

export function Hero() {
  const vantaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let effect: any = null

    const initVanta = () => {
      if (typeof window !== 'undefined' && window.VANTA && window.THREE && vantaRef.current) {
        try {
          effect = window.VANTA.NET({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x7e4dbb,
            backgroundColor: 0x6e48aa,
            points: 12.00,
            maxDistance: 22.00,
            spacing: 18.00
          })
        } catch (error) {
          console.warn('Vanta.js failed to initialize:', error)
        }
      }
    }

    // Try to initialize immediately
    initVanta()

    // If not loaded, try again after a delay
    if (!effect) {
      const timer = setTimeout(initVanta, 1000)
      return () => clearTimeout(timer)
    }

    return () => {
      if (effect && effect.destroy) {
        effect.destroy()
      }
    }
  }, [])

  return (
    <div id="hero" className="relative overflow-hidden hero-gradient text-white">
      <div ref={vantaRef} className="absolute inset-0 z-0" id="vanta-bg"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center" data-aos="fade-up">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            L'événementiel <span className="text-yellow-300">éthique</span> et <span className="text-yellow-300">décentralisé</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10">
            Une plateforme Web3 qui garantit des paiements directs aux artistes et une transparence totale.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/organizers" className="btn-primary px-8 py-4 rounded-full font-semibold text-white">
              Créer un événement
            </a>
            <a href="/events" className="bg-white text-purple-700 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition">
              Découvrir les événements
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
