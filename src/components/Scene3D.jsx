import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, TorusKnot } from '@react-three/drei';

const SpinningObject = () => {
  const meshRef = useRef();
  const { viewport, mouse } = useThree();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.003;
      
      const x = (mouse.x * viewport.width) / 20;
      const y = (mouse.y * viewport.height) / 20;
      meshRef.current.position.lerp({ x, y, z: 0 }, 0.1);
    }
  });

  return (
    <TorusKnot ref={meshRef} args={[1.2, 0.35, 256, 32]}>
      <meshStandardMaterial 
        color="#ffffff"
        metalness={1.0}
        roughness={0.1}
        envMapIntensity={0.9}
      />
    </TorusKnot>
  );
};

const Scene3D = () => {
  return (
    <Canvas camera={{ fov: 45, position: [0, 0, 12] }}>
      <Suspense fallback={null}>
        
        {/* --- ВОТ ЭТОТ БЛОК НУЖНО БЫЛО ДОБАВИТЬ --- */}
        {/* 1. Заполняющий свет (мягкий, со всех сторон) */}
        <ambientLight intensity={0.5} />
        {/* 2. Основной свет (яркий, спереди-сверху, дает цветные блики) */}
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.5} 
          color="var(--primary-color)" 
        />
        {/* 3. Контурный свет (подсвечивает силуэт сзади, дает белые блики) */}
        <directionalLight 
          position={[-10, -10, -5]} 
          intensity={1} 
          color="#ffffff" 
        />
        
        <SpinningObject />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Suspense>
    </Canvas>
  );
};

export default Scene3D;