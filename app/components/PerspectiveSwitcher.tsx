'use client';

import React, { useState, useRef } from 'react';

type Perspective = 'ALLIED' | 'JAPANESE';

export default function PerspectiveSwitcher() {
  const [perspective, setPerspective] = useState<Perspective>('ALLIED');
  const [isFlickering, setIsFlickering] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Procedural Radio Static via Web Audio API (Refactored from your HTML logic)
  const playTuningStatic = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const bufferSize = ctx.sampleRate * 0.25; // 250ms burst of static
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 2200;
      filter.Q.value = 0.8;

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      source.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      source.start();
    } catch (e) {
      console.error("Audio Context failed to initialize:", e);
    }
  };

  const handleChannelSwitch = (type: Perspective) => {
    if (type === perspective) return;
    playTuningStatic();
    setIsFlickering(true);
    setPerspective(type);
    setTimeout(() => setIsFlickering(false), 300);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#14181d] border border-white/10 p-6 rounded-lg shadow-2xl font-sans text-[#edeae3]">
      
      {/* Header and Controller Interface */}
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-white/10 pb-6 mb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#c9a24b] font-mono block mb-1">Module 04 // Dual Perspectives</span>
          <h3 className="text-2xl font-bold font-serif tracking-tight">The Accounts of 19 February</h3>
        </div>
        
        {/* Analog Tuning Toggle dials */}
        <div className="flex items-center gap-4 mt-4 md:mt-0 bg-[#0c0e11] p-2 rounded border border-white/5">
          <button
            onClick={() => handleChannelSwitch('ALLIED')}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all rounded ${
              perspective === 'ALLIED'
                ? 'bg-[#c9a24b] text-[#0c0e11] font-bold shadow-md'
                : 'text-[#b4b0a6] hover:text-[#edeae3]'
            }`}
          >
            Ch. 01 // Allied Defense
          </button>
          <div className="w-px h-6 bg-white/10" />
          <button
            onClick={() => handleChannelSwitch('JAPANESE')}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all rounded ${
              perspective === 'JAPANESE'
                ? 'bg-[#c9a24b] text-[#0c0e11] font-bold shadow-md'
                : 'text-[#b4b0a6] hover:text-[#edeae3]'
            }`}
          >
            Ch. 02 // Kido Butai Logs
          </button>
        </div>
      </div>

      {/* The CRT Television Monitor Emulation */}
      <div className="relative w-full aspect-video bg-[#0c0e11] rounded-lg overflow-hidden border-2 border-[#1b2026] shadow-inner inner-shadow-crt">
        
        {/* Scanline and Vignette Overlays */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
        <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_0_80px_rgba(0,0,0,0.9)]" />

        {/* Content Container with dynamic flicker state */}
        <div className={`w-full h-full p-8 md:p-12 flex flex-col justify-between transition-opacity duration-75 ${
          isFlickering ? 'opacity-30 scale-[0.99] filter blur-sm' : 'opacity-100'
        }`}>
          
          {perspective === 'ALLIED' ? (
            <>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#c9a24b]">
                  <span>TRANSMISSION: DARWIN FRONT CARD // SIGNAL LOSS RISK</span>
                  <span>09:57 AM</span>
                </div>
                <h4 className="text-3xl font-bold font-serif tracking-tight text-white max-w-2xl leading-tight">
                  "An unusually large air formation bearing down..."
                </h4>
                <p className="text-sm md:text-base text-[#b4b0a6] leading-relaxed max-w-2xl pt-2">
                  At 09:37 AM, Father John McGrath transmitted a critical warning from the Bathurst Island mission station. 
                  The message reached RAAF operations in Darwin but was tragically dismissed under the assumption that the 
                  blips represented returning American B-17 bombers. Twenty minutes later, the first bombs detonated on Stokes Hill Wharf.
                </p>
              </div>
              <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs font-mono text-white/40">
                <span>LOG ENTRY: 19 FEB 1942</span>
                <span>LOCATION: STOKES HILL TERMINAL</span>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#c9a24b]">
                  <span>TRANSMISSION: IMPERIAL IJN CARRIER FLEET // TRANSLATED LOG</span>
                  <span>148° DEGREES</span>
                </div>
                <h4 className="text-3xl font-bold font-serif tracking-tight text-white max-w-2xl leading-tight">
                  "Target in sight. Sky clear over the Timor Sea."
                </h4>
                <p className="text-sm md:text-base text-[#b4b0a6] leading-relaxed max-w-2xl pt-2">
                  Commander Mitsuo Fuchida coordinated the strike from the flagship carrier group positioned north of Australia. 
                  The combat reports recorded flawless flying conditions and an absolute element of surprise. Their primary objective: 
                  neutralize the northern shipping lanes to prevent Allied disruption of the impending invasion of the Netherlands East Indies.
                </p>
              </div>
              <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs font-mono text-white/40">
                <span>LOG ENTRY: KIDO BUTAI FLIGHT DIARY</span>
                <span>TACTICALARMADA: 188 AIRCRAFT</span>
              </div>
            </>
          )}

        </div>
      </div>
      
      {/* Subtle stylistic baseline instruction */}
      <p className="text-[11px] font-mono text-white/30 text-center mt-4 tracking-wide">
        Interact with the analog controls above to toggle historical perspective channels.
      </p>
    </div>
  );
}
