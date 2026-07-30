import { motion } from 'framer-motion'
import FishCharacter from '../components/FishCharacter'
import AboutPanel from '../panels/AboutPanel'

export default function AboutPage() {
  return (
    <div className="relative w-full h-full pt-8 px-4 sm:px-8">
      {/* Fish swimming around */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FishCharacter color="pink" x={-70} y={90} size={0.5} speed={8} amplitude={14} delay={0} direction="right" />
        <FishCharacter color="cyan" x={-50} y={260} size={0.4} speed={10} amplitude={10} delay={1} direction="right" />
        <FishCharacter color="gold" x={-90} y={420} size={0.35} speed={12} amplitude={7} delay={2.5} direction="right" />
        <FishCharacter color="purple" x={1120} y={150} size={0.4} speed={9} amplitude={12} delay={3.5} direction="left" />
        <FishCharacter color="coral" x={1050} y={350} size={0.45} speed={11} amplitude={9} delay={4.5} direction="left" />
        <FishCharacter color="cyan" x={1180} y={520} size={0.3} speed={13} amplitude={6} delay={5.5} direction="left" />
      </div>

      {/* Page header */}
      <motion.div 
        className="relative z-10 max-w-4xl mx-auto mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-off-white">
          About <span className="text-coral-400">Me</span>
        </h1>
        <p className="text-sm font-mono text-warm-gray mt-2">
          Get to know me!
        </p>
      </motion.div>

      {/* About content */}
      <motion.div 
        className="relative z-10 max-w-4xl mx-auto h-[calc(100%-100px)]"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <div className="bg-navy-800/40 backdrop-blur-sm rounded-2xl border border-navy-600/30 p-5 h-full overflow-hidden">
          <AboutPanel />
        </div>
      </motion.div>

      {/* Decorative dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="flex gap-2">
          {['#ff6b6b', '#22d3ee', '#a78bfa', '#f472b6'].map((color, i) => (
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
