import React, { useState, Suspense, useRef, useMemo } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, ContactShadows, Float, Text, useCursor } from '@react-three/drei';
import { motion, AnimatePresence } from 'motion/react';
import { Info, RotateCcw, Puzzle, ArrowLeft, CheckCircle2, MousePointer2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import * as THREE from 'three';
import { GLTFModel } from './GLTFModel';

const Part = ({ 
  type, 
  position, 
  isPlaced, 
  isSilhouette,
  onPointerDown,
  onPointerUp,
  onPointerMove,
  onPointerOver,
  onPointerOut
}: { 
  type: string, 
  position: [number, number, number], 
  isPlaced: boolean,
  isSilhouette?: boolean,
  onPointerDown?: (e: any) => void,
  onPointerUp?: (e: any) => void,
  onPointerMove?: (e: any) => void,
  onPointerOver?: (e: any) => void,
  onPointerOut?: (e: any) => void
}) => {
  const url = {
    'block': '/thân máy.glb',
    'pistons': '/Piston.glb',
    'oil-pan': '/Đáy máy.glb',
    'cylinder-head': '/nắp máy.glb',
    'cooling': '/hệ thống làm mát.glb',
    'ignition': '/hê thống đánh lửa.glb'
  }[type] || '';

  return (
    <Float speed={isPlaced || isSilhouette ? 0 : 2} rotationIntensity={isPlaced || isSilhouette ? 0 : 0.5} floatIntensity={isPlaced || isSilhouette ? 0 : 0.5}>
      <group 
        position={position} 
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      >
        <Suspense fallback={null}>
          <GLTFModel 
            url={url} 
            scale={40} 
            rotation={[0, Math.PI / 2, 0]} 
            opacity={isSilhouette ? 0.15 : 1}
            transparent={isSilhouette}
            wireframe={isSilhouette}
          />
        </Suspense>

        {!isPlaced && !isSilhouette && (
          <Text
            position={[0, 2.5, 0]}
            fontSize={0.3}
            color="white"
            anchorX="center"
          >
            {{
              'block': 'THÂN MÁY',
              'pistons': 'PÍT-TÔNG',
              'oil-pan': 'ĐÁY MÁY',
              'cylinder-head': 'NẮP MÁY',
              'cooling': 'HỆ THỐNG LÀM MÁT',
              'ignition': 'HỆ THỐNG ĐÁNH LỬA'
            }[type] || type.toUpperCase()}
          </Text>
        )}
      </group>
    </Float>
  );
};

const DraggablePart = ({ type, initialPos, targetPos, onAssemble, setIsDraggingGlobal }: { type: string, initialPos: [number, number, number], targetPos: [number, number, number], onAssemble: () => void, setIsDraggingGlobal: (val: boolean) => void }) => {
  const [position, setPosition] = useState<[number, number, number]>(initialPos);
  const [isDragging, setIsDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { camera, mouse, raycaster } = useThree();
  
  const plane = useMemo(() => new THREE.Plane(), []);
  const planeNormal = useMemo(() => new THREE.Vector3(), []);
  const intersection = useMemo(() => new THREE.Vector3(), []);

  useCursor(hovered);

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    setIsDragging(true);
    setIsDraggingGlobal(true);
    (e.target as any).setPointerCapture(e.pointerId);
  };

  const handlePointerUp = (e: any) => {
    e.stopPropagation();
    setIsDragging(false);
    setIsDraggingGlobal(false);
    (e.target as any).releasePointerCapture(e.pointerId);

    // Check distance to target
    const dist = Math.sqrt(
      Math.pow(position[0] - targetPos[0], 2) +
      Math.pow(position[1] - targetPos[1], 2) +
      Math.pow(position[2] - targetPos[2], 2)
    );

    if (dist < 3) {
      onAssemble();
    } else {
      // Snap back
      setPosition(initialPos);
    }
  };

  const handlePointerMove = (e: any) => {
    if (!isDragging) return;
    
    // Project mouse to 3D space on a plane facing the camera
    planeNormal.copy(camera.position).sub(camera.getWorldPosition(new THREE.Vector3())).normalize();
    // Use a plane that passes through the current position and faces the camera
    plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(new THREE.Vector3()).negate(), new THREE.Vector3(...position));
    
    raycaster.setFromCamera(mouse, camera);
    if (raycaster.ray.intersectPlane(plane, intersection)) {
      setPosition([intersection.x, intersection.y, intersection.z]);
    }
  };

  return (
    <Part 
      type={type} 
      position={position} 
      isPlaced={false} 
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
};

const ASSEMBLY_STEPS = [
  { id: 'oil-pan', name: 'Đáy máy', description: 'Bể chứa dầu bôi trơn nằm ở dưới cùng của động cơ.', type: 'oil-pan', initialPos: [5, 0, -1] as [number, number, number], targetPos: [-3, 0, -1] as [number, number, number] },
  { id: 'pistons', name: 'Pít-tông', description: 'Pít-tông di chuyển lên xuống trong xi-lanh để tạo ra công suất.', type: 'pistons', initialPos: [5, 0, -1] as [number, number, number], targetPos: [-3, 0, -1] as [number, number, number] },
  { id: 'block', name: 'Thân máy', description: 'Thân máy là nền tảng của động cơ, chứa các xi-lanh và đường dẫn nước làm mát, dầu bôi trơn.', type: 'block', initialPos: [5, 0, -1] as [number, number, number], targetPos: [-3, 0, -1] as [number, number, number] },
  { id: 'ignition', name: 'Hệ thống đánh lửa', description: 'Tạo tia lửa điện để đốt cháy hòa khí trong buồng đốt.', type: 'ignition', initialPos: [5, 0, -1] as [number, number, number], targetPos: [-3, 0, -1] as [number, number, number] },
  { id: 'cylinder-head', name: 'Nắp máy', description: 'Nắp máy đậy kín xi-lanh, chứa buồng đốt, xúp-páp và bugi.', type: 'cylinder-head', initialPos: [5, 0, -1] as [number, number, number], targetPos: [-3, 0, -1] as [number, number, number] },
  { id: 'cooling', name: 'Hệ thống làm mát', description: 'Duy trì nhiệt độ hoạt động ổn định cho động cơ.', type: 'cooling', initialPos: [5, 0, -1] as [number, number, number], targetPos: [-3, 1, -1] as [number, number, number] },
];

interface EngineAssembly3DProps {
  onBack: () => void;
}

export default function EngineAssembly3D({ onBack }: EngineAssembly3DProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [placedParts, setPlacedParts] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleAssemble = () => {
    const partId = ASSEMBLY_STEPS[stepIndex].id;
    setPlacedParts([...placedParts, partId]);
    if (stepIndex + 1 < ASSEMBLY_STEPS.length) {
      setStepIndex(stepIndex + 1);
    } else {
      setIsComplete(true);
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
    }
  };

  const reset = () => {
    setStepIndex(0);
    setPlacedParts([]);
    setIsComplete(false);
    setIsDragging(false);
  };

  return (
    <div className="p-2 md:p-8 w-full max-w-[1600px] mx-auto h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3 md:mb-8">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="w-9 h-9 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center border border-slate-100 shadow-sm hover:bg-slate-50 transition-all shrink-0"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-lg md:text-2xl font-black text-slate-900 leading-tight">Lắp ráp Động cơ 3D</h1>
            <p className="text-[10px] md:text-sm text-slate-400 font-medium uppercase tracking-wider">Động cơ I4 (4 xi-lanh)</p>
          </div>
        </div>
        <button 
          onClick={reset}
          className="px-4 md:px-6 py-2 md:py-2.5 bg-slate-100 text-slate-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all text-xs md:text-base"
        >
          <RotateCcw className="w-3.5 h-3.5 md:w-4 md:h-4" />
          Làm lại
        </button>
      </div>

      <div className="relative flex-1 min-h-[400px] md:min-h-[500px] lg:min-h-[75vh] bg-slate-900 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-slate-700 shadow-2xl">
        <Canvas shadows>
          <PerspectiveCamera 
            makeDefault 
            position={typeof window !== 'undefined' && window.innerWidth < 768 ? [10, 6, 12] : [12, 8, 15]} 
            fov={45} 
          />
          <OrbitControls 
            enablePan={true} 
            maxPolarAngle={Math.PI / 2 + 0.2} 
            minDistance={2} 
            maxDistance={50} 
            enabled={!isDragging}
          />
          
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 10]} intensity={2} castShadow shadow-mapSize={[2048, 2048]} />
          <directionalLight position={[-10, 10, -10]} intensity={1} />
          <directionalLight position={[0, -10, 0]} intensity={0.5} />
          
          {/* Silhouette Guide */}
          {!isComplete && (
            <Part 
              type={ASSEMBLY_STEPS[stepIndex].type} 
              position={ASSEMBLY_STEPS[stepIndex].targetPos} 
              isPlaced={false} 
              isSilhouette={true}
            />
          )}

          {/* Placed Parts */}
          {ASSEMBLY_STEPS.map((step) => (
            placedParts.includes(step.id) && (
              <Part 
                key={step.id} 
                type={step.type} 
                position={step.targetPos} 
                isPlaced={true} 
              />
            )
          ))}

          {/* Draggable Part */}
          {!isComplete && (
            <DraggablePart 
              key={ASSEMBLY_STEPS[stepIndex].id}
              type={ASSEMBLY_STEPS[stepIndex].type} 
              initialPos={ASSEMBLY_STEPS[stepIndex].initialPos}
              targetPos={ASSEMBLY_STEPS[stepIndex].targetPos} 
              onAssemble={handleAssemble}
              setIsDraggingGlobal={setIsDragging}
            />
          )}

          <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={20} blur={2.5} far={10} />
        </Canvas>

        {/* UI Overlay */}
        <div className="absolute bottom-4 left-4 right-4 lg:bottom-auto lg:top-6 lg:left-6 lg:right-auto lg:max-w-sm pointer-events-none z-30">
          <AnimatePresence mode="wait">
            {!isComplete ? (
              <motion.div
                key={stepIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="bg-slate-800/90 backdrop-blur-md p-4 md:p-6 rounded-2xl border border-slate-700 shadow-xl pointer-events-auto"
              >
                <div className="flex items-center gap-3 mb-2 md:mb-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 border border-blue-500/30 shrink-0">
                    <Puzzle className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm md:text-lg leading-tight">Bước {stepIndex + 1}/{ASSEMBLY_STEPS.length}</h3>
                    <p className="text-slate-400 text-[10px] uppercase tracking-widest">{ASSEMBLY_STEPS[stepIndex].name}</p>
                  </div>
                </div>
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 line-clamp-2 md:line-clamp-none">
                  {ASSEMBLY_STEPS[stepIndex].description}
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-cyan-400 text-[10px] font-bold animate-pulse">
                    <MousePointer2 className="w-3.5 h-3.5" /> KÉO CHI TIẾT VÀO VỊ TRÍ MỜ
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-green-500/90 backdrop-blur-md p-5 md:p-6 rounded-2xl border border-green-400 shadow-xl pointer-events-auto text-center"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
                </div>
                <h3 className="text-white font-black text-xl md:text-2xl mb-1 md:mb-2">Hoàn thành!</h3>
                <p className="text-green-100 text-xs md:text-sm">
                  Bạn đã lắp ráp thành công động cơ I4 hoàn chỉnh.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
