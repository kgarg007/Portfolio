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
      outerGroup.current.rotation.y = THREE.MathUtils.lerp(outerGroup.current.rotation.y, mouseX * 0.5 + t * 0.1, 0.04);
      outerGroup.current.rotation.x = THREE.MathUtils.lerp(outerGroup.current.rotation.x, -mouseY * 0.3 + Math.sin(t * 0.2) * 0.08, 0.04);
    }

    if (innerMesh.current) {
      innerMesh.current.rotation.z = t * 0.15;
      innerMesh.current.rotation.y = t * 0.18;
    }

    if (ringMesh1.current) {
      ringMesh1.current.rotation.x = t * 0.25;
      ringMesh1.current.rotation.y = t * 0.15;
    }

    if (ringMesh2.current) {
      ringMesh2.current.rotation.x = -t * 0.2;
      ringMesh2.current.rotation.z = t * 0.25;
    }
  });

  return (
    <group ref={outerGroup} position={[0, 0, 0]}>
      {/* Restrained Ambient & Directional Lighting — No bright cyan/purple */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[10, 10, 5]} intensity={1.0} color="#818cf8" />
      <directionalLight position={[-10, -10, -5]} intensity={0.6} color="#475569" />

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        {/* Core Dark Metallic TorusKnot Sculpture */}
        <mesh ref={innerMesh} castShadow receiveShadow>
          <torusKnotGeometry args={[1.2, 0.35, 128, 32, 2, 3]} />
          <meshPhysicalMaterial
            color="#141416"
            roughness={0.25}
            metalness={0.85}
            clearcoat={0.8}
            clearcoatRoughness={0.2}
            reflectivity={0.7}
            emissive="#18181b"
            emissiveIntensity={0.05}
          />
        </mesh>

        {/* Outer Wireframe Accent Ring 1 (Muted Indigo) */}
        <mesh ref={ringMesh1} scale={1.85}>
          <torusGeometry args={[1.3, 0.012, 16, 100]} />
          <meshStandardMaterial
            color="#6366f1"
            wireframe
            emissive="#4f46e5"
            emissiveIntensity={0.35}
          />
        </mesh>

        {/* Outer Wireframe Accent Ring 2 (Neutral Slate/Grey) */}
        <mesh ref={ringMesh2} scale={2.2}>
          <torusGeometry args={[1.3, 0.008, 16, 100]} />
          <meshStandardMaterial
            color="#64748b"
            wireframe
            emissive="#475569"
            emissiveIntensity={0.25}
          />
        </mesh>
      </Float>
    </group>
  );
}
