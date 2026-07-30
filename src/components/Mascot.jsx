import { motion, AnimatePresence } from 'framer-motion'

export default function Mascot({ hint }) {
  return (
    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
      <div className="relative flex flex-col items-center">
        {/* Speech bubble */}
        <AnimatePresence>
          {hint && (
            <motion.div
              className="absolute bottom-full mb-4 max-w-[260px]"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.9 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div
                className="relative px-4 py-2.5 rounded-xl backdrop-blur-sm 
                            border shadow-lg"
                style={{
                  background: 'rgba(15, 40, 71, 0.85)',
                  borderColor: 'rgba(34, 211, 238, 0.3)',
                  boxShadow: '0 4px 20px rgba(34, 211, 238, 0.1)',
                }}
              >
                <p className="text-xs font-mono leading-relaxed text-center" style={{ color: '#f0f8ff' }}>
                  {hint}
                </p>
                <div
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 transform"
                  style={{
                    background: 'rgba(15, 40, 71, 0.85)',
                    borderRight: '1px solid rgba(34, 211, 238, 0.3)',
                    borderBottom: '1px solid rgba(34, 211, 238, 0.3)',
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cute Girl Character — large background decoration */}
        <motion.div
          className="pointer-events-auto cursor-pointer"
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          whileHover={{ scale: 1.05 }}
        >
          <svg width="200" height="240" viewBox="0 0 72 88" className="drop-shadow-xl" style={{ filter: 'drop-shadow(0 8px 30px rgba(34, 211, 238, 0.25))' }}>
            {/* Shadow */}
            <ellipse cx="36" cy="86" rx="20" ry="3" fill="#0c1a2e" opacity="0.4" />

            {/* Hair back */}
            <ellipse cx="36" cy="26" rx="20" ry="21" fill="#22d3ee" opacity="0.5" />

            {/* Neck */}
            <rect x="32" y="40" width="8" height="6" rx="3" fill="#fce4d6" />

            {/* Body / Dress — light blue */}
            <motion.path
              d="M22 46 L50 46 L54 74 L40 78 L32 78 L18 74 Z"
              fill="#67e8f9"
              opacity="0.7"
              animate={{
                d: [
                  "M22 46 L50 46 L54 74 L40 78 L32 78 L18 74 Z",
                  "M22 45 L50 45 L54 73 L40 77 L32 77 L18 73 Z",
                  "M22 46 L50 46 L54 74 L40 78 L32 78 L18 74 Z",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Dress collar */}
            <path d="M30 46 L36 52 L42 46" stroke="#f0f8ff" strokeWidth="1.5" fill="none" opacity="0.5" />

            {/* Dress bow */}
            <motion.circle
              cx="36" cy="56" r="3" fill="#ff6b6b" opacity="0.6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Arms */}
            <motion.ellipse
              cx="18" cy="50" rx="7" ry="3.5" fill="#fce4d6" opacity="0.7"
              animate={{ rotate: [0, -10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '22px 50px' }}
            />
            <motion.ellipse
              cx="54" cy="50" rx="7" ry="3.5" fill="#fce4d6" opacity="0.7"
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '50px 50px' }}
            />

            {/* Hair front */}
            <ellipse cx="36" cy="26" rx="19" ry="20" fill="#22d3ee" opacity="0.7" />

            {/* Bangs */}
            <path d="M17 20 Q24 12 30 18 Q36 10 42 18 Q48 12 55 20" fill="#22d3ee" opacity="0.8" />
            <path d="M20 22 Q28 14 36 20" fill="#06b6d4" opacity="0.4" />

            {/* Hair side strands */}
            <path d="M17 26 Q14 32 16 38" stroke="#22d3ee" strokeWidth="3" fill="none" opacity="0.6" strokeLinecap="round" />
            <path d="M55 26 Q58 32 56 38" stroke="#22d3ee" strokeWidth="3" fill="none" opacity="0.6" strokeLinecap="round" />

            {/* Face */}
            <ellipse cx="36" cy="30" rx="14" ry="13" fill="#fce4d6" opacity="0.9" />

            {/* Blush */}
            <ellipse cx="25" cy="33" rx="4" ry="2.5" fill="#ffb5b5" opacity="0.4" />
            <ellipse cx="47" cy="33" rx="4" ry="2.5" fill="#ffb5b5" opacity="0.4" />

            {/* Eyes */}
            <motion.g
              animate={{ scaleY: [1, 0.15, 1] }}
              transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3.5 }}
            >
              <ellipse cx="28" cy="28" rx="5" ry="6" fill="#0c1a2e" />
              <ellipse cx="28" cy="28" rx="4.5" ry="5.5" fill="#0f2847" />
              <ellipse cx="28" cy="28" rx="3.5" ry="4.5" fill="#1a4a7a" />
              <circle cx="26" cy="26" r="2" fill="#f0f8ff" opacity="0.9" />
              <circle cx="30" cy="30" r="1.2" fill="#f0f8ff" opacity="0.5" />

              <ellipse cx="44" cy="28" rx="5" ry="6" fill="#0c1a2e" />
              <ellipse cx="44" cy="28" rx="4.5" ry="5.5" fill="#0f2847" />
              <ellipse cx="44" cy="28" rx="3.5" ry="4.5" fill="#1a4a7a" />
              <circle cx="42" cy="26" r="2" fill="#f0f8ff" opacity="0.9" />
              <circle cx="46" cy="30" r="1.2" fill="#f0f8ff" opacity="0.5" />
            </motion.g>

            {/* Eyebrows */}
            <path d="M22 20 Q28 18 33 21" stroke="#06b6d4" strokeWidth="1.2" fill="none" opacity="0.5" />
            <path d="M39 21 Q44 18 50 20" stroke="#06b6d4" strokeWidth="1.2" fill="none" opacity="0.5" />

            {/* Mouth */}
            <motion.path
              d="M33 36 Q36 39 39 36"
              stroke="#ff6b6b"
              strokeWidth="1.5"
              fill="none"
              opacity="0.5"
              animate={{ d: ["M33 36 Q36 39 39 36", "M33 36 Q36 38 39 36", "M33 36 Q36 39 39 36"] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Hair ribbon */}
            <motion.g
              animate={{ rotate: [-4, 4, -4] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '36px 14px' }}
            >
              <ellipse cx="32" cy="14" rx="5" ry="3" fill="#ff6b6b" opacity="0.7" transform="rotate(-20 32 14)" />
              <ellipse cx="40" cy="14" rx="5" ry="3" fill="#ff6b6b" opacity="0.7" transform="rotate(20 40 14)" />
              <circle cx="36" cy="16" r="2.5" fill="#ff6b6b" opacity="0.8" />
            </motion.g>

            {/* Legs/feet */}
            <ellipse cx="28" cy="78" rx="6" ry="3" fill="#fce4d6" opacity="0.6" />
            <ellipse cx="44" cy="78" rx="6" ry="3" fill="#fce4d6" opacity="0.6" />

            {/* Shoes */}
            <ellipse cx="26" cy="80" rx="5" ry="2.5" fill="#22d3ee" opacity="0.5" />
            <ellipse cx="46" cy="80" rx="5" ry="2.5" fill="#22d3ee" opacity="0.5" />
          </svg>
        </motion.div>
      </div>
    </div>
  )
}
