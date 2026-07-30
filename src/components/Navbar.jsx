import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const navItems = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/projects', label: 'Projects', icon: '💻' },
  { path: '/about', label: 'About', icon: '✨' },
  { path: '/contact', label: 'Contact', icon: '📬' },
]

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between bg-navy-800/70 backdrop-blur-xl rounded-2xl border border-navy-600/30 px-4 py-2 shadow-lg shadow-navy-900/30">
          {/* Logo / Brand */}
          <NavLink to="/" className="flex items-center gap-2 group">
            <motion.div
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-coral-400 to-cyan-400 flex items-center justify-center text-navy-900 font-bold text-sm font-display"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              J
            </motion.div>
            <span className="text-sm font-display font-bold text-off-white hidden sm:block group-hover:text-coral-400 transition-colors duration-300">
              Portfolio
            </span>
          </NavLink>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-300
                  ${isActive 
                    ? 'text-coral-400 bg-coral-400/10' 
                    : 'text-warm-gray/70 hover:text-off-white hover:bg-navy-700/50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="text-sm">{item.icon}</span>
                    <span className="hidden sm:inline">{item.label}</span>
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-0.5 left-2 right-2 h-0.5 rounded-full bg-coral-400"
                        layoutId="nav-indicator"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
