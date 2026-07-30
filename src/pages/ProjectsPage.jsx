import { motion } from 'framer-motion'
import FishCharacter from '../components/FishCharacter'
import ProjectsPanel from '../panels/ProjectsPanel'

export default function ProjectsPage() {
  return (
    <div className="relative w-full h-full pt-8 px-4 sm:px-8">
      {/* Fish swimming around */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FishCharacter color="cyan" x={-60} y={90} size={0.45} speed={10} amplitude={12} delay={0} direction="right" />
        <FishCharacter color="ocean-400" x={-80} y={240} size={0.35} speed={12} amplitude={8} delay={1.5} direction="right" />
        <FishCharacter color="cyan-300" x={-40} y={400} size={0.4} speed={9} amplitude={14} delay={2.5} direction="right" />
        <FishCharacter color="coral" x={1120} y={160} size={0.4} speed={11} amplitude={10} delay={2} direction="left" />
        <FishCharacter color="cyan" x={1080} y={340} size={0.35} speed={13} amplitude={7} delay={3.5} direction="left" />
        <FishCharacter color="gold" x={1150} y={500} size={0.3} speed={14} amplitude={6} delay={4.5} direction="left" />
      </div>

      {/* Page header */}
      <motion.div 
        className="relative z-10 max-w-4xl mx-auto mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl sm:text-4xl font-display font-bold" style={{ color: '#f0f8ff' }}>
          My <span style={{ color: '#22d3ee' }}>Projects</span>
        </h1>
        <p className="text-sm font-mono mt-2" style={{ color: '#3da5e0' }}>
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
        <div className="backdrop-blur-sm rounded-2xl p-5 h-full overflow-hidden"
          style={{ background: 'rgba(15, 40, 71, 0.4)', border: '1px solid rgba(34, 211, 238, 0.15)' }}>
          <ProjectsPanel />
        </div>
      </motion.div>
    </div>
  )
}
