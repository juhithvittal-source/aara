import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function WavyFabricRibbon() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.rotation.z = Math.sin(t * 0.2) * 0.08;
      meshRef.current.rotation.y = Math.cos(t * 0.25) * 0.15;
      meshRef.current.position.y = Math.sin(t * 0.4) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={[1.4, 1.4, 1.4]}>
      <torusKnotGeometry args={[2.5, 0.45, 120, 32, 2, 5]} />
      <meshPhysicalMaterial
        color="#3B0910"
        emissive="#1D0509"
        roughness={0.2}
        metalness={0.2}
        clearcoat={0.9}
        clearcoatRoughness={0.1}
        wireframe={false}
      />
    </mesh>
  );
}

export const FabricCanvasBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.5} color="#FFE6CC" />
        <directionalLight position={[5, 5, 5]} intensity={1.8} color="#D4AF37" />
        <directionalLight position={[-5, -5, -2]} intensity={0.8} color="#680C1A" />
        <WavyFabricRibbon />
      </Canvas>
    </div>
  );
};
