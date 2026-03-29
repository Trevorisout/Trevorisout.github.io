import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Activity, 
  Zap, 
  Thermometer, 
  Gauge,
  Info,
  Settings,
  Maximize2,
  Volume2,
  VolumeX
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useEngineAudio } from '../hooks/useEngineAudio';

interface EngineSimulator2DProps {
  onBack: () => void;
}

export default function EngineSimulator2D({ onBack }: EngineSimulator2DProps) {
  const [engineType, setEngineType] = useState<'i4-gas' | '2-stroke' | 'i4-diesel'>('i4-gas');
  const [showMenu, setShowMenu] = useState(true);

  const engineData = {
    'i4-gas': {
      name: 'Động cơ Xăng I4',
      cycle: '4 Kỳ (Otto)',
      firingOrder: '1 - 3 - 4 - 2',
      compression: '10.5:1',
      fuel: 'Xăng (Gasoline)',
      desc: 'Động cơ I4 là loại động cơ phổ biến nhất trên ô tô hiện nay nhờ sự cân bằng giữa hiệu suất, kích thước và chi phí sản xuất.',
      color: 'text-indigo-600 bg-indigo-50',
      accent: 'indigo'
    },
    '2-stroke': {
      name: 'Động cơ 2 Kỳ',
      cycle: '2 Kỳ',
      firingOrder: '1',
      compression: '8.5:1',
      fuel: 'Xăng pha nhớt',
      desc: 'Động cơ 2 kỳ hoàn thành một chu trình nhiệt động lực học trong hai hành trình của piston. Cấu tạo đơn giản, không có xupap phức tạp.',
      color: 'text-emerald-600 bg-emerald-50',
      accent: 'emerald'
    },
    'i4-diesel': {
      name: 'Động cơ Diesel I4',
      cycle: '4 Kỳ (Diesel)',
      firingOrder: '1 - 3 - 4 - 2',
      compression: '18.0:1',
      fuel: 'Dầu Diesel',
      desc: 'Động cơ Diesel sử dụng nguyên lý nén cháy, không cần bugi đánh lửa. Hiệu suất nhiệt cao và mô-men xoắn cực lớn ở vòng tua thấp.',
      color: 'text-rose-600 bg-rose-50',
      accent: 'rose'
    }
  };

  const currentEngine = engineData[engineType];

  const [view, setView] = useState<'front' | 'back' | 'left' | 'right' | 'top' | 'bottom'>('right');
  const [viewMode, setViewMode] = useState<'outside' | 'cutout'>('cutout');
  const [rpm, setRpm] = useState(2500);
  const [isRunning, setIsRunning] = useState(false);
  const [isSlowMo, setIsSlowMo] = useState(false);
  const [compressionRatio, setCompressionRatio] = useState(10.5);
  const [time, setTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const [angle, setAngle] = useState(0);

  // Engine Audio Hook
  useEngineAudio(isRunning && !isMuted, rpm, engineType, compressionRatio);

  useEffect(() => {
    if (engineType === 'i4-diesel') setCompressionRatio(18);
    else if (engineType === '2-stroke') setCompressionRatio(8.5);
    else setCompressionRatio(10.5);
  }, [engineType]);

  useEffect(() => {
    let animationFrame: number;
    let lastTime = performance.now();

    const update = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000; // in seconds
      lastTime = currentTime;

      if (isRunning) {
        const speedMultiplier = engineType === '2-stroke' ? 2 : 1;
        const slowMoFactor = isSlowMo ? 0.1 : 1;
        // rpm is revs per minute. revs per second = rpm / 60.
        // angle change per second = (rpm / 60) * 2 * PI
        const deltaAngle = (rpm / 60) * Math.PI * 2 * speedMultiplier * slowMoFactor * deltaTime;
        setAngle(prev => prev + deltaAngle);
      }
      animationFrame = requestAnimationFrame(update);
    };
    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [isRunning, rpm, engineType, isSlowMo]);

  // Animation values
  const stroke = 60; // Increased stroke for better visibility
  const rodLength = 140;
  const r = stroke / 2;
  const crankCenterY = 320;
  
  // Visual offset based on compression ratio (higher ratio = smaller combustion chamber)
  const compOffset = Math.max(0, 30 - (compressionRatio * 1.5));

  // Accurate Piston Position (Absolute Y coordinate of piston pin)
  const getPistonY = (phase: number) => {
    const theta = angle + phase;
    // Distance from crank center to piston pin
    const yDist = r * Math.cos(theta) + Math.sqrt(Math.pow(rodLength, 2) - Math.pow(r * Math.sin(theta), 2));
    return crankCenterY - yDist;
  };

  const getRodAngle = (phase: number) => {
    const theta = angle + phase;
    // Rod angle in radians.
    const rodAngleRad = Math.asin((r * Math.sin(theta)) / rodLength);
    return -rodAngleRad * (180 / Math.PI);
  };

  const views = [
    { id: 'front', label: 'Mặt trước', sub: 'TRƯỚC' },
    { id: 'back', label: 'Mặt sau', sub: 'SAU' },
    { id: 'left', label: 'Mặt trái', sub: 'TRÁI' },
    { id: 'right', label: 'Mặt phải', sub: 'PHẢI' },
    { id: 'top', label: 'Mặt trên', sub: 'TRÊN' },
    { id: 'bottom', label: 'Mặt dưới', sub: 'DƯỚI' },
  ];

  const renderEngine = () => {
    const isCutout = viewMode === 'cutout';
    const cycleAngle = angle % (Math.PI * 4);
    const twoStrokeAngle = angle % (Math.PI * 2);
    
    // Firing order 1-3-4-2
    // Cycle phases for 4-stroke (720 deg)
    const cyclePhases = [0, 3 * Math.PI, Math.PI, 2 * Math.PI]; // Cyl 1, 2, 3, 4

    if (engineType === '2-stroke') {
      const currentCyclePos = twoStrokeAngle;
      
      // 2-Stroke Logic:
      // 0 - PI: Power/Exhaust (Down)
      // PI - 2PI: Intake/Compression (Up)
      const isExhaust = currentCyclePos < Math.PI && currentCyclePos > Math.PI * 0.6;
      const isIntake = currentCyclePos > Math.PI && currentCyclePos < Math.PI * 1.4;
      const isPower = currentCyclePos < Math.PI * 0.4;
      const isSparking = currentCyclePos < 0.2;

      switch (view) {
        case 'front':
        case 'back':
          return (
            <svg viewBox="-200 -100 800 600" className="w-full h-full drop-shadow-[0_0_30px_rgba(16,185,129,0.1)]">
              <rect x="125" y="80" width="150" height="260" rx="15" fill={isCutout ? "#064e3b" : "#065f46"} stroke="#059669" strokeWidth="4" />
              {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                <rect key={`fin-${i}`} x="110" y={100 + i * 20} width="180" height="4" rx="2" fill="#064e3b" />
              ))}
              <circle cx="200" cy="350" r="60" fill={isCutout ? "#022c22" : "#064e3b"} stroke="#059669" strokeWidth="4" />
              {view === 'front' ? (
                <g transform={`rotate(${(angle * 180) / Math.PI}, 200, 350)`}>
                  <circle cx="200" cy="350" r="40" fill="#475569" />
                  <rect x="195" y="320" width="10" height="60" fill="#94a3b8" />
                </g>
              ) : (
                <g transform={`rotate(${(angle * 180) / Math.PI}, 200, 350)`}>
                  <rect x="180" y="330" width="40" height="40" rx="5" fill="#1e293b" /> {/* Drive Sprocket */}
                  <circle cx="200" cy="350" r="10" fill="#64748b" />
                </g>
              )}
            </svg>
          );
        case 'top':
        case 'bottom':
          return (
            <svg viewBox="-200 -125 800 600" className="w-full h-full drop-shadow-[0_0_30px_rgba(16,185,129,0.1)]">
              {view === 'top' ? (
                <g>
                  <rect x="100" y="100" width="200" height="200" rx="20" fill="#065f46" stroke="#059669" strokeWidth="4" />
                  {[0, 1, 2, 3, 4].map(i => (
                    <circle key={`top-fin-${i}`} cx="200" cy="200" r={40 + i * 20} fill="none" stroke="#064e3b" strokeWidth="4" />
                  ))}
                  <circle cx="200" cy="200" r="15" fill="#e2e8f0" stroke="#059669" /> {/* Spark Plug Top */}
                  {isSparking && <circle cx="200" cy="200" r="25" fill="#fbbf24" opacity="0.8" />}
                </g>
              ) : (
                <g>
                  <circle cx="200" cy="200" r="100" fill="#022c22" stroke="#059669" strokeWidth="4" />
                  <rect x="180" y="180" width="40" height="40" rx="10" fill="#064e3b" /> {/* Crankcase bottom */}
                </g>
              )}
            </svg>
          );
        case 'left':
        case 'right':
          const isLeft = view === 'left';
          return (
            <svg viewBox="0 -100 800 600" className="w-full h-full drop-shadow-[0_0_30px_rgba(16,185,129,0.1)]">
              {/* Engine Mounting Base */}
              <rect x="200" y="380" width="400" height="20" rx="5" fill="#1e293b" />
              
              {/* Cooling Fins - More detailed wrapping fins */}
              {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                <rect key={i} x="260" y={80 + i * 25 + compOffset} width="280" height="6" rx="3" fill="#064e3b" opacity="0.8" />
              ))}

              {/* Engine Block (Single Cylinder 2-Stroke) */}
              <rect x="250" y={60 + compOffset} width="300" height={280 - compOffset} rx="25" fill={isCutout ? "#064e3b" : "#065f46"} stroke="#059669" strokeWidth="4" />
              
              {/* Crankcase (Rounder for 2-stroke) */}
              <circle cx="400" cy="350" r="85" fill={isCutout ? "#022c22" : "#064e3b"} stroke="#059669" strokeWidth="4" />

              {isCutout ? (
                <g>
                  {/* Cylinder Wall */}
                  <rect x="310" y={90 + compOffset} width="180" height={240 - compOffset} fill="#022c22" stroke="#059669" strokeWidth="2" />
                  
                  {/* Transfer Port (Internal Channel) */}
                  <path d="M 490 350 Q 550 350 550 250 L 490 250" fill="none" stroke="#3b82f6" strokeWidth="20" opacity={isIntake ? 0.6 : 0.1} />
                  
                  {/* Ports */}
                  <rect x="280" y="200" width="40" height="40" fill={isExhaust ? "#ef4444" : "#1e293b"} opacity="0.8" /> {/* Exhaust Port */}
                  <rect x="480" y="240" width="40" height="40" fill={isIntake ? "#3b82f6" : "#1e293b"} opacity="0.8" /> {/* Intake/Transfer Port */}

                  {/* Spark Plug */}
                  <rect x="392" y={20 + compOffset} width="16" height="50" rx="4" fill="#e2e8f0" stroke="#059669" />
                  {isSparking && (
                    <g>
                      <circle cx="400" cy={90 + compOffset} r="25" fill="#fbbf24" opacity="0.9">
                        <animate attributeName="r" values="0;35;0" dur="0.05s" repeatCount="1" />
                      </circle>
                      <path d={`M 385 ${90+compOffset} L 415 ${90+compOffset} M 400 ${75+compOffset} L 400 ${105+compOffset}`} stroke="white" strokeWidth="4" />
                    </g>
                  )}

                  {/* Piston & Rod */}
                  <g transform={`translate(400, ${getPistonY(0)})`}>
                    <g transform={`rotate(${getRodAngle(0)})`}>
                      <rect x="-8" y="0" width="16" height={rodLength} rx="8" fill="#94a3b8" />
                      <circle cx="0" cy={rodLength} r="14" fill="#64748b" />
                      <circle cx="0" cy={rodLength} r="10" fill="#0f172a" />
                    </g>
                    <rect x="-85" y="-50" width="170" height="110" rx="6" fill="#10b981" />
                    {/* Piston Rings */}
                    <rect x="-85" y="-35" width="170" height="3" fill="#064e3b" />
                    <rect x="-85" y="-25" width="170" height="3" fill="#064e3b" />
                    <circle cx="0" cy="0" r="8" fill="#0f172a" />
                    
                    {/* Combustion */}
                    {isPower && (
                      <rect x="-85" y={-50 - (getPistonY(0) - (90 + compOffset))} width="170" height={getPistonY(0) - (90 + compOffset)} fill="url(#fireGradient)" opacity="0.6">
                        <animate attributeName="opacity" values="0.6;0.2;0" dur="0.2s" repeatCount="1" />
                      </rect>
                    )}
                  </g>

                  {/* Crankshaft with Counterweight */}
                  <g transform={`translate(400, ${crankCenterY}) rotate(${(angle * 180) / Math.PI})`}>
                    <circle cx="0" cy="0" r="60" fill="#475569" opacity="0.3" />
                    <path d="M -60 0 A 60 60 0 0 1 60 0 Z" fill="#64748b" /> {/* Counterweight */}
                    <rect x="-15" y={-r - 10} width="30" height={r + 20} rx="15" fill="#94a3b8" />
                    <circle cx="0" cy={-r} r="12" fill="#cbd5e1" />
                  </g>
                </g>
              ) : (
                <g>
                  {/* Flywheel / Magneto Cover (on one side) */}
                  {isLeft && (
                    <g>
                      <circle cx="400" cy="350" r="75" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                      <circle cx="400" cy="350" r="20" fill="#334155" />
                      <path d="M 340 300 L 460 300 L 460 400 L 340 400 Z" fill="#1e293b" opacity="0.5" />
                    </g>
                  )}

                  <rect x="280" y="90" width="240" height="220" rx="15" fill="#064e3b" opacity="0.5" />
                  
                  {/* Exhaust Pipe (Expansion Chamber) */}
                  <path d="M 280 220 L 180 220 Q 80 220 80 300 L 80 420" fill="none" stroke="#475569" strokeWidth="35" strokeLinecap="round" />
                  <path d="M 280 220 L 180 220 Q 80 220 80 300 L 80 420" fill="none" stroke="#ef4444" strokeWidth="30" opacity={isExhaust ? 0.6 : 0.1} />
                  
                  {/* Carburetor & Air Filter */}
                  <g transform="translate(550, 220)">
                    <rect width="60" height="70" rx="8" fill="#94a3b8" />
                    <path d="M -30 35 L 0 35" stroke="#94a3b8" strokeWidth="20" />
                    <circle cx="60" cy="35" r="35" fill="#1e293b" /> {/* Air Filter Box */}
                    <rect x="40" y="10" width="40" height="50" rx="5" fill="#334155" opacity="0.8" />
                  </g>

                  {/* Pull Starter (on the other side) */}
                  {!isLeft && (
                    <g transform="translate(400, 350)">
                      <circle r="65" fill="#1e293b" stroke="#475569" strokeWidth="4" />
                      <circle r="15" fill="#334155" />
                      <path d="M 0 -40 L 50 -80" stroke="#475569" strokeWidth="8" strokeLinecap="round" />
                      <rect x="45" y="-90" width="20" height="10" rx="2" fill="#475569" />
                    </g>
                  )}
                </g>
              )}
              <defs>
                <linearGradient id="fireGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          );
      }
    }

    if (engineType === 'i4-diesel') {
      switch (view) {
        case 'front':
        case 'back':
          return (
            <svg viewBox="-200 -100 800 600" className="w-full h-full drop-shadow-[0_0_30px_rgba(244,63,94,0.1)]">
              <rect x="100" y="80" width="200" height="260" rx="20" fill={isCutout ? "#2d0606" : "#450a0a"} stroke="#7f1d1d" strokeWidth="6" />
              <rect x="100" y="40" width="200" height="70" rx="10" fill="#7f1d1d" stroke="#991b1b" strokeWidth="2" />
              <path d="M 120 340 L 280 340 L 260 400 L 140 400 Z" fill="#1a0505" stroke="#7f1d1d" strokeWidth="4" />
              
              {view === 'front' ? (
                <g>
                  {/* Heavy Pulley */}
                  <circle cx="200" cy="350" r="40" fill="#1e293b" stroke="#475569" strokeWidth="6" />
                  <circle cx="200" cy="70" r="30" fill="#1e293b" stroke="#475569" strokeWidth="6" />
                  
                  {/* Thick Belt */}
                  <path d="M 200 40 L 280 175 L 280 225 L 200 390 L 120 200 Z" fill="none" stroke="#000" strokeWidth="12" strokeLinejoin="round" />

                  {/* Mechanical Fuel Pump */}
                  <rect x="260" y="150" width="40" height="60" rx="5" fill="#475569" stroke="#64748b" />
                  
                  {/* Rotating Pulleys */}
                  <g transform={`rotate(${(angle * 180) / Math.PI}, 200, 350)`}>
                    <line x1="160" y1="350" x2="240" y2="350" stroke="#94a3b8" strokeWidth="6" />
                  </g>
                </g>
              ) : (
                <g>
                  {/* Large Flywheel */}
                  <circle cx="200" cy="350" r="75" fill="#334155" stroke="#475569" strokeWidth="6" />
                  <g transform={`rotate(${(angle * 180) / Math.PI}, 200, 350)`}>
                    <circle cx="200" cy="300" r="8" fill="#94a3b8" />
                    <circle cx="200" cy="400" r="8" fill="#94a3b8" />
                  </g>
                </g>
              )}
            </svg>
          );
        case 'top':
        case 'bottom':
          return (
            <svg viewBox="-100 -150 800 600" className="w-full h-full drop-shadow-[0_0_30px_rgba(244,63,94,0.1)]">
              <rect x="50" y="50" width="500" height="220" rx="20" fill={isCutout ? "#2d0606" : "#450a0a"} stroke="#7f1d1d" strokeWidth="6" />
              {view === 'top' ? (
                <g>
                  {/* High Pressure Fuel Rail */}
                  <rect x="80" y="60" width="440" height="15" rx="7" fill="#475569" stroke="#64748b" />
                  {[0, 1, 2, 3].map(i => (
                    <g key={`diesel-top-inj-${i}`}>
                      <rect x={125 + i * 110} y="65" width="12" height="25" fill="#1e293b" />
                      <path d={`M ${131 + i * 110} 75 L ${131 + i * 110} 100`} stroke="#475569" strokeWidth="3" />
                    </g>
                  ))}

                  {/* Turbocharger (Top View) */}
                  <g transform="translate(530, 150)">
                    <circle r="45" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                    <path d="M 0 -45 Q 0 -90 50 -90" fill="none" stroke="#475569" strokeWidth="20" />
                  </g>

                  {/* Valve Cover */}
                  <rect x="70" y="100" width="460" height="140" rx="10" fill="#1a0505" opacity={isCutout ? 0.4 : 1} />
                </g>
              ) : (
                <g>
                  {/* Large Oil Pan Bottom */}
                  <rect x="100" y="80" width="400" height="160" rx="10" fill="#1a0505" />
                  <circle cx="150" cy="160" r="12" fill="#450a0a" /> {/* Drain Plug */}
                  {isCutout && (
                    <g transform="translate(0, 20)">
                      <rect x="120" y="120" width="360" height="30" rx="15" fill="#475569" />
                      {[0, 1, 2, 3].map(i => (
                        <circle key={`diesel-crank-top-${i}`} cx={165 + i * 90} cy="135" r="25" fill="#64748b" opacity="0.5" />
                      ))}
                    </g>
                  )}
                </g>
              )}
            </svg>
          );
        default: // left, right
          return (
            <svg viewBox="0 -100 800 600" className="w-full h-full drop-shadow-[0_0_30px_rgba(244,63,94,0.1)]">
              {/* Turbocharger (Diesel characteristic) */}
              <g transform="translate(650, 150)">
                <circle r="40" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                <g transform={`rotate(${(angle * 3 * 180) / Math.PI})`}>
                  {[0, 45, 90, 135, 180, 225, 270, 315].map(d => (
                    <rect key={d} x="-2" y="-35" width="4" height="30" fill="#94a3b8" transform={`rotate(${d})`} />
                  ))}
                </g>
                <path d="M 0 -40 Q 0 -80 40 -80" fill="none" stroke="#475569" strokeWidth="15" />
              </g>

              {/* Engine Block (Diesel I4 - Heavier Looking) */}
              <rect x="150" y="80" width="500" height="260" rx="20" fill={isCutout ? "#2d0606" : "#450a0a"} stroke="#7f1d1d" strokeWidth="8" />
              <rect x="150" y="40" width="500" height="70" rx="10" fill="#7f1d1d" stroke="#991b1b" strokeWidth="2" />

              {/* Oil Pan (Diesel) */}
              <path d="M 180 340 L 620 340 L 580 400 L 220 400 Z" fill="#1a0505" stroke="#7f1d1d" strokeWidth="4" />
              <path d="M 200 360 L 600 360 L 580 400 L 220 400 Z" fill="#451a03" opacity="0.4" />

              {/* High Pressure Fuel Rail */}
              <rect x="180" y="30" width="440" height="12" rx="6" fill="#475569" stroke="#64748b" />

              {isCutout ? (
                <>
                  {[0, 1, 2, 3].map(i => {
                    const phase = (i === 1 || i === 2) ? Math.PI : 0;
                    const cPhase = cyclePhases[i];
                    const currentCyclePos = (cycleAngle + cPhase) % (Math.PI * 4);
                    const pY = getPistonY(phase);
                    const rA = getRodAngle(phase);
                    const centerX = 250 + i * 110;

                    const isInjection = currentCyclePos > 1.95 * Math.PI && currentCyclePos < 2.05 * Math.PI;
                    const isPower = currentCyclePos > 2 * Math.PI && currentCyclePos < 3 * Math.PI;
                    const isExhaust = currentCyclePos > 3 * Math.PI;

                    return (
                      <g key={`diesel-cyl-${i}`}>
                        <rect x={210 + i * 110} y={110 + compOffset} width="80" height={200 - compOffset} fill="#1a0505" stroke="#7f1d1d" strokeWidth="2" />
                        
                        {/* Fuel Injector */}
                        <rect x={centerX - 4} y={40 + compOffset} width="8" height="50" fill="#1e293b" />
                        <path d={`M ${centerX} ${42+compOffset} L ${centerX} ${90+compOffset}`} stroke="#475569" strokeWidth="2" />
                        
                        {/* Glow Plug (Diesel characteristic) */}
                        <rect x={centerX + 20} y={60 + compOffset} width="4" height="30" fill="#94a3b8" />
                        
                        {isInjection && (
                          <g>
                            <path d={`M ${centerX} ${90+compOffset} L ${centerX-15} ${110+compOffset} M ${centerX} ${90+compOffset} L ${centerX+15} ${110+compOffset}`} stroke="#fbbf24" strokeWidth="3" opacity="0.9">
                              <animate attributeName="opacity" values="0.9;0" dur="0.1s" repeatCount="1" />
                            </path>
                          </g>
                        )}

                        {/* Crank Pin */}
                        <g transform={`translate(${centerX}, ${crankCenterY}) rotate(${(angle + phase) * 180 / Math.PI})`}>
                          <rect x="-15" y={-r - 10} width="30" height={r + 20} rx="10" fill="#64748b" />
                          <circle cx="0" cy={-r} r="10" fill="#94a3b8" />
                          {/* Heavy Counterweight */}
                          <path d="M -30 10 A 30 30 0 0 0 30 10 L 20 50 L -20 50 Z" fill="#475569" />
                        </g>

                        {/* Piston & Rod */}
                        <g transform={`translate(${centerX}, ${pY})`}>
                          {/* Rod - Rotating around Piston Pin */}
                          <g transform={`rotate(${rA})`}>
                            <rect x="-8" y="0" width="16" height={rodLength} rx="8" fill="#64748b" />
                            <circle cx="0" cy={rodLength} r="16" fill="#475569" />
                            <circle cx="0" cy={rodLength} r="10" fill="#0f172a" />
                          </g>
                          
                          {/* Piston Body */}
                          <rect x="-35" y="-40" width="70" height="80" rx="4" fill="#991b1b" />
                          {/* Piston Bowl (Diesel characteristic) */}
                          <path d={`M -20 -40 Q 0 -20 20 -40`} fill="#1a0505" />
                          {/* Piston Rings */}
                          <rect x="-35" y="-25" width="70" height="4" fill="#1a0505" />
                          <rect x="-35" y="-15" width="70" height="4" fill="#1a0505" />
                          <rect x="-35" y="-5" width="70" height="4" fill="#1a0505" />
                          {/* Piston Pin */}
                          <circle cx="0" cy="0" r="8" fill="#0f172a" />
                          
                          {/* Combustion Flash */}
                          {isPower && (
                            <rect x="-35" y={-40 - (pY - (90 + compOffset))} width="70" height={pY - (90 + compOffset)} fill="url(#dieselFire)" opacity="0.6">
                              <animate attributeName="opacity" values="0.6;0" dur="0.3s" repeatCount="1" />
                            </rect>
                          )}
                        </g>

                        {/* Valves (Heavier) */}
                        <rect x={centerX - 30} y={currentCyclePos < Math.PI ? 115 + compOffset : 105 + compOffset} width="20" height="8" fill="#475569" />
                        <rect x={centerX + 10} y={isExhaust ? 115 + compOffset : 105 + compOffset} width="20" height="8" fill="#475569" />
                      </g>
                    );
                  })}
                  <defs>
                    <linearGradient id="dieselFire" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f87171" />
                      <stop offset="50%" stopColor="#ef4444" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </>
              ) : (
                <g>
                  <rect x="200" y="110" width="400" height="180" rx="10" fill="#2d0606" opacity="0.5" />
                  {/* Heavy Duty Exhaust */}
                  <path d="M 600 200 L 700 200 L 700 400" fill="none" stroke="#475569" strokeWidth="30" />
                  {/* Intercooler pipes */}
                  <path d="M 150 150 L 50 150 L 50 300" fill="none" stroke="#3b82f6" strokeWidth="15" opacity="0.6" />
                </g>
              )}
            </svg>
          );
      }
    }

    switch (view) {
      case 'right':
      case 'left':
        return (
          <svg viewBox="0 -100 800 600" className="w-full h-full drop-shadow-[0_0_30px_rgba(99,102,241,0.1)]">
            {/* Water Jacket (Cooling) */}
            <rect x="160" y="90" width="480" height="220" rx="15" fill="#0ea5e9" opacity="0.15" />
            
            {/* Engine Block */}
            <rect x="150" y={80 + compOffset} width="500" height={240 - compOffset} rx="20" fill={isCutout ? "#1e293b" : "#334155"} stroke="#475569" strokeWidth="4" />
            
            {/* Cylinder Head */}
            <rect x="150" y={40 + compOffset} width="500" height="60" rx="10" fill={isCutout ? "#334155" : "#475569"} stroke="#64748b" strokeWidth="2" />
            
            {/* Oil Pan with Oil Level */}
            <g>
              <path d="M 180 320 L 620 320 L 580 380 L 220 380 Z" fill="#0f172a" stroke="#334155" strokeWidth="4" />
              {/* Oil Liquid */}
              <path d="M 195 345 L 605 345 L 580 380 L 220 380 Z" fill="#fbbf24" opacity="0.4">
                <animate attributeName="d" 
                  values="M 195 345 L 605 345 L 580 380 L 220 380 Z; M 195 343 L 605 347 L 580 380 L 220 380 Z; M 195 345 L 605 345 L 580 380 L 220 380 Z" 
                  dur="2s" repeatCount="indefinite" />
              </path>
            </g>

            {isCutout ? (
              <>
                {/* Cylinders (4) */}
                {[0, 1, 2, 3].map(i => (
                  <rect key={`cyl-${i}`} x={210 + i * 110} y="100" width="80" height="200" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                ))}

                {/* Crankshaft */}
                <rect x="170" y={crankCenterY - 10} width="460" height="20" rx="10" fill="#475569" />

                {/* Pistons, Rods, Valves, Spark */}
                {[0, 1, 2, 3].map(i => {
                  const phase = (i === 1 || i === 2) ? Math.PI : 0;
                  const cPhase = cyclePhases[i];
                  const currentCyclePos = (cycleAngle + cPhase) % (Math.PI * 4);
                  
                  const pY = getPistonY(phase);
                  const rA = getRodAngle(phase);
                  const centerX = 250 + i * 110;

                  // 4-Stroke Logic:
                  // 0 - PI: Intake (Down)
                  // PI - 2PI: Compression (Up)
                  // 2PI - 3PI: Power (Down)
                  // 3PI - 4PI: Exhaust (Up)
                  const isIntake = currentCyclePos < Math.PI;
                  const isPower = currentCyclePos > 2 * Math.PI && currentCyclePos < 3 * Math.PI;
                  const isExhaust = currentCyclePos > 3 * Math.PI;
                  const isSparking = isPower && (currentCyclePos - 2 * Math.PI) < 0.3;

                  return (
                    <g key={`piston-group-${i}`}>
                      {/* Intake/Exhaust Gas Flow */}
                      {isIntake && <circle cx={centerX - 20} cy={110 + compOffset} r="15" fill="#3b82f6" opacity="0.3" />}
                      {isExhaust && <circle cx={centerX + 20} cy={110 + compOffset} r="15" fill="#ef4444" opacity="0.3" />}

                      {/* Valves */}
                      <rect x={centerX - 30} y={isIntake ? 105 + compOffset : 95 + compOffset} width="20" height="5" fill="#94a3b8" /> {/* Intake */}
                      <rect x={centerX + 10} y={isExhaust ? 105 + compOffset : 95 + compOffset} width="20" height="5" fill="#94a3b8" /> {/* Exhaust */}

                      {/* Spark Plug & Spark */}
                      <rect x={centerX - 5} y={40 + compOffset} width="10" height="30" fill="#e2e8f0" stroke="#475569" />
                      {isSparking && (
                        <g>
                          <circle cx={centerX} cy={100 + compOffset} r="15" fill="#fbbf24" opacity="0.8">
                            <animate attributeName="r" values="0;20;0" dur="0.1s" repeatCount="1" />
                          </circle>
                          <path d={`M ${centerX-10} ${100+compOffset} L ${centerX+10} ${100+compOffset} M ${centerX} ${90+compOffset} L ${centerX} ${110+compOffset}`} stroke="white" strokeWidth="2" />
                        </g>
                      )}

                      {/* Crank Pin */}
                      <g transform={`translate(${centerX}, ${crankCenterY}) rotate(${(angle + phase) * 180 / Math.PI})`}>
                        {/* Crank Web */}
                        <rect x="-15" y={-r - 10} width="30" height={r + 20} rx="10" fill="#64748b" />
                        {/* Crank Pin */}
                        <circle cx="0" cy={-r} r="10" fill="#94a3b8" />
                        {/* Counterweight */}
                        <path d="M -25 10 A 25 25 0 0 0 25 10 L 15 40 L -15 40 Z" fill="#475569" />
                      </g>

                      {/* Piston & Rod */}
                      <g transform={`translate(${centerX}, ${pY})`}>
                        {/* Rod - Rotating around Piston Pin */}
                        <g transform={`rotate(${rA})`}>
                          {/* Rod Body */}
                          <rect x="-6" y="0" width="12" height={rodLength} rx="6" fill="#94a3b8" />
                          {/* Big End */}
                          <circle cx="0" cy={rodLength} r="14" fill="#64748b" />
                          <circle cx="0" cy={rodLength} r="10" fill="#0f172a" />
                        </g>
                        
                        {/* Piston Body */}
                        <rect x="-35" y="-40" width="70" height="60" rx="8" fill="#3b82f6" />
                        {/* Piston Rings */}
                        <rect x="-35" y="-30" width="70" height="3" fill="#1e293b" />
                        <rect x="-35" y="-20" width="70" height="3" fill="#1e293b" />
                        {/* Piston Pin */}
                        <circle cx="0" cy="0" r="6" fill="#0f172a" />
                        
                        {/* Combustion Flash */}
                        {isPower && <rect x="-35" y={-40 - (pY - (80 + compOffset))} width="70" height={pY - (80 + compOffset)} fill="url(#fireGradient)" opacity="0.5" />}
                      </g>
                    </g>
                  );
                })}
                <defs>
                  <linearGradient id="fireGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </>
            ) : (
              <>
                {/* Manifolds */}
                <g>
                  {/* Intake Manifold (Blue) */}
                  <path d="M 150 120 Q 100 120 80 160 L 80 240 Q 100 280 150 280" fill="none" stroke="#3b82f6" strokeWidth="20" opacity="0.6" />
                  {/* Exhaust Manifold (Red) */}
                  <path d="M 650 120 Q 700 120 720 160 L 720 240 Q 700 280 650 280" fill="none" stroke="#ef4444" strokeWidth="20" opacity="0.6" />
                </g>
                <rect x="200" y="100" width="400" height="180" rx="10" fill="#1e293b" opacity="0.5" />
                {/* Ignition Wires */}
                <path d="M 250 40 Q 250 10 400 10 Q 550 10 550 40" fill="none" stroke="#ef4444" strokeWidth="3" />
              </>
            )}
          </svg>
        );
      case 'front':
      case 'back':
        return (
          <svg viewBox="-200 -100 800 600" className="w-full h-full drop-shadow-[0_0_30px_rgba(99,102,241,0.1)]">
            <rect x="100" y="80" width="200" height="240" rx="20" fill={isCutout ? "#1e293b" : "#334155"} stroke="#475569" strokeWidth="4" />
            <rect x="100" y="40" width="200" height="60" rx="10" fill={isCutout ? "#334155" : "#475569"} stroke="#64748b" strokeWidth="2" />
            <path d="M 120 320 L 280 320 L 260 380 L 140 380 Z" fill="#0f172a" stroke="#334155" strokeWidth="4" />
            
            {view === 'front' ? (
              <g>
                {/* Alternator */}
                <circle cx="280" cy="200" r="25" fill="#475569" stroke="#64748b" strokeWidth="2" />
                <rect x="270" y="180" width="20" height="40" fill="#94a3b8" opacity="0.5" />
                
                {/* Timing Belt / Pulleys */}
                <circle cx="200" cy="350" r="30" fill="#1e293b" stroke="#475569" strokeWidth="4" />
                <circle cx="200" cy="70" r="25" fill="#1e293b" stroke="#475569" strokeWidth="4" />
                
                {/* Serpentine Belt */}
                <path d="M 200 40 L 280 175 L 280 225 L 200 380 L 120 200 Z" fill="none" stroke="#000" strokeWidth="8" strokeLinejoin="round" />

                {/* Cooling Fan */}
                <g transform={`rotate(${(angle * 2 * 180) / Math.PI}, 200, 200)`}>
                  {[0, 60, 120, 180, 240, 300].map(deg => (
                    <rect key={deg} x="195" y="120" width="10" height="80" fill="#1e293b" transform={`rotate(${deg}, 200, 200)`} />
                  ))}
                  <circle cx="200" cy="200" r="15" fill="#334155" />
                </g>

                {/* Rotating Pulleys */}
                <g transform={`rotate(${(angle * 180) / Math.PI}, 200, 350)`}>
                  <line x1="170" y1="350" x2="230" y2="350" stroke="#475569" strokeWidth="4" />
                </g>
                <g transform={`rotate(${(angle * 0.5 * 180) / Math.PI}, 200, 70)`}>
                  <line x1="175" y1="70" x2="225" y2="70" stroke="#475569" strokeWidth="4" />
                </g>
              </g>
            ) : (
              <g>
                {/* Flywheel */}
                <circle cx="200" cy="350" r="60" fill="#334155" stroke="#475569" strokeWidth="4" />
                <g transform={`rotate(${(angle * 180) / Math.PI}, 200, 350)`}>
                  <circle cx="200" cy="310" r="5" fill="#94a3b8" />
                  <circle cx="200" cy="390" r="5" fill="#94a3b8" />
                  <line x1="150" y1="350" x2="250" y2="350" stroke="#475569" strokeWidth="2" />
                </g>
              </g>
            )}
          </svg>
        );
      case 'top':
      case 'bottom':
        return (
          <svg viewBox="-100 -175 800 600" className="w-full h-full drop-shadow-[0_0_30px_rgba(99,102,241,0.1)]">
            <rect x="50" y="50" width="500" height="200" rx="20" fill={isCutout ? "#1e293b" : "#334155"} stroke="#475569" strokeWidth="4" />
            {view === 'top' ? (
              <g>
                {/* Fuel Rail & Injectors */}
                <rect x="80" y="60" width="440" height="10" rx="5" fill="#94a3b8" />
                {[0, 1, 2, 3].map(i => (
                  <rect key={`inj-${i}`} x={125 + i * 110} y="65" width="10" height="20" fill="#475569" />
                ))}

                {/* Valve Cover */}
                <rect x="70" y="85" width="460" height="145" rx="10" fill="#0f172a" opacity={isCutout ? 0.3 : 1} />
                
                {isCutout && (
                  <>
                    {/* Timing Belt (Top View) */}
                    <path d="M 80 110 L 80 200 M 520 110 L 520 200" fill="none" stroke="#000" strokeWidth="4" opacity="0.8" />
                    
                    {/* Camshafts */}
                    <rect x="80" y="110" width="440" height="10" rx="5" fill="#475569" />
                    <rect x="80" y="200" width="440" height="10" rx="5" fill="#475569" />
                    
                    {/* Cam Gears & Timing Marks */}
                    <g transform={`translate(80, 115)`}>
                      <circle r="25" fill="#334155" stroke="#475569" strokeWidth="2" />
                      <g transform={`rotate(${(angle * 0.5 * 180) / Math.PI})`}>
                        <line x1="0" y1="-25" x2="0" y2="-15" stroke="#f59e0b" strokeWidth="3" />
                      </g>
                    </g>
                    <g transform={`translate(80, 205)`}>
                      <circle r="25" fill="#334155" stroke="#475569" strokeWidth="2" />
                      <g transform={`rotate(${(angle * 0.5 * 180) / Math.PI})`}>
                        <line x1="0" y1="-25" x2="0" y2="-15" stroke="#10b981" strokeWidth="3" />
                      </g>
                    </g>

                    {[0, 1, 2, 3].map(i => (
                      <g key={`cam-top-${i}`}>
                        <circle cx={130 + i * 110} cy="115" r="15" fill="#f59e0b" opacity="0.6" />
                        <circle cx={130 + i * 110} cy="205" r="15" fill="#10b981" opacity="0.6" />
                      </g>
                    ))}
                  </>
                )}
              </g>
            ) : (
              <g>
                {/* Oil Pan Bottom */}
                <rect x="100" y="80" width="400" height="140" rx="10" fill="#0f172a" />
                <circle cx="150" cy="150" r="10" fill="#334155" /> {/* Drain Plug */}
                {isCutout && (
                  <g transform="translate(0, 20)">
                    <rect x="120" y="120" width="360" height="20" rx="10" fill="#475569" />
                    {[0, 1, 2, 3].map(i => (
                      <circle key={`crank-top-${i}`} cx={165 + i * 90} cy="130" r="20" fill="#64748b" opacity="0.5" />
                    ))}
                  </g>
                )}
              </g>
            )}
          </svg>
        );
    }
  };

  return (
    <div className="p-4 md:p-6 w-full max-w-[1600px] mx-auto min-h-full md:h-full flex flex-col md:overflow-hidden pb-24 md:pb-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-100 shadow-sm hover:bg-slate-50 transition-all shrink-0"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Mô phỏng {currentEngine.name}</h1>
            <p className="text-xs md:text-sm text-slate-400 font-bold uppercase tracking-widest">{currentEngine.cycle} - {engineType === '2-stroke' ? '1 Xi lanh' : '4 Xi lanh thẳng hàng'}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 md:gap-3">
          <button 
            onClick={() => {
              setIsRunning(false);
              setShowMenu(true);
            }}
            className="px-3 md:px-4 py-2 bg-white rounded-xl text-xs md:text-sm font-black text-slate-600 border border-slate-100 shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">ĐỔI ĐỘNG CƠ</span>
            <span className="sm:hidden">ĐỔI</span>
          </button>
          <button 
            onClick={() => setIsRunning(!isRunning)}
            className={cn(
              "px-4 md:px-6 py-2 rounded-xl text-xs md:text-sm font-black flex items-center gap-2 transition-all shadow-lg",
              isRunning ? "bg-rose-500 text-white shadow-rose-200" : "bg-emerald-500 text-white shadow-emerald-200"
            )}
          >
            {isRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            {isRunning ? "DỪNG MÁY" : "KHỞI ĐỘNG"}
          </button>
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={cn(
              "w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all shrink-0",
              isMuted ? "bg-slate-200 text-slate-500" : "bg-indigo-100 text-indigo-600"
            )}
            title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4 md:gap-6 flex-1 lg:min-h-0">
        {/* Main Viewport */}
        <div className="lg:col-span-3 flex-1 min-h-[450px] md:min-h-[500px] lg:min-h-0 bg-[#0a0f1a] rounded-[2rem] p-4 md:p-6 relative flex flex-col items-center justify-center shadow-2xl border border-slate-800 overflow-hidden">
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

          {/* View Selector */}
          <div className="absolute top-2 md:top-6 left-1/2 -translate-x-1/2 flex flex-col sm:flex-row bg-slate-900/80 backdrop-blur-xl p-1 md:p-1.5 rounded-xl md:rounded-2xl border border-white/10 z-20 shadow-2xl max-w-[95%] items-center gap-1 md:gap-1.5">
            <div className="flex p-0.5 md:p-1 bg-white/5 rounded-lg md:rounded-xl border border-white/5 mr-0 md:mr-1">
              <button 
                onClick={() => setViewMode('outside')}
                className={cn(
                  "px-2 md:px-3 py-1 md:py-1.5 rounded-md md:rounded-lg text-[10px] md:text-xs font-black transition-all uppercase tracking-wider",
                  viewMode === 'outside' ? "bg-white text-indigo-600 shadow-lg" : "text-slate-400 hover:text-white"
                )}
              >
                Vỏ
              </button>
              <button 
                onClick={() => setViewMode('cutout')}
                className={cn(
                  "px-2 md:px-3 py-1 md:py-1.5 rounded-md md:rounded-lg text-[10px] md:text-xs font-black transition-all uppercase tracking-wider",
                  viewMode === 'cutout' ? "bg-white text-indigo-600 shadow-lg" : "text-slate-400 hover:text-white"
                )}
              >
                Cắt
              </button>
            </div>
            
            <div className="hidden sm:block h-6 w-px bg-white/10 mx-1" />
            
            <div className="flex flex-wrap justify-center gap-0.5 md:gap-1">
              {views.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setView(v.id as any)}
                  className={cn(
                    "px-2 md:px-4 py-1 md:py-2 rounded-lg md:rounded-xl text-[10px] md:text-xs font-black transition-all whitespace-nowrap",
                    view === v.id 
                      ? "bg-indigo-600 text-white shadow-xl" 
                      : "text-slate-500 hover:text-white"
                  )}
                >
                  <div className="md:mb-0.5">{v.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Engine Selection Menu Overlay */}
          {showMenu && (
            <div className="absolute inset-0 z-50 bg-[#0a0f1a]/95 backdrop-blur-md flex flex-col items-center p-4 md:p-8 overflow-y-auto">
              <div className="max-w-4xl w-full my-auto py-8">
                <div className="text-center mb-6 md:mb-12">
                  <h2 className="text-xl md:text-4xl font-black text-white mb-1 md:mb-4">Chọn Loại Động Cơ</h2>
                  <p className="text-[10px] md:text-sm text-slate-400 font-bold uppercase tracking-widest">Hệ thống mô phỏng kỹ thuật</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
                  {[
                    { id: 'i4-gas', name: 'Xăng I4', sub: '4 KỲ - 4 XI LANH', desc: 'Động cơ phổ biến nhất trên ô tô du lịch.', color: 'from-indigo-600 to-blue-600' },
                    { id: '2-stroke', name: 'Động cơ 2 Kỳ', sub: 'XĂNG 2 KỲ', desc: 'Đơn giản, công suất lớn trên trọng lượng.', color: 'from-emerald-600 to-teal-600' },
                    { id: 'i4-diesel', name: 'Diesel I4', sub: '4 KỲ - NÉN CHÁY', desc: 'Mô-men xoắn cao, tiết kiệm nhiên liệu.', color: 'from-rose-600 to-orange-600' },
                  ].map((engine) => (
                    <button
                      key={engine.id}
                      onClick={() => {
                        setEngineType(engine.id as any);
                        setIsRunning(false);
                        setShowMenu(false);
                      }}
                      className={cn(
                        "group relative p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-left overflow-hidden",
                        engineType === engine.id && "ring-2 ring-indigo-500 bg-white/10"
                      )}
                    >
                      <div className={cn("absolute top-0 left-0 w-1.5 md:w-2 h-full bg-gradient-to-b", engine.color)} />
                      <div className="mb-3 md:mb-6 w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-2xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Activity className="w-4 h-4 md:w-6 md:h-6 text-white" />
                      </div>
                      <h3 className="text-base md:text-xl font-black text-white mb-0.5 uppercase tracking-tight">{engine.name}</h3>
                      <p className="text-[10px] font-black text-indigo-400 mb-1 md:mb-4 tracking-widest">{engine.sub}</p>
                      <p className="text-[10px] md:text-sm text-slate-400 leading-relaxed line-clamp-2 md:line-clamp-none">{engine.desc}</p>
                    </button>
                  ))}
                </div>

                <div className="mt-6 md:mt-12 flex justify-center">
                  <button 
                    onClick={() => setShowMenu(false)}
                    className="px-6 md:px-12 py-2.5 md:py-4 bg-indigo-600 text-white rounded-xl md:rounded-2xl text-xs md:text-base font-black shadow-2xl shadow-indigo-500/20 hover:bg-indigo-700 transition-all"
                  >
                    BẮT ĐẦU MÔ PHỎNG
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SVG Engine Animation */}
          <div className="relative w-full h-full max-w-4xl flex items-center justify-center py-2 md:py-12 scale-[1.2] md:scale-[1.5] transition-transform duration-500">
            {renderEngine()}
          </div>

          {/* Firing Order Indicator (Only for side views) */}
          {(view === 'left' || view === 'right') && (
            <div className="absolute top-24 md:top-auto md:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-4 z-10 bg-black/40 backdrop-blur-sm p-2 rounded-full border border-white/5">
              {engineType === '2-stroke' ? (
                <div className="flex flex-col items-center gap-0.5 md:gap-2">
                  <div className={cn(
                    "w-2.5 h-2.5 md:w-4 md:h-4 rounded-full transition-all duration-100",
                    Math.sin(angle) > 0.9 ? "bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.8)] scale-125" : "bg-slate-800"
                  )} />
                  <span className="text-[7px] md:text-xs font-black text-slate-400">XL 1</span>
                </div>
              ) : (
                [1, 2, 3, 4].map(i => {
                  const phase = (i === 2 || i === 3) ? Math.PI : 0;
                  const isActive = Math.sin(angle + phase) > 0.9;
                  return (
                    <div key={i} className="flex flex-col items-center gap-0.5 md:gap-2">
                      <div className={cn(
                        "w-2.5 h-2.5 md:w-4 md:h-4 rounded-full transition-all duration-100",
                        isActive ? "bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.8)] scale-125" : "bg-slate-800"
                      )} />
                      <span className="text-[7px] md:text-xs font-black text-slate-400">XL {i}</span>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        <div className="mt-8 md:mt-16 flex flex-wrap justify-center gap-4 md:gap-8">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-blue-500" />
            <span className="text-xs md:text-sm font-black text-slate-400 uppercase tracking-widest">Piston</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-orange-500" />
            <span className="text-xs md:text-sm font-black text-slate-400 uppercase tracking-widest">Kỳ nổ / Xu páp xả</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-emerald-500" />
            <span className="text-xs md:text-sm font-black text-slate-400 uppercase tracking-widest">Xu páp nạp</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-indigo-500" />
            <span className="text-xs md:text-sm font-black text-slate-400 uppercase tracking-widest">Trục khuỷu</span>
          </div>
        </div>

        {/* Telemetry Sidebar */}
        <div className="flex flex-col gap-3 h-auto lg:h-full overflow-y-auto shrink-0 lg:shrink pb-4">
          <div className="bg-white p-3 lg:p-4 rounded-3xl border border-slate-100 shadow-xl flex flex-col gap-2 shrink-0">
            <h3 className="text-slate-900 font-black text-sm">Điều khiển</h3>
            
            <div className="flex flex-col gap-1.5">
              <div className="px-3 py-2 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col gap-2">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Gauge className="w-3.5 h-3.5 text-indigo-600" />
                      <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Vòng tua máy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setIsSlowMo(!isSlowMo)}
                        className={cn(
                          "px-1.5 py-0.5 rounded text-[10px] font-black transition-all border flex items-center gap-1",
                          isSlowMo ? "bg-amber-500 text-white border-amber-600 shadow-sm shadow-amber-500/20" : "bg-white text-slate-500 border-slate-200 hover:bg-slate-100"
                        )}
                      >
                        <div className={cn("w-1.5 h-1.5 rounded-full", isSlowMo ? "bg-white animate-pulse" : "bg-slate-400")} />
                        SLOW-MO
                      </button>
                      <span className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-md text-[10px]">{rpm.toLocaleString()} RPM</span>
                    </div>
                  </div>
                  <input 
                    type="range" 
                    min="800" 
                    max="7000" 
                    step="100" 
                    value={rpm} 
                    onChange={(e) => setRpm(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 mt-1"
                  />
                </div>

                <div className="h-px bg-slate-200 w-full" />

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-3.5 h-3.5 text-rose-600" />
                      <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Tỷ số nén</span>
                    </div>
                    <span className="text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-md text-[10px]">{compressionRatio.toFixed(1)}:1</span>
                  </div>
                  <input 
                    type="range" 
                    min="6" 
                    max="22" 
                    step="0.1" 
                    value={compressionRatio} 
                    onChange={(e) => setCompressionRatio(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600 mt-1"
                  />
                </div>
              </div>

              <div className="px-3 py-2 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="w-3.5 h-3.5 text-indigo-600" />
                  <h4 className="font-black text-slate-900 text-[10px] uppercase tracking-widest">Trạng thái</h4>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500">Chu kỳ</span>
                    <span className="text-xs font-black text-slate-900">
                      {currentEngine.cycle}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500">Thứ tự nổ</span>
                    <span className={cn(
                      "text-xs font-black tracking-widest px-1.5 py-0.5 rounded",
                      currentEngine.color
                    )}>
                      {currentEngine.firingOrder}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500">Nhiên liệu</span>
                    <span className="text-xs font-black text-slate-900">{currentEngine.fuel}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-3 lg:p-4 rounded-3xl border border-slate-100 shadow-xl shrink-0">
            <h3 className="text-slate-900 font-black mb-1.5 text-base">Hệ thống Động cơ</h3>
            <div className="space-y-1">
              {[
                { name: 'Hệ thống Nạp', color: 'bg-blue-500', desc: 'Cung cấp hỗn hợp khí/nhiên liệu' },
                { name: 'Hệ thống Thải', color: 'bg-red-500', desc: 'Đưa khí thải ra ngoài' },
                { name: 'Hệ thống Đánh lửa', color: 'bg-yellow-500', desc: 'Tạo tia lửa đốt cháy nhiên liệu' },
                { name: 'Hệ thống Bôi trơn', color: 'bg-amber-600', desc: 'Giảm ma sát bằng dầu nhờn' },
                { name: 'Hệ thống Làm mát', color: 'bg-sky-400', desc: 'Duy trì nhiệt độ làm việc' },
              ].map((sys, i) => (
                <div key={i} className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className={cn("w-2 h-2 rounded-full shrink-0", sys.color)} />
                  <div className="flex justify-between w-full items-center">
                    <p className="text-xs font-black text-slate-900">{sys.name}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{sys.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={cn("p-4 lg:p-5 rounded-3xl text-white shadow-2xl relative overflow-hidden transition-colors duration-500 flex-1 flex flex-col justify-center min-h-[80px]", 
            engineType === 'i4-gas' ? "bg-[#1a2333]" : 
            engineType === '2-stroke' ? "bg-[#064e3b]" : "bg-[#450a0a]")}>
            <div className="absolute top-0 right-0 p-3 opacity-5">
              <Settings className="w-16 h-16" />
            </div>
            <h3 className="text-sm font-black mb-1 relative z-10">Thông tin kỹ thuật</h3>
            <p className="text-white/80 text-xs leading-relaxed relative z-10 font-medium line-clamp-3">
              {currentEngine.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
