import React, { useState, useEffect, useRef } from 'react'
import { RefreshCw, Trophy } from 'lucide-react'

interface GameObject {
  id: number;
  x: number;
  y: number;
  type: 'positive' | 'negative' | 'coin';
  collected?: boolean;
}

const MagnetGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [gameObjects, setGameObjects] = useState<GameObject[]>([])
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 })
  const [magnetPolarity, setMagnetPolarity] = useState<'positive' | 'negative'>('positive')
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 450 })
  const [gameOver, setGameOver] = useState(false)
  
  const animationRef = useRef<number>()
  const lastUpdateTimeRef = useRef<number>(0)

  // Initialize game
  useEffect(() => {
    const loadHighScore = () => {
      const savedHighScore = localStorage.getItem('magnetGameHighScore')
      if (savedHighScore) {
        setHighScore(parseInt(savedHighScore))
      }
    }
    
    loadHighScore()
    
    // Set canvas size based on container
    const updateCanvasSize = () => {
      if (canvasRef.current) {
        const container = canvasRef.current.parentElement
        if (container) {
          const width = Math.min(container.clientWidth, 600)
          const height = Math.min(width * 0.75, 450)
          setCanvasSize({ width, height })
          
          // If game is already started, update player position to center of new canvas
          if (gameStarted && !gameOver) {
            setPlayerPos({
              x: width / 2,
              y: height / 2
            })
          }
        }
      }
    }
    
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [gameStarted, gameOver])

  // Draw the game whenever the canvas size changes
  useEffect(() => {
    if (canvasRef.current) {
      renderGame()
    }
  }, [canvasSize])

  // Start game
  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    
    // Initialize player position in center
    setPlayerPos({
      x: canvasSize.width / 2,
      y: canvasSize.height / 2
    })
    
    // Create initial game objects
    generateGameObjects()
    
    // Start game loop
    lastUpdateTimeRef.current = performance.now()
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    animationRef.current = requestAnimationFrame(gameLoop)
  }

  // Generate game objects (coins and obstacles)
  const generateGameObjects = () => {
    const newObjects: GameObject[] = []
    
    // Add coins
    for (let i = 0; i < 5; i++) {
      newObjects.push({
        id: Date.now() + i,
        x: Math.random() * (canvasSize.width - 30) + 15,
        y: Math.random() * (canvasSize.height - 30) + 15,
        type: 'coin'
      })
    }
    
    // Add magnetic objects
    for (let i = 0; i < 3; i++) {
      newObjects.push({
        id: Date.now() + i + 100,
        x: Math.random() * (canvasSize.width - 40) + 20,
        y: Math.random() * (canvasSize.height - 40) + 20,
        type: 'positive'
      })
      
      newObjects.push({
        id: Date.now() + i + 200,
        x: Math.random() * (canvasSize.width - 40) + 20,
        y: Math.random() * (canvasSize.height - 40) + 20,
        type: 'negative'
      })
    }
    
    setGameObjects(newObjects)
  }

  // Game loop
  const gameLoop = (timestamp: number) => {
    const deltaTime = timestamp - lastUpdateTimeRef.current
    lastUpdateTimeRef.current = timestamp
    
    updateGame(deltaTime)
    renderGame()
    
    if (gameStarted && !gameOver) {
      animationRef.current = requestAnimationFrame(gameLoop)
    }
  }

  // Update game state
  const updateGame = (deltaTime: number) => {
    // Skip if no time has passed
    if (deltaTime === 0) return
    
    // Create a copy of the game objects array
    const updatedObjects = [...gameObjects]
    
    // Check for coin collection
    updatedObjects.forEach(obj => {
      if (obj.type === 'coin' && !obj.collected) {
        const dx = obj.x - playerPos.x
        const dy = obj.y - playerPos.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 25) { // Player radius + coin radius
          obj.collected = true
          setScore(prevScore => prevScore + 10)
        }
      }
    })
    
    // Apply magnetic forces
    let newPlayerPos = { ...playerPos }
    
    updatedObjects.forEach(obj => {
      if ((obj.type === 'positive' || obj.type === 'negative') && 
          obj.x > 0 && obj.x < canvasSize.width && 
          obj.y > 0 && obj.y < canvasSize.height) {
        
        const dx = obj.x - playerPos.x
        const dy = obj.y - playerPos.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        // Check for collision
        if (distance < 30) { // Player radius + magnet radius
          setGameOver(true)
          
          // Update high score if needed
          if (score > highScore) {
            setHighScore(score)
            localStorage.setItem('magnetGameHighScore', score.toString())
          }
          
          return
        }
        
        // Apply attractive/repulsive force based on polarity
        if (distance > 10) { // Avoid division by zero or very small values
          const forceMagnitude = 150 / (distance * distance) * deltaTime / 16
          
          // Same polarity = repulsion, opposite = attraction
          const forceDirection = (magnetPolarity === obj.type) ? -1 : 1
          
          newPlayerPos.x += (dx / distance) * forceMagnitude * forceDirection
          newPlayerPos.y += (dy / distance) * forceMagnitude * forceDirection
        }
      }
    })
    
    // Keep player in bounds
    newPlayerPos.x = Math.max(15, Math.min(newPlayerPos.x, canvasSize.width - 15))
    newPlayerPos.y = Math.max(15, Math.min(newPlayerPos.y, canvasSize.height - 15))
    
    setPlayerPos(newPlayerPos)
    
    // Replace collected coins
    const allCoinsCollected = updatedObjects.filter(obj => obj.type === 'coin' && !obj.collected).length === 0
    
    if (allCoinsCollected) {
      // Add more coins
      for (let i = 0; i < 5; i++) {
        updatedObjects.push({
          id: Date.now() + i,
          x: Math.random() * (canvasSize.width - 30) + 15,
          y: Math.random() * (canvasSize.height - 30) + 15,
          type: 'coin'
        })
      }
      
      // Add more magnetic objects
      updatedObjects.push({
        id: Date.now() + 1000,
        x: Math.random() * (canvasSize.width - 40) + 20,
        y: Math.random() * (canvasSize.height - 40) + 20,
        type: Math.random() > 0.5 ? 'positive' : 'negative'
      })
      
      // Remove collected coins
      const filteredObjects = updatedObjects.filter(obj => obj.type !== 'coin' || !obj.collected)
      setGameObjects(filteredObjects)
    } else {
      setGameObjects(updatedObjects)
    }
  }

  // Render game
  const renderGame = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Draw background
    ctx.fillStyle = '#121212'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Draw grid
    ctx.strokeStyle = '#2A2A2A'
    ctx.lineWidth = 1
    
    for (let x = 0; x < canvas.width; x += 30) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }
    
    for (let y = 0; y < canvas.height; y += 30) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }
    
    // Draw game objects
    gameObjects.forEach(obj => {
      if (obj.collected) return
      
      if (obj.type === 'coin') {
        // Draw coin
        ctx.fillStyle = '#FFD700'
        ctx.beginPath()
        ctx.arc(obj.x, obj.y, 8, 0, Math.PI * 2)
        ctx.fill()
        ctx.strokeStyle = '#FFC000'
        ctx.lineWidth = 2
        ctx.stroke()
      } else {
        // Draw magnet
        ctx.fillStyle = obj.type === 'positive' ? '#E7256A' : '#1E90FF'
        ctx.beginPath()
        ctx.arc(obj.x, obj.y, 15, 0, Math.PI * 2)
        ctx.fill()
        
        // Draw magnetic pole indicator
        ctx.fillStyle = '#FFFFFF'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.font = 'bold 14px Arial'
        ctx.fillText(obj.type === 'positive' ? 'N' : 'S', obj.x, obj.y)
      }
    })
    
    // Draw player
    ctx.fillStyle = magnetPolarity === 'positive' ? '#E7256A' : '#1E90FF'
    ctx.beginPath()
    ctx.arc(playerPos.x, playerPos.y, 15, 0, Math.PI * 2)
    ctx.fill()
    
    // Draw player pole indicator
    ctx.fillStyle = '#FFFFFF'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = 'bold 14px Arial'
    ctx.fillText(magnetPolarity === 'positive' ? 'N' : 'S', playerPos.x, playerPos.y)
    
    // Draw game over screen
    if (gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = '#FFFFFF'
      ctx.textAlign = 'center'
      ctx.font = 'bold 24px Arial'
      ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 40)
      
      ctx.font = '18px Arial'
      ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2)
      ctx.fillText(`High Score: ${highScore}`, canvas.width / 2, canvas.height / 2 + 30)
    }
  }

  // Toggle magnet polarity
  const togglePolarity = () => {
    if (!gameStarted || gameOver) return
    setMagnetPolarity(prev => prev === 'positive' ? 'negative' : 'positive')
  }

  return (
    <section id="game" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-magnet-gray to-magnet-dark opacity-90"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Magnetic <span className="gradient-text">Puzzle</span></h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
            Test your magnetic control skills! Collect coins while managing attraction and repulsion.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-magnet-gray/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-magnet-primary/20">
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center justify-center p-3 bg-magnet-dark rounded-lg">
                <div className="flex items-center">
                  <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
                  <span className="text-sm md:text-base">High Score: {highScore}</span>
                </div>
              </div>
              <div className="flex items-center justify-center p-3 bg-magnet-dark rounded-lg">
                <div className="flex items-center">
                  <span className="text-sm md:text-base">Current Score: {score}</span>
                </div>
              </div>
            </div>
            
            <div className="text-sm md:text-base text-gray-300 p-4 bg-magnet-dark rounded-lg">
              <p className="mb-2"><strong>How to play:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Collect golden coins to score points</li>
                <li>Click the canvas to toggle your magnet's polarity (N/S)</li>
                <li>Same poles repel, opposite poles attract</li>
                <li>Avoid colliding with other magnets</li>
              </ul>
            </div>
          </div>
          
          <div className="relative rounded-xl overflow-hidden mx-auto" style={{ maxWidth: '600px' }}>
            <canvas 
              ref={canvasRef}
              width={canvasSize.width} 
              height={canvasSize.height}
              onClick={togglePolarity}
              className="block w-full h-auto bg-magnet-dark border-2 border-magnet-gray cursor-pointer"
            />
            
            {!gameStarted || gameOver ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                <button 
                  onClick={startGame}
                  className="px-6 py-3 bg-magnet-primary hover:bg-magnet-primary/90 text-white font-bold rounded-full transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  {gameOver ? (
                    <>
                      <RefreshCw className="w-5 h-5" />
                      <span>Play Again</span>
                    </>
                  ) : (
                    <span>Start Game</span>
                  )}
                </button>
              </div>
            ) : null}
          </div>
          
          <div className="mt-6 flex items-center justify-center">
            <div className="inline-flex items-center justify-center gap-2 p-3 bg-magnet-dark rounded-lg">
              <span className="text-sm md:text-base">Current Polarity:</span>
              <span className={`font-bold px-3 py-1 rounded-md ${
                magnetPolarity === 'positive' ? 'bg-magnet-primary' : 'bg-magnet-secondary'
              }`}>
                {magnetPolarity === 'positive' ? 'North (N)' : 'South (S)'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MagnetGame
