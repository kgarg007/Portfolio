'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function HeroSculpture3D() {
  const outerGroup = useRef<THREE.Group>(null);
  const innerMesh = useRef<THREE.Mesh>(null);
  const ringMesh1 = useRef<THREE.Mesh>(null);
  const ringMesh2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mouseX = state.pointer.x * 0.5;
    const mouseY = state.pointer.y * 0.5;

    if (outerGroup.current) {
      outerGroup.current.rotation.y = THREE.MathUtils.lerp(outerGroup.current.rotation.y, mouseX * 0.8 + t * 0.15, 0.05);
      outerGroup.current.rotation.x = THREE.MathUtils.lerp(outerGroup.current.rotation.x, -mouseY * 0.5 + Math.sin(t * 0.3) * 0.1, 0.05);
    }

    if (innerMesh.current) {
      innerMesh.current.rotation.z = t * 0.2;
      innerMesh.current.rotation.y = t * 0.25;
    }

    if (ringMesh1.current) {
      ringMesh1.current.rotation.x = t * 0.4;
      ringMesh1.current.rotation.y = t * 0.2;
    }

    if (ringMesh2.current) {
      ringMesh2.current.rotation.x = -t * 0.3;
      ringMesh2.current.rotation.z = t * 0.35;
    }
  });

  return (
    <group ref={outerGroup} position={[0, 0, 0]}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#818cf8" />
      <directionalLight position={[-10, -10, -5]} intensity={1.0} color="#a78bfa" />
      <pointLight position={[0, 5, 0]} intensity={2.0} color="#67e8f9" distance={15} />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        {/* Core Abstract TorusKnot Sculpture */}
        <mesh ref={innerMesh} castShadow receiveShadow>
          <torusKnotGeometry args={[1.2, 0.35, 128, 32, 2, 3]} />
          <meshPhysicalMaterial
            color="#18181b"
            roughness={0.15}
            metalness={0.9}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            reflectivity={0.9}
            emissive="#3f3f46"
            emissiveIntensity={0.15}
          />
        </mesh>

        {/* Outer Wireframe Accent Ring 1 */}
        <mesh ref={ringMesh1} scale={1.85}>
          <torusGeometry args={[1.3, 0.015, 16, 100]} />
          <meshStandardMaterial
            color="#818cf8"
            wireframe
            emissive="#6366f1"
            emissiveIntensity={0.8}
          />
        </mesh>

        {/* Outer Wireframe Accent Ring 2 */}
        <mesh ref={ringMesh2} scale={2.2}>
          <torusGeometry args={[1.3, 0.01, 16, 100]} />
          <meshStandardMaterial
            color="#38bdf8"
            wireframe
            emissive="#0284c7"
            emissiveIntensity={0.6}
          />
        </mesh>
      </Float>
    </group>
  );
}
