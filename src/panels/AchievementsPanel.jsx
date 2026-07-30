import { motion } from 'framer-motion'

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
        Things I've done
      </motion.p>

      {/* Empty state */}
      <motion.div 
        className="flex-1 overflow-y-auto panel-scroll pr-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <motion.div 
            className="flex flex-col items-center gap-0.5 pixel-art mb-4"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="flex gap-0.5">
              {[1,0,1].map((v, i) => (
                <div key={i} className="w-[8px] h-[8px]" style={{ background: v ? '#22d3ee' : 'transparent' }} />
              ))}
            </div>
            <div className="flex gap-0.5">
              {[1,1,1].map((v, i) => (
                <div key={i} className="w-[8px] h-[8px]" style={{ background: v ? '#22d3ee' : 'transparent' }} />
              ))}
            </div>
            <div className="flex gap-0.5">
              {[0,1,0].map((v, i) => (
                <div key={i} className="w-[8px] h-[8px]" style={{ background: v ? '#22d3ee' : 'transparent' }} />
              ))}
            </div>
          </motion.div>
          <p className="text-sm font-mono text-warm-gray/50 text-center">
            ✨ More coming soon ✨
          </p>
        </div>
      </motion.div>
    </div>
  )
}
