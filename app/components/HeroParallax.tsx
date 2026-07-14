// components/HeroParallax.tsx
import { motion, useMotionValue, useTransform } from 'framer-motion';
import React from 'react';

export default function HeroParallax() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map mouse movement to subtle translations
  const bgX = useTransform(x, [-300, 300], [-10, 10]);
  const bgY = useTransform(y, [-300, 300], [-10, 10]);
  
  const midX = useTransform(x, [-300, 300], [-25, 25]);
  const midY = useTransform(y, [-300, 300], [-20, 20]);

  const fgX = useTransform(x, [-300, 300], [-45, 45]);
  const fgY = useTransform(y, [-300, 300], [-35, 35]);

  function handleMouseMove(event: React.MouseEvent) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const mouseX = event.clientX - width / 2;
    const mouseY = event.clientY - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  }

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center cursor-default"
    >
      {/* Layer 1: Deep Sky & Water */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0 z-0">
        <img src="/assets/hero/deep-background.jpg" className="w-full h-full object-cover scale-110" alt="" />
      </motion.div>

      {/* Layer 2: Smoke Plumes (Animated) */}
      <motion.div 
        animate={{ opacity: [0.4, 0.6, 0.4], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-10 mix-blend-screen pointer-events-none"
      >
        <img src="/assets/hero/smoke-plumes.png" className="w-full h-full object-cover" alt="" />
      </motion.div>

      {/* Layer 3: Midground (Wharf/Facilities) */}
      <motion.div style={{ x: midX, y: midY }} className="absolute inset-0 z-20">
        <img src="/assets/hero/midground-wharf.png" className="w-full h-full object-cover scale-110" alt="" />
      </motion.div>

      {/* Layer 4: Planes with HUD overlays */}
      <motion.div style={{ x: fgX, y: fgY }} className="absolute inset-0 z-30 pointer-events-none">
        <div className="relative w-full h-full">
          <img src="/assets/hero/planes.png" className="w-full h-full object-cover scale-115" alt="" />
          {/* Animated HUD Elements */}
          <div className="absolute top-[30%] left-[45%] w-12 h-12 border-2 border-red-500 rounded-full animate-ping opacity-75" />
        </div>
      </motion.div>

      {/* Layer 5: Foreground (Family & splashes) */}
      <motion.div style={{ x: fgX, y: fgY }} className="absolute inset-0 z-40 pointer-events-none">
        <img src="/assets/hero/foreground-family.png" className="w-full h-full object-cover scale-120" alt="" />
      </motion.div>

      {/* Vignette Overlay for Gritty Contrast */}
      <div className="absolute inset-0 z-45 bg-radial-gradient pointer-events-none" />

      {/* Content Layer */}
      <div className="relative z-50 text-center px-4 max-w-4xl select-none">
        <span className="text-amber-500 uppercase tracking-widest text-sm font-semibold mb-3 block">
          19 • 02 • 1942 — 09:58 ACST
        </span>
        <h1 className="text-6xl md:text-8xl font-bold uppercase font-display tracking-tight text-stone-100 drop-shadow-lg">
          WWII Happened Here.
        </h1>
        <p className="mt-4 text-lg md:text-xl text-stone-400 font-sans max-w-2xl mx-auto">
          Stand where the war came to Australia. Experience an immersive theater, VR, and historical exhibition.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <a href="#visit" className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold uppercase rounded-sm transition">
            Book Tickets Now
          </a>
          <a href="#story" className="px-8 py-4 border border-stone-700 hover:border-amber-500 text-stone-100 hover:text-amber-500 font-bold uppercase rounded-sm transition">
            Explore History[cite: 1]
          </a>
        </div>
      </div>
    </div>
  );
}
