'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Types pour Vanta et THREE
interface VantaEffect {
  destroy: () => void
}

interface VantaNETOptions {
  el: HTMLElement
  mouseControls: boolean
  touchControls: boolean
  gyroControls: boolean
  minHeight: number
  minWidth: number
  scale: number
  scaleMobile: number
  color: number
  backgroundColor: number
  points: number
  maxDistance: number
  spacing: number
}

declare global {
  interface Window {
    VANTA?: {
      NET: (options: VantaNETOptions) => VantaEffect
    }
    THREE?: unknown
  }
}

export function Hero() {
  const vantaRef = useRef<HTMLDivElement>(null)
  const effectRef = useRef<VantaEffect | null>(null)

  useEffect(() => {
    const initVanta = () => {
      if (typeof window !== 'undefined' && window.VANTA?.NET && window.THREE && vantaRef.current) {
        try {
          effectRef.current = window.VANTA.NET({
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
    if (!effectRef.current) {
      const timer = setTimeout(initVanta, 1000)
      return () => clearTimeout(timer)
    }

    return () => {
      if (effectRef.current?.destroy) {
        effectRef.current.destroy()
      }
    }
  }, [])

  return (
    <div id="hero" className="relative overflow-hidden hero-gradient text-white">
      <div ref={vantaRef} className="absolute inset-0 z-0" id="vanta-bg"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center" data-aos="fade-up">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Levenementiel <span className="text-yellow-300">ethique</span> et <span className="text-yellow-300">decentralise</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10">
            Une plateforme Web3 qui garantit des paiements directs aux artistes et une transparence totale.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild>
              <Link href="/organizers" className="px-8 py-4 rounded-full font-semibold text-white">
                Creer un evenement
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/events" className="px-8 py-4 rounded-full font-semibold">
                Decouvrir les evenements
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
