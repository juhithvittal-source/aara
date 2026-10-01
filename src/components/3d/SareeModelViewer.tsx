import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface SareeModelViewerProps {
  primaryColor: string;
  secondaryColor: string;
  zariShine: number;
  fabricSheen: number;
  lightingPreset: 'studio' | 'palace' | 'sunset' | 'noir';
  autoRotate: boolean;
}

// Draped Saree 3D Mannequin Silhouette with parametric folds and cascading Pallu
function DrapedSareeMesh({
  primaryColor,
  secondaryColor,
  zariShine,
  fabricSheen,
}: {
  primaryColor: string;
  secondaryColor: string;
  zariShine: number;
  fabricSheen: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const palluRef = useRef<THREE.Group>(null);
  const pleatsRef = useRef<THREE.Group>(null);

  // Subtle breathing / fabric idle animation
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (palluRef.current) {
      palluRef.current.rotation.z = Math.sin(t * 1.2) * 0.04 - 0.2;
      palluRef.current.rotation.x = Math.cos(t * 0.9) * 0.03 + 0.15;
    }
    if (pleatsRef.current) {
      pleatsRef.current.rotation.y = Math.sin(t * 0.8) * 0.015;
    }
  });

  const silkMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(primaryColor),
      emissive: new THREE.Color(primaryColor).multiplyScalar(0.08),
      roughness: Math.max(0.1, 1 - fabricSheen * 0.8),
      metalness: 0.18,
      clearcoat: fabricSheen,
      clearcoatRoughness: 0.15,
      reflectivity: 0.85,
      side: THREE.DoubleSide,
    });
  }, [primaryColor, fabricSheen]);

  const goldZariMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(secondaryColor),
      metalness: 0.88 * zariShine,
      roughness: 0.22,
      emissive: new THREE.Color(secondaryColor).multiplyScalar(0.15),
      side: THREE.DoubleSide,
    });
  }, [secondaryColor, zariShine]);

  const blouseMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(secondaryColor).multiplyScalar(0.7).add(new THREE.Color(primaryColor).multiplyScalar(0.3)),
      roughness: 0.35,
      metalness: 0.3,
    });
  }, [primaryColor, secondaryColor]);

  return (
    <group ref={groupRef} position={[0, -1.2, 0]} scale={[1.15, 1.15, 1.15]}>
      {/* 1. Mannequin Torso & Neck */}
      <mesh position={[0, 2.5, 0]}>
        <cylinderGeometry args={[0.2, 0.28, 0.45, 32]} />
        <meshStandardMaterial color="#1f181a" roughness={0.7} />
      </mesh>
      
      {/* Mannequin Head Silhouette */}
      <mesh position={[0, 2.9, 0]}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial color="#1a1315" roughness={0.7} />
      </mesh>

      {/* 2. Designer Blouse / Choli */}
      <mesh position={[0, 2.1, 0]}>
        <cylinderGeometry args={[0.42, 0.36, 0.65, 32]} />
        <primitive object={blouseMaterial} attach="material" />
      </mesh>

      {/* 3. Saree Skirt & Nivi Pleats (Lower body drape) */}
      <group ref={pleatsRef} position={[0, 0.85, 0]}>
        {/* Main curved flared skirt */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.38, 0.78, 1.9, 48, 1, true]} />
          <primitive object={silkMaterial} attach="material" />
        </mesh>

        {/* Vertical front box pleats */}
        {[-0.12, -0.06, 0, 0.06, 0.12].map((offset, i) => (
          <mesh key={i} position={[offset, -0.05, 0.36 + Math.abs(offset) * 0.1]} rotation={[0.08, 0, offset * 0.2]}>
            <boxGeometry args={[0.08, 1.8, 0.04]} />
            <primitive object={silkMaterial} attach="material" />
          </mesh>
        ))}

        {/* Golden Zari Hem Border along the ground */}
        <mesh position={[0, -0.92, 0]}>
          <cylinderGeometry args={[0.77, 0.8, 0.18, 48, 1, true]} />
          <primitive object={goldZariMaterial} attach="material" />
        </mesh>
      </group>

      {/* 4. Diagonal Torso Drape (Nivi Wrap from waist to left shoulder) */}
      <mesh position={[0.05, 1.85, 0.08]} rotation={[0.4, 0.3, -0.55]}>
        <torusGeometry args={[0.46, 0.12, 24, 64, Math.PI * 1.3]} />
        <primitive object={silkMaterial} attach="material" />
      </mesh>

      {/* Waist Golden Belt (Kamarbandh) */}
      <mesh position={[0, 1.76, 0]}>
        <torusGeometry args={[0.39, 0.025, 16, 48]} />
        <primitive object={goldZariMaterial} attach="material" />
      </mesh>

      {/* 5. Cascading Pallu (Draping over shoulder down the back with waves) */}
      <group ref={palluRef} position={[-0.32, 2.0, -0.1]}>
        {/* Main Pallu drape */}
        <mesh position={[-0.15, -0.9, -0.25]} rotation={[0.2, -0.3, -0.15]}>
          <planeGeometry args={[0.75, 2.2, 32, 32]} />
          <primitive object={silkMaterial} attach="material" />
        </mesh>

        {/* Intricate Golden Zari Pallu End (Rich Brocade Panel) */}
        <mesh position={[-0.15, -1.85, -0.28]} rotation={[0.2, -0.3, -0.15]}>
          <planeGeometry args={[0.75, 0.6, 16, 16]} />
          <primitive object={goldZariMaterial} attach="material" />
        </mesh>

        {/* Golden Border Edge along the Pallu length */}
        <mesh position={[-0.52, -0.9, -0.22]} rotation={[0.2, -0.3, -0.15]}>
          <boxGeometry args={[0.04, 2.2, 0.01]} />
          <primitive object={goldZariMaterial} attach="material" />
        </mesh>
      </group>

      {/* 6. Gold Zari Brocade Highlights on Torso Border */}
      <mesh position={[0.15, 2.1, 0.28]} rotation={[0.35, 0.2, -0.6]}>
        <boxGeometry args={[0.06, 0.9, 0.02]} />
        <primitive object={goldZariMaterial} attach="material" />
      </mesh>
    </group>
  );
}

