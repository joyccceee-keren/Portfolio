import { motion } from 'framer-motion'
import ProjectsPanel from '../panels/ProjectsPanel'
import AchievementsPanel from '../panels/AchievementsPanel'
import AboutPanel from '../panels/AboutPanel'
import ContactPanel from '../panels/ContactPanel'

const panelComponents = {
  projects: ProjectsPanel,
  achievements: AchievementsPanel,
  about: AboutPanel,
  contact: ContactPanel,
}

const panelTitles = {
  projects: 'Projects',
  achievements: 'Achievements',
  about: 'About Me',
  contact: 'Contact',
}

export default function ContentPanel({ panel, onBack }) {
  const PanelComponent = panelComponents[panel]

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 z-40 bg-navy-900/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onBack}
      />

      {/* Panel */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 z-50 w-full sm:w-[420px] lg:w-[480px]
                   bg-gradient-to-b from-navy-800/95 to-navy-900/98 backdrop-blur-xl
                   border-l border-navy-600/30 shadow-2xl shadow-navy-900/50"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ 
          type: 'spring', 
          damping: 30, 
          stiffness: 300,
          mass: 0.8,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-navy-600/20">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono text-warm-gray
                     hover:text-coral-400 hover:bg-navy-700/50 transition-all duration-300
                     active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to room
          </button>

          {/* Panel indicator */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-coral-400 animate-pulse" />
            <span className="text-[10px] font-mono text-warm-gray/60 uppercase tracking-wider">
              {panelTitles[panel]}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 h-[calc(100%-60px)]">
          <PanelComponent />
        </div>
      </motion.div>
    </>
  )
}
