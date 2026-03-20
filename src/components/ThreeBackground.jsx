import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, TorusKnot, Dodecahedron, MeshDistortMaterial, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShapes = ({ isDark }) => {
  const group = useRef();

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    // Smooth Parallax Depth Effect
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, (state.mouse.x * Math.PI) / 10, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, (state.mouse.y * Math.PI) / 10, 0.05);
    
    // Slight ambient float
    group.current.position.y = Math.sin(t * 0.5) * 0.2;
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2} position={[0, 0, 0]}>
        <Icosahedron args={[1.5, 1]} position={[0, 0.5, 0]} castShadow>
          <MeshDistortMaterial color="#ccd5ae" emissive={isDark ? "#d4a373" : "#000000"} emissiveIntensity={isDark ? 0.15 : 0} distort={0.3} speed={1.5} roughness={0.1} metalness={0.1} />
        </Icosahedron>
      </Float>
      
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1} position={[2, -1, -2]}>
        <TorusKnot args={[0.6, 0.2, 100, 16]} castShadow>
          <meshStandardMaterial color="#d4a373" emissive={isDark ? "#d4a373" : "#000000"} emissiveIntensity={isDark ? 0.1 : 0} roughness={0.3} metalness={0.4} />
        </TorusKnot>
      </Float>
      
      <Float speed={3} rotationIntensity={2} floatIntensity={3} position={[-2.5, 1, -1]}>
        <Dodecahedron args={[0.5]} castShadow>
          <meshStandardMaterial color="#e9edc9" emissive={isDark ? "#d4a373" : "#000000"} emissiveIntensity={isDark ? 0.1 : 0} roughness={0.2} metalness={0.3} />
        </Dodecahedron>
      </Float>

      <Float speed={2.5} rotationIntensity={2} floatIntensity={2} position={[1.5, 2, -3]}>
        <Dodecahedron args={[0.3]} castShadow>
          <meshStandardMaterial color="#faedcd" emissive={isDark ? "#d4a373" : "#000000"} emissiveIntensity={isDark ? 0.1 : 0} roughness={0.4} metalness={0.1} />
        </Dodecahedron>
      </Float>
    </group>
  );
};

const ThreeBackground = () => {
  const [isDark, setIsDark] = React.useState(() => {
    if (typeof window !== 'undefined') return localStorage.getItem("theme") === "dark";
    return false;
  });

  React.useEffect(() => {
    const handleThemeChange = () => setIsDark(localStorage.getItem("theme") === "dark");
    window.addEventListener('themeChanged', handleThemeChange);
    return () => window.removeEventListener('themeChanged', handleThemeChange);
  }, []);

  // Check if mobile via window width to fallback (to ensure performance on phones)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  if (isMobile) {
    return (
      <div className="w-full h-full absolute inset-0 overflow-hidden bg-cream flex items-center justify-center transition-colors duration-300">
         <div className={`w-[150vw] h-[150vw] rounded-full filter blur-[80px] opacity-40 animate-pulse transition-all duration-300 ${isDark ? 'mix-blend-normal opacity-20' : 'mix-blend-multiply opacity-40'}`} style={{ background: 'radial-gradient(circle, #e9edc9 0%, #ccd5ae 50%, transparent 100%)' }}></div>
      </div>
    );
  }

  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 40 }} className="fade-in-canvas">
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} intensity={1.5} angle={0.2} penumbra={1} castShadow shadow-mapSize={[1024, 1024]} color="#fefae0" />
        <pointLight position={[-10, -5, -10]} intensity={isDark ? 0.5 : 2} color="#faedcd" />
        <directionalLight position={[0, -5, 5]} intensity={0.5} color="#d4a373" />
        
        <FloatingShapes isDark={isDark} />
        
        {/* Soft shadows floor plane */}
        <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
