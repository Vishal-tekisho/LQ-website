import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InitialLoaderProps {
  onLoadingComplete: () => void;
}

export default function InitialLoader({ onLoadingComplete }: InitialLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState('');

  // Slower, multi-stage loading to allow all heavy app assets (models, images, scripts) time to pre-fetch seamlessly.
  useEffect(() => {
    // 1. Animate dots repeatedly
    const dotsInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);

    // 2. Control loading bar progression
    // We want a slow start, a pause in the middle (simulating heavy load), and a fast finish.
    let currentProgress = 0;
    
    // Stage 1: Fast initial burst
    const stage1 = setTimeout(() => {
      currentProgress = 35;
      setProgress(currentProgress);
    }, 500);

    // Stage 2: Slower crawl
    const stage2 = setInterval(() => {
      if (currentProgress >= 35 && currentProgress < 85) {
        currentProgress += Math.random() * 5; // increment randomly between 0-5
        if (currentProgress > 85) currentProgress = 85; 
        setProgress(currentProgress);
      }
    }, 200);

    // Stage 3: The final push and completion jump
    const stage3 = setTimeout(() => {
      clearInterval(stage2);
      setProgress(100);
      
      // Delay dismissing the loader slightly after hitting 100% so users register it loaded successfully
      setTimeout(() => {
        onLoadingComplete();
      }, 600);
      
    }, 3500); // 3.5s total loading UX duration based on user asking for "enough time to load the other animations"

    return () => {
      clearInterval(dotsInterval);
      clearInterval(stage2);
      clearTimeout(stage1);
      clearTimeout(stage3);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="app-loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030712] overflow-hidden"
      >
        {/* Subtle Ambient Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Center Card Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative group"
        >
          {/* Cyan / Teal Bottom Glow (matches the exact screenshot border aura) */}
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-transparent via-transparent to-[#28C4D4]/50 opacity-100 blur-[2px]"></div>

          <div className="relative w-[340px] h-[160px] rounded-2xl bg-[#0F111A] border border-white/5 shadow-2xl overflow-hidden flex flex-col justify-between p-6">
            
            {/* Top row: Logo and "LeadQ.AI" text */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[#7B6FD4] to-[#5B4FBE] shadow-[0_0_15px_rgba(123,111,212,0.4)] flex items-center justify-center">
                <span className="text-white font-bold text-lg leading-none tracking-tight">L</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center">
                LeadQ<span className="text-[#7B6FD4]">.AI</span>
              </h1>
            </div>

            {/* Middle row: "AUTONOMOUS REVENUE OPERATIONS" text */}
            <div className="mt-4">
              <p className="text-[10px] font-semibold text-gray-400 tracking-[0.15em] max-w-[200px] leading-relaxed">
                AUTONOMOUS REVENUE OPERATIONS
              </p>
            </div>

            {/* Bottom Row / Details Overlay */}
            <div className="absolute bottom-6 right-6 flex flex-wrap gap-1 w-7 opacity-20">
              <div className="w-3 h-3 bg-white rounded-sm"></div>
              <div className="w-3 h-3 bg-white rounded-sm"></div>
              <div className="w-3 h-3 bg-white rounded-sm"></div>
              <div className="w-3 h-3 border border-white rounded-sm"></div>
            </div>
            
            {/* Bottom Left decorative lines */}
            <div className="absolute bottom-6 left-6 flex flex-col gap-1.5 opacity-20">
               <div className="w-10 h-1 bg-white rounded-full"></div>
               <div className="w-16 h-1 bg-white rounded-full"></div>
               <div className="w-6 h-1 bg-white rounded-full"></div>
            </div>

            {/* Bottom teal border strip */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#28C4D4]/80 to-transparent"></div>
          </div>
        </motion.div>

        {/* Deploying Agents Tracking Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute bottom-16 sm:bottom-24 flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-[#7B6FD4] animate-pulse"></div>
             <span className="text-[11px] font-semibold text-gray-300 tracking-[0.2em] font-mono">
               DEPLOYING AGENTS<span className="inline-block w-4 text-left">{dots}</span>
             </span>
          </div>
          
          {/* Progress Bar Container */}
          <div className="w-48 sm:w-64 h-[2px] bg-gray-800 rounded-full overflow-hidden">
            {/* Fill */}
            <motion.div 
               className="h-full bg-gradient-to-r from-[#5B4FBE] to-[#7B6FD4] rounded-full"
               initial={{ width: "0%" }}
               animate={{ width: `${progress}%` }}
               transition={{ type: "tween", ease: "linear", duration: 0.2 }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
