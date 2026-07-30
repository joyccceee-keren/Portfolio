import { useState, useCallback, Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import HeroScene from '../components/HeroScene'
import ContentPanel from '../components/ContentPanel'
import Mascot from '../components/Mascot'
import EasterEgg from '../components/EasterEgg'
import FishCharacter from '../components/FishCharacter'

export default function HomePage() {
  const [activePanel, setActivePanel] = useState(null)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [mascotHint, setMascotHint] = useState('')

  const handleObjectClick = useCallback((panelName) => {
    setActivePanel(panelName)
  }, [])

  const handleBackToRoom = useCallback(() => {
    setActivePanel(null)
  }, [])

  const handleEasterEgg = useCallback(() => {
    setShowEasterEgg(true)
  }, [])

  const handleCloseEasterEgg = useCallback(() => {
    setShowEasterEgg(false)
  }, [])

  const handleMascotHint = useCallback((hint) => {
    setMascotHint(hint)
  }, [])

  const handleClearHint = useCallback(() => {
    setMascotHint('')
  }, [])

  return (
    <div className="relative w-full h-full">
      {/* Scene fish - swimming around the room */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <FishCharacter color="coral" x={-80} y={100} size={0.5} speed={10} amplitude={15} delay={0} direction="right" />
        <FishCharacter color="cyan" x={-60} y={250} size={0.4} speed={12} amplitude={10} delay={1.5} direction="right" />
        <FishCharacter color="gold" x={-100} y={400} size={0.35} speed={14} amplitude={8} delay={2.5} direction="right" />
        <FishCharacter color="purple" x={1100} y={180} size={0.4} speed={11} amplitude={12} delay={3} direction="left" />
      </div>

      {/* 3D Hero Scene */}
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <HeroScene
            onObjectClick={handleObjectClick}
            onEasterEgg={handleEasterEgg}
            onMascotHint={handleMascotHint}
            onClearHint={handleClearHint}
            activePanel={activePanel}
          />
        </Suspense>
      </div>

      {/* Mascot */}
      {!activePanel && (
        <Mascot hint={mascotHint} />
      )}

      {/* 2D Content Panel */}
      <AnimatePresence>
        {activePanel && (
          <ContentPanel
            panel={activePanel}
            onBack={handleBackToRoom}
          />
        )}
      </AnimatePresence>

      {/* Easter Egg Mini-game */}
      <AnimatePresence>
        {showEasterEgg && (
          <EasterEgg onClose={handleCloseEasterEgg} />
        )}
      </AnimatePresence>
    </div>
  )
}
