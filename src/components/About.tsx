import React from 'react'
import { Zap, Rocket, Users, Shield } from 'lucide-react'

const features = [
  {
    icon: <Zap className="w-6 h-6 text-magnet-primary" />,
    title: "Built on Solana",
    description: "Lightning-fast transactions with minimal fees."
  },
  {
    icon: <Rocket className="w-6 h-6 text-magnet-primary" />,
    title: "Attractive Community",
    description: "Join a vibrant, supportive and fun community."
  },
  {
    icon: <Users className="w-6 h-6 text-magnet-primary" />,
    title: "Real Utility",
    description: "Unique magnet-themed utility for all token holders."
  },
  {
    icon: <Shield className="w-6 h-6 text-magnet-primary" />,
    title: "Community Driven",
    description: "Project development guided by the community."
  }
]

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-magnet-gray to-magnet-dark opacity-90"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About <span className="gradient-text">$MAGNET</span></h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
            $MAGNET is a community-driven memecoin on Solana with an irresistible pull. 
            Our magnetic properties attract holders, rewards, and opportunities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-magnet-gray/30 backdrop-blur-sm p-6 rounded-2xl border border-magnet-primary/20 transform transition-all duration-300 hover:scale-105 hover:border-magnet-primary/50 hover:shadow-lg hover:shadow-magnet-primary/20"
            >
              <div className="w-12 h-12 rounded-full bg-magnet-primary/10 flex items-center justify-center mb-4 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">{feature.title}</h3>
              <p className="text-gray-400 text-center">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gradient-to-r from-magnet-primary/20 to-magnet-secondary/20 p-8 md:p-12 rounded-3xl border border-magnet-primary/30 magnetic-field">
          <div className="bg-magnet-dark/90 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">The Power of Attraction</h3>
                <p className="text-gray-300 mb-4">
                  Just like real magnets exert a force of attraction, $MAGNET draws together a community of like-minded individuals who believe in the future of memecoins on Solana.
                </p>
                <p className="text-gray-300">
                  Our token's attractive properties go beyond just a name – we've created real utility that leverages magnetic principles to benefit our holders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
