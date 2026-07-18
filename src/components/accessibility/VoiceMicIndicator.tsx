import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Loader2, Check } from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';

interface VoiceMicIndicatorProps {
  status: 'idle' | 'listening' | 'processing' | 'executed';
  debugInfo?: { transcript: string; recognized: string; status: string };
  isSupported?: boolean;
}

export const VoiceMicIndicator: React.FC<VoiceMicIndicatorProps> = ({ status, debugInfo, isSupported }) => {
  const { prefs } = useAccessibility();
  
  if (!prefs.blindMode) return null;

  if (isSupported === false) {
    return (
      <div className="fixed bottom-6 right-6 z-[100] px-4 py-3 rounded-full shadow-lg bg-red-500/90 text-white font-medium text-sm border border-white/20">
        Voice navigation is not supported in your browser.
      </div>
    );
  }

  const isReducedMotion = prefs.reducedMotion;
  const isHighContrast = prefs.highContrast;

  let icon = <Mic className="w-5 h-5 text-white" />;
  let text = "Idle";
  let bgColor = isHighContrast ? "bg-black border-2 border-white" : "bg-primary/90";
  let pulse = false;

  switch (status) {
    case 'listening':
      icon = <Mic className="w-5 h-5 text-white" />;
      text = "Listening...";
      bgColor = isHighContrast ? "bg-black border-2 border-yellow-400 text-yellow-400" : "bg-red-500/90";
      pulse = !isReducedMotion;
      break;
    case 'processing':
      icon = <Loader2 className={`w-5 h-5 text-white ${!isReducedMotion ? 'animate-spin' : ''}`} />;
      text = "Processing...";
      bgColor = isHighContrast ? "bg-black border-2 border-blue-400 text-blue-400" : "bg-blue-500/90";
      break;
    case 'executed':
      icon = <Check className="w-5 h-5 text-white" />;
      text = "Command executed.";
      bgColor = isHighContrast ? "bg-black border-2 border-green-400 text-green-400" : "bg-green-500/90";
      break;
  }

  const opacity = status === 'idle' ? 0.6 : 1;
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: isReducedMotion ? 0 : 0.3 }}
        className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-2"
        aria-live="polite"
      >
        {isDev && debugInfo && debugInfo.transcript && (
          <div className="bg-black/80 text-green-400 font-mono text-xs p-3 rounded shadow-xl w-64 break-words">
            <p className="font-bold text-white border-b border-gray-600 mb-1 pb-1">Debug Panel (Dev Only)</p>
            <p><span className="text-gray-400">Heard:</span> {debugInfo.transcript}</p>
            <p><span className="text-gray-400">Parsed:</span> {debugInfo.recognized}</p>
          </div>
        )}
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
