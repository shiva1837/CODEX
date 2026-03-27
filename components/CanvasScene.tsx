"use client";

import { useFrame, useThree, Canvas } from "@react-three/fiber";
import { Float, PerspectiveCamera, Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

type CanvasSceneProps = {
  particleCount?: number;
};

function GlassOrb({ particleCount = 80 }: CanvasSceneProps) {
  const meshRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const shouldReduceMotion = useReducedMotion();

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return positions;
  }, [particleCount]);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    const slow = shouldReduceMotion ? 0.05 : 0.2;
    meshRef.current.rotation.y += delta * slow;
    meshRef.current.rotation.x += delta * slow * 0.6;
    const targetX = pointer.x * 0.2;
    const targetY = pointer.y * 0.1;
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);
  });

  return (
    <>
      <Float speed={shouldReduceMotion ? 0.2 : 1} rotationIntensity={0.5} floatIntensity={shouldReduceMotion ? 0.3 : 0.9}>
        <group ref={meshRef}>
          <mesh>
            <icosahedronGeometry args={[1.6, 1]} />
            <meshPhysicalMaterial
              transmission={0.95}
              roughness={0.05}
              thickness={0.6}
              clearcoat={1}
              metalness={0.05}
              reflectivity={0.7}
              color="#b7dfff"
              iridescence={0.15}
              envMapIntensity={0.6}
            />
          </mesh>
          <mesh scale={1.1}>
            <icosahedronGeometry args={[1.7, 2]} />
            <meshStandardMaterial color="#6fc6ff" transparent opacity={0.08} />
          </mesh>
        </group>
      </Float>
      <Points positions={particles} stride={3} frustumCulled>
        <PointMaterial transparent color="#8dd9ff" size={0.025} sizeAttenuation depthWrite={false} />
      </Points>
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 6, 6]} intensity={2} color="#9fd8ff" />
      <pointLight position={[-5, -3, -5]} intensity={1.5} color="#6c7cff" />
    </>
  );
}

export default function CanvasScene({ particleCount = 80 }: CanvasSceneProps) {
  return (
    <div className="absolute inset-0">
      <Canvas dpr={[1, 1.8]} gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 6], fov: 50 }}>
        <color attach="background" args={["transparent"]} />
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        <GlassOrb particleCount={particleCount} />
      </Canvas>
    </div>
  );
}
