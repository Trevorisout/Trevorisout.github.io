import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  RotateCcw, 
  Info,
  Layers,
  MousePointer2,
  Zap,
  Droplets,
  Wind,
  Thermometer,
  Fan,
  Battery,
  Flame,
  ChevronRight,
  Settings,
  LayoutGrid,
  Activity,
  Circle,
  Cog,
  Box,
  GitBranch
} from 'lucide-react';
import { cn } from '../lib/utils';
import confetti from 'canvas-confetti';

interface DiagramPart {
  id: string;
  name: string;
  nameVn: string;
  description: string;
  icon: any;
  color: string;
  targetX: number;
  targetY: number;
  width?: number;
  height?: number;
}

interface System {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  parts: DiagramPart[];
}

const CoolingDiagram = ({ assembledParts, isComplete }: { assembledParts: string[], isComplete?: boolean }) => (
  <svg className={cn("absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000", isComplete ? "opacity-100" : "opacity-60")} viewBox="0 0 800 500">
    {/* Radiator Area */}
    <rect x="50" y="80" width="100" height="340" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="3" />
    <path d="M 50 150 L 150 150 M 50 200 L 150 200 M 50 250 L 150 250 M 50 300 L 150 300 M 50 350 L 150 350" stroke="currentColor" strokeWidth="1.5" />
    
    {/* Engine Block Area */}
    <rect x="440" y="140" width="270" height="220" rx="10" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="3" />
    <circle cx="510" cy="250" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="575" cy="250" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="640" cy="250" r="30" fill="none" stroke="currentColor" strokeWidth="2" />

    {/* Pipes */}
    <path d="M 150 120 L 350 120 L 440 180" fill="none" stroke={isComplete ? "#3b82f6" : "currentColor"} strokeWidth="6" strokeLinejoin="round" />
    <path d="M 440 320 L 250 320 L 150 380" fill="none" stroke={isComplete ? "#ef4444" : "currentColor"} strokeWidth="6" strokeLinejoin="round" />
    <path d="M 350 120 L 350 320" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="6" />
  </svg>
);

const EngineDiagram = ({ assembledParts, isComplete }: { assembledParts: string[], isComplete?: boolean }) => (
  <svg className={cn("absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000", isComplete ? "opacity-100" : "opacity-60")} viewBox="0 0 800 500">
    {/* Cylinder */}
    <rect x="320" y="100" width="160" height="260" fill="currentColor" fillOpacity="0.05" stroke={isComplete ? "#64748b" : "currentColor"} strokeWidth="3" />
    {/* Piston path */}
    <line x1="320" y1="150" x2="480" y2="150" stroke="currentColor" strokeWidth="2" strokeDasharray="6" />
    <line x1="320" y1="350" x2="480" y2="350" stroke="currentColor" strokeWidth="2" strokeDasharray="6" />
    {/* Crankcase */}
    <path d="M 320 360 L 320 420 L 480 420 L 480 360" fill="currentColor" fillOpacity="0.05" stroke={isComplete ? "#475569" : "currentColor"} strokeWidth="3" />
  </svg>
);

const CrankshaftDiagram = ({ assembledParts, isComplete }: { assembledParts: string[], isComplete?: boolean }) => (
  <svg className={cn("absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000", isComplete ? "opacity-100" : "opacity-60")} viewBox="0 0 800 500">
    {/* Main axis line */}
    <line x1="50" y1="240" x2="750" y2="240" stroke={isComplete ? "#475569" : "currentColor"} strokeWidth="4" strokeDasharray="10" opacity="0.5" />
    
    {/* Already assembled parts (Throw 2) */}
    <g className="transition-all duration-700" style={{ opacity: isComplete ? 1 : 0.7 }}>
      {/* Main Journal 2 */}
      <rect x="440" y="225" width="60" height="30" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="2"/>
      
      {/* Crankweb 2 (going down) */}
      <rect x="500" y="170" width="60" height="140" fill="#64748b" stroke="#334155" strokeWidth="2" rx="10"/>
      <circle cx="530" cy="200" r="15" fill="#94a3b8"/>
      <circle cx="530" cy="280" r="15" fill="#94a3b8"/>
      
      {/* Crankpin 2 (down) */}
      <rect x="560" y="280" width="80" height="30" fill="#93c5fd" stroke="#2563eb" strokeWidth="2"/>
      
      {/* Counterweight 2 */}
      <path d="M 640 230 L 700 230 L 690 310 L 650 310 Z" fill="#94a3b8" stroke="#475569" strokeWidth="2" strokeLinejoin="round"/>
    </g>

    {/* Placeholders for the student's parts */}
    <rect x="100" y="210" width="60" height="60" fill="none" stroke={isComplete ? "transparent" : "#94a3b8"} strokeWidth="2" strokeDasharray="4" />
    <rect x="160" y="210" width="80" height="60" fill="none" stroke={isComplete ? "transparent" : "#94a3b8"} strokeWidth="2" strokeDasharray="4" />
    <rect x="240" y="170" width="60" height="140" fill="none" stroke={isComplete ? "transparent" : "#94a3b8"} strokeWidth="2" strokeDasharray="4" />
    <rect x="300" y="130" width="80" height="60" fill="none" stroke={isComplete ? "transparent" : "#94a3b8"} strokeWidth="2" strokeDasharray="4" />
    <rect x="380" y="230" width="60" height="80" fill="none" stroke={isComplete ? "transparent" : "#94a3b8"} strokeWidth="2" strokeDasharray="4" />
    <rect x="700" y="200" width="80" height="80" fill="none" stroke={isComplete ? "transparent" : "#94a3b8"} strokeWidth="2" strokeDasharray="4" />
  </svg>
);

const LubricationDiagram = ({ assembledParts, isComplete }: { assembledParts: string[], isComplete?: boolean }) => (
  <svg className={cn("absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000", isComplete ? "opacity-100" : "opacity-60")} viewBox="0 0 800 500">
    <rect x="180" y="380" width="440" height="120" rx="10" fill="currentColor" fillOpacity="0.05" stroke={isComplete ? "#eab308" : "currentColor"} strokeWidth="3" />
    <path d="M 400 400 L 400 100 L 100 100 L 100 300" fill="none" stroke={isComplete ? "#eab308" : "currentColor"} strokeWidth="5" />
    <circle cx="200" cy="200" r="30" fill="currentColor" fillOpacity="0.1" stroke={isComplete ? "#ca8a04" : "currentColor"} strokeWidth="3" />
  </svg>
);

const TransmissionDiagram = ({ assembledParts, isComplete }: { assembledParts: string[], isComplete?: boolean }) => (
  <svg className={cn("absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000", isComplete ? "opacity-100" : "opacity-60")} viewBox="0 0 800 500">
    <rect x="80" y="130" width="200" height="240" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="3" />
    <rect x="280" y="180" width="160" height="140" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="3" />
    <line x1="440" y1="250" x2="620" y2="250" stroke="currentColor" strokeWidth="8" strokeDasharray="10" />
    <circle cx="660" cy="250" r="60" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="3" />
    <line x1="660" y1="50" x2="660" y2="450" stroke="currentColor" strokeWidth="6" strokeDasharray="10" />
  </svg>
);

