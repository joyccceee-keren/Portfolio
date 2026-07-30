import { motion, AnimatePresence } from 'framer-motion'

export default function Mascot({ hint }) {
  return (
    <div className="fixed bottom-6 left-6 z-30 pointer-events-none">
      <div className="relative">
        {/* Speech bubble */}
        <AnimatePresence>
          {hint && (
            <motion.div
              className="absolute bottom-full left-0 mb-2 max-w-[200px]"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.9 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className="relative px-3 py-2 rounded-xl bg-navy-800/90 backdrop-blur-sm 
                          border border-coral-400/30 shadow-lg shadow-coral-400/10">
                <p className="text-[11px] font-mono text-off-white leading-relaxed">
                  {hint}
                </p>
                <div className="absolute -bottom-1.5 left-4 w-3 h-3 bg-navy-800/90 border-r border-b border-coral-400/30 
                            rotate-45 transform" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cute Girl Character */}
        <motion.div
          className="pointer-events-auto cursor-pointer"
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          whileHover={{ scale: 1.08 }}
        >
          <svg width="72" height="88" viewBox="0 0 72 88" className="drop-shadow-xl" style={{ filter: 'drop-shadow(0 4px 12px rgba(255,107,107,0.3))' }}>
            {/* Shadow */}
            <ellipse cx="36" cy="86" rx="20" ry="3" fill="#0f0d1a" opacity="0.35" />
            
            {/* Hair back */}
            <ellipse cx="36" cy="26" rx="20" ry="21" fill="#ff6b6b" opacity="0.6" />
            
            {/* Neck */}
            <rect x="32" y="40" width="8" height="6" rx="3" fill="#fce4d6" />
            
            {/* Body / Dress */}
            <motion.path
              d="M22 46 L50 46 L54 74 L40 78 L32 78 L18 74 Z"
              fill="#22d3ee"
              opacity="0.85"
              animate={{ 
                d: ["M22 46 L50 46 L54 74 L40 78 L32 78 L18 74 Z",
                    "M22 45 L50 45 L54 73 L40 77 L32 77 L18 73 Z",
                    "M22 46 L50 46 L54 74 L40 78 L32 78 L18 74 Z"]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            
            {/* Dress collar */}
            <path d="M30 46 L36 52 L42 46" stroke="#f5f0eb" strokeWidth="1.5" fill="none" opacity="0.5" />
            
            {/* Dress bow */}
            <motion.circle cx="36" cy="56" r="3" fill="#ff6b6b" opacity="0.7"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            
            {/* Arms */}
            <motion.ellipse 
              cx="18" cy="50" rx="7" ry="3.5" fill="#fce4d6" opacity="0.8"
              animate={{ rotate: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '22px 50px' }}
            />
            <motion.ellipse 
              cx="54" cy="50" rx="7" ry="3.5" fill="#fce4d6" opacity="0.8"
              animate={{ rotate: [0, 8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '50px 50px' }}
            />
            
            {/* Hair front */}
            <ellipse cx="36" cy="26" rx="19" ry="20" fill="#ff6b6b" opacity="0.8" />
            
            {/* Bangs */}
            <path d="M17 20 Q24 12 30 18 Q36 10 42 18 Q48 12 55 20" fill="#ff6b6b" opacity="0.9" />
            <path d="M20 22 Q28 14 36 20" fill="#e05555" opacity="0.4" />
            
            {/* Hair side strands */}
            <path d="M17 26 Q14 32 16 38" stroke="#ff6b6b" strokeWidth="3" fill="none" opacity="0.7" strokeLinecap="round" />
            <path d="M55 26 Q58 32 56 38" stroke="#ff6b6b" strokeWidth="3" fill="none" opacity="0.7" strokeLinecap="round" />
            
            {/* Face */}
            <ellipse cx="36" cy="30" rx="14" ry="13" fill="#fce4d6" opacity="0.95" />
            
            {/* Blush */}
            <ellipse cx="25" cy="33" rx="4" ry="2.5" fill="#ffb5b5" opacity="0.5" />
            <ellipse cx="47" cy="33" rx="4" ry="2.5" fill="#ffb5b5" opacity="0.5" />
            
            {/* Eyes - big anime style */}
            <motion.g
              animate={{ scaleY: [1, 0.15, 1] }}
              transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3.5 }}
            >
              {/* Left eye */}
              <ellipse cx="28" cy="28" rx="5" ry="6" fill="#0f0d1a" />
              <ellipse cx="28" cy="28" rx="4.5" ry="5.5" fill="#1a1730" />
              <ellipse cx="28" cy="28" rx="3.5" ry="4.5" fill="#34305a" />
              <circle cx="26" cy="26" r="2" fill="#f5f0eb" opacity="0.9" />
              <circle cx="30" cy="30" r="1.2" fill="#f5f0eb" opacity="0.5" />
              
              {/* Right eye */}
              <ellipse cx="44" cy="28" rx="5" ry="6" fill="#0f0d1a" />
              <ellipse cx="44" cy="28" rx="4.5" ry="5.5" fill="#1a1730" />
              <ellipse cx="44" cy="28" rx="3.5" ry="4.5" fill="#34305a" />
              <circle cx="42" cy="26" r="2" fill="#f5f0eb" opacity="0.9" />
              <circle cx="46" cy="30" r="1.2" fill="#f5f0eb" opacity="0.5" />
            </motion.g>
            
            {/* Eyebrows */}
            <path d="M22 20 Q28 18 33 21" stroke="#e05555" strokeWidth="1.2" fill="none" opacity="0.6" />
            <path d="M39 21 Q44 18 50 20" stroke="#e05555" strokeWidth="1.2" fill="none" opacity="0.6" />
            
            {/* Mouth - small cute smile */}
            <motion.path 
              d="M33 36 Q36 39 39 36" 
              stroke="#e05555" 
              strokeWidth="1.5" 
              fill="none" 
              opacity="0.6"
              animate={{ d: ["M33 36 Q36 39 39 36", "M33 36 Q36 38 39 36", "M33 36 Q36 39 39 36"] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            
            {/* Hair ribbon on top */}
            <motion.g
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '36px 14px' }}
            >
              <ellipse cx="32" cy="14" rx="5" ry="3" fill="#22d3ee" opacity="0.8" transform="rotate(-20 32 14)" />
              <ellipse cx="40" cy="14" rx="5" ry="3" fill="#22d3ee" opacity="0.8" transform="rotate(20 40 14)" />
              <circle cx="36" cy="16" r="2.5" fill="#22d3ee" opacity="0.9" />
            </motion.g>
            
            {/* Legs/feet */}
            <ellipse cx="28" cy="78" rx="6" ry="3" fill="#fce4d6" opacity="0.7" />
            <ellipse cx="44" cy="78" rx="6" ry="3" fill="#fce4d6" opacity="0.7" />
            
            {/* Shoes */}
            <ellipse cx="26" cy="80" rx="5" ry="2.5" fill="#ff6b6b" opacity="0.6" />
            <ellipse cx="46" cy="80" rx="5" ry="2.5" fill="#ff6b6b" opacity="0.6" />
          </svg>
        </motion.div>
      </div>
    </div>
  )
}
