import React, { useState, useEffect } from 'react'
import { Magnet, Menu, X } from 'lucide-react'

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-magnet-dark/80 backdrop-blur-md py-3' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 group">
            <Magnet className="w-8 h-8 text-magnet-primary group-hover:animate-attract transition-all duration-300" />
            <span className="text-xl font-bold gradient-text">$MAGNET</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-magnet-light hover:text-magnet-primary transition-colors">About</a>
            <a href="#utility" className="text-magnet-light hover:text-magnet-primary transition-colors">Utility</a>
            <a href="#game" className="text-magnet-light hover:text-magnet-primary transition-colors">Game</a>
            <button className="px-5 py-2 bg-magnet-primary hover:bg-magnet-primary/90 text-white font-medium rounded-full transition-all transform hover:scale-105 magnetic-shadow">
              Launch App
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-magnet-light"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-magnet-dark/95 backdrop-blur-lg py-4 px-4">
          <div className="flex flex-col gap-4">
            <a 
              href="#about" 
              className="text-magnet-light hover:text-magnet-primary py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#utility" 
              className="text-magnet-light hover:text-magnet-primary py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Utility
            </a>
            <a 
              href="#game" 
              className="text-magnet-light hover:text-magnet-primary py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Game
            </a>
            <button className="px-5 py-2 bg-magnet-primary hover:bg-magnet-primary/90 text-white font-medium rounded-full transition-all">
              Launch App
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
