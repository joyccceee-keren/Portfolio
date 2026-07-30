import { useState, useCallback, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroScene from '../components/HeroScene'
import ContentPanel from '../components/ContentPanel'
import Mascot from '../components/Mascot'
import FishCharacter from '../components/FishCharacter'

export default function HomePage() {
  const [activePanel, setActivePanel] = useState(null)
  const [mascotHint, setMascotHint] = useState('')

  const handleObjectClick = useCallback((panelName) => {
    setActivePanel(panelName)
  }, [])

  const handleBackToRoom = useCallback(() => {
    setActivePanel(null)
  }, [])

  const handleMascotHint = useCallback((hint) => {
    setMascotHint(hint)
  }, [])

  const handleClearHint = useCallback(() => {
    setMascotHint('')
  }, [])

  return (
    <div className="relative w-full h-full">
      {/* Bubble particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`bubble-${i}`}
            className="absolute rounded-full bubble"
            style={{
              width: 3 + Math.random() * 8,
              height: 3 + Math.random() * 8,
              left: `${5 + Math.random() * 90}%`,
              bottom: -10,
              background: 'radial-gradient(circle at 30% 30%, rgba(34, 211, 238, 0.3), rgba(34, 211, 238, 0.05))',
              border: '1px solid rgba(34, 211, 238, 0.1)',
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      {/* Fish swimming around the scene */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <FishCharacter color="cyan" x={-80} y={80} size={0.5} speed={12} amplitude={14} delay={0} direction="right" />
        <FishCharacter color="ocean-400" x={-60} y={200} size={0.4} speed={14} amplitude={10} delay={1} direction="right" />
        <FishCharacter color="cyan-300" x={-100} y={340} size={0.35} speed={16} amplitude={8} delay={2.5} direction="right" />
        <FishCharacter color="coral" x={1100} y={120} size={0.4} speed={13} amplitude={12} delay={1.5} direction="left" />
        <FishCharacter color="cyan" x={1050} y={280} size={0.35} speed={15} amplitude={9} delay={3} direction="left" />
        <FishCharacter color="ocean-400" x={1120} y={420} size={0.3} speed={17} amplitude={7} delay={4} direction="left" />
        <FishCharacter color="coral" x={-120} y={480} size={0.3} speed={11} amplitude={8} delay={5} direction="right" />
        <FishCharacter color="cyan-300" x={1080} y={520} size={0.25} speed={18} amplitude={6} delay={5.5} direction="left" />
      </div>

      {/* 3D Hero Scene */}
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <HeroScene
            onObjectClick={handleObjectClick}
            onMascotHint={handleMascotHint}
            onClearHint={handleClearHint}
            activePanel={activePanel}
          />
        </Suspense>
      </div>

      {/* Mascot guide character — background decoration */}
      {!activePanel && (
        <Mascot hint={mascotHint} />
      )}

      {/* JOYCE KEREN name at bottom */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h1
            className="text-xl sm:text-2xl font-display font-bold tracking-[0.15em]"
            style={{ color: '#67e8f9', textShadow: '0 0 20px rgba(34, 211, 238, 0.3)' }}
          >
            JOYCE KEREN
          </h1>
          <p
            className="text-[10px] font-mono mt-1 tracking-[0.3em]"
            style={{ color: '#3da5e0' }}
          >
            CREATIVE DEVELOPER
          </p>
        </motion.div>
      </div>

      {/* 2D Content Panel */}
      <AnimatePresence>
        {activePanel && (
          <ContentPanel
            panel={activePanel}
            onBack={handleBackToRoom}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
