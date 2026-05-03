'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Keep this scene around for future 3D experiments.
function Box() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [clicked, setClick] = useState(false);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh
      ref={meshRef}
      scale={hovered ? 1.5 : 1}
      onClick={() => setClick(!clicked)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={clicked ? '#ff4444' : '#4488ff'} />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <div className="h-full w-full bg-transparent">
      <Canvas className="h-full w-full" camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Box />
      </Canvas>
    </div>
  );
}
