import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Float } from '@react-three/drei'
import * as THREE from 'three'

export default function InteractiveObject({ 
  children, 
  position = [0, 0, 0], 
  label = '', 
  onClick,
  isHighlighted = false,
  onHover,
  onHoverEnd,
}) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)
  const targetScale = useRef(1)

  useFrame(() => {
    if (!groupRef.current) return
    const scale = hovered || isHighlighted ? 1.08 : 1
    targetScale.current += (scale - targetScale.current) * 0.08
    groupRef.current.scale.set(targetScale.current, targetScale.current, targetScale.current)
  })

  return (
    <group ref={groupRef} position={position}>
      <Float speed={1.5} floatIntensity={0.3}>
        <mesh
          onClick={(e) => { e.stopPropagation(); onClick?.() }}
          onPointerOver={(e) => { e.stopPropagation(); setHovered(true); onHover?.() }}
          onPointerOut={(e) => { e.stopPropagation(); setHovered(false); onHoverEnd?.() }}
        >
          {children}
        </mesh>
      </Float>

      {/* Glow ring on hover */}
      {hovered && (
        <mesh position={[0, 0, 0]}>
          <ringGeometry args={[0.5, 0.7, 32]} />
          <meshBasicMaterial 
            color="#ff6b6b" 
            transparent 
            opacity={0.3} 
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Label tooltip */}
      {(hovered || isHighlighted) && (
        <Html
          position={[0, 2.2, 0]}
          center
          style={{
            pointerEvents: 'none',
            transition: 'opacity 0.3s ease',
          }}
        >
          <div className="px-4 py-2 rounded-lg bg-navy-800/90 backdrop-blur-sm border border-coral-400/30 shadow-lg shadow-coral-400/10">
            <span 
              className="text-sm font-medium tracking-wider text-off-white whitespace-nowrap"
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              {label}
            </span>
            <span className="block text-[10px] text-coral-400 font-mono mt-1">
              ▼ click to explore
            </span>
          </div>
        </Html>
      )}
    </group>
  )
}
