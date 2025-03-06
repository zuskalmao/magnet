import React from 'react'
import { Magnet, Twitter, Globe, Send } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-magnet-dark to-black opacity-90"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Magnet className="w-10 h-10 text-magnet-primary" />
              <span className="text-2xl font-bold gradient-text">$MAGNET</span>
            </div>
            <p className="text-center text-gray-400 max-w-xl">
              $MAGNET is a community-driven memecoin on Solana with real utility.
              Join us and experience the power of attraction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-xl font-bold mb-4">Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-magnet-primary transition-colors">Home</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-magnet-primary transition-colors">About</a></li>
                <li><a href="#utility" className="text-gray-400 hover:text-magnet-primary transition-colors">Utility</a></li>
                <li><a href="#game" className="text-gray-400 hover:text-magnet-primary transition-colors">Game</a></li>
              </ul>
            </div>
            
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-bold mb-4">Community</h3>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-magnet-gray flex items-center justify-center hover:bg-magnet-primary transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-magnet-gray flex items-center justify-center hover:bg-magnet-primary transition-colors">
                  <Send className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-magnet-gray flex items-center justify-center hover:bg-magnet-primary transition-colors">
                  <Globe className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div className="flex flex-col items-center md:items-end">
              <h3 className="text-xl font-bold mb-4">Newsletter</h3>
              <div className="w-full max-w-xs">
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="w-full p-3 pl-4 pr-12 bg-magnet-gray/50 rounded-full focus:outline-none focus:ring-2 focus:ring-magnet-primary text-magnet-light"
                  />
                  <button className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-magnet-primary flex items-center justify-center">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-magnet-gray/30">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} $MAGNET. All rights reserved.
            </p>
            <div className="flex gap-4 text-gray-500 text-sm">
              <a href="#" className="hover:text-magnet-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-magnet-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
