import React from 'react';

interface DiagramProps {
  id: string;
  className?: string;
}

export const Diagram: React.FC<DiagramProps> = ({ id, className = "" }) => {
  const baseClass = `w-full h-auto bg-slate-50 rounded-lg border border-slate-200 shadow-inner ${className}`;

  switch (id) {
    case 'engine-structure':
      return (
        <svg viewBox="0 0 800 400" className={baseClass} xmlns="http://www.w3.org/2000/svg">
          {/* Cylinder Block & Crankcase (11) */}
          <path d="M 300 100 L 500 100 L 500 250 L 550 350 L 250 350 L 300 250 Z" fill="#e2e8f0" stroke="#334155" strokeWidth="4" />
          
          {/* Cylinder Head (1) */}
          <rect x="300" y="50" width="200" height="50" fill="#cbd5e1" stroke="#334155" strokeWidth="4" rx="4" />
          
          {/* Spark Plug (2) */}
          <rect x="390" y="20" width="20" height="30" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
          <path d="M 395 50 L 400 60 L 405 50 Z" fill="#eab308" />
          
          {/* Intake Valve (4) */}
          <line x1="350" y1="30" x2="350" y2="90" stroke="#94a3b8" strokeWidth="4" />
          <polygon points="330,90 370,90 350,70" fill="#94a3b8" stroke="#334155" strokeWidth="2" />
          
          {/* Exhaust Valve (5) */}
          <line x1="450" y1="30" x2="450" y2="90" stroke="#94a3b8" strokeWidth="4" />
          <polygon points="430,90 470,90 450,70" fill="#94a3b8" stroke="#334155" strokeWidth="2" />
          
          {/* Intake Manifold (6) */}
          <path d="M 300 70 Q 250 70 250 30" fill="none" stroke="#3b82f6" strokeWidth="16" strokeLinecap="round" />
          
          {/* Exhaust Manifold (7) */}
          <path d="M 500 70 Q 550 70 550 30" fill="none" stroke="#ef4444" strokeWidth="16" strokeLinecap="round" />
          
          {/* Water Jacket (8) */}
          <rect x="310" y="110" width="20" height="130" fill="#3b82f6" opacity="0.5" />
          <rect x="470" y="110" width="20" height="130" fill="#3b82f6" opacity="0.5" />
          
          {/* Piston (3) */}
          <rect x="340" y="120" width="120" height="80" fill="#94a3b8" stroke="#334155" strokeWidth="4" rx="4" />
          <line x1="340" y1="140" x2="460" y2="140" stroke="#334155" strokeWidth="2" />
          <line x1="340" y1="150" x2="460" y2="150" stroke="#334155" strokeWidth="2" />
          <line x1="340" y1="160" x2="460" y2="160" stroke="#334155" strokeWidth="2" />
          
          {/* Piston Pin */}
          <circle cx="400" cy="170" r="12" fill="#cbd5e1" stroke="#334155" strokeWidth="2" />
          
          {/* Connecting Rod (9) */}
          <path d="M 390 170 L 380 280 L 420 280 L 410 170 Z" fill="#64748b" stroke="#334155" strokeWidth="4" />
          <circle cx="400" cy="280" r="20" fill="#cbd5e1" stroke="#334155" strokeWidth="4" />
          
          {/* Crankshaft (10) */}
          <circle cx="400" cy="310" r="30" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 5" />
          <line x1="400" y1="280" x2="400" y2="310" stroke="#475569" strokeWidth="16" />
          <circle cx="400" cy="310" r="15" fill="#334155" />
          
          {/* Oil Pan (12) */}
          <path d="M 250 350 C 250 400, 550 400, 550 350 Z" fill="#f8fafc" stroke="#334155" strokeWidth="4" />
          <path d="M 260 360 C 260 390, 540 390, 540 360 Z" fill="#eab308" opacity="0.6" />
          
          {/* Flywheel (13) */}
          <ellipse cx="550" cy="310" rx="15" ry="50" fill="#475569" stroke="#334155" strokeWidth="4" />
          <line x1="400" y1="310" x2="550" y2="310" stroke="#334155" strokeWidth="12" />
        </svg>
      );

    case 'crank-mechanism':
      return (
        <svg viewBox="0 0 800 400" className={baseClass} xmlns="http://www.w3.org/2000/svg">
          {/* Cylinder Outline */}
          <rect x="350" y="50" width="100" height="200" fill="none" stroke="#94a3b8" strokeWidth="4" strokeDasharray="10 5" />
          
          {/* Piston (1) */}
          <rect x="355" y="100" width="90" height="60" fill="#cbd5e1" stroke="#334155" strokeWidth="4" rx="4" />
          <line x1="355" y1="120" x2="445" y2="120" stroke="#334155" strokeWidth="2" />
          <line x1="355" y1="130" x2="445" y2="130" stroke="#334155" strokeWidth="2" />
          
          {/* Piston Pin */}
          <circle cx="400" cy="140" r="10" fill="#94a3b8" stroke="#334155" strokeWidth="2" />
          
          {/* Connecting Rod (2) */}
          <path d="M 390 140 L 380 280 L 420 280 L 410 140 Z" fill="#64748b" stroke="#334155" strokeWidth="4" />
          <circle cx="400" cy="280" r="20" fill="#94a3b8" stroke="#334155" strokeWidth="4" />
          
          {/* Crankshaft (3) */}
          <circle cx="400" cy="320" r="40" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 5" />
          <line x1="400" y1="280" x2="400" y2="320" stroke="#475569" strokeWidth="16" />
          <circle cx="400" cy="320" r="15" fill="#334155" />
          
          {/* Flywheel (4) */}
          <ellipse cx="550" cy="320" rx="20" ry="60" fill="#475569" stroke="#334155" strokeWidth="4" />
          <line x1="400" y1="320" x2="550" y2="320" stroke="#334155" strokeWidth="12" />
        </svg>
      );

    case 'valve-mechanism':
      return (
        <svg viewBox="0 0 800 400" className={baseClass} xmlns="http://www.w3.org/2000/svg">
          {/* Camshaft (1) */}
          <circle cx="200" cy="150" r="30" fill="#94a3b8" stroke="#334155" strokeWidth="4" />
          <path d="M 200 120 Q 250 100 230 150 Z" fill="#94a3b8" stroke="#334155" strokeWidth="4" />
          <circle cx="200" cy="150" r="10" fill="#334155" />
          
          {/* Tappet / Pushrod */}
          <rect x="260" y="130" width="20" height="150" fill="#cbd5e1" stroke="#334155" strokeWidth="4" rx="4" />
          
          {/* Rocker Arm (2) */}
          <path d="M 270 130 L 400 80 L 530 130" fill="none" stroke="#64748b" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="400" cy="80" r="15" fill="#334155" />
          
          {/* Valve (3) */}
          <line x1="530" y1="130" x2="530" y2="280" stroke="#cbd5e1" strokeWidth="8" />
          <polygon points="510,280 550,280 530,260" fill="#cbd5e1" stroke="#334155" strokeWidth="4" />
          
          {/* Valve Spring (4) */}
          <path d="M 510 150 L 550 160 L 510 170 L 550 180 L 510 190 L 550 200 L 510 210 L 550 220 L 510 230 L 550 240" fill="none" stroke="#334155" strokeWidth="4" />
          
          {/* Cylinder Head Port */}
          <path d="M 450 280 L 510 280 L 510 200 L 450 200" fill="none" stroke="#94a3b8" strokeWidth="8" />
          <path d="M 610 280 L 550 280 L 550 200 L 610 200" fill="none" stroke="#94a3b8" strokeWidth="8" />
        </svg>
      );

    case 'four-stroke':
      return (
        <svg viewBox="0 0 800 400" className={baseClass} xmlns="http://www.w3.org/2000/svg">
          {/* Intake */}
          <g transform="translate(50, 100)">
            <rect x="0" y="0" width="100" height="150" fill="none" stroke="#334155" strokeWidth="4" />
            <rect x="5" y="50" width="90" height="60" fill="#cbd5e1" stroke="#334155" strokeWidth="2" />
            <path d="M 20 -20 L 40 0" stroke="#3b82f6" strokeWidth="4" /> {/* Intake Valve Open */}
            <path d="M 60 0 L 80 0" stroke="#ef4444" strokeWidth="4" /> {/* Exhaust Valve Closed */}
            <path d="M 20 -40 Q 30 -20 50 10" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray="4 4" /> {/* Air in */}
            <text x="50" y="180" textAnchor="middle" fill="#334155" fontSize="16" fontWeight="bold">NẠP</text>
            <path d="M 50 60 L 50 100 L 40 90 M 50 100 L 60 90" fill="none" stroke="#334155" strokeWidth="4" /> {/* Arrow down */}
          </g>
          
          {/* Compression */}
          <g transform="translate(250, 100)">
            <rect x="0" y="0" width="100" height="150" fill="none" stroke="#334155" strokeWidth="4" />
            <rect x="5" y="20" width="90" height="60" fill="#cbd5e1" stroke="#334155" strokeWidth="2" />
            <path d="M 20 0 L 40 0" stroke="#3b82f6" strokeWidth="4" /> {/* Intake Valve Closed */}
            <path d="M 60 0 L 80 0" stroke="#ef4444" strokeWidth="4" /> {/* Exhaust Valve Closed */}
            <circle cx="50" cy="10" r="5" fill="#eab308" opacity="0.5" /> {/* Compressed mix */}
            <text x="50" y="180" textAnchor="middle" fill="#334155" fontSize="16" fontWeight="bold">NÉN</text>
            <path d="M 50 100 L 50 60 L 40 70 M 50 60 L 60 70" fill="none" stroke="#334155" strokeWidth="4" /> {/* Arrow up */}
          </g>
          
          {/* Power */}
          <g transform="translate(450, 100)">
            <rect x="0" y="0" width="100" height="150" fill="none" stroke="#334155" strokeWidth="4" />
            <rect x="5" y="50" width="90" height="60" fill="#cbd5e1" stroke="#334155" strokeWidth="2" />
            <path d="M 20 0 L 40 0" stroke="#3b82f6" strokeWidth="4" /> {/* Intake Valve Closed */}
            <path d="M 60 0 L 80 0" stroke="#ef4444" strokeWidth="4" /> {/* Exhaust Valve Closed */}
            <path d="M 45 -10 L 50 0 L 55 -10 Z" fill="#eab308" /> {/* Spark */}
            <path d="M 20 10 Q 50 40 80 10" fill="none" stroke="#ef4444" strokeWidth="8" opacity="0.8" /> {/* Explosion */}
            <text x="50" y="180" textAnchor="middle" fill="#334155" fontSize="16" fontWeight="bold">NỔ</text>
            <path d="M 50 60 L 50 100 L 40 90 M 50 100 L 60 90" fill="none" stroke="#ef4444" strokeWidth="6" /> {/* Arrow down strong */}
          </g>
          
          {/* Exhaust */}
          <g transform="translate(650, 100)">
            <rect x="0" y="0" width="100" height="150" fill="none" stroke="#334155" strokeWidth="4" />
            <rect x="5" y="20" width="90" height="60" fill="#cbd5e1" stroke="#334155" strokeWidth="2" />
            <path d="M 20 0 L 40 0" stroke="#3b82f6" strokeWidth="4" /> {/* Intake Valve Closed */}
            <path d="M 60 0 L 80 -20" stroke="#ef4444" strokeWidth="4" /> {/* Exhaust Valve Open */}
            <path d="M 50 10 Q 70 -20 80 -40" fill="none" stroke="#94a3b8" strokeWidth="4" strokeDasharray="4 4" /> {/* Exhaust out */}
            <text x="50" y="180" textAnchor="middle" fill="#334155" fontSize="16" fontWeight="bold">XẢ</text>
            <path d="M 50 100 L 50 60 L 40 70 M 50 60 L 60 70" fill="none" stroke="#334155" strokeWidth="4" /> {/* Arrow up */}
          </g>
        </svg>
      );

    case 'lubrication-system':
      return (
        <svg viewBox="0 0 800 400" className={baseClass} xmlns="http://www.w3.org/2000/svg">
          {/* Engine Block */}
          <rect x="250" y="100" width="300" height="200" fill="#cbd5e1" stroke="#334155" strokeWidth="4" rx="10" />
          
          {/* Oil Pan (1) */}
          <path d="M 250 300 L 280 350 L 520 350 L 550 300 Z" fill="#eab308" stroke="#334155" strokeWidth="4" opacity="0.8" />
          
          {/* Oil Strainer (2) */}
          <rect x="300" y="320" width="40" height="20" fill="#94a3b8" stroke="#334155" strokeWidth="2" />
          <line x1="320" y1="320" x2="320" y2="280" stroke="#334155" strokeWidth="6" />
          
          {/* Oil Pump (3) */}
          <circle cx="320" cy="260" r="20" fill="#ef4444" stroke="#334155" strokeWidth="3" />
          
          {/* Oil Filter (4) */}
          <rect x="180" y="200" width="50" height="80" fill="#3b82f6" stroke="#334155" strokeWidth="4" rx="8" />
          <line x1="300" y1="260" x2="230" y2="260" stroke="#eab308" strokeWidth="6" />
          <line x1="205" y1="200" x2="205" y2="150" stroke="#eab308" strokeWidth="6" />
          
          {/* Relief Valve (5) */}
          <rect x="250" y="250" width="20" height="20" fill="#f97316" stroke="#334155" strokeWidth="2" />
          <path d="M 260 270 L 260 310" fill="none" stroke="#eab308" strokeWidth="4" strokeDasharray="4 4" />
          
          {/* Oil Gallery (6) */}
          <line x1="205" y1="150" x2="500" y2="150" stroke="#eab308" strokeWidth="8" />
          <line x1="300" y1="150" x2="300" y2="200" stroke="#eab308" strokeWidth="6" />
          <line x1="400" y1="150" x2="400" y2="200" stroke="#eab308" strokeWidth="6" />
          <line x1="500" y1="150" x2="500" y2="200" stroke="#eab308" strokeWidth="6" />
          
          {/* Oil Jet (7) */}
          <path d="M 400 200 L 420 180" fill="none" stroke="#eab308" strokeWidth="4" />
          <circle cx="425" cy="175" r="3" fill="#eab308" />
        </svg>
      );

    case 'cooling-system':
      return (
        <svg viewBox="0 0 800 400" className={baseClass} xmlns="http://www.w3.org/2000/svg">
          {/* Engine Block (1) */}
          <rect x="500" y="150" width="200" height="150" fill="#cbd5e1" stroke="#334155" strokeWidth="4" rx="8" />
          
          {/* Cylinder Head (2) */}
          <rect x="500" y="80" width="200" height="70" fill="#94a3b8" stroke="#334155" strokeWidth="4" rx="4" />
          <text x="600" y="180" textAnchor="middle" fill="#334155" fontSize="20" fontWeight="bold">ENGINE</text>
          
          {/* Distribution Pipe (12) */}
          <rect x="520" y="240" width="160" height="20" fill="#3b82f6" stroke="#334155" strokeWidth="2" rx="4" />
          
          {/* Radiator (5) */}
          <rect x="100" y="80" width="80" height="240" fill="#94a3b8" stroke="#334155" strokeWidth="4" rx="4" />
          
          {/* Radiator Fins (6) */}
          {[...Array(11)].map((_, i) => (
            <line key={i} x1="100" y1={100 + i * 20} x2="180" y2={100 + i * 20} stroke="#334155" strokeWidth="2" />
          ))}
          
          {/* Upper Hose (Hot) (3) */}
          <path d="M180 120 Q340 120 460 120" fill="none" stroke="#ef4444" strokeWidth="16" strokeLinecap="round" />
          
          {/* Thermostat (4) */}
          <rect x="460" y="105" width="40" height="30" fill="#eab308" stroke="#334155" strokeWidth="3" rx="4" />
          
          {/* Lower Hose (Cold) (8) */}
          <path d="M180 280 Q340 280 460 260" fill="none" stroke="#3b82f6" strokeWidth="16" strokeLinecap="round" />
          
          {/* Bypass Hose (9) */}
          <path d="M480 135 L480 235" fill="none" stroke="#f59e0b" strokeWidth="10" strokeLinecap="round" />
          
          {/* Water Pump (11) */}
          <circle cx="480" cy="260" r="25" fill="#64748b" stroke="#334155" strokeWidth="3" />
          <circle cx="480" cy="260" r="10" fill="#334155" />
          
          {/* Pump Drive Belt (10) */}
          <path d="M480 235 L480 200" fill="none" stroke="#1e293b" strokeWidth="4" strokeDasharray="5 5" />
          <circle cx="480" cy="200" r="15" fill="#475569" stroke="#334155" strokeWidth="2" />
          
          {/* Cooling Fan (7) */}
          <ellipse cx="220" cy="200" rx="10" ry="80" fill="#334155" opacity="0.8" />
          <line x1="180" y1="200" x2="220" y2="200" stroke="#334155" strokeWidth="6" />
        </svg>
      );

    case 'car-chassis':
      return (
        <svg viewBox="0 0 800 400" className={baseClass} xmlns="http://www.w3.org/2000/svg">
          {/* Chassis Frame */}
          <rect x="150" y="100" width="500" height="200" fill="none" stroke="#94a3b8" strokeWidth="8" rx="10" />
          
          {/* Engine (1) */}
          <rect x="180" y="150" width="100" height="100" fill="#ef4444" stroke="#334155" strokeWidth="4" rx="8" />
          <text x="230" y="205" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="bold">ENGINE</text>
          
          {/* Clutch (2) */}
          <rect x="280" y="170" width="30" height="60" fill="#f97316" stroke="#334155" strokeWidth="4" rx="4" />
          
          {/* Gearbox (3) */}
          <rect x="310" y="160" width="80" height="80" fill="#eab308" stroke="#334155" strokeWidth="4" rx="6" />
          
          {/* Driveshaft (4) */}
          <line x1="390" y1="200" x2="550" y2="200" stroke="#334155" strokeWidth="12" />
          
          {/* Differential (5) */}
          <circle cx="550" cy="200" r="30" fill="#3b82f6" stroke="#334155" strokeWidth="4" />
          
          {/* Axles (6) */}
          <line x1="550" y1="100" x2="550" y2="300" stroke="#334155" strokeWidth="16" />
          
          {/* Front Axle */}
          <line x1="230" y1="100" x2="230" y2="300" stroke="#334155" strokeWidth="16" />
          
          {/* Drive Wheels (Rear) (7) */}
          <rect x="530" y="60" width="40" height="80" fill="#1e293b" rx="8" />
          <rect x="530" y="260" width="40" height="80" fill="#1e293b" rx="8" />
          
          {/* Front Wheels */}
          <rect x="210" y="60" width="40" height="80" fill="#1e293b" rx="8" />
          <rect x="210" y="260" width="40" height="80" fill="#1e293b" rx="8" />
        </svg>
      );

    case 'clutch':
      return (
        <svg viewBox="0 0 800 400" className={baseClass} xmlns="http://www.w3.org/2000/svg">
          {/* Engine Crankshaft */}
          <line x1="100" y1="200" x2="250" y2="200" stroke="#334155" strokeWidth="20" />
          {/* Flywheel */}
          <rect x="250" y="100" width="40" height="200" fill="#64748b" stroke="#334155" strokeWidth="4" rx="5" />
          {/* Friction Disc */}
          <rect x="300" y="120" width="20" height="160" fill="#eab308" stroke="#334155" strokeWidth="3" rx="2" />
          {/* Pressure Plate */}
          <rect x="330" y="100" width="40" height="200" fill="#94a3b8" stroke="#334155" strokeWidth="4" rx="5" />
          {/* Diaphragm Spring */}
          <path d="M370 120 L420 200 L370 280" fill="none" stroke="#ef4444" strokeWidth="6" />
          {/* Release Bearing */}
          <rect x="420" y="180" width="30" height="40" fill="#3b82f6" stroke="#334155" strokeWidth="3" rx="4" />
          {/* Input Shaft (to Gearbox) */}
          <line x1="310" y1="200" x2="600" y2="200" stroke="#334155" strokeWidth="12" strokeDasharray="20 5" />
          {/* Clutch Fork */}
          <line x1="435" y1="180" x2="480" y2="80" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
          <circle cx="457" cy="130" r="6" fill="#ef4444" />
        </svg>
      );

    case 'differential':
      return (
        <svg viewBox="0 0 800 400" className={baseClass} xmlns="http://www.w3.org/2000/svg">
          {/* Driveshaft */}
          <line x1="100" y1="200" x2="350" y2="200" stroke="#334155" strokeWidth="24" />
          {/* Pinion Gear */}
          <polygon points="350,180 400,160 400,240 350,220" fill="#ef4444" stroke="#334155" strokeWidth="4" />
          {/* Ring Gear */}
          <ellipse cx="430" cy="200" rx="30" ry="120" fill="#64748b" stroke="#334155" strokeWidth="4" />
          {/* Differential Case */}
          <rect x="460" y="140" width="80" height="120" fill="#94a3b8" stroke="#334155" strokeWidth="4" rx="10" />
          {/* Spider Gears */}
          <circle cx="500" cy="160" r="15" fill="#eab308" stroke="#334155" strokeWidth="3" />
          <circle cx="500" cy="240" r="15" fill="#eab308" stroke="#334155" strokeWidth="3" />
          {/* Side Gears */}
          <rect x="470" y="180" width="20" height="40" fill="#3b82f6" stroke="#334155" strokeWidth="3" />
          <rect x="510" y="180" width="20" height="40" fill="#3b82f6" stroke="#334155" strokeWidth="3" />
          {/* Axle Shafts */}
          <line x1="470" y1="200" x2="200" y2="200" stroke="#334155" strokeWidth="16" />
          <line x1="530" y1="200" x2="700" y2="200" stroke="#334155" strokeWidth="16" />
        </svg>
      );

    case 'wheel':
      return (
        <svg viewBox="0 0 800 400" className={baseClass} xmlns="http://www.w3.org/2000/svg">
          {/* Tire Cross Section */}
          <path d="M 300 100 C 300 50, 500 50, 500 100 L 500 300 C 500 350, 300 350, 300 300 Z" fill="#1e293b" />
          {/* Tire Tread */}
          <path d="M 320 80 C 350 60, 450 60, 480 80" fill="none" stroke="#0f172a" strokeWidth="10" strokeDasharray="15 10" />
          <path d="M 320 320 C 350 340, 450 340, 480 320" fill="none" stroke="#0f172a" strokeWidth="10" strokeDasharray="15 10" />
          {/* Rim/Wheel */}
          <rect x="350" y="120" width="100" height="160" fill="#cbd5e1" stroke="#64748b" strokeWidth="6" rx="10" />
          {/* Hub */}
          <circle cx="400" cy="200" r="30" fill="#94a3b8" stroke="#334155" strokeWidth="4" />
          {/* Lug Nuts */}
          <circle cx="400" cy="180" r="5" fill="#334155" />
          <circle cx="400" cy="220" r="5" fill="#334155" />
          <circle cx="380" cy="200" r="5" fill="#334155" />
          <circle cx="420" cy="200" r="5" fill="#334155" />
          {/* Valve Stem */}
          <line x1="450" y1="140" x2="470" y2="130" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'suspension':
      return (
        <svg viewBox="0 0 800 400" className={baseClass} xmlns="http://www.w3.org/2000/svg">
          {/* Chassis Mount */}
          <rect x="350" y="50" width="100" height="30" fill="#64748b" stroke="#334155" strokeWidth="4" rx="5" />
          {/* Coil Spring */}
          <path d="M 370 80 Q 330 110 400 140 T 400 200 T 400 260 T 370 300" fill="none" stroke="#3b82f6" strokeWidth="12" strokeLinecap="round" />
          {/* Shock Absorber Upper */}
          <rect x="385" y="80" width="30" height="120" fill="#eab308" stroke="#334155" strokeWidth="3" rx="4" />
          {/* Shock Absorber Lower */}
          <rect x="390" y="180" width="20" height="120" fill="#cbd5e1" stroke="#334155" strokeWidth="3" rx="4" />
          {/* Lower Control Arm */}
          <line x1="200" y1="320" x2="400" y2="300" stroke="#334155" strokeWidth="16" strokeLinecap="round" />
          {/* Wheel Hub Mount */}
          <circle cx="200" cy="320" r="20" fill="#ef4444" stroke="#334155" strokeWidth="4" />
          {/* Wheel Outline */}
          <circle cx="150" cy="320" r="60" fill="none" stroke="#1e293b" strokeWidth="10" strokeDasharray="20 10" />
        </svg>
      );

    case 'steering':
      return (
        <svg viewBox="0 0 800 400" className={baseClass} xmlns="http://www.w3.org/2000/svg">
          {/* Steering Wheel */}
          <ellipse cx="200" cy="100" rx="20" ry="60" fill="none" stroke="#1e293b" strokeWidth="12" />
          <line x1="200" y1="100" x2="250" y2="100" stroke="#1e293b" strokeWidth="8" />
          {/* Steering Column */}
          <line x1="250" y1="100" x2="400" y2="200" stroke="#64748b" strokeWidth="16" strokeLinecap="round" />
          {/* Pinion Gear */}
          <circle cx="400" cy="200" r="25" fill="#ef4444" stroke="#334155" strokeWidth="4" />
          {/* Rack */}
          <rect x="250" y="225" width="300" height="30" fill="#94a3b8" stroke="#334155" strokeWidth="4" rx="4" />
          {/* Rack Teeth */}
          {[...Array(15)].map((_, i) => (
            <line key={i} x1={260 + i * 20} y1="225" x2={260 + i * 20} y2="235" stroke="#334155" strokeWidth="4" />
          ))}
          {/* Tie Rods */}
          <line x1="150" y1="240" x2="250" y2="240" stroke="#3b82f6" strokeWidth="10" strokeLinecap="round" />
          <line x1="550" y1="240" x2="650" y2="240" stroke="#3b82f6" strokeWidth="10" strokeLinecap="round" />
          {/* Steering Knuckles */}
          <rect x="130" y="200" width="20" height="80" fill="#eab308" stroke="#334155" strokeWidth="4" rx="5" />
          <rect x="650" y="200" width="20" height="80" fill="#eab308" stroke="#334155" strokeWidth="4" rx="5" />
        </svg>
      );

    case 'hydraulic-brake':
      return (
        <svg viewBox="0 0 800 400" className={baseClass} xmlns="http://www.w3.org/2000/svg">
          {/* Brake Pedal (1) */}
          <path d="M 100 100 L 150 250 L 180 250" fill="none" stroke="#334155" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="170" y="230" width="20" height="40" fill="#1e293b" rx="4" />
          {/* Push Rod */}
          <line x1="130" y1="180" x2="250" y2="180" stroke="#64748b" strokeWidth="8" />
          
          {/* Master Cylinder (2) */}
          <rect x="250" y="150" width="120" height="60" fill="#cbd5e1" stroke="#334155" strokeWidth="4" rx="8" />
          
          {/* Primary Piston (3) */}
          <rect x="260" y="160" width="20" height="40" fill="#94a3b8" stroke="#334155" strokeWidth="2" />
          {/* Secondary Piston (4) */}
          <rect x="310" y="160" width="20" height="40" fill="#94a3b8" stroke="#334155" strokeWidth="2" />
          
          {/* Return Springs (9) */}
          <path d="M 280 180 L 285 170 L 290 190 L 295 170 L 300 190 L 305 170 L 310 180" fill="none" stroke="#334155" strokeWidth="2" />
          <path d="M 330 180 L 335 170 L 340 190 L 345 170 L 350 190 L 355 170 L 360 180" fill="none" stroke="#334155" strokeWidth="2" />
          
          {/* Fluid Reservoir */}
          <rect x="270" y="80" width="80" height="70" fill="#f8fafc" stroke="#334155" strokeWidth="4" rx="4" />
          <path d="M 270 120 L 350 120 L 350 150 L 270 150 Z" fill="#3b82f6" opacity="0.5" />
          
          {/* Brake Lines (5) */}
          <path d="M 370 180 L 500 180 L 500 250 L 550 250" fill="none" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Brake Caliper / Wheel Cylinder (6) */}
          <path d="M 550 200 C 600 200, 600 300, 550 300 L 550 280 C 580 280, 580 220, 550 220 Z" fill="#eab308" stroke="#334155" strokeWidth="4" />
          
          {/* Brake Pads (7) */}
          <rect x="560" y="230" width="10" height="40" fill="#ef4444" stroke="#334155" strokeWidth="2" />
          <rect x="590" y="230" width="10" height="40" fill="#ef4444" stroke="#334155" strokeWidth="2" />
          
          {/* Brake Rotor (8) */}
          <rect x="575" y="150" width="10" height="200" fill="#94a3b8" stroke="#334155" strokeWidth="3" rx="2" />
        </svg>
      );

    case 'pneumatic-brake':
      return (
        <svg viewBox="0 0 800 400" className={baseClass} xmlns="http://www.w3.org/2000/svg">
          {/* Air Compressor (1) */}
          <rect x="50" y="150" width="80" height="80" fill="#64748b" stroke="#334155" strokeWidth="4" rx="10" />
          <circle cx="90" cy="190" r="20" fill="#94a3b8" stroke="#334155" strokeWidth="2" />
          
          {/* Air Lines (2) */}
          <path d="M 130 190 L 200 190" fill="none" stroke="#3b82f6" strokeWidth="8" />
          <path d="M 300 190 L 400 190" fill="none" stroke="#3b82f6" strokeWidth="8" />
          <path d="M 480 190 L 550 190 L 550 250 L 600 250" fill="none" stroke="#3b82f6" strokeWidth="8" strokeLinejoin="round" />
          
          {/* Air Tank (3) */}
          <rect x="200" y="160" width="100" height="60" fill="#cbd5e1" stroke="#334155" strokeWidth="4" rx="30" />
          
          {/* Brake Valve (4) */}
          <rect x="400" y="160" width="80" height="60" fill="#eab308" stroke="#334155" strokeWidth="4" rx="5" />
          
          {/* Brake Pedal (12) */}
          <path d="M 440 160 L 440 100 L 410 100" fill="none" stroke="#334155" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Brake Chamber (5) */}
          <circle cx="620" cy="250" r="30" fill="#ef4444" stroke="#334155" strokeWidth="4" />
          
          {/* Push Rod & Slack Adjuster (6) */}
          <line x1="650" y1="250" x2="700" y2="250" stroke="#64748b" strokeWidth="6" />
          <rect x="690" y="220" width="10" height="60" fill="#334155" rx="2" />
          
          {/* Brake Cam (7) */}
          <ellipse cx="700" cy="250" rx="10" ry="15" fill="#f59e0b" stroke="#334155" strokeWidth="2" />
          
          {/* Brake Shoes (8) & Pads (9) */}
          <path d="M 720 200 C 750 200, 750 240, 720 240" fill="#94a3b8" stroke="#334155" strokeWidth="4" />
          <path d="M 720 260 C 750 260, 750 300, 720 300" fill="#94a3b8" stroke="#334155" strokeWidth="4" />
          <path d="M 725 205 C 745 205, 745 235, 725 235" fill="#ef4444" />
          <path d="M 725 265 C 745 265, 745 295, 725 295" fill="#ef4444" />
          
          {/* Return Spring (10) */}
          <path d="M 720 240 L 725 245 L 720 250 L 725 255 L 720 260" fill="none" stroke="#334155" strokeWidth="2" />
          
          {/* Brake Drum (11) */}
          <path d="M 710 180 C 780 180, 780 320, 710 320" fill="none" stroke="#1e293b" strokeWidth="6" strokeDasharray="10 5" />
        </svg>
      );

    case 'power-steering':
      return (
        <svg viewBox="0 0 800 400" className={baseClass} xmlns="http://www.w3.org/2000/svg">
          {/* Steering Wheel & Column */}
          <ellipse cx="200" cy="100" rx="20" ry="60" fill="none" stroke="#1e293b" strokeWidth="12" />
          <line x1="200" y1="100" x2="400" y2="100" stroke="#64748b" strokeWidth="16" strokeLinecap="round" />
          
          {/* Power Steering Pump (1) */}
          <circle cx="200" cy="250" r="40" fill="#ef4444" stroke="#334155" strokeWidth="4" />
          <circle cx="200" cy="250" r="15" fill="#94a3b8" />
          
          {/* High Pressure Hose (2) */}
          <path d="M 240 250 Q 350 250 380 150" fill="none" stroke="#ef4444" strokeWidth="8" strokeDasharray="10 5" />
          
          {/* Control Valve (3) */}
          <rect x="380" y="80" width="40" height="60" fill="#eab308" stroke="#334155" strokeWidth="4" rx="4" />
          
          {/* Pinion Gear (6) */}
          <circle cx="400" cy="150" r="25" fill="#3b82f6" stroke="#334155" strokeWidth="4" />
          
          {/* Rack (7) */}
          <rect x="250" y="175" width="300" height="30" fill="#94a3b8" stroke="#334155" strokeWidth="4" rx="4" />
          
          {/* Power Cylinder / Piston (5) */}
          <rect x="300" y="170" width="100" height="40" fill="#cbd5e1" stroke="#334155" strokeWidth="4" rx="4" />
          <line x1="350" y1="170" x2="350" y2="210" stroke="#334155" strokeWidth="6" />
          
          {/* Oil Lines (4) */}
          <path d="M 420 110 Q 500 110 400 180" fill="none" stroke="#3b82f6" strokeWidth="6" />
          <path d="M 420 130 Q 550 130 400 200" fill="none" stroke="#3b82f6" strokeWidth="6" />
          
          {/* Tie Rods */}
          <line x1="150" y1="190" x2="250" y2="190" stroke="#64748b" strokeWidth="10" strokeLinecap="round" />
          <line x1="550" y1="190" x2="650" y2="190" stroke="#64748b" strokeWidth="10" strokeLinecap="round" />
        </svg>
      );

    case 'fuel-system':
      return (
        <svg viewBox="0 0 800 400" className={baseClass} xmlns="http://www.w3.org/2000/svg">
          {/* Fuel Tank (1) */}
          <rect x="100" y="150" width="120" height="100" fill="#cbd5e1" stroke="#334155" strokeWidth="4" rx="10" />
          <path d="M 100 200 L 220 200 L 220 250 L 100 250 Z" fill="#eab308" opacity="0.5" rx="10" />
          <text x="160" y="200" textAnchor="middle" fill="#334155" fontSize="16" fontWeight="bold">TANK</text>
          
          {/* Fuel Pump (2) */}
          <rect x="300" y="180" width="60" height="40" fill="#ef4444" stroke="#334155" strokeWidth="4" rx="5" />
          <circle cx="330" cy="200" r="10" fill="#f8fafc" />
          
          {/* Fuel Filter (3) */}
          <rect x="450" y="170" width="50" height="60" fill="#94a3b8" stroke="#334155" strokeWidth="4" rx="8" />
          <line x1="460" y1="170" x2="460" y2="230" stroke="#334155" strokeWidth="2" />
          <line x1="475" y1="170" x2="475" y2="230" stroke="#334155" strokeWidth="2" />
          <line x1="490" y1="170" x2="490" y2="230" stroke="#334155" strokeWidth="2" />
          
          {/* Fuel Lines */}
          <line x1="220" y1="200" x2="300" y2="200" stroke="#3b82f6" strokeWidth="6" />
          <line x1="360" y1="200" x2="450" y2="200" stroke="#3b82f6" strokeWidth="6" />
          <path d="M 500 200 L 600 200 L 600 120" fill="none" stroke="#3b82f6" strokeWidth="6" strokeLinejoin="round" />
          
          {/* Fuel Injector (4) */}
          <path d="M 580 80 L 620 80 L 610 120 L 590 120 Z" fill="#eab308" stroke="#334155" strokeWidth="4" />
          <line x1="600" y1="120" x2="600" y2="140" stroke="#ef4444" strokeWidth="4" strokeDasharray="4 2" />
          
          {/* Engine Cylinder (5) */}
          <rect x="550" y="140" width="100" height="150" fill="#cbd5e1" stroke="#334155" strokeWidth="4" rx="4" />
          <rect x="560" y="200" width="80" height="90" fill="#94a3b8" stroke="#334155" strokeWidth="2" />
        </svg>
      );

    case 'ignition-system':
      return (
        <svg viewBox="0 0 800 400" className={baseClass} xmlns="http://www.w3.org/2000/svg">
          {/* Battery (1) */}
          <rect x="100" y="150" width="80" height="100" fill="#cbd5e1" stroke="#334155" strokeWidth="4" rx="5" />
          <rect x="115" y="130" width="20" height="20" fill="#ef4444" stroke="#334155" strokeWidth="3" />
          <rect x="145" y="130" width="20" height="20" fill="#3b82f6" stroke="#334155" strokeWidth="3" />
          <text x="140" y="210" textAnchor="middle" fill="#334155" fontSize="24" fontWeight="bold">12V</text>
          
          {/* Ignition Coil (Bobin) (2) */}
          <rect x="300" y="140" width="60" height="120" fill="#eab308" stroke="#334155" strokeWidth="4" rx="10" />
          <line x1="300" y1="160" x2="360" y2="160" stroke="#334155" strokeWidth="2" />
          <line x1="300" y1="180" x2="360" y2="180" stroke="#334155" strokeWidth="2" />
          <line x1="300" y1="200" x2="360" y2="200" stroke="#334155" strokeWidth="2" />
          <line x1="300" y1="220" x2="360" y2="220" stroke="#334155" strokeWidth="2" />
          <line x1="300" y1="240" x2="360" y2="240" stroke="#334155" strokeWidth="2" />
          
          {/* Wires */}
          <path d="M 125 130 L 125 100 L 330 100 L 330 140" fill="none" stroke="#ef4444" strokeWidth="6" strokeLinejoin="round" />
          <path d="M 155 130 L 155 280 L 330 280 L 330 260" fill="none" stroke="#3b82f6" strokeWidth="6" strokeLinejoin="round" />
          
          {/* Distributor / ECU (3) */}
          <rect x="450" y="150" width="100" height="100" fill="#94a3b8" stroke="#334155" strokeWidth="4" rx="8" />
          <circle cx="500" cy="200" r="30" fill="#cbd5e1" stroke="#334155" strokeWidth="3" />
          <circle cx="500" cy="200" r="10" fill="#ef4444" />
          
          {/* High Tension Wire */}
          <path d="M 360 200 L 450 200" fill="none" stroke="#1e293b" strokeWidth="8" strokeDasharray="10 5" />
          
          {/* Spark Plug Wires */}
          <path d="M 550 170 Q 600 170 650 120" fill="none" stroke="#1e293b" strokeWidth="6" />
          <path d="M 550 200 Q 600 200 650 200" fill="none" stroke="#1e293b" strokeWidth="6" />
          <path d="M 550 230 Q 600 230 650 280" fill="none" stroke="#1e293b" strokeWidth="6" />
          
          {/* Spark Plugs (4) */}
          <g transform="translate(650, 100)">
            <rect x="0" y="0" width="20" height="40" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
            <path d="M 5 40 L 10 50 L 15 40 Z" fill="#eab308" />
          </g>
          <g transform="translate(650, 180)">
            <rect x="0" y="0" width="20" height="40" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
            <path d="M 5 40 L 10 50 L 15 40 Z" fill="#eab308" />
          </g>
          <g transform="translate(650, 260)">
            <rect x="0" y="0" width="20" height="40" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
            <path d="M 5 40 L 10 50 L 15 40 Z" fill="#eab308" />
          </g>
        </svg>
      );

    default:
      return (
        <div className={`flex items-center justify-center bg-slate-100 text-slate-400 ${className}`}>
          Diagram not found: {id}
        </div>
      );
  }
};
