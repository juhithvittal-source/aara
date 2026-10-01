import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Custom shader for the flowing silk saree cloth with gold zari border
const SilkClothShader = {
  vertexShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying float vWave;

    void main() {
      vUv = uv;
      vec3 pos = position;

      // Complex fluid wave simulation for silk fabric
      float wave1 = sin(pos.x * 2.2 + uTime * 1.6 + uMouse.x * 1.5) * 0.35;
      float wave2 = cos(pos.y * 1.8 + uTime * 1.2 + uMouse.y * 1.5) * 0.28;
      float wave3 = sin((pos.x + pos.y) * 3.0 + uTime * 2.1) * 0.14;
      float wave4 = cos(pos.x * 5.0 - uTime * 2.5) * 0.06;
      
      // Edge flutter
      float edgeFlutter = sin(pos.x * 8.0 + uTime * 3.5) * 0.04 * (1.0 - uv.y);

      float totalWave = wave1 + wave2 + wave3 + wave4 + edgeFlutter;
      pos.z += totalWave;
      
      // Slight diagonal tilt like a draped pallu
      pos.z += (uv.x - 0.5) * 0.4 * sin(uTime * 0.8);

      vWave = totalWave;
      vPosition = pos;
      vNormal = normalize(normalMatrix * normal);

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColorBase;
    uniform vec3 uColorDeep;
    uniform vec3 uColorGold;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying float vWave;

    void main() {
      // Base anisotropic silk luster
      vec3 lightDir = normalize(vec3(0.6, 1.0, 0.8));
      vec3 viewDir = normalize(-vPosition);
      
      float diff = max(dot(vNormal, lightDir), 0.0);
      
      // Silk sheen specular (double highlight)
      vec3 halfVector = normalize(lightDir + viewDir);
      float spec = pow(max(dot(vNormal, halfVector), 0.0), 32.0) * 0.75;
      float softSpec = pow(max(dot(vNormal, halfVector), 0.0), 8.0) * 0.35;

      // Gradient depth in folds
      vec3 silkColor = mix(uColorDeep, uColorBase, diff * 0.8 + 0.2);
      silkColor += vec3(0.18, 0.04, 0.08) * vWave;

      // Zari Gold Border calculation
      // Top and bottom borders + vertical pallu border
      float borderBottom = smoothstep(0.0, 0.08, vUv.y) * smoothstep(0.16, 0.08, vUv.y);
      float borderTop = smoothstep(1.0, 0.92, vUv.y) * smoothstep(0.84, 0.92, vUv.y);
      float palluBorder = smoothstep(1.0, 0.85, vUv.x);
      
      // Intricate geometric zari pattern
      float zariPattern = sin(vUv.x * 120.0) * cos(vUv.y * 120.0);
      float zariNoise = fract(sin(dot(vUv.xy, vec2(12.9898, 78.233))) * 43758.5453);
      float zariShimmer = sin(uTime * 2.0 + vUv.x * 20.0) * 0.2 + 0.8;

      float isBorder = max(max(borderBottom, borderTop), palluBorder * 0.9);
      
      vec3 goldZari = uColorGold * (1.2 + zariPattern * 0.25 + zariNoise * 0.15) * zariShimmer;
      goldZari += vec3(0.4, 0.35, 0.1) * spec * 2.0;

      // Blend silk and zari
      vec3 finalColor = mix(silkColor + spec + softSpec, goldZari, isBorder);

      // Subtle ambient vignette on edges
      float edgeVignette = smoothstep(0.0, 0.05, vUv.x) * smoothstep(1.0, 0.95, vUv.x) *
                           smoothstep(0.0, 0.05, vUv.y) * smoothstep(1.0, 0.95, vUv.y);
      
      gl_FragColor = vec4(finalColor, 0.96);
    }
  `,
};

function FlowingFabricMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse, viewport } = useThree();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColorBase: { value: new THREE.Color('#680C1A') }, // Royal Crimson Silk
    uColorDeep: { value: new THREE.Color('#220307') }, // Deep Maroon shadow
    uColorGold: { value: new THREE.Color('#D4AF37') }, // 24K Zari Gold
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();
      
      // Smooth mouse lerp
      material.uniforms.uMouse.value.lerp(
        new THREE.Vector2(mouse.x * 0.5, mouse.y * 0.5),
        0.05
      );

      // Gentle floating rotation
      meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.05 - 0.1;
      meshRef.current.rotation.y = Math.cos(state.clock.getElapsedTime() * 0.4) * 0.1 + (mouse.x * 0.15);
      meshRef.current.rotation.x = 0.2 + (mouse.y * 0.1);
    }
  });

  // Calculate size based on viewport
  const planeWidth = Math.min(viewport.width * 0.9, 7.5);
  const planeHeight = Math.min(viewport.height * 0.75, 5.2);

  return (
    <mesh ref={meshRef} position={[0.8, 0, 0]} castShadow receiveShadow>
      <planeGeometry args={[planeWidth, planeHeight, 96, 96]} />
      <shaderMaterial
        vertexShader={SilkClothShader.vertexShader}
        fragmentShader={SilkClothShader.fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
        transparent
      />
    </mesh>
  );
}

// Secondary floating silk ribbon for layered luxury depth
function SecondarySilkRibbon() {
  const ribbonRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ribbonRef.current) {
      const t = state.clock.getElapsedTime();
      ribbonRef.current.rotation.x = Math.sin(t * 0.5) * 0.2 + 0.3;
      ribbonRef.current.rotation.y = Math.cos(t * 0.4) * 0.3 - 0.4;
      ribbonRef.current.rotation.z = Math.sin(t * 0.3) * 0.15;
      ribbonRef.current.position.y = Math.sin(t * 0.6) * 0.2 - 0.8;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={ribbonRef} position={[-2.2, -0.8, -1.2]}>
        <torusKnotGeometry args={[1.5, 0.25, 128, 32, 2, 3]} />
        <meshPhysicalMaterial
          color="#8B1828"
          emissive="#2A050B"
          roughness={0.25}
          metalness={0.15}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          transmission={0.15}
          reflectivity={0.9}
        />
      </mesh>
    </Float>
  );
}

export const HeroSareeCloth: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.9} color="#FFF2DB" />
        {/* Studio Key Light */}
        <directionalLight position={[4, 6, 4]} intensity={2.2} color="#FFF5E0" castShadow />
        {/* Gold Rim Backlight */}
        <directionalLight position={[-5, 3, -3]} intensity={1.8} color="#D4AF37" />
        {/* Deep Maroon Fill Light */}
        <pointLight position={[0, -4, 2]} intensity={1.2} color="#800020" />
        
        {/* Floating Golden Dust Particles */}
        <Sparkles
          count={70}
          scale={[10, 8, 8]}
          size={3.5}
          speed={0.4}
          color="#F3E5AB"
          opacity={0.8}
        />

        <FlowingFabricMesh />
        <SecondarySilkRibbon />
      </Canvas>
    </div>
  );
};
