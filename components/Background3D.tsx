import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Sparkles, MeshTransmissionMaterial, Stars, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// ── ANIMATED DNA HELIX / ORBITAL RINGS ──────────────────────────────────────
const OrbitalRing = ({ radius, tilt, speed, color, opacity = 0.6 }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += speed * 0.004;
    }
  });
  return (
    <mesh ref={meshRef} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.012, 12, 64]} />
      <meshStandardMaterial
        color={color}
        metalness={0.95}
        roughness={0.05}
        emissive={color}
        emissiveIntensity={opacity}
        transparent
        opacity={0.55}
      />
    </mesh>
  );
};

// ── TRAILING REAL PLANET ───────────────────────────────────────────────
const RealPlanet = ({ radius, speed, yOffset = 0, size = 0.2, textureUrl, tint = "#ffffff" }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const angle = useRef(Math.random() * Math.PI * 2);
  const texture = useTexture(textureUrl);

  useFrame(() => {
    angle.current += speed * 0.005;
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(angle.current) * radius;
      meshRef.current.position.z = Math.sin(angle.current) * radius;
      meshRef.current.position.y = yOffset + Math.sin(angle.current * 2) * 0.4;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={1} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial map={texture} color={tint} roughness={0.8} metalness={0.1} />
      </mesh>
    </Float>
  );
};

// ── CENTRAL CRYSTAL CORE ─────────────────────────────────────────────────────
const CrystalCore = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.18;
      meshRef.current.rotation.x = Math.sin(t * 0.12) * 0.3;
      meshRef.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.04);
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.3;
      innerRef.current.rotation.z = t * 0.2;
    }
  });

  return (
    <group>
      {/* Glowing inner core */}
      <mesh ref={innerRef} position={[0, 0, 0]}>
        <octahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial
          color="#c9a84c"
          emissive="#c9a84c"
          emissiveIntensity={2.5}
          metalness={1}
          roughness={0}
        />
      </mesh>
      {/* Outer glass shell */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[0.9, 0]} />
        <MeshTransmissionMaterial
          backside
          samples={3}
          resolution={128}
          transmission={0.95}
          roughness={0.05}
          ior={1.5}
          thickness={0.4}
          color="#c9a84c"
          chromaticAberration={0.04}
          anisotropy={0.3}
        />
      </mesh>
    </group>
  );
};

// ── FLOATING ICOSAHEDRON SHARDS ──────────────────────────────────────────────
const FloatingShard = ({ position, scale, speed, color }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003 * speed;
      meshRef.current.rotation.y += 0.004 * speed;
      meshRef.current.rotation.z += 0.002 * speed;
    }
  });
  return (
    <Float speed={speed * 0.6} rotationIntensity={0.8} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
};

// ── NEBULA / FOG LAYER ───────────────────────────────────────────────────────
const NebulaPlane = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.015;
      const s = 1 + Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
      meshRef.current.scale.set(s, s, 1);
    }
  });
  return (
    <mesh ref={meshRef} position={[0, 0, -8]}>
      <planeGeometry args={[30, 30, 1, 1]} />
      <meshBasicMaterial
        color="#c9a84c"
        transparent
        opacity={0.018}
        depthWrite={false}
      />
    </mesh>
  );
};

// ── SCENE WRAPPER ────────────────────────────────────────────────────────────
const SceneWrapper = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const scrollY = window.scrollY;
      const targetX = (state.pointer.x * Math.PI) / 12;
      const targetY = (state.pointer.y * Math.PI) / 12;

      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, scrollY * 0.0015, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, (scrollY * 0.0004) + targetX, 0.04);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetY * 0.5, 0.04);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 3]} color="#c9a84c" intensity={3} distance={12} />
      <pointLight position={[-8, 4, -4]} color="#4a3a10" intensity={4} distance={20} />
      <pointLight position={[8, -4, -6]} color="#c9a84c" intensity={2} distance={15} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#fff8e0" />

      {/* Stars deep background (Golden & Dense - Optimized for Performance) */}
      <Stars radius={80} depth={60} count={1000} factor={4} saturation={1} fade speed={1.5} />
      <Sparkles count={150} scale={50} size={3} speed={0.5} opacity={0.6} color="#ffcc66" />

      {/* Nebula glow layers */}
      <NebulaPlane />

      {/* Orbiting Realistic Planets */}
      <RealPlanet radius={2.2} speed={1.2} yOffset={0} size={0.3} textureUrl="/textures/planets/earth.jpg" tint="#ffffff" />
      <RealPlanet radius={2.8} speed={-0.8} yOffset={0.3} size={0.25} textureUrl="/textures/planets/moon.jpg" tint="#ff8844" />
      <RealPlanet radius={3.5} speed={0.6} yOffset={-0.2} size={0.35} textureUrl="/textures/planets/moon.jpg" tint="#ffffff" />

      {/* Gold Dust Sparkles */}
      <Sparkles count={150} scale={18} size={1.2} speed={0.3} opacity={0.35} color="#C9A84C" />
      <Sparkles count={50} scale={8} size={2.5} speed={0.6} opacity={0.5} color="#fff0a0" />

      {/* Floating shards distributed around the scene */}
      <FloatingShard position={[-5, 2,  -2]} scale={[0.7, 0.7, 0.7]} color="#c9a84c" speed={1.1} />
      <FloatingShard position={[ 6, -2, -3]} scale={[1.0, 1.0, 1.0]} color="#8a6a1a" speed={0.8} />
      <FloatingShard position={[ 4,  4, -5]} scale={[0.5, 0.5, 0.5]} color="#ffffff" speed={1.4} />
      <FloatingShard position={[-6, -3, -3]} scale={[0.9, 0.9, 0.9]} color="#c9a84c" speed={1.0} />
      <FloatingShard position={[-2, -5, -4]} scale={[1.2, 1.2, 1.2]} color="#8a6a1a" speed={0.7} />
      <FloatingShard position={[ 7,  5, -6]} scale={[0.8, 0.8, 0.8]} color="#c9a84c" speed={1.3} />
      <FloatingShard position={[-7, 5, -7]} scale={[0.4, 0.4, 0.4]} color="#ffffff" speed={1.6} />
      <FloatingShard position={[ 2, -7, -5]} scale={[0.6, 0.6, 0.6]} color="#c9a84c" speed={0.9} />
    </group>
  );
};

// ── ROOT COMPONENT ───────────────────────────────────────────────────────────
const Background3D: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] bg-ink pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 42 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <SceneWrapper />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Background3D;
