import React, { useEffect, useRef } from 'react'
import { Magnet } from 'lucide-react'

const Hero: React.FC = () => {
  const magnetRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!magnetRef.current) return
      
      const magnetRect = magnetRef.current.getBoundingClientRect()
      const magnetCenterX = magnetRect.left + magnetRect.width / 2
      const magnetCenterY = magnetRect.top + magnetRect.height / 2
      
      // Calculate distance between mouse and magnet center
      const distanceX = e.clientX - magnetCenterX
      const distanceY = e.clientY - magnetCenterY
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)
      
      // Only apply attraction effect if mouse is within 300px of the magnet
      if (distance < 300) {
        // Calculate attraction strength based on distance (stronger when closer)
        const strength = 0.2 * (1 - distance / 300)
        const moveX = distanceX * strength
        const moveY = distanceY * strength
        
        // Apply transform to magnet
        magnetRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`
      } else {
        // Reset transform when out of range
        magnetRef.current.style.transform = 'translate(0, 0)'
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 overflow-hidden relative">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-magnet-dark to-magnet-gray opacity-90"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-magnet-primary/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-magnet-secondary/10 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text magnetic-text-glow">$MAGNET</span>
              <br />
              <span className="text-4xl md:text-5xl">The Most Attractive Memecoin</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Launching soon on Solana. Experience the irresistible pull.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="px-8 py-3 bg-magnet-primary hover:bg-magnet-primary/90 text-white font-bold rounded-full transition-all transform hover:scale-105 magnetic-shadow">
                Get $MAGNET
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-magnet-primary hover:bg-magnet-primary/10 text-white font-bold rounded-full transition-all transform hover:scale-105">
                Join Community
              </button>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center">
            <div 
              ref={magnetRef}
              className="relative transition-transform duration-300 ease-out"
            >
              <div className="w-64 h-64 md:w-80 md:h-80 relative animate-float">
                <div className="absolute inset-0 bg-gradient-to-br from-magnet-primary to-magnet-secondary opacity-20 rounded-full animate-magnetic-glow"></div>
                <div className="absolute inset-4 border-4 border-magnet-primary rounded-full"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Magnet className="w-32 h-32 md:w-40 md:h-40 text-magnet-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
