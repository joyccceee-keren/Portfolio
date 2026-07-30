import { motion } from 'framer-motion'
import FishCharacter from '../components/FishCharacter'
import ProjectsPanel from '../panels/ProjectsPanel'

export default function ProjectsPage() {
  return (
    <div className="relative w-full h-full pt-8 px-4 sm:px-8">
      {/* Fish swimming around */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FishCharacter color="coral" x={-60} y={120} size={0.45} speed={9} amplitude={12} delay={0} direction="right" />
        <FishCharacter color="purple" x={-80} y={280} size={0.35} speed={11} amplitude={8} delay={1.5} direction="right" />
        <FishCharacter color="cyan" x={-40} y={450} size={0.5} speed={8} amplitude={14} delay={2} direction="right" />
        <FishCharacter color="gold" x={1150} y={200} size={0.4} speed={10} amplitude={10} delay={3} direction="left" />
        <FishCharacter color="pink" x={1080} y={380} size={0.35} speed={12} amplitude={7} delay={4} direction="left" />
      </div>

      {/* Page header */}
      <motion.div 
        className="relative z-10 max-w-4xl mx-auto mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-off-white">
          My <span className="text-coral-400">Projects</span>
        </h1>
        <p className="text-sm font-mono text-warm-gray mt-2">
          Things I've built with code
        </p>
      </motion.div>

      {/* Projects list */}
      <motion.div 
        className="relative z-10 max-w-4xl mx-auto h-[calc(100%-100px)]"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <div className="bg-navy-800/40 backdrop-blur-sm rounded-2xl border border-navy-600/30 p-5 h-full overflow-hidden">
          <ProjectsPanel />
        </div>
      </motion.div>

      {/* Decorative fish at bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="flex gap-2">
          {['#ff6b6b', '#22d3ee', '#a78bfa', '#fbbf24'].map((color, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: color }}
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
