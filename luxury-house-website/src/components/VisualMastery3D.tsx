'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

function GoldenSculpture() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      {/* A complex torus knot acting as an abstract sculpture */}
      <torusKnotGeometry args={[1.4, 0.4, 256, 64]} />
      <meshPhysicalMaterial
        color="#fbbf24" // amber-400
        emissive="#78350f" // amber-900
        emissiveIntensity={0.2}
        metalness={1}
        roughness={0.15}
        clearcoat={1}
        clearcoatRoughness={0.1}
        envMapIntensity={1.5}
      />
    </mesh>
  );
}

export default function VisualMastery3D() {
  return (
    <div className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#f59e0b" />
        
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0.3, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <GoldenSculpture />
          </Float>
        </PresentationControls>

        {/* Environment map for realistic reflections */}
        <Environment preset="city" />
        
        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.8}
          scale={10}
          blur={2.5}
          far={4}
          color="#f59e0b"
        />
      </Canvas>
      <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none">
        <div className="text-amber-400/80 text-[9px] tracking-[0.5em] uppercase font-bold bg-black/40 px-5 py-2.5 rounded-full backdrop-blur-md border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          Interactive Sculpture
        </div>
      </div>
    </div>
  );
}
