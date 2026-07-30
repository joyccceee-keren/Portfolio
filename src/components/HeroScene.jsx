import { useRef, useState, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, PerspectiveCamera, Float } from '@react-three/drei'
import * as THREE from 'three'

import InteractiveObject from './InteractiveObject'

// --- Room Walls ---
function Room() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#1a1730" roughness={0.8} metalness={0.1} />
      </mesh>
      
      {/* Floor grid lines for isometric feel */}
      <gridHelper args={[12, 12, '#252145', '#252145']} position={[0, -0.49, 0]} opacity={0.3} transparent />

      {/* Back wall */}
      <mesh position={[0, 2, -5]} receiveShadow>
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial color="#14112a" roughness={0.9} metalness={0.05} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-5, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 6]} />
        <meshStandardMaterial color="#121026" roughness={0.9} metalness={0.05} />
      </mesh>

      {/* Right wall */}
      <mesh position={[5, 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 6]} />
        <meshStandardMaterial color="#121026" roughness={0.9} metalness={0.05} />
      </mesh>
    </group>
  )
}

// --- Base platform rug ---
function Rug() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.48, 0]}>
      <circleGeometry args={[2.5, 32]} />
      <meshStandardMaterial color="#252145" roughness={1} metalness={0} transparent opacity={0.5} />
    </mesh>
  )
}

// --- Desk with Monitor ---
function Desk({ onClick, onHover, onHoverEnd }) {
  return (
    <InteractiveObject 
      position={[-1.2, 0, 0.5]} 
      label="Projects"
      onClick={onClick}
      onHover={onHover}
      onHoverEnd={onHoverEnd}
    >
      {/* Desk surface */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[2, 0.1, 1.2]} />
        <meshStandardMaterial color="#34305a" roughness={0.7} metalness={0.2} />
      </mesh>
      
      {/* Desk legs */}
      {[[-0.85, -0.25, -0.45], [0.85, -0.25, -0.45], [-0.85, -0.25, 0.45], [0.85, -0.25, 0.45]].map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <boxGeometry args={[0.08, 0.5, 0.08]} />
          <meshStandardMaterial color="#252145" roughness={0.8} metalness={0.3} />
        </mesh>
      ))}

      {/* Monitor stand */}
      <mesh position={[0, 0.45, -0.1]} castShadow>
        <boxGeometry args={[0.12, 0.2, 0.12]} />
        <meshStandardMaterial color="#34305a" roughness={0.6} metalness={0.3} />
      </mesh>
      
      {/* Monitor screen */}
      <mesh position={[0, 0.85, -0.1]} castShadow>
        <boxGeometry args={[1, 0.6, 0.05]} />
        <meshStandardMaterial color="#0f0d1a" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Monitor screen glow */}
      <mesh position={[0, 0.85, -0.075]}>
        <planeGeometry args={[0.9, 0.5]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.15} />
      </mesh>

      {/* Monitor bezel */}
      <mesh position={[0, 0.85, -0.08]}>
        <planeGeometry args={[1.05, 0.65]} />
        <meshBasicMaterial color="#1a1730" />
      </mesh>

      {/* Keyboard */}
      <mesh position={[0, 0.36, 0.2]} castShadow>
        <boxGeometry args={[0.7, 0.04, 0.3]} />
        <meshStandardMaterial color="#252145" roughness={0.8} />
      </mesh>
    </InteractiveObject>
  )
}

// --- Trophy Shelf / Arcade Cabinet ---
function TrophyShelf({ onClick, onHover, onHoverEnd }) {
  return (
    <InteractiveObject 
      position={[1.6, 0, -0.5]} 
      label="Achievements"
      onClick={onClick}
      onHover={onHover}
      onHoverEnd={onHoverEnd}
    >
      {/* Cabinet body */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[1, 1.2, 0.6]} />
        <meshStandardMaterial color="#1a1730" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Cabinet screen */}
      <mesh position={[0, 0.7, 0.31]}>
        <planeGeometry args={[0.7, 0.5]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.3} />
      </mesh>

      {/* Cabinet screen border */}
      <mesh position={[0, 0.7, 0.32]}>
        <planeGeometry args={[0.75, 0.55]} />
        <meshBasicMaterial color="#34305a" transparent opacity={0.8} />
      </mesh>

      {/* Control panel */}
      <mesh position={[0, 0.15, 0.1]} castShadow>
        <boxGeometry args={[0.8, 0.08, 0.3]} />
        <meshStandardMaterial color="#34305a" roughness={0.7} />
      </mesh>

      {/* Joystick */}
      <mesh position={[-0.15, 0.24, 0.15]} castShadow>
        <cylinderGeometry args={[0.03, 0.05, 0.12]} />
        <meshStandardMaterial color="#ff6b6b" roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[-0.15, 0.3, 0.15]}>
        <sphereGeometry args={[0.05]} />
        <meshStandardMaterial color="#ff6b6b" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Buttons */}
      {[[0.1, 0.22, 0.15], [0.25, 0.22, 0.15]].map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[0.04, 0.04, 0.04]} />
          <meshStandardMaterial color="#22d3ee" roughness={0.4} metalness={0.2} />
        </mesh>
      ))}

      {/* Trophy on top */}
      <mesh position={[0.2, 1.22, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 0.15]} />
        <meshStandardMaterial color="#ff6b6b" roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[0.2, 1.3, 0]}>
        <sphereGeometry args={[0.06]} />
        <meshStandardMaterial color="#ff6b6b" roughness={0.3} metalness={0.6} />
      </mesh>

      {/* Decorative pixel stripes */}
      <mesh position={[0, 0.4, 0.31]}>
        <planeGeometry args={[0.5, 0.02]} />
        <meshBasicMaterial color="#ff6b6b" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0, 0.5, 0.31]}>
        <planeGeometry args={[0.5, 0.02]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.6} />
      </mesh>
    </InteractiveObject>
  )
}

