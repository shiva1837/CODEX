"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { AbstractLens, DustField, MinimalControls, TiltedRimLight } from "./SceneObjects";

const CanvasBackground = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        gl={{ antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 6], fov: 45 }}
      >
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 8, 16]} />
        <Suspense fallback={null}>
          <TiltedRimLight />
          <AbstractLens />
          <DustField />
          <MinimalControls />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(98,210,255,0.08),transparent_25%)]" />
    </div>
  );
};

export default CanvasBackground;
