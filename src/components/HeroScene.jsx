import { useRef, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

import InteractiveObject from './InteractiveObject'

// ─── Floor with gradient vignette ───────────────────────────────────
function Floor() {
  return (
    <group>
      {/* Main floor disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <circleGeometry args={[4.8, 48]} />
        <meshStandardMaterial
          color="#0f2847"
          roughness={0.6}
          metalness={0.2}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Vignette ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.49, 0]} receiveShadow>
        <ringGeometry args={[4.0, 4.8, 48]} />
        <meshBasicMaterial
          color="#1a4a7a"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Subtle grid */}
      <gridHelper
        args={[8, 12, '#1a4a7a', '#0f2847']}
        position={[0, -0.48, 0]}
        opacity={0.2}
        transparent
      />
    </group>
  )
}

// ─── Room walls (ocean blue tones) ──────────────────────────────────
function Walls() {
  return (
    <group>
      {/* Back wall */}
      <mesh position={[0, 1.6, -4.5]} receiveShadow>
        <planeGeometry args={[10, 4.2]} />
        <meshStandardMaterial color="#0d1f3c" roughness={0.9} metalness={0.05} />
      </mesh>
      {/* Left wall */}
      <mesh position={[-4.5, 1.6, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[9, 4.2]} />
        <meshStandardMaterial color="#0c1a2e" roughness={0.9} metalness={0.05} />
      </mesh>
      {/* Right wall */}
      <mesh position={[4.5, 1.6, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[9, 4.2]} />
        <meshStandardMaterial color="#0c1a2e" roughness={0.9} metalness={0.05} />
      </mesh>
    </group>
  )
}

// ─── Rug (light blue) ───────────────────────────────────────────────
function Rug() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.47, 0]} receiveShadow>
      <circleGeometry args={[2.0, 32]} />
      <meshStandardMaterial
        color="#1a4a7a"
        roughness={1}
        metalness={0}
        transparent
        opacity={0.3}
      />
    </mesh>
  )
}

// ─── Trophy Shelf (light blue / cyan) ───────────────────────────────
function TrophyShelf({ onClick, onHover, onHoverEnd }) {
  return (
    <InteractiveObject
      position={[1.4, 0, 0.2]}
      label="Achievements"
      onClick={onClick}
      onHover={onHover}
      onHoverEnd={onHoverEnd}
    >
      {/* Cabinet body — light blue */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[1, 1.2, 0.6]} />
        <meshStandardMaterial color="#22d3ee" roughness={0.4} metalness={0.2} />
      </mesh>

      {/* Cabinet screen */}
      <mesh position={[0, 0.7, 0.31]} castShadow>
        <planeGeometry args={[0.7, 0.5]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.3} />
      </mesh>
      <mesh position={[0, 0.7, 0.32]} castShadow>
        <planeGeometry args={[0.75, 0.55]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.8} />
      </mesh>

      {/* Control panel */}
      <mesh position={[0, 0.15, 0.1]} castShadow>
        <boxGeometry args={[0.8, 0.08, 0.3]} />
        <meshStandardMaterial color="#0891b2" roughness={0.7} />
      </mesh>

      {/* Joystick */}
      <mesh position={[-0.15, 0.24, 0.15]} castShadow>
        <cylinderGeometry args={[0.03, 0.05, 0.12]} />
        <meshStandardMaterial color="#ff6b6b" roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[-0.15, 0.3, 0.15]}>
        <sphereGeometry args={[0.05]} />
        <meshStandardMaterial color="#ff6b6b" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Buttons */}
      {[[0.1, 0.22, 0.15], [0.25, 0.22, 0.15]].map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.04]} />
          <meshStandardMaterial color="#67e8f9" roughness={0.3} metalness={0.2} />
        </mesh>
      ))}

      {/* Trophy on top */}
      <mesh position={[0.2, 1.22, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 0.15]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.2} metalness={0.7} />
      </mesh>
      <mesh position={[0.2, 1.3, 0]} castShadow>
        <sphereGeometry args={[0.06]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.2} metalness={0.7} />
      </mesh>

      {/* Decorative stripes */}
      <mesh position={[0, 0.4, 0.31]} castShadow>
        <planeGeometry args={[0.5, 0.02]} />
        <meshBasicMaterial color="#ff6b6b" transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, 0.5, 0.31]} castShadow>
        <planeGeometry args={[0.5, 0.02]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.7} />
      </mesh>
    </InteractiveObject>
  )
}

// ─── Easel / Tablet (light blue) ────────────────────────────────────
function Easel({ onClick, onHover, onHoverEnd }) {
  return (
    <InteractiveObject
      position={[-1.4, 0, -0.8]}
      label="About Me"
      onClick={onClick}
      onHover={onHover}
      onHoverEnd={onHoverEnd}
    >
      {/* Easel legs */}
      {[[-0.25, 0.3, 0], [0.25, 0.3, 0], [0, 0.3, -0.1]].map((pos, i) => (
        <mesh key={i} position={pos} rotation={i < 2 ? [0, 0, i === 0 ? 0.2 : -0.2] : [0.1, 0, 0]} castShadow>
          <boxGeometry args={[0.04, 1, 0.04]} />
          <meshStandardMaterial color="#1a4a7a" roughness={0.8} />
        </mesh>
      ))}

      {/* Canvas — light */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[0.8, 0.9, 0.04]} />
        <meshStandardMaterial color="#e0f2fe" roughness={0.3} metalness={0.05} />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0.7, 0.021]} castShadow>
        <planeGeometry args={[0.7, 0.8]} />
        <meshBasicMaterial color="#0f2847" />
      </mesh>

      {/* Colorful blobs on canvas */}
      <mesh position={[-0.15, 0.8, 0.022]} castShadow>
        <circleGeometry args={[0.12, 16]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0.15, 0.65, 0.022]} castShadow>
        <circleGeometry args={[0.1, 16]} />
        <meshBasicMaterial color="#ff6b6b" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, 0.5, 0.022]} castShadow>
        <circleGeometry args={[0.08, 16]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.7} />
      </mesh>
    </InteractiveObject>
  )
}

