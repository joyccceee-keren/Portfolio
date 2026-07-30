import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('INITIALIZING...')
  const [fadeOut, setFadeOut] = useState(false)

  const statuses = [
    { at: 0, text: 'INITIALIZING...' },
    { at: 20, text: 'LOADING ASSETS...' },
    { at: 40, text: 'BUILDING SCENE...' },
    { at: 60, text: 'WARMING UP RENDERER...' },
    { at: 80, text: 'ALMOST THERE...' },
    { at: 95, text: 'READY!' },
  ]

  useEffect(() => {
    const duration = 2500
    const startTime = Date.now()

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const rawProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(rawProgress)

      const status = [...statuses].reverse().find((s) => rawProgress >= s.at)
      if (status) setStatusText(status.text)

      if (rawProgress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setFadeOut(true)
          setTimeout(onComplete, 800)
        }, 400)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [onComplete])

  const totalBlocks = 24
  const filledBlocks = Math.floor((progress / 100) * totalBlocks)

  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900"
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Sparkle particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: i % 2 === 0 ? '#ff6b6b' : '#22d3ee',
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              opacity: 0.2,
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Cute Girl SVG - centered large */}
      <motion.div
        className="mb-10"
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="100" height="120" viewBox="0 0 72 88" className="drop-shadow-xl" style={{ filter: 'drop-shadow(0 4px 20px rgba(255,107,107,0.4))' }}>
          {/* Shadow */}
          <ellipse cx="36" cy="86" rx="20" ry="3" fill="#0f0d1a" opacity="0.35" />
          
          {/* Hair back */}
          <ellipse cx="36" cy="26" rx="20" ry="21" fill="#ff6b6b" opacity="0.6" />
          
          {/* Neck */}
          <rect x="32" y="40" width="8" height="6" rx="3" fill="#fce4d6" />
          
          {/* Body / Dress */}
          <path d="M22 46 L50 46 L54 74 L40 78 L32 78 L18 74 Z" fill="#22d3ee" opacity="0.85" />
          
          {/* Dress collar */}
          <path d="M30 46 L36 52 L42 46" stroke="#f5f0eb" strokeWidth="1.5" fill="none" opacity="0.5" />
          
          {/* Dress bow */}
          <circle cx="36" cy="56" r="3" fill="#ff6b6b" opacity="0.7" />
          
          {/* Left arm */}
          <ellipse cx="18" cy="50" rx="7" ry="3.5" fill="#fce4d6" opacity="0.8" transform="rotate(-5 18 50)" />
          
          {/* Waving arm */}
          <motion.ellipse 
            cx="54" cy="50" rx="7" ry="3.5" fill="#fce4d6" opacity="0.8"
            animate={{ rotate: [5, 15, 5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
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
          
          {/* Eyebrows */}
          <path d="M22 20 Q28 18 33 21" stroke="#e05555" strokeWidth="1.2" fill="none" opacity="0.6" />
          <path d="M39 21 Q44 18 50 20" stroke="#e05555" strokeWidth="1.2" fill="none" opacity="0.6" />
          
          {/* Mouth */}
          <path d="M33 36 Q36 39 39 36" stroke="#e05555" strokeWidth="1.5" fill="none" opacity="0.6" />
          
          {/* Hair ribbon on top */}
          <ellipse cx="32" cy="14" rx="5" ry="3" fill="#22d3ee" opacity="0.8" transform="rotate(-20 32 14)" />
          <ellipse cx="40" cy="14" rx="5" ry="3" fill="#22d3ee" opacity="0.8" transform="rotate(20 40 14)" />
          <circle cx="36" cy="16" r="2.5" fill="#22d3ee" opacity="0.9" />
          
          {/* Legs/feet */}
          <ellipse cx="28" cy="78" rx="6" ry="3" fill="#fce4d6" opacity="0.7" />
          <ellipse cx="44" cy="78" rx="6" ry="3" fill="#fce4d6" opacity="0.7" />
          
          {/* Shoes */}
          <ellipse cx="26" cy="80" rx="5" ry="2.5" fill="#ff6b6b" opacity="0.6" />
          <ellipse cx="46" cy="80" rx="5" ry="2.5" fill="#ff6b6b" opacity="0.6" />
        </svg>
      </motion.div>

      {/* Name / Title */}
      <motion.p 
        className="text-off-white font-display text-lg font-bold tracking-wider mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Welcome to My Portfolio
      </motion.p>

      {/* Pixel-style Loading Bar */}
      <div className="relative mb-6">
        <div
          className="flex gap-[2px]"
          style={{
            border: '2px solid #34305a',
            padding: '4px',
            background: '#1a1730',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
          }}
        >
          {Array.from({ length: totalBlocks }).map((_, i) => (
            <div
              key={i}
              className="w-[10px] h-[14px] transition-all duration-100"
              style={{
                background: i < filledBlocks ? '#ff6b6b' : '#252145',
                boxShadow:
                  i < filledBlocks
                    ? '0 0 4px rgba(255, 107, 107, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)'
                    : 'inset 0 1px 0 rgba(255,255,255,0.05)',
                opacity: i < filledBlocks ? 1 : 0.4,
              }}
            />
          ))}
        </div>

        <div
          className="absolute inset-0 pointer-events-none shimmer"
          style={{ margin: '2px', padding: '4px', borderRadius: 0 }}
        />
      </div>

      {/* Status text */}
      <p
        className="text-[#22d3ee] text-xs tracking-[0.2em] font-pixel select-none"
        style={{ fontFamily: '"Press Start 2P", monospace' }}
      >
        {statusText}
      </p>

      {/* Percentage */}
      <p className="text-warm-gray text-[10px] mt-3 font-mono select-none">
        {Math.floor(progress)}%
      </p>

      {/* Bottom decorative dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: i % 2 === 0 ? '#ff6b6b' : '#22d3ee',
            }}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </motion.div>
  )
}
