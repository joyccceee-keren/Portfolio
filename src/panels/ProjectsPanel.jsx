import { motion } from 'framer-motion'

const projects = [
  {
    title: 'NAG',
    desc: 'A next-generation authentication gateway with multi-factor support',
    tech: ['React', 'Node.js', 'Redis', 'Docker'],
    github: '#',
  },
  {
    title: 'Virtual Steering',
    desc: 'Virtual steering wheel and control system for simulation environments',
    tech: ['Three.js', 'WebSocket', 'C++', 'Python'],
    github: '#',
  },
  {
    title: 'Digital Signature',
    desc: 'Digital signature verification tool with cryptographic validation',
    tech: ['Rust', 'WebAssembly', 'React', 'TypeScript'],
    github: '#',
  },
  {
    title: 'OTP Login System',
    desc: 'One-time-password authentication flow with time-based tokens',
    tech: ['Go', 'PostgreSQL', 'React', 'TOTP'],
    github: '#',
  },
  {
    title: 'Typing Speed Game',
    desc: 'Real-time typing speed tester with accuracy tracking',
    tech: ['React', 'Framer Motion', 'IndexedDB', 'CSS'],
    github: '#',
  },
  {
    title: 'Highway Speed Estimation',
    desc: 'Vehicle speed estimation project using computer vision',
    tech: ['Python', 'OpenCV', 'TensorFlow', 'YOLO'],
    github: '#',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export default function ProjectsPanel() {
  return (
    <div className="h-full flex flex-col">
      <motion.h2 
        className="text-2xl font-display font-bold text-off-white mb-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        Projects
      </motion.h2>
      <motion.p 
        className="text-sm text-warm-gray font-mono mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        Things I've built
      </motion.p>

      <motion.div 
        className="flex-1 overflow-y-auto panel-scroll pr-2 space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            variants={cardVariants}
            className="group relative p-4 rounded-xl bg-navy-800/50 border border-navy-600/30 
                       hover:border-coral-400/30 transition-all duration-300
                       hover:shadow-lg hover:shadow-coral-400/5 cursor-pointer"
          >
            {/* Accent bar */}
            <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-coral-400/50 rounded-full 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className="text-base font-display font-bold text-off-white group-hover:text-coral-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-xs text-warm-gray font-mono mt-1.5 leading-relaxed">
                  {project.desc}
                </p>
              </div>
              
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 p-2 rounded-lg bg-navy-700/50 text-warm-gray 
                         hover:bg-navy-600 hover:text-coral-400 transition-all duration-300
                         hover:scale-110 active:scale-95"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-[10px] font-mono rounded-md
                           bg-navy-700/50 text-cyan-400/80 border border-cyan-400/10
                           group-hover:border-cyan-400/20 transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
