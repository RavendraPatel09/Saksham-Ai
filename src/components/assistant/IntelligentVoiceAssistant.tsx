import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAccessibility } from '@/context/AccessibilityContext';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export const IntelligentVoiceAssistant = () => {
  const { prefs, updatePrefs } = useAccessibility();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  
  const lastAnnouncedPath = useRef('');
  const initialized = useRef(false);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = false;
      rec.lang = 'en-US';
      
      rec.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript.toLowerCase().trim();
        handleVoiceCommand(transcript);
      };
      
      rec.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        if (event.error !== 'no-speech') {
          setIsListening(false);
        }
      };

      rec.onend = () => {
        if (prefs.blindMode && prefs.voiceGuidance && isListening) {
          // Attempt to restart if it's supposed to be listening
          try {
            rec.start();
          } catch(e) {}
        } else {
          setIsListening(false);
        }
      };

      setRecognition(rec);
    }
  }, []);

  const speak = useCallback((text: string) => {
    if (!prefs.voiceGuidance || typeof window === 'undefined') return;
    
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    // Respect reduced motion/cognitive settings by speaking slightly slower if needed
    if (prefs.reducedMotion) {
      utterance.rate = 0.9;
    }
    
    window.speechSynthesis.speak(utterance);
  }, [prefs.voiceGuidance, prefs.reducedMotion]);

  // Handle blind mode toggle announcement
  useEffect(() => {
    if (prefs.blindMode && !initialized.current) {
      initialized.current = true;
      speak("Welcome. Blind mode has been enabled. You are currently on the " + formatRouteName(location.pathname) + " page. You can say commands like Open Jobs, Open Learn, Open More, or Help me navigate.");
    } else if (!prefs.blindMode) {
      initialized.current = false;
      window.speechSynthesis.cancel();
    }
  }, [prefs.blindMode, location.pathname, speak]);

  // Handle route change announcements
  useEffect(() => {
    if (!prefs.blindMode || !prefs.voiceGuidance) return;
    
    // Check cooldown
    const lastTime = localStorage.getItem('saksham-last-announcement');
    const now = Date.now();
    
    if (lastAnnouncedPath.current !== location.pathname) {
      if (!lastTime || (now - parseInt(lastTime)) > 5000) {
        let msg = `You are on ${formatRouteName(location.pathname)}. `;
        
        // Add specific contextual help based on route
        if (location.pathname === '/' || location.pathname === '') {
          msg += "Four navigation options are available: Home, Learn, Jobs, and More.";
        } else if (location.pathname.includes('/jobs')) {
          msg += "Recommended opportunities are available.";
        } else if (location.pathname.includes('/learning')) {
          msg += "Continue your learning journey.";
        } else if (location.pathname.includes('/more')) {
          msg += "Open mentors, schemes, accessibility tools, and settings.";
        } else if (location.pathname.includes('/post-employment')) {
          msg += "Feedback and wellbeing tools are available.";
        }
        
        speak(msg);
        localStorage.setItem('saksham-last-announcement', now.toString());
        lastAnnouncedPath.current = location.pathname;
      }
    }
  }, [location.pathname, prefs.blindMode, prefs.voiceGuidance, speak]);

  // Handle Keyboard Focus (aria-live equivalent)
  useEffect(() => {
    if (!prefs.blindMode || !prefs.voiceGuidance) return;
    
    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      
      if (!['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) && target.tabIndex !== 0) {
        return;
      }
      
      let label = target.getAttribute('aria-label') || target.innerText || target.getAttribute('placeholder') || '';
      if (!label && target.tagName === 'INPUT') {
        label = (target as HTMLInputElement).value || 'Input field';
      }
      
      if (label) {
        let typeInfo = '';
        if (target.tagName === 'BUTTON' || target.getAttribute('role') === 'button') typeInfo = 'button';
        else if (target.tagName === 'A') typeInfo = 'link';
        else if (target.tagName === 'INPUT') typeInfo = 'input';
        
        speak(`${label} ${typeInfo}. ${typeInfo === 'button' ? 'Press Enter to activate.' : ''}`);
      }
    };
    
    document.addEventListener('focusin', handleFocus);
    return () => document.removeEventListener('focusin', handleFocus);
  }, [prefs.blindMode, prefs.voiceGuidance, speak]);

  const toggleListening = () => {
    if (!recognition) {
      speak("Speech recognition is not supported in this browser.");
      return;
    }
    
    if (isListening) {
      recognition.stop();
      setIsListening(false);
      speak("Microphone off.");
    } else {
      try {
        recognition.start();
        setIsListening(true);
        speak("Listening for commands.");
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleVoiceCommand = (cmd: string) => {
    console.log("Voice Command Recognized:", cmd);
    
    // Navigation
    if (cmd.includes('go home') || cmd.includes('open home')) navigate('/');
    else if (cmd.includes('open job')) navigate('/jobs');
    else if (cmd.includes('open learn')) navigate('/learning');
    else if (cmd.includes('open more')) {
      // More is a drawer in mobile, but we can just click the tab or link
      const moreBtn = document.querySelector('[aria-label="More"]') as HTMLElement;
      if (moreBtn) moreBtn.click();
      else speak("More options are not available in current view.");
    }
    else if (cmd.includes('open profile')) navigate('/dashboard');
    else if (cmd.includes('open feedback')) navigate('/post-employment');
    
    // Actions
    else if (cmd.includes('start assessment')) {
      speak("Starting assessment.");
      navigate('/assessment');
    }
    else if (cmd.includes('submit feedback')) {
      const submitBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.toLowerCase().includes('submit feedback'));
      if (submitBtn) {
        submitBtn.click();
        speak("Feedback submitted.");
      } else {
        speak("Submit feedback button not found on this page.");
      }
    }
    else if (cmd.includes('open microphone') || cmd.includes('start microphone')) {
      // Already listening if we caught this, but just to satisfy the requirement
      speak("Microphone is already open.");
    }
    else if (cmd.includes('read page')) {
      readCurrentPage();
    }
    
    // Accessibility
    else if (cmd.includes('turn on dark mode') || cmd.includes('enable dark mode')) {
      updatePrefs({ darkMode: true });
      speak("Dark mode enabled.");
    }
    else if (cmd.includes('turn off dark mode') || cmd.includes('disable dark mode')) {
      updatePrefs({ darkMode: false });
      speak("Dark mode disabled.");
    }
    else if (cmd.includes('enable high contrast') || cmd.includes('turn on high contrast')) {
      updatePrefs({ highContrast: true });
      speak("High contrast enabled.");
    }
    else if (cmd.includes('enable reduced motion') || cmd.includes('turn on reduced motion')) {
      updatePrefs({ reducedMotion: true });
      speak("Reduced motion enabled.");
    }
    
    // Help
    else if (cmd.includes('what can i do') || cmd.includes('where am i') || cmd.includes('help me navigate') || cmd.includes('repeat options')) {
      speak(`You can navigate using Home, Learn, Jobs, More, and the microphone button. Say Open Jobs to browse opportunities. You are currently on the ${formatRouteName(location.pathname)} page.`);
    }
  };

  const readCurrentPage = () => {
    const main = document.querySelector('main') || document.body;
    const text = Array.from(main.querySelectorAll('h1, h2, h3, p'))
      .map(el => (el as HTMLElement).innerText)
      .filter(t => t.length > 0)
      .join('. ');
      
    if (text) {
      speak("Reading page. " + text.substring(0, 500) + (text.length > 500 ? "..." : ""));
    } else {
      speak("No readable text found.");
    }
  };

  const formatRouteName = (path: string) => {
    if (path === '/' || path === '') return 'Home';
    const clean = path.replace('/', '').replace('-', ' ');
    return clean.charAt(0).toUpperCase() + clean.slice(1);
  };

  // Render floating Sakhi assistant only in Blind Mode
  if (!prefs.blindMode) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        transition={{ duration: prefs.reducedMotion ? 0 : 0.3 }}
        className="fixed bottom-24 right-4 z-[100] w-[280px]"
      >
        <Card className="shadow-xl border-primary/20 bg-background/95 backdrop-blur">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2 border-b pb-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xl">🎙️</span>
              </div>
              <h3 className="font-bold text-sm">Sakhi Voice Assistant</h3>
            </div>
            
            <p className="text-sm font-medium">Welcome 👋</p>
            
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Try saying:</p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>"Open Jobs"</li>
                <li>"Open Learn"</li>
                <li>"Submit Feedback"</li>
                <li>"Start Assessment"</li>
                <li>"Help me navigate"</li>
              </ul>
            </div>
            
            <Button 
              className={`w-full mt-2 ${isListening ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' : ''}`}
              variant={isListening ? "default" : "secondary"}
              onClick={toggleListening}
              aria-label={isListening ? "Stop listening" : "Start listening"}
            >
              {isListening ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Listening...</>
              ) : (
                <><Play className="w-4 h-4 mr-2" /> Start Listening</>
              )}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};
