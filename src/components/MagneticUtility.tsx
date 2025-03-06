import React, { useState } from 'react'
import { Magnet, Zap, ArrowRight, ChevronsUpDown } from 'lucide-react'

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
}

const Collapsible: React.FC<CollapsibleProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-magnet-primary/30 rounded-xl overflow-hidden mb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-magnet-primary/10 text-left font-medium"
      >
        <span>{title}</span>
        <ChevronsUpDown 
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 bg-magnet-gray/30">
          {children}
        </div>
      </div>
    </div>
  )
}

const MagneticUtility: React.FC = () => {
  return (
    <section id="utility" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-magnet-dark to-magnet-gray opacity-90"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-1/3 right-10 w-64 h-64 bg-magnet-primary/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 left-10 w-72 h-72 bg-magnet-secondary/10 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }}></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Magnetic <span className="gradient-text">Utility</span></h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
            $MAGNET offers unique utility features that leverage the principles of magnetism to benefit token holders.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-magnet-gray/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-magnet-primary/20 transform transition-all duration-300 hover:border-magnet-primary/50 hover:shadow-lg hover:shadow-magnet-primary/20">
            <div className="w-16 h-16 rounded-full bg-magnet-primary/20 flex items-center justify-center mb-6 mx-auto">
              <Magnet className="w-8 h-8 text-magnet-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-center">Magnetic Rewards Pool</h3>
            <p className="text-gray-300 mb-6 text-center">
              Our innovative reward system "attracts" a portion of each transaction to a community pool. Token holders can participate in various activities to earn rewards from this pool.
            </p>
            
            <div className="p-4 bg-magnet-primary/10 rounded-xl mb-6">
              <h4 className="text-lg font-medium mb-2">How It Works:</h4>
              <ol className="list-decimal pl-5 space-y-2 text-gray-300">
                <li>Hold $MAGNET in your wallet</li>
                <li>Participate in community activities and games</li>
                <li>Earn magnetic points based on your activity and holdings</li>
                <li>Redeem points for rewards from the magnetic pool</li>
              </ol>
            </div>
            
            <button className="w-full px-6 py-3 bg-magnet-primary hover:bg-magnet-primary/90 text-white font-bold rounded-full transition-all flex items-center justify-center gap-2">
              <span>View Rewards Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="bg-magnet-gray/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-magnet-primary/20 transform transition-all duration-300 hover:border-magnet-primary/50 hover:shadow-lg hover:shadow-magnet-primary/20">
            <div className="w-16 h-16 rounded-full bg-magnet-secondary/20 flex items-center justify-center mb-6 mx-auto">
              <Zap className="w-8 h-8 text-magnet-secondary" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-center">Magnetic NFT Generator</h3>
            <p className="text-gray-300 mb-6 text-center">
              $MAGNET holders can create unique magnetic field NFTs. These digital assets visualize magnetic forces and can be traded or used in our ecosystem.
            </p>
            
            <div className="mb-6">
              <Collapsible title="NFT Benefits">
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Unique visuals based on your holding pattern</li>
                  <li>Tiered rarity system based on magnetic strength</li>
                  <li>Access to exclusive holder events</li>
                  <li>Enhanced rewards from the magnetic pool</li>
                </ul>
              </Collapsible>
              
              <Collapsible title="How to Generate">
                <ol className="list-decimal pl-5 space-y-2 text-gray-300">
                  <li>Connect your wallet containing $MAGNET</li>
                  <li>Select your desired magnetic field pattern</li>
                  <li>Customize colors and properties</li>
                  <li>Mint your unique magnetic NFT</li>
                </ol>
              </Collapsible>
            </div>
            
            <button className="w-full px-6 py-3 border-2 border-magnet-secondary hover:bg-magnet-secondary/10 text-white font-bold rounded-full transition-all flex items-center justify-center gap-2">
              <span>Coming Soon</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MagneticUtility
