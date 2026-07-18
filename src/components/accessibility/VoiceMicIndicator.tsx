import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Loader2, Check } from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';

interface VoiceMicIndicatorProps {
  status: 'idle' | 'listening' | 'processing' | 'executed';
  debugInfo?: { transcript: string; recognized: string; status: string; error?: string };
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

  const isDev = import.meta.env.DEV;

  // REMOVE THE "IDLE" BUTTON ENTIRELY
  const shouldShowMic = status !== 'idle';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: isReducedMotion ? 0 : 0.3 }}
        className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-2 pointer-events-none"
        aria-live="polite"
      >
        {isDev && debugInfo && (
          <div className="bg-black/90 text-green-400 font-mono text-[11px] p-4 rounded-lg shadow-xl w-72 break-words border border-gray-700 pointer-events-auto">
            <p className="font-bold text-white border-b border-gray-700 mb-2 pb-1 text-sm flex justify-between">
              <span>Debug Panel (Dev Only)</span>
            </p>
            <div className="space-y-1">
              <p><span className="text-gray-400">Blind Mode:</span> ✅</p>
              <p><span className="text-gray-400">Speech Synthesis:</span> {isSupported ? '✅' : '❌'}</p>
              <p><span className="text-gray-400">Speech Recognition:</span> {isSupported ? '✅' : '❌'}</p>
              <p><span className="text-gray-400">Listening:</span> {status === 'listening' ? '✅' : '❌'}</p>
              <div className="my-2 border-l-2 border-green-500 pl-2">
                <p className="text-gray-400">Last transcript:</p>
                <p className="text-white italic">"{debugInfo.transcript || 'none'}"</p>
              </div>
              <div className="my-2 border-l-2 border-blue-500 pl-2">
                <p className="text-gray-400">Command executed:</p>
                <p className="text-blue-300">{debugInfo.recognized || 'none'}</p>
              </div>
              <p><span className="text-gray-400">Current page:</span> {window.location.pathname}</p>
              <p><span className="text-gray-400">Last error:</span> <span className="text-red-400">{debugInfo.error || 'none'}</span></p>
            </div>
          </div>
        )}
        
        {shouldShowMic && (
          <div className={`flex items-center gap-3 px-4 py-3 rounded-full shadow-lg backdrop-blur text-white ${bgColor} ${pulse ? 'animate-pulse' : ''} border border-white/20 pointer-events-auto`}>
            <div className="shrink-0 flex items-center justify-center">
              {icon}
            </div>
            <span className="font-medium text-sm whitespace-nowrap">{text}</span>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
