'use client';

import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import HeroSculpture3D from './HeroSculpture3D';
import HeroFallback from './HeroFallback';

export default function Hero3DCanvas() {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setHasWebGL(!!gl);
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  if (!mounted || hasWebGL === false || prefersReducedMotion || hasWebGL === null) {
    return <HeroFallback />;
  }

  return (
    <div className="w-full h-full min-h-[350px] sm:min-h-[450px] relative flex items-center justify-center">
      <Suspense fallback={<HeroFallback />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full"
        >
          <HeroSculpture3D />
        </Canvas>
      </Suspense>
    </div>
  );
}