// ─── Door (light blue) ──────────────────────────────────────────────
function Door({ onClick, onHover, onHoverEnd }) {
  return (
    <InteractiveObject
      position={[1.8, 0, 1.8]}
      label="Contact"
      onClick={onClick}
      onHover={onHover}
      onHoverEnd={onHoverEnd}
    >
      {/* Door frame */}
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[1, 2.1, 0.08]} />
        <meshStandardMaterial color="#0891b2" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Door panels */}
      <mesh position={[0, 0.6, 0.05]} castShadow>
        <planeGeometry args={[0.8, 0.7]} />
        <meshStandardMaterial color="#0e7490" roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.4, 0.05]} castShadow>
        <planeGeometry args={[0.8, 0.7]} />
        <meshStandardMaterial color="#0e7490" roughness={0.6} />
      </mesh>

      {/* Door handle */}
      <mesh position={[0.3, 1, 0.12]} castShadow>
        <sphereGeometry args={[0.05]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.2} metalness={0.7} />
      </mesh>

      {/* Mail slot */}
      <mesh position={[0, 1.7, 0.12]} castShadow>
        <boxGeometry args={[0.3, 0.05, 0.02]} />
        <meshStandardMaterial color="#67e8f9" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Envelope */}
      <mesh position={[0, 1.73, 0.05]} rotation={[0, 0, 0.1]} castShadow>
        <planeGeometry args={[0.2, 0.15]} />
        <meshBasicMaterial color="#f0f8ff" />
      </mesh>
    </InteractiveObject>
  )
}

// ─── Camera Controller ──────────────────────────────────────────────
function CameraController({ mouseTarget, activePanel }) {
  const { camera } = useThree()
  const targetPos = useRef(new THREE.Vector3(0, 1.2, 3.0))
  const targetLookAt = useRef(new THREE.Vector3(0, 0.3, 0))

  const zoomTargets = {
    achievements: { pos: [1.4, 0.7, 0.8], look: [1.4, 0.4, 0.2] },
    about: { pos: [-1.4, 0.7, 0.3], look: [-1.4, 0.4, -0.8] },
    contact: { pos: [1.8, 0.7, 2.5], look: [1.8, 0.4, 1.8] },
  }

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()

    if (activePanel) {
      const target = zoomTargets[activePanel]
      if (target) {
        targetPos.current.lerp(new THREE.Vector3(target.pos[0], target.pos[1], target.pos[2]), 0.05)
        targetLookAt.current.lerp(new THREE.Vector3(target.look[0], target.look[1], target.look[2]), 0.05)
      }
    } else {
      const breathe = Math.sin(time * 0.3) * 0.08
      const mouseX = mouseTarget.current.x * 0.25
      const mouseY = mouseTarget.current.y * 0.12

      targetPos.current.lerp(
        new THREE.Vector3(
          Math.sin(time * 0.08 + mouseX) * 1.0,
          1.2 + mouseY * 0.3 + breathe * 0.5,
          3.0 + Math.cos(time * 0.08 + mouseX) * 0.3 + breathe,
        ),
        0.025,
      )
      targetLookAt.current.lerp(new THREE.Vector3(mouseX * 0.4, 0.3 + mouseY * 0.2, 0), 0.025)
    }

    camera.position.copy(targetPos.current)
    camera.lookAt(targetLookAt.current)
  })

  return null
}

// ─── Main Scene ─────────────────────────────────────────────────────
export default function HeroScene({
  onObjectClick,
  onMascotHint,
  onClearHint,
  activePanel,
}) {
  const mouseTarget = useRef({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e) => {
    mouseTarget.current = {
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    }
  }, [])

  const handleObjectClick = useCallback(
    (label) => {
      const panelMap = {
        Achievements: 'achievements',
        'About Me': 'about',
        Contact: 'contact',
      }
      const panel = panelMap[label]
      if (panel) onObjectClick(panel)
    },
    [onObjectClick],
  )

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
        <PerspectiveCamera makeDefault position={[0, 1.2, 3.0]} fov={40} />

        {/* Lighting */}
        <ambientLight intensity={0.4} color="#3da5e0" />
        <directionalLight
          position={[3, 5, 4]}
          intensity={0.9}
          color="#6bc5f0"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight
          position={[-2, 3, -3]}
          intensity={0.5}
          color="#67e8f9"
        />
        <pointLight position={[0, 4, 0]} intensity={0.2} color="#22d3ee" />

        {/* Scene */}
        <Walls />
        <Floor />
        <Rug />

        <TrophyShelf
          onClick={() => handleObjectClick('Achievements')}
          onHover={() => onMascotHint('check out the trophy shelf!')}
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

        {/* Shadows */}
        <ContactShadows
          position={[0, -0.5, 0]}
          opacity={0.35}
          scale={6}
          blur={2.5}
          far={3.5}
          color="#06142e"
        />

        {/* Camera Controller */}
        <CameraController mouseTarget={mouseTarget} activePanel={activePanel} />
      </Canvas>
    </div>
  )
}
