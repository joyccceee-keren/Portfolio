import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import FishCharacter from './FishCharacter'

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.98 },
}

// Bubbles that float upward in the background
function Bubbles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 4 + Math.random() * 12,
            height: 4 + Math.random() * 12,
            left: `${5 + Math.random() * 90}%`,
            bottom: -20,
            background: `radial-gradient(circle at 30% 30%, rgba(34, 211, 238, 0.4), rgba(34, 211, 238, 0.1))`,
            border: '1px solid rgba(34, 211, 238, 0.15)',
          }}
          animate={{
            y: [0, -(300 + Math.random() * 400)],
            x: [0, (Math.random() - 0.5) * 60],
            opacity: [0, 0.6, 0.3, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 8,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default function Layout() {
  const location = useLocation()

  const isHomePage = location.pathname === '/'

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#0c1a2e' }}>
      {/* Background gradient — ocean depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 80%, #0f2847 0%, #0c1a2e 50%, #081428 100%)',
        }}
      />

      {/* Bubbles */}
      <Bubbles />

      {/* Fish background — only on non-home pages to avoid double fish */}
      {!isHomePage && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <FishCharacter color="cyan" x={-60} y={90} size={0.4} speed={10} amplitude={10} delay={0} direction="right" />
          <FishCharacter color="ocean-400" x={-40} y={220} size={0.35} speed={12} amplitude={8} delay={1.5} direction="right" />
          <FishCharacter color="cyan-300" x={-80} y={360} size={0.3} speed={14} amplitude={6} delay={3} direction="right" />
          <FishCharacter color="coral" x={1100} y={150} size={0.35} speed={11} amplitude={9} delay={2} direction="left" />
          <FishCharacter color="cyan" x={1050} y={320} size={0.3} speed={13} amplitude={7} delay={4} direction="left" />
          <FishCharacter color="ocean-400" x={1150} y={480} size={0.25} speed={15} amplitude={5} delay={5} direction="left" />
        </div>
      )}

      {/* Navbar */}
      <Navbar />

      {/* Page content */}
      <div className="relative z-10 w-full h-full pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
