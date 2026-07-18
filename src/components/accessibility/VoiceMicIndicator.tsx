import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Loader2, Check } from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';

interface VoiceMicIndicatorProps {
  status: 'idle' | 'listening' | 'processing' | 'executed';
}

export const VoiceMicIndicator: React.FC<VoiceMicIndicatorProps> = ({ status }) => {
  const { prefs } = useAccessibility();
  
  // Do not render anything if not active or if status is completely idle
  if (!prefs.blindMode) return null;

  const isReducedMotion = prefs.reducedMotion;

  let icon = <Mic className="w-5 h-5" />;
  let text = "Voice Assistant";
  let bgColor = "bg-primary/90";
  let pulse = false;

  switch (status) {
    case 'listening':
      icon = <Mic className="w-5 h-5 text-white" />;
      text = "Listening...";
      bgColor = "bg-red-500/90";
      pulse = !isReducedMotion;
      break;
    case 'processing':
      icon = <Loader2 className={`w-5 h-5 text-white ${!isReducedMotion ? 'animate-spin' : ''}`} />;
      text = "Processing...";
      bgColor = "bg-blue-500/90";
      break;
    case 'executed':
      icon = <Check className="w-5 h-5 text-white" />;
      text = "Command executed.";
      bgColor = "bg-green-500/90";
      break;
    case 'idle':
    default:
      icon = <Mic className="w-5 h-5 text-white" />;
      text = "Idle";
      bgColor = "bg-primary/90";
      break;
  }

  // Hide the indicator entirely if idle to match standard voice assistant patterns,
  // but since we want to "Show a small floating microphone indicator" we can leave it visible but subtle.
  const opacity = status === 'idle' ? 0.5 : 1;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: isReducedMotion ? 0 : 0.3 }}
        className="fixed bottom-6 right-6 z-[100]"
        aria-live="polite"
      >
        <div className={`flex items-center gap-3 px-4 py-3 rounded-full shadow-lg backdrop-blur text-white ${bgColor} ${pulse ? 'animate-pulse' : ''} border border-white/20`}>
          <div className="shrink-0 flex items-center justify-center">
            {icon}
          </div>
          <span className="font-medium text-sm whitespace-nowrap">{text}</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
