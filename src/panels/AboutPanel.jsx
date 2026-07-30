import { motion } from 'framer-motion'

const skills = [
  { name: 'Python', level: 5 },
  { name: 'JavaScript', level: 5 },
  { name: 'HTML', level: 5 },
  { name: 'CSS', level: 5 },
  { name: 'React', level: 4 },
  { name: 'Node.js', level: 3 },
  { name: 'Git', level: 4 },
  { name: 'SQL', level: 3 },
  { name: 'TypeScript', level: 3 },
  { name: 'Tailwind CSS', level: 4 },
]

function SkillBar({ name, level, index }) {
  return (
    <motion.div 
      className="flex items-center gap-3"
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
    >
      <span className="text-xs font-mono text-warm-gray w-24 shrink-0">{name}</span>
      <div className="flex-1 h-2 rounded-full bg-navy-700/50 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-coral-400 to-cyan-400"
          initial={{ width: 0 }}
          animate={{ width: `${(level / 5) * 100}%` }}
          transition={{ duration: 0.8, delay: 0.7 + index * 0.05, ease: 'easeOut' }}
        />
      </div>
      <span className="text-[10px] font-mono text-cyan-400 w-4 text-right">{level}/5</span>
    </motion.div>
  )
}

export default function AboutPanel() {
  return (
    <div className="h-full flex flex-col">
      <motion.h2 
        className="text-2xl font-display font-bold text-off-white mb-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        About Me
      </motion.h2>

      <div className="flex-1 overflow-y-auto panel-scroll pr-2">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          {/* Cute Girl Avatar */}
          <motion.div 
            className="shrink-0 w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-br from-navy-700 to-navy-800 
                       border border-navy-600/50 flex items-center justify-center overflow-hidden
                       shadow-lg shadow-coral-400/10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <svg viewBox="0 0 72 88" className="w-24 h-28 sm:w-28 sm:h-32">
              <ellipse cx="36" cy="86" rx="20" ry="3" fill="#0f0d1a" opacity="0.35" />
              <ellipse cx="36" cy="26" rx="20" ry="21" fill="#ff6b6b" opacity="0.6" />
              <rect x="32" y="40" width="8" height="6" rx="3" fill="#fce4d6" />
              <path d="M22 46 L50 46 L54 74 L40 78 L32 78 L18 74 Z" fill="#22d3ee" opacity="0.85" />
              <path d="M30 46 L36 52 L42 46" stroke="#f5f0eb" strokeWidth="1.5" fill="none" opacity="0.5" />
              <circle cx="36" cy="56" r="3" fill="#ff6b6b" opacity="0.7" />
              <ellipse cx="18" cy="50" rx="7" ry="3.5" fill="#fce4d6" opacity="0.8" transform="rotate(-5 18 50)" />
              {/* Right arm - waving */}
              <motion.ellipse 
                cx="54" cy="50" rx="7" ry="3.5" fill="#fce4d6" opacity="0.8"
                animate={{ rotate: [5, 15, 5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: '50px 50px' }}
              />
              <ellipse cx="36" cy="26" rx="19" ry="20" fill="#ff6b6b" opacity="0.8" />
              <path d="M17 20 Q24 12 30 18 Q36 10 42 18 Q48 12 55 20" fill="#ff6b6b" opacity="0.9" />
              <path d="M20 22 Q28 14 36 20" fill="#e05555" opacity="0.4" />
              <path d="M17 26 Q14 32 16 38" stroke="#ff6b6b" strokeWidth="3" fill="none" opacity="0.7" strokeLinecap="round" />
              <path d="M55 26 Q58 32 56 38" stroke="#ff6b6b" strokeWidth="3" fill="none" opacity="0.7" strokeLinecap="round" />
              <ellipse cx="36" cy="30" rx="14" ry="13" fill="#fce4d6" opacity="0.95" />
              <ellipse cx="25" cy="33" rx="4" ry="2.5" fill="#ffb5b5" opacity="0.5" />
              <ellipse cx="47" cy="33" rx="4" ry="2.5" fill="#ffb5b5" opacity="0.5" />
              <ellipse cx="28" cy="28" rx="5" ry="6" fill="#0f0d1a" />
              <ellipse cx="28" cy="28" rx="4.5" ry="5.5" fill="#1a1730" />
              <ellipse cx="28" cy="28" rx="3.5" ry="4.5" fill="#34305a" />
              <circle cx="26" cy="26" r="2" fill="#f5f0eb" opacity="0.9" />
              <circle cx="30" cy="30" r="1.2" fill="#f5f0eb" opacity="0.5" />
              <ellipse cx="44" cy="28" rx="5" ry="6" fill="#0f0d1a" />
              <ellipse cx="44" cy="28" rx="4.5" ry="5.5" fill="#1a1730" />
              <ellipse cx="44" cy="28" rx="3.5" ry="4.5" fill="#34305a" />
              <circle cx="42" cy="26" r="2" fill="#f5f0eb" opacity="0.9" />
              <circle cx="46" cy="30" r="1.2" fill="#f5f0eb" opacity="0.5" />
              <path d="M22 20 Q28 18 33 21" stroke="#e05555" strokeWidth="1.2" fill="none" opacity="0.6" />
              <path d="M39 21 Q44 18 50 20" stroke="#e05555" strokeWidth="1.2" fill="none" opacity="0.6" />
              <path d="M33 36 Q36 39 39 36" stroke="#e05555" strokeWidth="1.5" fill="none" opacity="0.6" />
              <ellipse cx="32" cy="14" rx="5" ry="3" fill="#22d3ee" opacity="0.8" transform="rotate(-20 32 14)" />
              <ellipse cx="40" cy="14" rx="5" ry="3" fill="#22d3ee" opacity="0.8" transform="rotate(20 40 14)" />
              <circle cx="36" cy="16" r="2.5" fill="#22d3ee" opacity="0.9" />
              <ellipse cx="28" cy="78" rx="6" ry="3" fill="#fce4d6" opacity="0.7" />
              <ellipse cx="44" cy="78" rx="6" ry="3" fill="#fce4d6" opacity="0.7" />
              <ellipse cx="26" cy="80" rx="5" ry="2.5" fill="#ff6b6b" opacity="0.6" />
              <ellipse cx="46" cy="80" rx="5" ry="2.5" fill="#ff6b6b" opacity="0.6" />
            </svg>
          </motion.div>

          {/* Bio text */}
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-sm font-mono text-warm-gray leading-relaxed mb-4">
              Hey there! I'm a creative developer who loves building cool stuff with code. 
              I spend my time crafting web experiences, learning new technologies, and 
              turning ideas into reality.
            </p>
            <p className="text-sm font-mono text-warm-gray leading-relaxed mb-4">
              I work with Python, JavaScript, HTML, CSS and more. I love clean design, 
              smooth animations, and making things that look good and work great.
            </p>
            <div className="flex gap-3 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-md bg-navy-700/50 text-coral-400 border border-coral-400/10">
                ✦ creative
              </span>
              <span className="px-2.5 py-1 rounded-md bg-navy-700/50 text-cyan-400 border border-cyan-400/10">
                ✦ coder
              </span>
              <span className="px-2.5 py-1 rounded-md bg-navy-700/50 text-off-white border border-off-white/10">
                ✦ builder
              </span>
            </div>
          </motion.div>
        </div>

        {/* Skills */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-sm font-display font-bold text-off-white mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-coral-400" />
            Languages & Tools
          </h3>
          <div className="space-y-2.5">
            {skills.map((skill, i) => (
              <SkillBar key={skill.name} {...skill} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
