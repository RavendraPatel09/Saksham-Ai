import React from 'react';
import { Heart, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAccessibility } from '@/context/AccessibilityContext';

export const Logo = () => {
  const { prefs } = useAccessibility();
  
  return (
    <div className="flex items-center gap-2 group">
      <div className="relative flex items-center justify-center w-10 h-10 shrink-0">
        <motion.div
          animate={prefs.reducedMotion ? {} : { 
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Heart className="w-10 h-10 text-blue-500 fill-blue-500/20 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" strokeWidth={1.5} />
        </motion.div>
        <motion.div
          animate={prefs.reducedMotion ? {} : { 
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 flex items-center justify-center"
        >
          <Lightbulb className="w-5 h-5 text-yellow-300 fill-yellow-200 drop-shadow-[0_0_8px_rgba(253,224,71,0.8)] mt-0.5" />
        </motion.div>
      </div>
      
      <div className="flex flex-col justify-center shrink-0">
        <span className="whitespace-nowrap text-xl md:text-2xl font-extrabold tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-teal-500 dark:from-blue-400 dark:to-teal-300">
          Saksham AI
        </span>
        <span className="whitespace-nowrap text-[0.55rem] md:text-[0.6rem] font-bold tracking-[0.15em] text-slate-500 dark:text-slate-400 uppercase mt-0.5 hidden sm:block leading-none">
          Empowering Every Ability
        </span>
      </div>
    </div>
  );
};
