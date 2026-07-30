import { motion } from 'framer-motion'

const fishColors = {
  coral: { body: '#ff6b6b', fin: '#ff5252', tail: '#ff8e8e' },
  cyan: { body: '#22d3ee', fin: '#06b6d4', tail: '#67e8f9' },
  purple: { body: '#a78bfa', fin: '#8b5cf6', tail: '#c4b5fd' },
  gold: { body: '#fbbf24', fin: '#f59e0b', tail: '#fcd34d' },
  pink: { body: '#f472b6', fin: '#ec4899', tail: '#f9a8d4' },
}

const fishVariants = {
  swim: (custom) => ({
    x: custom.direction === 'right' 
      ? [custom.startX, custom.endX, custom.startX]
      : [custom.startX, custom.endX, custom.startX],
    y: [0, custom.amplitude || -15, 0],
    rotate: custom.direction === 'right'
      ? [0, custom.tilt || -5, 0]
      : [180, 180 + (custom.tilt || -5), 180],
  }),
  float: {
    y: [0, -3, 0],
  },
}

export default function FishCharacter({ 
  color = 'coral', 
  size = 1,
  x = 0,
  y = 0,
  direction = 'right',
  speed = 4,
  amplitude = 12,
  tilt = 4,
  delay = 0,
}) {
  const colors = fishColors[color] || fishColors.coral
  const scale = size

  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      initial={{ x, y }}
      animate="swim"
      variants={fishVariants}
      custom={{ 
        startX: x,
        endX: typeof x === 'number' ? x + (direction === 'right' ? 200 : -200) : x + 200, 
        amplitude,
        direction,
        tilt 
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      <motion.div
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay }}
      >
        <svg 
          width={48 * scale} 
          height={24 * scale} 
          viewBox="0 0 48 24"
          className="drop-shadow-lg"
          style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.3))' }}
        >
          {/* Tail */}
          <motion.path
            d={`M0 ${12 * scale} L${8 * scale} ${6 * scale} L${8 * scale} ${18 * scale} Z`}
            fill={colors.tail}
            animate={{ 
              d: [
                `M0 ${12 * scale} L${8 * scale} ${6 * scale} L${8 * scale} ${18 * scale} Z`,
                `M-2 ${12 * scale} L${6 * scale} ${7 * scale} L${6 * scale} ${17 * scale} Z`,
                `M0 ${12 * scale} L${8 * scale} ${6 * scale} L${8 * scale} ${18 * scale} Z`,
              ]
            }}
            transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay }}
          />
          
          {/* Body */}
          <ellipse cx={24 * scale} cy={12 * scale} rx={16 * scale} ry={8 * scale} fill={colors.body} />
          
          {/* Dorsal fin */}
          <motion.path
            d={`M${20 * scale} ${4 * scale} L${28 * scale} ${4 * scale} L${24 * scale} ${0} Z`}
            fill={colors.fin}
            animate={{ 
              d: [
                `M${20 * scale} ${4 * scale} L${28 * scale} ${4 * scale} L${24 * scale} ${0} Z`,
                `M${21 * scale} ${4 * scale} L${27 * scale} ${4 * scale} L${24 * scale} ${-1 * scale} Z`,
                `M${20 * scale} ${4 * scale} L${28 * scale} ${4 * scale} L${24 * scale} ${0} Z`,
              ]
            }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut', delay }}
          />
          
          {/* Pectoral fin */}
          <motion.path
            d={`M${26 * scale} ${16 * scale} Q${30 * scale} ${20 * scale} ${22 * scale} ${18 * scale} Z`}
            fill={colors.fin}
            opacity={0.7}
            animate={{ 
              d: [
                `M${26 * scale} ${16 * scale} Q${30 * scale} ${20 * scale} ${22 * scale} ${18 * scale} Z`,
                `M${26 * scale} ${17 * scale} Q${29 * scale} ${21 * scale} ${22 * scale} ${18 * scale} Z`,
                `M${26 * scale} ${16 * scale} Q${30 * scale} ${20 * scale} ${22 * scale} ${18 * scale} Z`,
              ]
            }}
            transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut', delay }}
          />
          
          {/* Eye */}
          <circle cx={32 * scale} cy={10 * scale} r={3.5 * scale} fill="white" />
          <circle cx={33 * scale} cy={9.5 * scale} r={2 * scale} fill="#0f0d1a" />
          <circle cx={33.8 * scale} cy={9 * scale} r={0.8 * scale} fill="white" opacity={0.9} />
          
          {/* Mouth / smile */}
          <motion.path
            d={`M${36 * scale} ${13 * scale} Q${38 * scale} ${14.5 * scale} ${36 * scale} ${15 * scale}`}
            stroke="#0f0d1a"
            strokeWidth={1.2 * scale}
            fill="none"
            opacity={0.4}
            animate={{ 
              d: [
                `M${36 * scale} ${13 * scale} Q${38 * scale} ${14.5 * scale} ${36 * scale} ${15 * scale}`,
                `M${36 * scale} ${13 * scale} Q${38 * scale} ${14 * scale} ${36 * scale} ${14.5 * scale}`,
                `M${36 * scale} ${13 * scale} Q${38 * scale} ${14.5 * scale} ${36 * scale} ${15 * scale}`,
              ]
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay }}
          />
          
          {/* Scales decoration */}
          <path
            d={`M${16 * scale} ${10 * scale} Q${18 * scale} ${12 * scale} ${16 * scale} ${14 * scale}`}
            stroke={colors.fin}
            strokeWidth={0.8 * scale}
            fill="none"
            opacity={0.4}
          />
          <path
            d={`M${20 * scale} ${9 * scale} Q${22 * scale} ${12 * scale} ${20 * scale} ${15 * scale}`}
            stroke={colors.fin}
            strokeWidth={0.8 * scale}
            fill="none"
            opacity={0.3}
          />
        </svg>
      </motion.div>
    </motion.div>
  )
}
