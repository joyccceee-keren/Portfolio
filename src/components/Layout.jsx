import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.98 },
}

export default function Layout() {
  const location = useLocation()

  return (
    <div className="relative w-full h-full overflow-hidden bg-navy-900">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800/50 to-navy-900 pointer-events-none" />

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
