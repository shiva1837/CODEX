"use client";

import { MeshTransmissionMaterial, OrbitControls, Points, PointMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export function AbstractLens() {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const glitch = useRef(0);

  useFrame((state) => {
    if (!mesh.current) return;
    const pointer = state.pointer;
    const parallaxX = THREE.MathUtils.lerp(mesh.current.rotation.y, pointer.x * 0.6, 0.06);
    const parallaxY = THREE.MathUtils.lerp(mesh.current.rotation.x, pointer.y * 0.6, 0.06);
    mesh.current.rotation.set(parallaxY, parallaxX, mesh.current.rotation.z + 0.0015);
    mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
    glitch.current = THREE.MathUtils.lerp(glitch.current, pointer.length() * 0.25, 0.04);

    if (material.current) {
      // @ts-expect-error - drei extends the material with chromaticAberration
      material.current.chromaticAberration = 0.18 + glitch.current;
    }
  });

  return (
    <mesh ref={mesh} scale={2.4}>
      <icosahedronGeometry args={[1.1, 2]} />
      <MeshTransmissionMaterial
        ref={material}
        backside
        thickness={1.2}
        anisotropy={0.35}
        distortion={0.45}
        distortionScale={0.35}
        temporalDistortion={0.08}
        iridescence={0.5}
        iridescenceIOR={1.2}
        chromaticAberration={0.18}
        roughness={0.05}
        transparent
        transmission={1}
        attenuationDistance={1.8}
        attenuationColor={"#62d2ff"}
      />
    </mesh>
  );
}

export function DustField() {
  const pointsRef = useRef<THREE.Points>(null);
  const sphere = useMemo(() => new THREE.Spherical(), []);
  const positions = useMemo(() => {
    const arr = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i += 1) {
      sphere.set(THREE.MathUtils.randFloat(1.5, 5), Math.random() * Math.PI, Math.random() * Math.PI * 2);
      const v = new THREE.Vector3().setFromSpherical(sphere);
      arr.set([v.x, v.y, v.z], i * 3);
    }
    return arr;
  }, [sphere]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += 0.0008;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.08;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        color="#8ff3ff"
        size={0.06}
        sizeAttenuation
        depthWrite={false}
        transparent
        opacity={0.65}
      />
    </Points>
  );
}

export function TiltedRimLight() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight
        position={[5, 5, 5]}
        angle={0.4}
        penumbra={1}
        intensity={1.2}
        color="#8ff3ff"
        castShadow
      />
      <spotLight
        position={[-6, 3, -4]}
        angle={0.5}
        penumbra={0.7}
        intensity={0.9}
        color="#ff8cbf"
      />
      <directionalLight position={[0, 3, 2]} intensity={0.5} color="#b0f0ff" />
    </>
  );
}

export function MinimalControls() {
  return <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />;
}
