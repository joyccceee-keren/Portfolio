import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true
    
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [target, duration])

  return (
    <span className="tabular-nums">
      {count}{suffix}
    </span>
  )
}

const achievement = {
  name: 'Hackathon Champion 🏆',
  place: '1st Place',
  desc: 'Built a real-time collaborative code editor that won first place at the 2025 Hackathon.',
}

export default function AchievementsPanel() {
  return (
    <div className="h-full flex flex-col">
      <motion.h2 
        className="text-2xl font-display font-bold text-off-white mb-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        Achievements
      </motion.h2>
      <motion.p 
        className="text-sm text-warm-gray font-mono mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        What I've accomplished
      </motion.p>

      {/* Trophy / Win block */}
      <motion.div 
        className="relative p-6 rounded-xl bg-gradient-to-br from-navy-800/60 to-navy-800/30 
                   border border-coral-400/20 mb-6 overflow-hidden
                   shadow-lg shadow-coral-400/5"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        {/* Decorative glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-coral-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-cyan-400/10 rounded-full blur-3xl" />

        {/* Pixel decoration dots */}
        <div className="absolute top-3 right-3 flex gap-1">
          {['#ff6b6b', '#22d3ee', '#ff6b6b'].map((color, i) => (
            <motion.div 
              key={i} 
              className="w-2 h-2 rounded-full" 
              style={{ background: color, opacity: 0.4 }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>

        <div className="flex items-center gap-5">
          {/* Trophy icon - pixel art style */}
          <motion.div 
            className="hidden sm:flex flex-col items-center gap-0.5 pixel-art"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="flex gap-0.5">
              {[1,0,1].map((v, i) => (
                <div key={i} className="w-[8px] h-[8px]" style={{ background: v ? '#ff6b6b' : 'transparent' }} />
              ))}
            </div>
            <div className="flex gap-0.5">
              {[1,1,1].map((v, i) => (
                <div key={i} className="w-[8px] h-[8px]" style={{ background: v ? '#ff6b6b' : 'transparent' }} />
              ))}
            </div>
            <div className="flex gap-0.5">
              {[0,1,0].map((v, i) => (
                <div key={i} className="w-[8px] h-[8px]" style={{ background: v ? '#ff6b6b' : 'transparent' }} />
              ))}
            </div>
          </motion.div>

          <div className="flex-1">
            <div className="text-3xl font-bold font-display text-coral-400 flex items-center gap-2">
              <span>🏆</span>
              <AnimatedCounter target={1} suffix="" />
              <span className="text-lg font-mono text-warm-gray font-normal">won</span>
            </div>
            <div className="mt-2">
              <h3 className="text-base font-display font-bold text-off-white">{achievement.name}</h3>
              <p className="text-xs font-mono text-warm-gray mt-1 leading-relaxed">
                {achievement.desc}
              </p>
              <span className="inline-block mt-2 px-2.5 py-1 text-[10px] font-mono rounded-md
                           bg-coral-400/10 text-coral-400 border border-coral-400/20">
                {achievement.place}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Future goals */}
      <motion.div 
        className="flex-1 overflow-y-auto panel-scroll pr-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="text-sm font-display font-bold text-off-white mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          More coming soon
        </h3>
        <div className="p-4 rounded-xl bg-navy-800/30 border border-navy-600/20 border-dashed">
          <p className="text-xs font-mono text-warm-gray/50 text-center">
            ✨ More achievements loading... ✨
          </p>
        </div>
      </motion.div>
    </div>
  )
}
