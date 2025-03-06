import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import MagneticUtility from './components/MagneticUtility'
import MagnetGame from './components/MagnetGame'
import Footer from './components/Footer'
import './index.css'

function App() {
  return (
    <div className="min-h-screen bg-magnet-dark text-magnet-light font-sans relative overflow-hidden">
      {/* Decorative particles */}
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>

      <Navbar />
      <Hero />
      <About />
      <MagneticUtility />
      <MagnetGame />
      <Footer />
    </div>
  )
}

export default App