const VisualPart = ({ id, className }: { id: string, className?: string }) => {
  switch (id) {
    // Engine Structure
    case 'block':
      return (
        <svg viewBox="0 0 160 200" className={className}>
          <defs>
            <linearGradient id="blockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="50%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
          <path d="M 0 0 L 160 0 L 160 200 L 0 200 Z M 40 0 L 120 0 L 120 140 L 140 140 L 140 200 L 20 200 L 20 140 L 40 140 Z" fill="url(#blockGrad)" fillRule="evenodd" stroke="#334155" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      );
    case 'head':
      return (
        <svg viewBox="0 0 160 60" className={className}>
          <defs>
            <linearGradient id="headGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
          </defs>
          <path d="M 0 0 L 160 0 L 160 60 L 0 60 Z M 20 0 L 40 0 L 40 60 L 20 60 Z M 70 0 L 90 0 L 90 60 L 70 60 Z M 120 0 L 140 0 L 140 60 L 120 60 Z" fill="url(#headGrad)" fillRule="evenodd" stroke="#475569" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      );
    case 'intake-valve':
      return (
        <svg viewBox="0 0 20 80" className={className}>
          <defs>
            <linearGradient id="ivGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="50%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
          <rect x="8" y="0" width="4" height="70" fill="#cbd5e1" stroke="#64748b" strokeWidth="1"/>
          <path d="M 0 70 L 20 70 L 15 80 L 5 80 Z" fill="url(#ivGrad)" stroke="#0284c7" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      );
    case 'exhaust-valve':
      return (
        <svg viewBox="0 0 20 80" className={className}>
          <defs>
            <linearGradient id="evGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffedd5" />
              <stop offset="50%" stopColor="#fdba74" />
              <stop offset="100%" stopColor="#fb923c" />
            </linearGradient>
          </defs>
          <rect x="8" y="0" width="4" height="70" fill="#cbd5e1" stroke="#64748b" strokeWidth="1"/>
          <path d="M 0 70 L 20 70 L 15 80 L 5 80 Z" fill="url(#evGrad)" stroke="#ea580c" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      );
    case 'spark-plug':
      return (
        <svg viewBox="0 0 20 60" className={className}>
          <defs>
            <linearGradient id="ceramic" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
          </defs>
          <rect x="4" y="0" width="12" height="30" fill="url(#ceramic)" stroke="#94a3b8" strokeWidth="2"/>
          <rect x="6" y="30" width="8" height="20" fill="#94a3b8" stroke="#475569" strokeWidth="2"/>
          <path d="M 10 50 L 10 60 L 14 60" fill="none" stroke="#475569" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      );
    case 'piston':
      return (
        <svg viewBox="0 0 76 50" className={className}>
          <defs>
            <linearGradient id="pistonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="20%" stopColor="#e2e8f0" />
              <stop offset="50%" stopColor="#f8fafc" />
              <stop offset="80%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
          </defs>
          <path d="M 0 0 L 76 0 L 76 50 L 0 50 Z" fill="url(#pistonGrad)" stroke="#64748b" strokeWidth="2"/>
          <circle cx="38" cy="30" r="8" fill="#334155"/>
          <line x1="0" y1="10" x2="76" y2="10" stroke="#64748b" strokeWidth="2"/>
          <line x1="0" y1="15" x2="76" y2="15" stroke="#64748b" strokeWidth="2"/>
        </svg>
      );
    case 'cylinder':
      return (
        <svg viewBox="0 0 80 140" className={className}>
          <defs>
            <linearGradient id="cylGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="15%" stopColor="#94a3b8" />
              <stop offset="85%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="80" height="140" fill="url(#cylGrad)" stroke="#94a3b8" strokeWidth="2"/>
          <line x1="0" y1="20" x2="80" y2="20" stroke="#94a3b8" strokeWidth="1"/>
          <line x1="0" y1="40" x2="80" y2="40" stroke="#94a3b8" strokeWidth="1"/>
          <line x1="0" y1="60" x2="80" y2="60" stroke="#94a3b8" strokeWidth="1"/>
          <line x1="0" y1="80" x2="80" y2="80" stroke="#94a3b8" strokeWidth="1"/>
          <line x1="0" y1="100" x2="80" y2="100" stroke="#94a3b8" strokeWidth="1"/>
          <line x1="0" y1="120" x2="80" y2="120" stroke="#94a3b8" strokeWidth="1"/>
        </svg>
      );
    case 'connecting-rod':
      return (
        <svg viewBox="0 0 20 100" className={className}>
          <defs>
            <linearGradient id="rodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="50%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
          </defs>
          <rect x="6" y="10" width="8" height="80" fill="url(#rodGrad)" stroke="#475569" strokeWidth="2"/>
          <circle cx="10" cy="10" r="10" fill="url(#rodGrad)" stroke="#475569" strokeWidth="2"/>
          <circle cx="10" cy="10" r="4" fill="#f8fafc"/>
          <circle cx="10" cy="90" r="10" fill="url(#rodGrad)" stroke="#475569" strokeWidth="2"/>
          <circle cx="10" cy="90" r="6" fill="#f8fafc"/>
        </svg>
      );
    case 'crankshaft':
      return (
        <svg viewBox="0 0 120 80" className={className}>
          <defs>
            <linearGradient id="crankGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="50%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
          <rect x="0" y="50" width="120" height="20" fill="url(#crankGrad)" stroke="#334155" strokeWidth="2"/>
          <rect x="40" y="30" width="40" height="40" fill="#94a3b8" stroke="#475569" strokeWidth="2"/>
          <circle cx="60" cy="40" r="10" fill="#cbd5e1" stroke="#475569" strokeWidth="2"/>
        </svg>
      );
    case 'oil-pan':
      return (
        <svg viewBox="0 0 160 60" className={className}>
          <defs>
            <linearGradient id="panGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>
          <path d="M 0 0 L 160 0 L 140 60 L 20 60 Z" fill="url(#panGrad)" stroke="#78350f" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M 0 0 L 160 0" stroke="#78350f" strokeWidth="4"/>
        </svg>
      );

    // Cooling System
    case 'block-side':
      return (
        <svg viewBox="0 0 160 160" className={className}>
          <path d="M 0 0 L 160 0 L 160 160 L 0 160 Z" fill="#64748b" stroke="#334155" strokeWidth="2" strokeLinejoin="round"/>
          <circle cx="40" cy="80" r="15" fill="#475569" stroke="#334155" strokeWidth="2"/>
          <circle cx="80" cy="80" r="15" fill="#475569" stroke="#334155" strokeWidth="2"/>
          <circle cx="120" cy="80" r="15" fill="#475569" stroke="#334155" strokeWidth="2"/>
        </svg>
      );
    case 'head-side':
      return (
        <svg viewBox="0 0 160 60" className={className}>
          <path d="M 0 0 L 160 0 L 160 60 L 0 60 Z" fill="#94a3b8" stroke="#475569" strokeWidth="2" strokeLinejoin="round"/>
          <rect x="10" y="10" width="140" height="20" fill="#cbd5e1" rx="5"/>
        </svg>
      );
    case 'hot-line':
      return (
        <svg viewBox="0 0 80 20" className={className}>
          <rect x="0" y="4" width="80" height="12" fill="#ef4444" stroke="#b91c1c" strokeWidth="2"/>
          <path d="M 10 10 L 70 10" stroke="#fca5a5" strokeWidth="2" strokeDasharray="4 4"/>
        </svg>
      );
    case 'thermostat':
      return (
        <svg viewBox="0 0 60 40" className={className}>
          <path d="M 0 10 L 60 10 L 60 30 L 0 30 Z" fill="#f97316" stroke="#c2410c" strokeWidth="2"/>
          <circle cx="30" cy="20" r="12" fill="#fdba74" stroke="#c2410c" strokeWidth="2"/>
          <circle cx="30" cy="20" r="4" fill="#c2410c"/>
        </svg>
      );
    case 'radiator':
      return (
        <svg viewBox="0 0 80 40" className={className}>
          <path d="M 0 10 L 80 10 L 80 40 L 0 40 Z" fill="#0ea5e9" stroke="#0369a1" strokeWidth="2"/>
          <rect x="30" y="0" width="20" height="10" fill="#94a3b8" stroke="#475569" strokeWidth="2"/>
        </svg>
      );
    case 'radiator-core':
      return (
        <svg viewBox="0 0 80 160" className={className}>
          <rect x="0" y="0" width="80" height="160" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="2"/>
          <line x1="20" y1="0" x2="20" y2="160" stroke="#7dd3fc" strokeWidth="2"/>
          <line x1="40" y1="0" x2="40" y2="160" stroke="#7dd3fc" strokeWidth="2"/>
          <line x1="60" y1="0" x2="60" y2="160" stroke="#7dd3fc" strokeWidth="2"/>
          <path d="M 0 20 L 80 20 M 0 40 L 80 40 M 0 60 L 80 60 M 0 80 L 80 80 M 0 100 L 80 100 M 0 120 L 80 120 M 0 140 L 80 140" stroke="#bae6fd" strokeWidth="1"/>
        </svg>
      );
    case 'fan':
      return (
        <svg viewBox="0 0 40 140" className={className}>
          <rect x="15" y="0" width="10" height="140" fill="#94a3b8" stroke="#475569" strokeWidth="2" rx="5"/>
          <circle cx="20" cy="70" r="10" fill="#475569"/>
        </svg>
      );
    case 'bypass':
      return (
        <svg viewBox="0 0 40 40" className={className}>
          <rect x="14" y="0" width="12" height="40" fill="#93c5fd" stroke="#2563eb" strokeWidth="2"/>
          <path d="M 20 5 L 20 35" stroke="#bfdbfe" strokeWidth="2" strokeDasharray="4 4"/>
        </svg>
      );
    case 'pulley':
      return (
        <svg viewBox="0 0 20 60" className={className}>
          <rect x="0" y="0" width="20" height="60" fill="#cbd5e1" stroke="#475569" strokeWidth="2" rx="4"/>
          <rect x="5" y="0" width="10" height="60" fill="#94a3b8"/>
        </svg>
      );
    case 'pump':
      return (
        <svg viewBox="0 0 120 80" className={className}>
          <rect x="0" y="40" width="60" height="20" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2"/>
          <circle cx="70" cy="40" r="35" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2"/>
          <circle cx="70" cy="40" r="15" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="2"/>
          <rect x="100" y="20" width="20" height="40" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2"/>
        </svg>
      );
    case 'distributor':
      return (
        <svg viewBox="0 0 20 40" className={className}>
          <rect x="0" y="10" width="20" height="20" fill="#22d3ee" stroke="#0891b2" strokeWidth="2"/>
        </svg>
      );

    // Lubrication System
    case 'strainer':
      return (
        <svg viewBox="0 0 40 60" className={className}>
          <path d="M 15 0 L 25 0 L 25 40 L 40 60 L 0 60 L 15 40 Z" fill="#cbd5e1" stroke="#475569" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      );
    case 'pump-safety':
      return (
        <svg viewBox="0 0 40 40" className={className}>
          <rect x="0" y="0" width="40" height="40" fill="#f8fafc" stroke="#ef4444" strokeWidth="2" rx="4"/>
          <circle cx="20" cy="20" r="8" fill="#ef4444"/>
        </svg>
      );
    case 'filter-safety':
      return (
        <svg viewBox="0 0 40 40" className={className}>
          <rect x="0" y="0" width="40" height="40" fill="#f8fafc" stroke="#eab308" strokeWidth="2" rx="4"/>
          <circle cx="20" cy="20" r="8" fill="#eab308"/>
        </svg>
      );
    case 'filter':
      return (
        <svg viewBox="0 0 60 80" className={className}>
          <rect x="0" y="0" width="60" height="80" fill="#10b981" stroke="#064e3b" strokeWidth="2" rx="8"/>
          <line x1="0" y1="20" x2="60" y2="20" stroke="#064e3b" strokeWidth="2"/>
          <line x1="0" y1="60" x2="60" y2="60" stroke="#064e3b" strokeWidth="2"/>
        </svg>
      );
    case 'control-valve':
      return (
        <svg viewBox="0 0 40 40" className={className}>
          <circle cx="20" cy="20" r="18" fill="#f8fafc" stroke="#3b82f6" strokeWidth="2"/>
          <path d="M 4 20 L 36 20 M 20 4 L 20 36" stroke="#3b82f6" strokeWidth="2"/>
        </svg>
      );
    case 'cooler':
      return (
        <svg viewBox="0 0 80 80" className={className}>
          <rect x="0" y="0" width="80" height="80" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="2" rx="4"/>
          <path d="M 20 0 L 20 80 M 40 0 L 40 80 M 60 0 L 60 80" stroke="#0ea5e9" strokeWidth="2"/>
        </svg>
      );
    case 'gauge':
      return (
        <svg viewBox="0 0 40 40" className={className}>
          <circle cx="20" cy="20" r="18" fill="#f8fafc" stroke="#4f46e5" strokeWidth="2"/>
          <path d="M 20 20 L 28 12" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="20" cy="20" r="4" fill="#4f46e5"/>
        </svg>
      );
    case 'main-gallery':
      return (
        <svg viewBox="0 0 160 20" className={className}>
          <rect x="0" y="4" width="160" height="12" fill="#2563eb" stroke="#1e3a8a" strokeWidth="2"/>
        </svg>
      );

    // Crankshaft
    case 'front-end':
      return (
        <svg viewBox="0 0 60 60" className={className}>
          <rect x="0" y="20" width="60" height="20" fill="#cbd5e1" stroke="#475569" strokeWidth="2"/>
          <rect x="10" y="10" width="10" height="40" fill="#94a3b8" stroke="#475569" strokeWidth="2"/>
        </svg>
      );
    case 'crankpin':
      return (
        <svg viewBox="0 0 80 60" className={className}>
          <rect x="0" y="15" width="80" height="30" fill="#93c5fd" stroke="#2563eb" strokeWidth="2"/>
        </svg>
      );
    case 'counterweight':
      return (
        <svg viewBox="0 0 60 80" className={className}>
          <path d="M 0 0 L 60 0 L 50 80 L 10 80 Z" fill="#94a3b8" stroke="#475569" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      );
    case 'crankweb':
      return (
        <svg viewBox="0 0 60 140" className={className}>
          <rect x="0" y="0" width="60" height="140" fill="#64748b" stroke="#334155" strokeWidth="2" rx="10"/>
          <circle cx="30" cy="30" r="15" fill="#94a3b8"/>
          <circle cx="30" cy="110" r="15" fill="#94a3b8"/>
        </svg>
      );
    case 'main-journal':
      return (
        <svg viewBox="0 0 80 60" className={className}>
          <rect x="0" y="15" width="80" height="30" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="2"/>
        </svg>
      );
    case 'rear-end':
      return (
        <svg viewBox="0 0 80 80" className={className}>
          <rect x="0" y="20" width="80" height="40" fill="#475569" stroke="#1e293b" strokeWidth="2"/>
          <rect x="60" y="10" width="20" height="60" fill="#334155" stroke="#1e293b" strokeWidth="2"/>
        </svg>
      );

    // Transmission
    case 'engine':
      return (
        <svg viewBox="0 0 200 240" className={className}>
          <path d="M 0 0 L 190 0 L 190 240 L 0 240 Z M 50 0 L 140 0 L 140 170 L 160 170 L 160 240 L 30 240 L 30 170 L 50 170 Z" fill="#475569" fillRule="evenodd" stroke="#334155" strokeWidth="2" strokeLinejoin="round"/>
          <rect x="190" y="60" width="10" height="120" fill="#334155" />
        </svg>
      );
    case 'clutch':
      return (
        <svg viewBox="0 0 40 140" className={className}>
          <rect x="5" y="0" width="30" height="140" fill="#10b981" stroke="#047857" strokeWidth="2" rx="4"/>
          <line x1="20" y1="0" x2="20" y2="140" stroke="#047857" strokeWidth="2" strokeDasharray="4 4"/>
          <path d="M 5 30 L 0 30 L 0 110 L 5 110 Z" fill="#047857" />
          <path d="M 35 30 L 40 30 L 40 110 L 35 110 Z" fill="#047857" />
        </svg>
      );
    case 'gearbox':
      return (
        <svg viewBox="0 0 120 140" className={className}>
          <path d="M 10 0 L 110 30 L 110 110 L 10 140 Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" strokeLinejoin="round"/>
          <circle cx="40" cy="70" r="8" fill="#fca5a5"/>
          <circle cx="60" cy="70" r="8" fill="#fca5a5"/>
          <circle cx="80" cy="70" r="8" fill="#fca5a5"/>
          <path d="M 10 30 L 0 30 L 0 110 L 10 110 Z" fill="#b91c1c" />
          <path d="M 110 40 L 120 40 L 120 100 L 110 100 Z" fill="#b91c1c" />
        </svg>
      );
    case 'propeller-shaft':
      return (
        <svg viewBox="0 0 180 40" className={className}>
          <rect x="20" y="10" width="140" height="20" fill="#cbd5e1" stroke="#475569" strokeWidth="2"/>
          <rect x="10" y="5" width="10" height="30" fill="#94a3b8" stroke="#475569" strokeWidth="2"/>
          <rect x="160" y="5" width="10" height="30" fill="#94a3b8" stroke="#475569" strokeWidth="2"/>
          <path d="M 10 10 L 0 10 L 0 30 L 10 30 Z" fill="#475569" />
          <path d="M 170 10 L 180 10 L 180 30 L 170 30 Z" fill="#475569" />
        </svg>
      );
    case 'differential':
      return (
        <svg viewBox="0 0 80 80" className={className}>
          <circle cx="40" cy="40" r="38" fill="#eab308" stroke="#a16207" strokeWidth="2"/>
          <path d="M 20 40 L 60 40 M 40 20 L 40 60" stroke="#a16207" strokeWidth="2"/>
          <path d="M 0 30 L -10 30 L -10 50 L 0 50 Z" fill="#a16207" />
          <path d="M 30 0 L 30 -10 L 50 -10 L 50 0 Z" fill="#a16207" />
          <path d="M 30 80 L 30 90 L 50 90 L 50 80 Z" fill="#a16207" />
        </svg>
      );
    case 'axle-left':
      return (
        <svg viewBox="0 0 40 160" className={className}>
          <rect x="10" y="10" width="20" height="130" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2"/>
          <rect x="0" y="0" width="40" height="10" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2"/>
          <rect x="0" y="140" width="40" height="10" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2"/>
          <path d="M 10 150 L 10 160 L 30 160 L 30 150 Z" fill="#1d4ed8" />
        </svg>
      );
    case 'axle-right':
      return (
        <svg viewBox="0 0 40 160" className={className}>
          <rect x="10" y="20" width="20" height="130" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2"/>
          <rect x="0" y="10" width="40" height="10" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2"/>
          <rect x="0" y="150" width="40" height="10" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2"/>
          <path d="M 10 10 L 10 0 L 30 0 L 30 10 Z" fill="#1d4ed8" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <rect x="10" y="10" width="80" height="80" fill="currentColor" opacity="0.5" rx="10"/>
        </svg>
      );
  }
};

const SYSTEMS: System[] = [
  {
    id: 'engine-structure',
    title: 'Cấu tạo Động cơ',
    description: 'Các chi tiết chính của động cơ đốt trong kiểu pít tông.',
    icon: Settings,
    color: 'bg-slate-700',
    parts: [
      { id: 'block', name: 'Engine Block', nameVn: 'Thân máy', description: 'Khung xương chính của động cơ.', icon: (props: any) => <VisualPart id="block" {...props} />, color: 'bg-slate-500', targetX: 320, targetY: 160, width: 160, height: 200 },
      { id: 'head', name: 'Cylinder Head', nameVn: 'Nắp máy', description: 'Lắp các xu páp và bu gi.', icon: (props: any) => <VisualPart id="head" {...props} />, color: 'bg-slate-400', targetX: 320, targetY: 100, width: 160, height: 60 },
      { id: 'intake-valve', name: 'Intake Valve', nameVn: 'Xu páp nạp', description: 'Mở để nạp hòa khí vào buồng cháy.', icon: (props: any) => <VisualPart id="intake-valve" {...props} />, color: 'bg-blue-400', targetX: 340, targetY: 80, width: 20, height: 80 },
      { id: 'spark-plug', name: 'Spark Plug', nameVn: 'Bu gi', description: 'Tạo tia lửa điện để đốt cháy hòa khí.', icon: (props: any) => <VisualPart id="spark-plug" {...props} />, color: 'bg-red-500', targetX: 390, targetY: 100, width: 20, height: 60 },
      { id: 'exhaust-valve', name: 'Exhaust Valve', nameVn: 'Xu páp thải', description: 'Mở để xả khí thải ra ngoài.', icon: (props: any) => <VisualPart id="exhaust-valve" {...props} />, color: 'bg-orange-400', targetX: 440, targetY: 80, width: 20, height: 80 },
      { id: 'cylinder', name: 'Cylinder', nameVn: 'Xi lanh', description: 'Không gian để pít tông di chuyển.', icon: (props: any) => <VisualPart id="cylinder" {...props} />, color: 'bg-slate-300', targetX: 360, targetY: 160, width: 80, height: 140 },
      { id: 'piston', name: 'Piston', nameVn: 'Pít tông', description: 'Nhận áp suất khí cháy để truyền lực.', icon: (props: any) => <VisualPart id="piston" {...props} />, color: 'bg-slate-400', targetX: 362, targetY: 200, width: 76, height: 50 },
      { id: 'connecting-rod', name: 'Connecting Rod', nameVn: 'Thanh truyền', description: 'Truyền lực từ pít tông tới trục khuỷu.', icon: (props: any) => <VisualPart id="connecting-rod" {...props} />, color: 'bg-slate-500', targetX: 390, targetY: 220, width: 20, height: 100 },
      { id: 'crankshaft', name: 'Crankshaft', nameVn: 'Trục khuỷu', description: 'Biến chuyển động tịnh tiến thành chuyển động quay.', icon: (props: any) => <VisualPart id="crankshaft" {...props} />, color: 'bg-slate-600', targetX: 340, targetY: 280, width: 120, height: 80 },
      { id: 'oil-pan', name: 'Oil Pan', nameVn: 'Các te', description: 'Nơi chứa dầu bôi trơn và bảo vệ trục khuỷu.', icon: (props: any) => <VisualPart id="oil-pan" {...props} />, color: 'bg-amber-600', targetX: 320, targetY: 360, width: 160, height: 60 },
    ]
  },
  {
    id: 'cooling',
    title: 'Hệ thống Làm mát',
    description: 'Giữ nhiệt độ động cơ ở mức ổn định bằng tuần hoàn nước.',
    icon: Thermometer,
    color: 'bg-cyan-500',
    parts: [
      { id: 'block-side', name: 'Engine Block', nameVn: 'Thân máy', description: 'Nơi chứa các xi lanh và áo nước làm mát.', icon: (props: any) => <VisualPart id="block-side" {...props} />, color: 'bg-slate-500', targetX: 450, targetY: 150, width: 250, height: 200 },
      { id: 'head-side', name: 'Cylinder Head', nameVn: 'Nắp máy', description: 'Đậy kín phía trên thân máy.', icon: (props: any) => <VisualPart id="head-side" {...props} />, color: 'bg-slate-400', targetX: 450, targetY: 90, width: 250, height: 60 },
      { id: 'hot-line', name: 'Hot Water Line', nameVn: 'Đường nước nóng', description: 'Dẫn nước nóng từ động cơ ra két nước.', icon: (props: any) => <VisualPart id="hot-line" {...props} />, color: 'bg-red-400', targetX: 200, targetY: 110, width: 100, height: 20 },
      { id: 'thermostat', name: 'Thermostat', nameVn: 'Van hằng nhiệt', description: 'Điều khiển hướng đi của nước tùy theo nhiệt độ.', icon: (props: any) => <VisualPart id="thermostat" {...props} />, color: 'bg-orange-400', targetX: 420, targetY: 100, width: 60, height: 40 },
      { id: 'radiator', name: 'Radiator', nameVn: 'Két nước', description: 'Nơi giải nhiệt cho nước làm mát.', icon: (props: any) => <VisualPart id="radiator" {...props} />, color: 'bg-blue-500', targetX: 60, targetY: 90, width: 80, height: 40 },
      { id: 'radiator-core', name: 'Radiator Core', nameVn: 'Giàn ống két nước', description: 'Tăng diện tích tiếp xúc để tản nhiệt nhanh hơn.', icon: (props: any) => <VisualPart id="radiator-core" {...props} />, color: 'bg-blue-400', targetX: 60, targetY: 130, width: 80, height: 270 },
      { id: 'fan', name: 'Cooling Fan', nameVn: 'Quạt gió', description: 'Hút không khí đi qua két nước để làm mát.', icon: (props: any) => <VisualPart id="fan" {...props} />, color: 'bg-slate-400', targetX: 160, targetY: 180, width: 40, height: 140 },
      { id: 'bypass', name: 'Bypass Pipe', nameVn: 'Ống nước tắt', description: 'Dẫn nước quay lại bơm khi máy còn lạnh.', icon: (props: any) => <VisualPart id="bypass" {...props} />, color: 'bg-blue-300', targetX: 330, targetY: 140, width: 40, height: 180 },
      { id: 'pulley', name: 'Fan Pulley', nameVn: 'Pully quạt', description: 'Truyền động cho quạt gió.', icon: (props: any) => <VisualPart id="pulley" {...props} />, color: 'bg-slate-600', targetX: 200, targetY: 220, width: 20, height: 60 },
      { id: 'pump', name: 'Water Pump', nameVn: 'Bơm nước', description: 'Tạo áp lực cho nước tuần hoàn.', icon: (props: any) => <VisualPart id="pump" {...props} />, color: 'bg-blue-600', targetX: 220, targetY: 280, width: 120, height: 80 },
      { id: 'distributor', name: 'Distribution Pipe', nameVn: 'Ống phân phối', description: 'Phân phối nước lạnh vào thân máy.', icon: (props: any) => <VisualPart id="distributor" {...props} />, color: 'bg-cyan-400', targetX: 340, targetY: 300, width: 110, height: 40 },
    ]
  },
  {
    id: 'lubrication',
    title: 'Hệ thống Bôi trơn',
    description: 'Giảm ma sát, làm sạch và làm mát các chi tiết máy.',
    icon: Droplets,
    color: 'bg-amber-500',
    parts: [
      { id: 'oil-pan', name: 'Oil Pan', nameVn: 'Các te', description: 'Nơi chứa dầu bôi trơn của động cơ.', icon: (props: any) => <VisualPart id="oil-pan" {...props} />, color: 'bg-amber-600', targetX: 200, targetY: 400, width: 400, height: 80 },
      { id: 'strainer', name: 'Oil Strainer', nameVn: 'Lưới lọc', description: 'Lọc sơ bộ các tạp chất lớn trong dầu.', icon: (props: any) => <VisualPart id="strainer" {...props} />, color: 'bg-slate-500', targetX: 380, targetY: 340, width: 40, height: 60 },
      { id: 'pump', name: 'Oil Pump', nameVn: 'Bơm dầu', description: 'Hút dầu từ các te and đẩy vào hệ thống.', icon: (props: any) => <VisualPart id="pump" {...props} />, color: 'bg-orange-500', targetX: 340, targetY: 260, width: 120, height: 80 },
      { id: 'pump-safety', name: 'Pump Safety Valve', nameVn: 'Van an toàn bơm', description: 'Bảo vệ bơm khi áp suất quá cao.', icon: (props: any) => <VisualPart id="pump-safety" {...props} />, color: 'bg-red-400', targetX: 460, targetY: 280, width: 40, height: 40 },
      { id: 'filter-safety', name: 'Filter Safety Valve', nameVn: 'Van an toàn lọc', description: 'Cho dầu đi tắt khi bầu lọc bị tắc.', icon: (props: any) => <VisualPart id="filter-safety" {...props} />, color: 'bg-yellow-400', targetX: 240, targetY: 180, width: 40, height: 40 },
      { id: 'filter', name: 'Oil Filter', nameVn: 'Bầu lọc dầu', description: 'Lọc sạch các tạp chất nhỏ trong dầu.', icon: (props: any) => <VisualPart id="filter" {...props} />, color: 'bg-emerald-500', targetX: 170, targetY: 160, width: 60, height: 80 },
      { id: 'control-valve', name: 'Control Valve', nameVn: 'Van khống chế', description: 'Điều khiển dầu qua két làm mát khi cần.', icon: (props: any) => <VisualPart id="control-valve" {...props} />, color: 'bg-blue-400', targetX: 160, targetY: 180, width: 40, height: 40 },
      { id: 'cooler', name: 'Oil Cooler', nameVn: 'Két làm mát dầu', description: 'Làm mát dầu khi nhiệt độ quá cao.', icon: (props: any) => <VisualPart id="cooler" {...props} />, color: 'bg-cyan-500', targetX: 60, targetY: 160, width: 80, height: 80 },
      { id: 'gauge', name: 'Pressure Gauge', nameVn: 'Đồng hồ áp suất', description: 'Hiển thị áp suất dầu trong hệ thống.', icon: (props: any) => <VisualPart id="gauge" {...props} />, color: 'bg-indigo-500', targetX: 420, targetY: 80, width: 40, height: 40 },
      { id: 'main-gallery', name: 'Main Oil Gallery', nameVn: 'Đường dầu chính', description: 'Dẫn dầu đến bôi trơn các chi tiết máy.', icon: (props: any) => <VisualPart id="main-gallery" {...props} />, color: 'bg-blue-600', targetX: 200, targetY: 90, width: 160, height: 20 },
    ]
  },
  {
    id: 'crankshaft',
    title: 'Cấu tạo Trục khuỷu',
    description: 'Chi tiết quan trọng biến tịnh tiến thành quay.',
    icon: RotateCcw,
    color: 'bg-slate-600',
    parts: [
      { id: 'front-end', name: 'Shaft End', nameVn: 'Đầu trục', description: 'Phần đầu lắp pully dẫn động.', icon: (props: any) => <VisualPart id="front-end" {...props} />, color: 'bg-slate-400', targetX: 100, targetY: 210, width: 60, height: 60 },
      { id: 'main-journal', name: 'Main Journal', nameVn: 'Cổ khuỷu', description: 'Trục chính quay trong ổ đỡ.', icon: (props: any) => <VisualPart id="main-journal" {...props} />, color: 'bg-indigo-400', targetX: 160, targetY: 210, width: 80, height: 60 },
      { id: 'crankweb', name: 'Crank Web', nameVn: 'Má khuỷu', description: 'Nối cổ khuỷu với chốt khuỷu.', icon: (props: any) => <VisualPart id="crankweb" {...props} />, color: 'bg-slate-600', targetX: 240, targetY: 170, width: 60, height: 140 },
      { id: 'crankpin', name: 'Crankpin', nameVn: 'Chốt khuỷu', description: 'Nơi lắp đầu to thanh truyền.', icon: (props: any) => <VisualPart id="crankpin" {...props} />, color: 'bg-blue-400', targetX: 300, targetY: 130, width: 80, height: 60 },
      { id: 'counterweight', name: 'Counterweight', nameVn: 'Đối trọng', description: 'Cân bằng lực quán tính cho trục.', icon: (props: any) => <VisualPart id="counterweight" {...props} />, color: 'bg-slate-500', targetX: 380, targetY: 230, width: 60, height: 80 },
      { id: 'rear-end', name: 'Shaft Tail', nameVn: 'Đuôi trục', description: 'Phần cuối lắp bánh đà.', icon: (props: any) => <VisualPart id="rear-end" {...props} />, color: 'bg-slate-700', targetX: 700, targetY: 200, width: 80, height: 80 },
    ]
  },
  {
    id: 'transmission',
    title: 'Hệ thống Truyền lực',
    description: 'Truyền mô men quay từ động cơ tới các bánh xe.',
    icon: GitBranch,
    color: 'bg-indigo-600',
    parts: [
      { id: 'engine', name: 'Engine', nameVn: 'Động cơ', description: 'Nguồn phát sinh công suất.', icon: (props: any) => <VisualPart id="engine" {...props} />, color: 'bg-slate-700', targetX: 80, targetY: 130, width: 200, height: 240 },
      { id: 'clutch', name: 'Clutch', nameVn: 'Li hợp', description: 'Ngắt hoặc nối truyền động từ động cơ tới hộp số.', icon: (props: any) => <VisualPart id="clutch" {...props} />, color: 'bg-emerald-500', targetX: 280, targetY: 180, width: 40, height: 140 },
      { id: 'gearbox', name: 'Gearbox', nameVn: 'Hộp số', description: 'Thay đổi tỉ số truyền và mô men quay.', icon: (props: any) => <VisualPart id="gearbox" {...props} />, color: 'bg-red-500', targetX: 320, targetY: 180, width: 120, height: 140 },
      { id: 'propeller-shaft', name: 'Propeller Shaft', nameVn: 'Trục các đăng', description: 'Truyền mô men giữa các trục không đồng tâm.', icon: (props: any) => <VisualPart id="propeller-shaft" {...props} />, color: 'bg-slate-400', targetX: 440, targetY: 230, width: 180, height: 40 },
      { id: 'differential', name: 'Differential', nameVn: 'Vi sai', description: 'Phân phối mô men tới hai bán trục.', icon: (props: any) => <VisualPart id="differential" {...props} />, color: 'bg-yellow-500', targetX: 620, targetY: 210, width: 80, height: 80 },
      { id: 'axle-left', name: 'Left Axle', nameVn: 'Bán trục trái', description: 'Truyền lực tới bánh xe bên trái.', icon: (props: any) => <VisualPart id="axle-left" {...props} />, color: 'bg-blue-500', targetX: 640, targetY: 50, width: 40, height: 160 },
      { id: 'axle-right', name: 'Right Axle', nameVn: 'Bán trục phải', description: 'Truyền lực tới bánh xe bên phải.', icon: (props: any) => <VisualPart id="axle-right" {...props} />, color: 'bg-blue-500', targetX: 640, targetY: 290, width: 40, height: 160 },
    ]
  }
];

interface DiagramAssembly2DProps {
  onBack: () => void;
}

export default function DiagramAssembly2D({ onBack }: DiagramAssembly2DProps) {
  const [selectedSystemId, setSelectedSystemId] = useState<string | null>(null);
  const [assembledParts, setAssembledParts] = useState<string[]>([]);
  const [activePartIndex, setActivePartIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentSystem = SYSTEMS.find(s => s.id === selectedSystemId);
  const currentPart = currentSystem?.parts[activePartIndex];

  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        // Calculate scale to fit 800x500 within the container, with some padding
        const isMobile = window.innerWidth < 768;
        const padding = isMobile ? 10 : 32;
        const scaleX = (width - padding) / 800;
        const scaleY = (height - padding) / 500;
        setScale(Math.min(scaleX, scaleY, 1.1));
      }
    });
    
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleAssemble = (partId: string) => {
    if (currentSystem && partId === currentPart?.id) {
      setAssembledParts([...assembledParts, partId]);
      setShowHint(false);
      if (activePartIndex < currentSystem.parts.length - 1) {
        setActivePartIndex(activePartIndex + 1);
      } else {
        setIsComplete(true);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3b82f6', '#10b981', '#f59e0b']
        });
      }
    }
  };

  const reset = () => {
    setAssembledParts([]);
    setActivePartIndex(0);
    setIsComplete(false);
    setShowHint(false);
  };

  const selectSystem = (id: string) => {
    setSelectedSystemId(id);
    reset();
  };

  if (!selectedSystemId) {
    return (
      <div className="p-2 md:p-8 max-w-7xl mx-auto h-full flex flex-col">
        <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-8 shrink-0">
          <button 
            onClick={onBack}
            className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm hover:bg-slate-50 transition-all"
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-slate-600" />
          </button>
          <div>
            <h1 className="text-xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">Lắp ráp Sơ đồ 2D</h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] md:text-xs">Chọn hệ thống để bắt đầu thực hành</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 flex-1 min-h-0 overflow-y-auto pb-8 pr-2">
          {SYSTEMS.map((system) => (
            <button
              key={system.id}
              onClick={() => selectSystem(system.id)}
              className="group bg-white p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-slate-100 shadow-lg hover:shadow-2xl transition-all text-left relative overflow-hidden flex flex-col h-full min-h-[200px] md:min-h-[280px]"
            >
              <div className={cn("w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-white mb-4 md:mb-6 group-hover:scale-110 transition-transform", system.color)}>
                <system.icon className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-2xl font-black text-slate-900 mb-1 md:mb-3">{system.title}</h3>
              <p className="text-slate-500 text-[10px] md:text-sm leading-relaxed mb-4 md:mb-8 flex-grow line-clamp-2 md:line-clamp-none">{system.description}</p>
              <div className="flex items-center gap-2 text-indigo-600 font-bold group-hover:gap-4 transition-all mt-auto text-xs md:text-base">
                Bắt đầu lắp ráp <ChevronRight className="w-4 h-4" />
              </div>
              <div className="absolute -bottom-10 -right-10 w-24 h-24 md:w-32 md:h-32 bg-slate-50 rounded-full -z-10 group-hover:scale-150 transition-transform opacity-50" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 md:p-6 max-w-7xl mx-auto min-h-full md:h-full flex flex-col md:overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3 md:mb-4 shrink-0">
        <div className="flex items-center gap-3 md:gap-4">
          <button 
            onClick={() => setSelectedSystemId(null)}
            className="w-9 h-9 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center border border-slate-100 shadow-sm hover:bg-slate-50 transition-all shrink-0"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-lg md:text-2xl font-black text-slate-900 tracking-tight leading-tight">Lắp ráp Sơ đồ 2D</h1>
            <p className="text-[10px] md:text-sm text-slate-400 font-bold uppercase tracking-widest">{currentSystem.title}</p>
          </div>
        </div>
        <div className="flex gap-2 md:gap-3">
          <button 
            onClick={() => setSelectedSystemId(null)}
            className="px-3 md:px-6 py-1.5 md:py-2.5 bg-white text-slate-600 rounded-lg md:rounded-xl font-bold flex items-center gap-1.5 md:gap-2 hover:bg-slate-50 border border-slate-100 shadow-sm transition-all text-[10px] md:text-base"
          >
            <LayoutGrid className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Đổi hệ thống</span>
          </button>
          <button 
            onClick={reset}
            className="px-3 md:px-6 py-1.5 md:py-2.5 bg-white text-slate-600 rounded-lg md:rounded-xl font-bold flex items-center gap-1.5 md:gap-2 hover:bg-slate-50 border border-slate-100 shadow-sm transition-all text-[10px] md:text-base"
          >
            <RotateCcw className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Làm lại</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 flex-1 lg:min-h-0 lg:overflow-hidden">
        {/* Assembly Canvas */}
        <div 
          ref={containerRef}
          className={cn(
            "bg-white rounded-[1.5rem] md:rounded-[3rem] p-0 border border-slate-100 shadow-2xl relative overflow-hidden flex items-center justify-center transition-all duration-500",
            isComplete ? "lg:col-span-3 flex-1" : "lg:col-span-2 flex-[2] lg:flex-1 min-h-[350px] md:min-h-[400px] lg:min-h-0"
          )}
        >
          <div 
            className="relative"
            style={{ 
              width: 800, 
              height: 500, 
              transform: `scale(${scale})`,
              transformOrigin: 'center center'
            }}
          >
            {/* Technical Diagrams */}
            <div className="absolute inset-0 flex items-center justify-center text-slate-300">
              {selectedSystemId === 'cooling' && <CoolingDiagram assembledParts={assembledParts} isComplete={isComplete} />}
              {selectedSystemId === 'engine-structure' && <EngineDiagram assembledParts={assembledParts} isComplete={isComplete} />}
              {selectedSystemId === 'crankshaft' && <CrankshaftDiagram assembledParts={assembledParts} isComplete={isComplete} />}
              {selectedSystemId === 'lubrication' && <LubricationDiagram assembledParts={assembledParts} isComplete={isComplete} />}
              {selectedSystemId === 'transmission' && <TransmissionDiagram assembledParts={assembledParts} isComplete={isComplete} />}
            </div>

            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Target Slots */}
            {currentSystem.parts.map((part) => {
              const isAssembled = assembledParts.includes(part.id);
              const isActive = currentPart?.id === part.id;
              const isTarget = isActive && showHint;
              const slotWidth = part.width || 48;
              const slotHeight = part.height || 48;

              return (
                <div
                  key={`slot-${part.id}`}
                  className={cn(
                    "absolute rounded-xl border-2 transition-all flex items-center justify-center",
                    isAssembled ? "border-transparent z-0" : 
                    isTarget ? "border-indigo-600 border-dashed bg-indigo-50/50 scale-110 z-20" : 
                    "border-slate-200 border-dashed bg-slate-50/20 z-10"
                  )}
                  style={{ left: part.targetX, top: part.targetY, width: slotWidth, height: slotHeight }}
                >
                  {!isAssembled && (
                    <div className={cn(
                      "text-[10px] font-black uppercase text-center px-1 tracking-tighter leading-tight bg-white/80 rounded",
                      isTarget ? "text-indigo-600" : "text-slate-400",
                      slotWidth <= 40 ? "-rotate-90 whitespace-nowrap" : ""
                    )}>
                      {part.nameVn}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Assembled Parts */}
            <AnimatePresence>
              {assembledParts.map((partId) => {
                const part = currentSystem.parts.find(p => p.id === partId)!;
                const slotWidth = part.width || 48;
                const slotHeight = part.height || 48;
                return (
                  <motion.div
                    key={`assembled-${part.id}`}
                    initial={{ scale: 0.5, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    className={cn(
                      "absolute flex items-center justify-center z-10"
                    )}
                    style={{ left: part.targetX, top: part.targetY, width: slotWidth, height: slotHeight }}
                  >
                    <part.icon className="w-full h-full drop-shadow-md" />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Draggable Part */}
          {!isComplete && currentPart && (
            <div className="absolute bottom-12 left-0 right-0 flex justify-center pointer-events-none">
              <motion.div
                drag
                dragSnapToOrigin
                onDragStart={() => setIsDragging(true)}
                onDragEnd={(event, info) => {
                  setIsDragging(false);
                  if (!containerRef.current) return;
                  
                  const rect = containerRef.current.getBoundingClientRect();
                  
                  // Get the center of the dragged element
                  const dragElement = event.target as HTMLElement;
                  const dragRect = dragElement.getBoundingClientRect();
                  const centerX = dragRect.left + dragRect.width / 2;
                  const centerY = dragRect.top + dragRect.height / 2;

                  // Calculate the offset of the scaled 800x500 container inside the ref container
                  const scaledWidth = 800 * scale;
                  const scaledHeight = 500 * scale;
                  const offsetX = (rect.width - scaledWidth) / 2;
                  const offsetY = (rect.height - scaledHeight) / 2;
                  
                  // Center coordinates relative to the scaled container
                  const x = (centerX - rect.left - offsetX) / scale;
                  const y = (centerY - rect.top - offsetY) / scale;
                  
                  const dist = Math.sqrt(
                    Math.pow(x - (currentPart.targetX + (currentPart.width || 48) / 2), 2) + 
                    Math.pow(y - (currentPart.targetY + (currentPart.height || 48) / 2), 2)
                  );

                  if (dist < 100) { // Reduced distance threshold for better precision
                    handleAssemble(currentPart.id);
                  }
                }}
                className={cn(
                  "flex flex-col items-center justify-center cursor-grab active:cursor-grabbing pointer-events-auto z-50",
                  isDragging && "scale-110 opacity-90 drop-shadow-2xl"
                )}
                style={{
                  width: currentPart.width || 96,
                  height: currentPart.height || 96,
                }}
              >
                <currentPart.icon className="w-full h-full drop-shadow-xl" />
              </motion.div>
            </div>
          )}

          {isComplete && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center z-50 w-[95%] md:w-[90%] max-w-md pointer-events-auto"
            >
              <div className="w-full p-4 md:p-6 bg-white/95 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-2xl border border-slate-100 flex items-center gap-4 md:gap-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-xl shadow-emerald-200 shrink-0">
                  <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-1">Tuyệt vời!</h2>
                  <p className="text-slate-500 font-bold text-xs md:text-sm mb-3 md:mb-4">Bạn đã hoàn thành sơ đồ.</p>
                  <div className="flex gap-2 md:gap-3">
                    <button 
                      onClick={() => setSelectedSystemId(null)}
                      className="flex-1 py-2 bg-slate-100 text-slate-600 rounded-lg md:rounded-xl font-black text-xs md:text-sm hover:bg-slate-200 transition-all"
                    >
                      Hệ thống khác
                    </button>
                    <button 
                      onClick={reset}
                      className="flex-1 py-2 bg-indigo-600 text-white rounded-lg md:rounded-xl font-black text-xs md:text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all"
                    >
                      Lắp lại
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Instructions Sidebar */}
        {!isComplete && (
          <div className="space-y-3 md:space-y-4 overflow-y-auto pr-2 h-auto lg:h-full pb-4 shrink-0 lg:shrink flex-1 lg:flex-none">
            <div className="bg-white p-3 md:p-6 rounded-xl md:rounded-[2rem] border border-slate-100 shadow-xl">
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-6">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-indigo-50 rounded-lg md:rounded-2xl flex items-center justify-center">
                  <Info className="w-4 h-4 md:w-6 md:h-6 text-indigo-600" />
                </div>
                <h3 className="text-slate-900 font-black text-sm md:text-xl">Nhiệm vụ</h3>
              </div>
              
              <div className="space-y-3 md:space-y-6">
                <div className="p-3 md:p-5 bg-slate-50 rounded-lg md:rounded-2xl border border-slate-100">
                  <p className="text-[10px] md:text-sm text-slate-600 leading-relaxed font-medium">
                    Kéo bộ phận đang nhấp nháy vào vị trí chính xác trên sơ đồ.
                  </p>
                </div>

                <button 
                  onClick={() => setShowHint(!showHint)}
                  className={cn(
                    "w-full py-1.5 md:py-3 rounded-lg md:rounded-xl text-[10px] md:text-base font-bold flex items-center justify-center gap-2 transition-all border shadow-sm",
                    showHint ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-100 hover:bg-slate-50"
                  )}
                >
                  <Info className="w-3 h-3 md:w-4 md:h-4" />
                  {showHint ? "Ẩn gợi ý" : "Hiện gợi ý"}
                </button>

                {currentPart && (
                  <div className="space-y-2 md:space-y-4">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Đang cầm:</p>
                    <div className="flex items-center gap-2 md:gap-4 p-2 md:p-4 bg-white rounded-lg md:rounded-2xl border-2 border-indigo-600 shadow-lg shadow-indigo-50">
                      <div className={cn("w-6 h-6 md:w-10 md:h-10 flex items-center justify-center text-slate-700")}>
                        <currentPart.icon className="w-full h-full" />
                      </div>
                      <div>
                        <h4 className="text-xs md:text-lg font-black text-slate-900 leading-tight">{currentPart.nameVn}</h4>
                        <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest">{currentPart.name}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white p-3 md:p-6 rounded-xl md:rounded-[2rem] border border-slate-100 shadow-xl hidden sm:block">
              <h3 className="text-slate-900 font-black mb-2 md:mb-6 text-sm md:text-xl">Tiến độ</h3>
              <div className="flex gap-1 md:gap-2 mb-2 md:mb-6">
                {currentSystem.parts.map((part) => (
                  <div 
                    key={`progress-${part.id}`}
                    className={cn(
                      "h-1 md:h-3 flex-1 rounded-full transition-all duration-700",
                      assembledParts.includes(part.id) ? part.color : "bg-slate-100"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