// --- Easel / Tablet ---
function Easel({ onClick, onHover, onHoverEnd }) {
  return (
    <InteractiveObject 
      position={[-1.8, 0, -1.2]} 
      label="About Me"
      onClick={onClick}
      onHover={onHover}
      onHoverEnd={onHoverEnd}
    >
      {/* Easel legs */}
      {[[-0.25, 0.3, 0], [0.25, 0.3, 0], [0, 0.3, -0.1]].map((pos, i) => (
        <mesh key={i} position={pos} rotation={i < 2 ? [0, 0, i === 0 ? 0.2 : -0.2] : [0.1, 0, 0]} castShadow>
          <boxGeometry args={[0.04, 1, 0.04]} />
          <meshStandardMaterial color="#34305a" roughness={0.8} />
        </mesh>
      ))}

      {/* Canvas / Tablet */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[0.8, 0.9, 0.04]} />
        <meshStandardMaterial color="#f5f0eb" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Screen content - abstract art */}
      <mesh position={[0, 0.7, 0.021]}>
        <planeGeometry args={[0.7, 0.8]} />
        <meshBasicMaterial color="#1a1730" />
      </mesh>

      {/* Colorful blobs on the canvas */}
      <mesh position={[-0.15, 0.8, 0.022]}>
        <circleGeometry args={[0.12, 16]} />
        <meshBasicMaterial color="#ff6b6b" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0.15, 0.65, 0.022]}>
        <circleGeometry args={[0.1, 16]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, 0.5, 0.022]}>
        <circleGeometry args={[0.08, 16]} />
        <meshBasicMaterial color="#ff6b6b" transparent opacity={0.6} />
      </mesh>

      {/* Pencil */}
      <mesh position={[0.35, 0.35, 0]} rotation={[0, 0, -0.5]} castShadow>
        <boxGeometry args={[0.04, 0.3, 0.04]} />
        <meshStandardMaterial color="#ff6b6b" roughness={0.5} />
      </mesh>
    </InteractiveObject>
  )
}

// --- Door / Mailbox ---
function Door({ onClick, onHover, onHoverEnd }) {
  return (
    <InteractiveObject 
      position={[2.2, 0, 1.5]} 
      label="Contact"
      onClick={onClick}
      onHover={onHover}
      onHoverEnd={onHoverEnd}
    >
      {/* Door frame */}
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[1, 2.1, 0.08]} />
        <meshStandardMaterial color="#252145" roughness={0.8} />
      </mesh>

      {/* Door panels */}
      <mesh position={[0, 0.6, 0.05]}>
        <planeGeometry args={[0.8, 0.7]} />
        <meshStandardMaterial color="#34305a" roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.4, 0.05]}>
        <planeGeometry args={[0.8, 0.7]} />
        <meshStandardMaterial color="#34305a" roughness={0.7} />
      </mesh>

      {/* Door handle */}
      <mesh position={[0.3, 1, 0.12]} castShadow>
        <sphereGeometry args={[0.05]} />
        <meshStandardMaterial color="#ff6b6b" roughness={0.3} metalness={0.6} />
      </mesh>

      {/* Mail slot */}
      <mesh position={[0, 1.7, 0.12]}>
        <boxGeometry args={[0.3, 0.05, 0.02]} />
        <meshStandardMaterial color="#22d3ee" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Envelope sticking out */}
      <mesh position={[0, 1.73, 0.05]} rotation={[0, 0, 0.1]}>
        <planeGeometry args={[0.2, 0.15]} />
        <meshBasicMaterial color="#f5f0eb" />
      </mesh>
    </InteractiveObject>
  )
}

// --- Easter Egg Object (small floating crystal) ---
function EasterEggObject({ onClick }) {
  const ref = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.5
      ref.current.position.y = 1.5 + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.1
    }
  })

  return (
    <group>
      <Float speed={2} floatIntensity={0.3}>
        <mesh
          ref={ref}
          position={[0.5, 1.5, -1.8]}
          onClick={(e) => { e.stopPropagation(); onClick(); }}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <octahedronGeometry args={[0.15]} />
          <meshStandardMaterial
            color={hovered ? '#ff6b6b' : '#22d3ee'}
            emissive={hovered ? '#ff6b6b' : '#22d3ee'}
            emissiveIntensity={hovered ? 0.8 : 0.2}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.8}
          />
        </mesh>
      </Float>

      {/* Glow */}
      <pointLight position={[0.5, 1.5, -1.8]} intensity={0.3} color="#22d3ee" distance={1.5} />
    </group>
  )
}

