import { useEffect, useRef } from 'react';

export const useEngineAudio = (
  isRunning: boolean, 
  rpm: number, 
  engineType: 'i4-gas' | '2-stroke' | 'i4-diesel' = 'i4-gas', 
  compressionRatio: number = 10
) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  
  // Nodes
  const masterGainRef = useRef<GainNode | null>(null);
  const engineGainRef = useRef<GainNode | null>(null);
  
  // Oscillators
  const oscBaseRef = useRef<OscillatorNode | null>(null);
  const oscHarmonic1Ref = useRef<OscillatorNode | null>(null);
  const oscHarmonic2Ref = useRef<OscillatorNode | null>(null);
  const lfoPulseRef = useRef<OscillatorNode | null>(null);
  
  // Noise
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const noiseFilterRef = useRef<BiquadFilterNode | null>(null);
  const noiseGainRef = useRef<GainNode | null>(null);

  // Filters
  const exhaustFilterRef = useRef<BiquadFilterNode | null>(null);
  const pulseGainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && audioCtxRef.current?.state === 'running') {
        audioCtxRef.current.suspend();
      } else if (!document.hidden && isRunning && audioCtxRef.current?.state === 'suspended') {
        audioCtxRef.current.resume();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isRunning]);

  useEffect(() => {
    if (isRunning && !audioCtxRef.current) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioCtxRef.current = ctx;

      // Master Output
      const masterGain = ctx.createGain();
      masterGain.gain.value = 0;
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Engine Volume (controlled by RPM)
      const engineGain = ctx.createGain();
      engineGain.gain.value = 1;
      engineGain.connect(masterGain);
      engineGainRef.current = engineGain;

      // Pulse Modulator (creates the "putt-putt" or firing sound)
      const pulseGain = ctx.createGain();
      pulseGain.gain.value = 0.5; // Base volume
      pulseGain.connect(engineGain);
      pulseGainRef.current = pulseGain;

      const lfoPulse = ctx.createOscillator();
      lfoPulse.type = 'sine';
      
      // LFO modulates the pulseGain to create firing pulses
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.5; // Depth of modulation
      lfoPulse.connect(lfoGain);
      lfoGain.connect(pulseGain.gain);
      lfoPulse.start();
      lfoPulseRef.current = lfoPulse;

      // Exhaust Filter
      const exhaustFilter = ctx.createBiquadFilter();
      exhaustFilter.type = 'lowpass';
      exhaustFilter.frequency.value = 400;
      exhaustFilter.Q.value = 2;
      exhaustFilter.connect(pulseGain);
      exhaustFilterRef.current = exhaustFilter;

      // Base Rumble (Engine block resonance)
      const oscBase = ctx.createOscillator();
      oscBase.type = 'triangle';
      oscBase.connect(exhaustFilter);
      oscBase.start();
      oscBaseRef.current = oscBase;

      // Harmonic 1 (Exhaust note)
      const oscHarmonic1 = ctx.createOscillator();
      oscHarmonic1.type = 'sawtooth';
      
      const harm1Gain = ctx.createGain();
      harm1Gain.gain.value = 0.6;
      oscHarmonic1.connect(harm1Gain);
      harm1Gain.connect(exhaustFilter);
      oscHarmonic1.start();
      oscHarmonic1Ref.current = oscHarmonic1;

      // Harmonic 2 (Higher mechanical whine)
      const oscHarmonic2 = ctx.createOscillator();
      oscHarmonic2.type = 'square';
      
      const harm2Gain = ctx.createGain();
      harm2Gain.gain.value = 0.15;
      oscHarmonic2.connect(harm2Gain);
      harm2Gain.connect(exhaustFilter);
      oscHarmonic2.start();
      oscHarmonic2Ref.current = oscHarmonic2;

      // Mechanical Noise (Air intake, valves, diesel clatter)
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;
      
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.value = 2000;
      noiseFilter.Q.value = 1.5;
      
      const noiseGain = ctx.createGain();
      noiseGain.gain.value = 0.1;
      
      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      // Connect noise to pulseGain so it pulses with the engine firing
      noiseGain.connect(pulseGain); 
      noiseSource.start();
      
      noiseSourceRef.current = noiseSource;
      noiseFilterRef.current = noiseFilter;
      noiseGainRef.current = noiseGain;
    }

    if (audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime;
      const master = masterGainRef.current;
      
      if (isRunning) {
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
        
        // Startup sequence
        master?.gain.cancelScheduledValues(now);
        master?.gain.setValueAtTime(0, now);
        
        // Starter motor pulses
        const pulseCount = engineType === '2-stroke' ? 2 : 3;
        for (let i = 0; i < pulseCount; i++) {
          const t = now + i * 0.15;
          master?.gain.linearRampToValueAtTime(0.3, t + 0.05);
          master?.gain.linearRampToValueAtTime(0.05, t + 0.1);
        }
        
        // Engine catches
        const catchTime = now + (pulseCount * 0.15);
        master?.gain.exponentialRampToValueAtTime(0.8, catchTime + 0.1);
        master?.gain.exponentialRampToValueAtTime(0.5, catchTime + 0.5);
      } else {
        // Shutdown sequence
        master?.gain.cancelScheduledValues(now);
        master?.gain.setTargetAtTime(0, now, 0.1);
        
        setTimeout(() => {
          if (audioCtxRef.current?.state === 'running') {
            audioCtxRef.current.suspend();
          }
        }, 300);
      }
    }
  }, [isRunning, engineType]);

  useEffect(() => {
    if (audioCtxRef.current && isRunning) {
      const now = audioCtxRef.current.currentTime;
      const rps = rpm / 60; // Revolutions per second
      
      // Firing frequency (Hz)
      // i4-gas & i4-diesel: 2 fires per revolution
      // 2-stroke (single): 1 fire per revolution
      const firesPerRev = engineType === '2-stroke' ? 1 : 2;
      const firingFreq = Math.max(0.1, rps * firesPerRev);
      
      // Update LFO (Pulse rate)
      if (lfoPulseRef.current) {
        lfoPulseRef.current.frequency.setTargetAtTime(firingFreq, now, 0.1);
      }

      // Update Oscillators (Pitch)
      // Add slight random jitter to pitch for realism
      const jitter = 1 + (Math.random() * 0.02 - 0.01);
      const baseFreq = Math.max(30, rps * 2 * jitter); // Base engine tone
      
      if (oscBaseRef.current) {
        oscBaseRef.current.type = 'sine'; // Deeper rumble
        oscBaseRef.current.frequency.setTargetAtTime(baseFreq * 0.5, now, 0.1); // Sub rumble
      }
      
      if (oscHarmonic1Ref.current) {
        // Diesel has a sharper, more clattery sawtooth
        oscHarmonic1Ref.current.type = engineType === 'i4-diesel' ? 'square' : 'triangle';
        oscHarmonic1Ref.current.frequency.setTargetAtTime(baseFreq, now, 0.1);
      }
      
      if (oscHarmonic2Ref.current) {
        // 2-stroke has a pronounced high-pitch whine
        const h2Mult = engineType === '2-stroke' ? 1.5 : 1.2;
        oscHarmonic2Ref.current.frequency.setTargetAtTime(baseFreq * h2Mult, now, 0.1);
      }

      // Update Filters (Tone opens up at higher RPM)
      if (exhaustFilterRef.current) {
        const minFreq = engineType === '2-stroke' ? 600 : 250;
        const maxFreq = engineType === '2-stroke' ? 4000 : 3000;
        const rpmFactor = Math.min(1, rpm / 7000);
        
        // Compression adds more "bite" (higher filter cutoff and resonance)
        const compFactor = Math.max(0, (compressionRatio - 8) / 15);
        
        const targetFreq = minFreq + (maxFreq - minFreq) * rpmFactor + (compFactor * 500);
        exhaustFilterRef.current.frequency.setTargetAtTime(targetFreq, now, 0.1);
        
        const resonance = 2 + (rpmFactor * 4) + (compFactor * 2);
        exhaustFilterRef.current.Q.setTargetAtTime(resonance, now, 0.1);
      }

      // Update Noise (Clatter, intake hiss)
      if (noiseFilterRef.current && noiseGainRef.current) {
        // Diesel has much more clatter (noise)
        let noiseVol = engineType === 'i4-diesel' ? 0.3 : 0.08;
        
        // 2-stroke has a specific raspy noise
        if (engineType === '2-stroke') noiseVol = 0.15;
        
        // Higher RPM = more air intake/mechanical noise
        noiseVol += (rpm / 7000) * 0.15;
        
        // Higher compression = louder clatter
        noiseVol += (compressionRatio / 20) * 0.05;

        noiseGainRef.current.gain.setTargetAtTime(noiseVol, now, 0.1);
        
        // Shift noise frequency up with RPM
        const baseNoiseFreq = engineType === 'i4-diesel' ? 3000 : 1500;
        noiseFilterRef.current.frequency.setTargetAtTime(baseNoiseFreq + (rpm / 2), now, 0.1);
      }
      
      // Overall Engine Volume
      if (engineGainRef.current) {
        // Volume increases with RPM
        const vol = 0.6 + (rpm / 7000) * 0.4;
        engineGainRef.current.gain.setTargetAtTime(vol, now, 0.1);
      }
    }
  }, [rpm, isRunning, engineType, compressionRatio]);

  return null;
};

