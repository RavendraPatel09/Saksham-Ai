import React from 'react';
import { Heart, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAccessibility } from '@/context/AccessibilityContext';

export const Logo = () => {
  const { prefs } = useAccessibility();
  
  return (
    <div className="flex items-center gap-3 group">
      <div className="relative flex items-center justify-center w-12 h-12">
        <motion.div
          animate={prefs.reducedMotion ? {} : { 
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Heart className="w-12 h-12 text-blue-500 fill-blue-500/20 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" strokeWidth={1.5} />
        </motion.div>
        <motion.div
          animate={prefs.reducedMotion ? {} : { 
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10"
        >
          <Lightbulb className="w-6 h-6 text-yellow-300 fill-yellow-200 drop-shadow-[0_0_10px_rgba(253,224,71,0.8)] mt-1" />
        </motion.div>
      </div>
      
      <div className="flex flex-col">
        <span className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-teal-500 dark:from-blue-400 dark:to-teal-300">
          Saksham AI
        </span>
        <span className="text-[0.65rem] font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase mt-[-4px]">
          Empowering Every Ability
        </span>
      </div>
    </div>
  );
};
