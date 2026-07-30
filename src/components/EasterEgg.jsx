import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

// Pixel art characters for the game
const PLAYER_PIXELS = [
  '  ████  ',
  ' ██ ██ ',
  '  ████  ',
  '  █  █ ',
  ' █    █',
  '██    ██',
]

const OBSTACLE_PIXELS = [
  ' ██ ',
  '████',
  '████',
  '████',
  ' ██ ',
]

export default function EasterEgg({ onClose }) {
  const [gameState, setGameState] = useState('start') // 'start', 'playing', 'gameover'
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [playerY, setPlayerY] = useState(0)
  const [obstacles, setObstacles] = useState([])
  const [groundFlash, setGroundFlash] = useState(false)
  
  const playerYRef = useRef(0)
  const velocityRef = useRef(0)
  const gameLoopRef = useRef(null)
  const scoreRef = useRef(0)
  const isJumpingRef = useRef(false)
  const gameActiveRef = useRef(false)

  const GRAVITY = -0.6
  const JUMP_FORCE = 10
  const GROUND_Y = 0
  const OBSTACLE_SPEED = 5

  const startGame = useCallback(() => {
    setGameState('playing')
    setScore(0)
    setObstacles([])
    playerYRef.current = 0
    velocityRef.current = 0
    scoreRef.current = 0
    isJumpingRef.current = false
    gameActiveRef.current = true

    // Game loop
    let lastTime = performance.now()
    let obstacleCounter = 0

    const gameLoop = (currentTime) => {
      if (!gameActiveRef.current) return
      
      const dt = (currentTime - lastTime) / 16 // normalize to ~60fps
      lastTime = currentTime

      // Update player physics
      velocityRef.current += GRAVITY * dt
      playerYRef.current = Math.max(GROUND_Y, playerYRef.current + velocityRef.current * dt)
      
      if (playerYRef.current <= GROUND_Y) {
        playerYRef.current = GROUND_Y
        velocityRef.current = 0
        isJumpingRef.current = false
      }
      setPlayerY(playerYRef.current)

      // Spawn obstacles
      obstacleCounter += dt
      if (obstacleCounter > 40 + Math.random() * 30) {
        obstacleCounter = 0
        setObstacles(prev => [...prev, { x: 100, height: 10 + Math.random() * 15 }])
      }

      // Move obstacles
      setObstacles(prev => {
        const moved = prev
          .map(obs => ({ ...obs, x: obs.x - OBSTACLE_SPEED * dt }))
          .filter(obs => obs.x > -20)

        // Check collision
        for (const obs of moved) {
          if (obs.x < 15 && obs.x > 5) {
            const playerBottom = playerYRef.current
            if (playerBottom < 15) {
              gameActiveRef.current = false
              setGameState('gameover')
              setHighScore(prev => Math.max(prev, scoreRef.current))
              return moved
            }
          }
        }

        return moved
      })

      // Update score
      scoreRef.current += 0.1
      setScore(Math.floor(scoreRef.current))

      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }

    gameLoopRef.current = requestAnimationFrame(gameLoop)
  }, [])

  const gameStateRef = useRef(gameState)
  gameStateRef.current = gameState

  const jump = useCallback(() => {
    if (gameStateRef.current === 'playing' && !isJumpingRef.current && playerYRef.current <= GROUND_Y) {
      velocityRef.current = JUMP_FORCE
      isJumpingRef.current = true
      setGroundFlash(true)
      setTimeout(() => setGroundFlash(false), 100)
    }
  }, [])

  // Handle keyboard and touch
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault()
        if (gameStateRef.current === 'start') startGame()
        else jump()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [startGame, jump])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      gameActiveRef.current = false
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current)
    }
  }, [])

  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center bg-navy-900/80 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative w-[320px] max-w-[90vw] rounded-2xl overflow-hidden
                   border border-coral-400/20 shadow-2xl shadow-coral-400/10"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Game container */}
        <div className="bg-navy-800 p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <span className="font-pixel text-[10px] text-coral-400" style={{ fontFamily: '"Press Start 2P", monospace' }}>
              {gameState === 'start' ? 'JUMP!' : gameState === 'playing' ? `SCORE:${score}` : `GAME OVER`}
            </span>
            <div className="flex items-center gap-2">
              <span className="font-pixel text-[8px] text-warm-gray/60" style={{ fontFamily: '"Press Start 2P", monospace' }}>
                BEST:{highScore}
              </span>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-warm-gray/60 hover:text-coral-400 hover:bg-navy-700/50 
                         transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Game canvas */}
          <div className="relative h-40 bg-navy-900 rounded-lg overflow-hidden border border-navy-600/30">
            {/* Ground */}
            <div 
              className={`absolute bottom-0 left-0 right-0 h-1 transition-colors duration-100 ${
                groundFlash ? 'bg-coral-400' : 'bg-navy-600'
              }`}
            />

            {/* Pixel ground texture */}
            <div className="absolute bottom-1 left-0 right-0 flex gap-[1px]">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[2px] flex-1"
                  style={{
                    background: i % 3 === 0 ? '#252145' : 'transparent',
                  }}
                />
              ))}
            </div>

            {/* Player */}
            <div
              className="absolute left-3 pixel-art select-none"
              style={{ bottom: `${4 + playerY}px` }}
            >
              {PLAYER_PIXELS.map((row, y) => (
                <div key={y} className="flex leading-none">
                  {[...row].map((char, x) => (
                    <span
                      key={x}
                      className="inline-block w-[4px] h-[4px]"
                      style={{
                        background: char === '█' ? '#22d3ee' : 'transparent',
                        opacity: char !== ' ' ? 1 : 0,
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Obstacles */}
            {obstacles.map((obs, i) => (
              <div
                key={i}
                className="absolute bottom-4 pixel-art select-none"
                style={{ left: `${obs.x}%` }}
              >
                {OBSTACLE_PIXELS.map((row, y) => (
                  <div key={y} className="flex leading-none">
                    {[...row].map((char, x) => (
                      <span
                        key={x}
                        className="inline-block w-[4px] h-[4px]"
                        style={{
                          background: char === '█' ? '#ff6b6b' : 'transparent',
                          opacity: char !== ' ' ? 1 : 0,
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            ))}

            {/* Start / Game Over overlay */}
            {gameState !== 'playing' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy-900/70">
                <p className="font-pixel text-xs text-off-white mb-3 text-center px-4" style={{ fontFamily: '"Press Start 2P", monospace' }}>
                  {gameState === 'start' ? 'JUMP GAME' : 'GAME OVER'}
                </p>
                {gameState === 'start' ? (
                  <button
                    onClick={startGame}
                    className="px-4 py-2 rounded-lg bg-coral-400 text-navy-900 font-pixel text-[10px]
                             hover:bg-coral-500 transition-all duration-300 active:scale-95"
                    style={{ fontFamily: '"Press Start 2P", monospace' }}
                  >
                    START
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={startGame}
                      className="px-4 py-2 rounded-lg bg-coral-400 text-navy-900 font-pixel text-[10px]
                               hover:bg-coral-500 transition-all duration-300 active:scale-95"
                      style={{ fontFamily: '"Press Start 2P", monospace' }}
                    >
                      RETRY
                    </button>
                  </div>
                )}
                <p className="mt-3 text-[8px] font-mono text-warm-gray/50">
                  Press SPACE to {gameState === 'start' ? 'start' : 'jump'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Easter egg text */}
        <div className="px-4 py-2 bg-navy-900/50 border-t border-navy-600/20">
          <p className="text-[8px] font-mono text-warm-gray/40 text-center tracking-wider">
            🥚 SECRET MINI-GAME FOUND!
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