// Lighting setup based on preset
function LightingEnvironment({ preset }: { preset: SareeModelViewerProps['lightingPreset'] }) {
  if (preset === 'palace') {
    return (
      <>
        <ambientLight intensity={0.6} color="#FFE8C2" />
        {/* Warm Candlelight Points */}
        <pointLight position={[3, 2, 3]} intensity={2.5} color="#FF9933" distance={10} />
        <pointLight position={[-3, 1, 2]} intensity={2.0} color="#FF7700" distance={8} />
        <pointLight position={[0, -1, 3]} intensity={1.5} color="#FFB366" distance={6} />
        <directionalLight position={[0, 5, 2]} intensity={1.2} color="#FFE0B2" />
      </>
    );
  }

  if (preset === 'sunset') {
    return (
      <>
        <ambientLight intensity={0.7} color="#FFD1BA" />
        {/* Golden Hour Sun */}
        <directionalLight position={[5, 4, 3]} intensity={3.0} color="#FFA54F" castShadow />
        <directionalLight position={[-4, 2, -2]} intensity={1.5} color="#800040" />
        <pointLight position={[0, 4, 0]} intensity={1.0} color="#FFD700" />
      </>
    );
  }

  if (preset === 'noir') {
    return (
      <>
        <ambientLight intensity={0.3} color="#FFFFFF" />
        {/* Dramatic high-contrast spotlight */}
        <spotLight position={[3, 7, 4]} angle={0.4} penumbra={0.8} intensity={4.5} color="#FFFFFF" castShadow />
        <pointLight position={[-4, 1, -3]} intensity={2.0} color="#D4AF37" />
      </>
    );
  }

  // Default: Studio Daylight
  return (
    <>
      <ambientLight intensity={1.0} color="#FFFDF7" />
      <directionalLight position={[4, 6, 5]} intensity={2.4} color="#FFF9E6" castShadow />
      <directionalLight position={[-4, 4, -3]} intensity={1.6} color="#D4AF37" />
      <pointLight position={[0, -2, 3]} intensity={0.8} color="#FFFFFF" />
    </>
  );
}

export const SareeModelViewer: React.FC<SareeModelViewerProps> = ({
  primaryColor,
  secondaryColor,
  zariShine,
  fabricSheen,
  lightingPreset,
  autoRotate,
}) => {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0.4, 4.4], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        shadows
        dpr={[1, 2]}
      >
        <LightingEnvironment preset={lightingPreset} />

        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.2}>
          <DrapedSareeMesh
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            zariShine={zariShine}
            fabricSheen={fabricSheen}
          />
        </Float>

        <ContactShadows
          position={[0, -1.85, 0]}
          opacity={0.65}
          scale={5.5}
          blur={2.2}
          far={3}
          color="#000000"
        />

        <Sparkles
          count={45}
          scale={[6, 5, 5]}
          size={2.5}
          speed={0.3}
          color={secondaryColor}
          opacity={0.6}
        />

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={2.5}
          maxDistance={6.5}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 6}
          autoRotate={autoRotate}
          autoRotateSpeed={1.5}
          dampingFactor={0.06}
        />
      </Canvas>
    </div>
  );
};
