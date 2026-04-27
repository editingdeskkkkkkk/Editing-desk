import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Stars, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// ── ORBITAL RING ─────────────────────────────────────────────────────────────
const OrbitalRing = ({ radius, tilt, speed, color, opacity = 0.6 }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.z += speed * 0.003;
  });
  return (
    <mesh ref={meshRef} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.01, 8, 48]} />
      <meshStandardMaterial
        color={color} metalness={0.95} roughness={0.05}
        emissive={color} emissiveIntensity={opacity}
        transparent opacity={0.45}
      />
    </mesh>
  );
};

// ── REAL PLANET ──────────────────────────────────────────────────────────────
const RealPlanet = ({ radius, speed, yOffset = 0, size = 0.2, textureUrl, tint = '#ffffff' }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const angle = useRef(Math.random() * Math.PI * 2);
  const texture = useTexture(textureUrl);

  useFrame(() => {
    angle.current += speed * 0.004;
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(angle.current) * radius;
      meshRef.current.position.z = Math.sin(angle.current) * radius;
      meshRef.current.position.y = yOffset + Math.sin(angle.current * 2) * 0.3;
      meshRef.current.rotation.y += 0.004;
    }
  });

  return (
    <Float speed={1} floatIntensity={0.4}>
      <mesh ref={meshRef}>
        {/* Reduced from 64,64 → 24,24 — looks identical, massively cheaper */}
        <sphereGeometry args={[size, 24, 24]} />
        <meshStandardMaterial map={texture} color={tint} roughness={0.8} metalness={0.1} />
      </mesh>
    </Float>
  );
};

// ── CRYSTAL CORE ─────────────────────────────────────────────────────────────
const CrystalCore = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.16;
      meshRef.current.rotation.x = Math.sin(t * 0.11) * 0.28;
      meshRef.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.035);
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.28;
      innerRef.current.rotation.z = t * 0.18;
    }
  });

  return (
    <group>
      {/* Inner glowing core */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial color="#c9a84c" emissive="#c9a84c" emissiveIntensity={2.2} metalness={1} roughness={0} />
      </mesh>
      {/* Outer shell — replaced MeshTransmissionMaterial with cheaper meshPhongMaterial */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.85, 0]} />
        <meshPhongMaterial
          color="#c9a84c"
          emissive="#8a6a1a"
          emissiveIntensity={0.3}
          shininess={120}
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

// ── FLOATING SHARD ───────────────────────────────────────────────────────────
const FloatingShard = ({ position, scale, speed, color }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002 * speed;
      meshRef.current.rotation.y += 0.003 * speed;
    }
  });
  return (
    <Float speed={speed * 0.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={color} metalness={0.85} roughness={0.15} emissive={color} emissiveIntensity={0.12} />
      </mesh>
    </Float>
  );
};

// ── NEBULA PLANE ─────────────────────────────────────────────────────────────
const NebulaPlane = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.012;
    }
  });
  return (
    <mesh ref={meshRef} position={[0, 0, -8]}>
      <planeGeometry args={[30, 30, 1, 1]} />
      <meshBasicMaterial color="#c9a84c" transparent opacity={0.014} depthWrite={false} />
    </mesh>
  );
};

// ── SCENE WRAPPER ─────────────────────────────────────────────────────────────
const SceneWrapper = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const scrollY = window.scrollY;
      const tx = (state.pointer.x * Math.PI) / 14;
      const ty = (state.pointer.y * Math.PI) / 14;
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, scrollY * 0.0012, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, scrollY * 0.0003 + tx, 0.04);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, ty * 0.4, 0.04);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Lighting */}
      <ambientLight intensity={0.28} />
      <pointLight position={[0, 0, 3]} color="#c9a84c" intensity={2.5} distance={12} />
      <pointLight position={[-8, 4, -4]} color="#4a3a10" intensity={3} distance={18} />
      <pointLight position={[8, -4, -6]} color="#c9a84c" intensity={1.8} distance={14} />

      {/* Stars — reduced from 1000 to 350 */}
      <Stars radius={80} depth={50} count={350} factor={4} saturation={1} fade speed={1} />

      {/* Sparkles — reduced from 350 total to 90 total */}
      <Sparkles count={60} scale={45} size={2.5} speed={0.4} opacity={0.5} color="#ffcc66" />
      <Sparkles count={30} scale={8} size={2} speed={0.5} opacity={0.45} color="#fff0a0" />

      <NebulaPlane />

      {/* Planets — kept 2 (removed 1) */}
      <RealPlanet radius={2.2} speed={1.1} yOffset={0} size={0.28} textureUrl="/textures/planets/earth.jpg" tint="#ffffff" />
      <RealPlanet radius={3.0} speed={-0.7} yOffset={0.3} size={0.22} textureUrl="/textures/planets/moon.jpg" tint="#ff8844" />

      <CrystalCore />

      {/* Shards — reduced from 8 to 4 */}
      <FloatingShard position={[-5,  2, -2]} scale={[0.65, 0.65, 0.65]} color="#c9a84c" speed={1.0} />
      <FloatingShard position={[ 6, -2, -3]} scale={[0.90, 0.90, 0.90]} color="#8a6a1a" speed={0.8} />
      <FloatingShard position={[ 4,  4, -5]} scale={[0.45, 0.45, 0.45]} color="#ffffff" speed={1.3} />
      <FloatingShard position={[-6, -3, -3]} scale={[0.80, 0.80, 0.80]} color="#c9a84c" speed={0.9} />
    </group>
  );
};

// ── ROOT COMPONENT ─────────────────────────────────────────────────────────────
const Background3D: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768 || navigator.maxTouchPoints > 0);
    check();
    setReady(true);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // On mobile — skip WebGL entirely, use pure CSS dark bg
  if (!ready || isMobile) {
    return <div className="fixed inset-0 z-[-1] bg-ink" />;
  }

  return (
    <div className="fixed inset-0 z-[-1] bg-ink pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 42 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        dpr={[1, 1]}    // capped at 1 — no high-DPI rendering overhead
      >
        <Suspense fallback={null}>
          <SceneWrapper />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Background3D;