// --- Camera Controller with gentle orbiting ---
function CameraController({ mouseTarget, activePanel }) {
  const { camera } = useThree()
  const targetPos = useRef(new THREE.Vector3(0, 1.5, 4.5))
  const targetLookAt = useRef(new THREE.Vector3(0, 0.5, 0))
  
  // Zoom positions for each panel
  const zoomTargets = {
    projects: { pos: [-1.2, 0.8, 1.5], look: [-1.2, 0.5, 0.5] },
    achievements: { pos: [1.6, 0.8, 1.5], look: [1.6, 0.5, -0.5] },
    about: { pos: [-1.8, 0.8, 0.5], look: [-1.8, 0.5, -1.2] },
    contact: { pos: [2.2, 0.8, 3], look: [2.2, 0.5, 1.5] },
  }

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (activePanel) {
      // Zoom to object
      const target = zoomTargets[activePanel]
      if (target) {
        targetPos.current.lerp(
          new THREE.Vector3(target.pos[0], target.pos[1], target.pos[2]),
          0.05
        )
        targetLookAt.current.lerp(
          new THREE.Vector3(target.look[0], target.look[1], target.look[2]),
          0.05
        )
      }
    } else {
      // Gentle orbit based on mouse
      const mouseX = mouseTarget.current.x * 0.3
      const mouseY = mouseTarget.current.y * 0.15

      targetPos.current.lerp(
        new THREE.Vector3(
          Math.sin(time * 0.05 + mouseX) * 1.5,
          1.5 + mouseY * 0.5,
          4.5 + Math.cos(time * 0.05 + mouseX) * 0.5
        ),
        0.03
      )
      targetLookAt.current.lerp(
        new THREE.Vector3(mouseX * 0.5, 0.5 + mouseY * 0.3, 0),
        0.03
      )
    }

    camera.position.copy(targetPos.current)
    camera.lookAt(targetLookAt.current)
  })

  return null
}

// --- Main Scene ---
export default function HeroScene({ onObjectClick, onEasterEgg, onMascotHint, onClearHint, activePanel }) {
  const mouseTarget = useRef({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e) => {
    mouseTarget.current = {
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    }
  }, [])

  const handleObjectClick = useCallback((label) => {
    const panelMap = {
      'Projects': 'projects',
      'Achievements': 'achievements',
      'About Me': 'about',
      'Contact': 'contact',
    }
    const panel = panelMap[label]
    if (panel) {
      onObjectClick(panel)
    }
  }, [onObjectClick])

  return (
    <div 
      className="w-full h-full"
      onMouseMove={handleMouseMove}
      onTouchMove={(e) => {
        const touch = e.touches[0]
        mouseTarget.current = {
          x: (touch.clientX / window.innerWidth) * 2 - 1,
          y: -(touch.clientY / window.innerHeight) * 2 + 1,
        }
      }}
    >
      <Canvas shadows gl={{ antialias: true, alpha: false }} dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 1.5, 4.5]} fov={45} />
        
        {/* Lighting */}
        <ambientLight intensity={0.3} color="#34305a" />
        <directionalLight 
          position={[5, 8, 3]} 
          intensity={0.8} 
          color="#ff6b6b"
          castShadow 
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight 
          position={[-3, 4, -2]} 
          intensity={0.4} 
          color="#22d3ee"
        />
        <pointLight position={[0, 6, 0]} intensity={0.3} color="#22d3ee" />

        {/* Scene */}
        <Room />
        <Rug />
        
        {/* Interactive Objects */}
        <Desk 
          onClick={() => handleObjectClick('Projects')} 
          onHover={() => onMascotHint('check out my projects on the desk!')}
          onHoverEnd={onClearHint}
        />
        <TrophyShelf 
          onClick={() => handleObjectClick('Achievements')} 
          onHover={() => onMascotHint('click the trophy shelf to see my award!')}
          onHoverEnd={onClearHint}
        />
        <Easel 
          onClick={() => handleObjectClick('About Me')} 
          onHover={() => onMascotHint('learn more about me!')}
          onHoverEnd={onClearHint}
        />
        <Door 
          onClick={() => handleObjectClick('Contact')} 
          onHover={() => onMascotHint('send me a message!')}
          onHoverEnd={onClearHint}
        />
        
        {/* Easter Egg */}
        <EasterEggObject onClick={onEasterEgg} />

        {/* Shadows */}
        <ContactShadows 
          position={[0, -0.5, 0]} 
          opacity={0.5} 
          scale={10} 
          blur={2.5} 
          far={4} 
          color="#0f0d1a"
        />

        {/* Camera Controller */}
        <CameraController mouseTarget={mouseTarget} activePanel={activePanel} />
      </Canvas>
    </div>
  )
}
