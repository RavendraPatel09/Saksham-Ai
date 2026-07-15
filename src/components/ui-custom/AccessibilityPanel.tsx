import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Eye, Ear, Activity, Brain, Type, Sun, Volume2, X, Speech, CheckCircle2, Mic, Monitor } from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';
import type { AccessibilityProfile } from '@/context/AccessibilityContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LanguageSelector } from './LanguageSelector';

export const AccessibilityPanel = () => {
  const { prefs, updatePrefs, updateProfile } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);

  // Close panel on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const profiles: { id: keyof AccessibilityProfile; label: string; icon: any }[] = [
    { id: 'visual', label: 'Low Vision', icon: Eye },
    { id: 'hearing', label: 'Hearing', icon: Ear },
    { id: 'speech', label: 'Speech', icon: Speech },
    { id: 'mobility', label: 'Motor', icon: Activity },
    { id: 'dyslexia', label: 'Dyslexia', icon: Brain },
    { id: 'autism', label: 'Autism', icon: Brain },
    { id: 'cognitive', label: 'Cognitive', icon: Brain },
    { id: 'multiple', label: 'Multiple', icon: CheckCircle2 },
  ];

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 h-14 w-14 rounded-full bg-background shadow-lg shadow-primary/20 border-primary/20 hover:bg-primary/10 hover:border-primary/50 transition-all"
        aria-label="Accessibility Settings"
      >
        <Settings className="w-6 h-6 text-primary" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-950 border rounded-xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b bg-muted/30">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" /> Accessibility Settings
                </h2>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto no-scrollbar">
                
                <div>
                  <h3 className="font-semibold mb-3">Accessibility Profiles</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {profiles.map(p => {
                      const isActive = !!prefs.profile[p.id];
                      return (
                        <Button
                          key={p.id}
                          variant={isActive ? 'default' : 'outline'}
                          className={`justify-start h-auto py-3 ${isActive ? 'shadow-md bg-primary' : ''}`}
                          onClick={() => updateProfile({ [p.id]: !isActive })}
                        >
                          <p.icon className="w-4 h-4 mr-2 shrink-0" />
                          <span className="truncate">{p.label}</span>
                        </Button>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold border-b pb-2">Manual Adjustments</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-muted-foreground" />
                      <label className="text-sm font-medium">High Contrast</label>
                    </div>
                    <input 
                      type="checkbox" 
                      className="toggle" 
                      checked={prefs.highContrast}
                      onChange={(e) => updatePrefs({ highContrast: e.target.checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Type className="w-4 h-4 text-muted-foreground" />
                      <label className="text-sm font-medium">Large Text</label>
                    </div>
                    <input 
                      type="checkbox" 
                      className="toggle" 
                      checked={prefs.largeText}
                      onChange={(e) => updatePrefs({ largeText: e.target.checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Type className="w-4 h-4 text-muted-foreground" />
                      <label className="text-sm font-medium">Dyslexia Friendly Font</label>
                    </div>
                    <input 
                      type="checkbox" 
                      className="toggle" 
                      checked={prefs.dyslexiaFont}
                      onChange={(e) => updatePrefs({ dyslexiaFont: e.target.checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-muted-foreground" />
                      <label className="text-sm font-medium">Reduced Motion</label>
                    </div>
                    <input 
                      type="checkbox" 
                      className="toggle" 
                      checked={prefs.reducedMotion}
                      onChange={(e) => updatePrefs({ reducedMotion: e.target.checked })}
                    />
                  </div>

                </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-muted-foreground" />
                      <label className="text-sm font-medium">Text-to-Speech (TTS)</label>
                    </div>
                    <input 
                      type="checkbox" 
                      className="toggle" 
                      checked={prefs.textToSpeech}
                      onChange={(e) => updatePrefs({ textToSpeech: e.target.checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mic className="w-4 h-4 text-muted-foreground" />
                      <label className="text-sm font-medium">Speech-to-Text / Voice Commands</label>
                    </div>
                    <input 
                      type="checkbox" 
                      className="toggle" 
                      checked={prefs.speechToText}
                      onChange={(e) => updatePrefs({ speechToText: e.target.checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-muted-foreground" />
                      <label className="text-sm font-medium">Screen Reader Mode</label>
                    </div>
                    <input 
                      type="checkbox" 
                      className="toggle" 
                      checked={prefs.screenReader}
                      onChange={(e) => updatePrefs({ screenReader: e.target.checked })}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <h3 className="font-semibold mb-3">Language Preference</h3>
                  <LanguageSelector />
                </div>

                {/* Voice Navigation Mock Toggle */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <Volume2 className="w-5 h-5" /> Voice Assistant
                    </div>
                    <Badge className="bg-primary text-white">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "Sakhi" voice assistant is enabled. You can use microphone commands to navigate the platform.
                  </p>
                </div>
                
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
