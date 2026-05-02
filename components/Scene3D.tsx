import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { Mesh } from 'three'
import { useRef, useEffect } from 'react'

function RotatingBox() {
  const meshRef = useRef<Mesh>(null)

  useEffect(() => {
    const animate = () => {
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.01
        meshRef.current.rotation.y += 0.01
      }
    }

    const animationId = setInterval(animate, 16)
    return () => clearInterval(animationId)
  }, [])

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshPhongMaterial color="#0ea5e9" />
    </mesh>
  )
}

export default function Scene3D() {
  return (
    <Canvas style={{ width: '100%', height: '100%' }}>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <RotatingBox />
      <OrbitControls />
    </Canvas>
  )
}
