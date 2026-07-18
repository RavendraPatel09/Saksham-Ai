import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccessibility } from '@/context/AccessibilityContext';
import { useAppContext } from '@/context/AppContext';
import { voiceAssistant } from '@/services/voiceAssistant';
import { parseCommand } from '@/utils/voiceCommands';

export const useVoiceNavigation = () => {
  const navigate = useNavigate();
  const { prefs, updatePrefs } = useAccessibility();
  const { candidateProfile } = useAppContext();
  
  const [micStatus, setMicStatus] = useState(voiceAssistant.status);
  const [debugInfo, setDebugInfo] = useState({ transcript: '', recognized: '', status: '' });
  
  const initialized = useRef(false);
  const isBlindMode = prefs.blindMode;

  useEffect(() => {
    const unsubscribeStatus = voiceAssistant.onStatusChange((s) => {
      setMicStatus(s as any);
      setDebugInfo(prev => ({ ...prev, status: s }));
    });
    
    const unsubscribeDebug = voiceAssistant.subscribeDebug((info) => {
      setDebugInfo(info);
    });
    
    return () => {
      unsubscribeStatus();
      unsubscribeDebug();
    };
  }, []);

  // Handle initialization and greeting
  useEffect(() => {
    if (isBlindMode && !initialized.current) {
      initialized.current = true;
      
      if (!voiceAssistant.isSupported) {
        // We use a console or alert if browser unsupported, but we try not to crash
        console.warn("Voice navigation is not supported in your browser.");
        return;
      }

      const name = candidateProfile?.name || 'Rahul';
      const greeting = `Welcome ${name}. How are you today? What can I help you with?`;
      
      voiceAssistant.speak(greeting, () => {
        voiceAssistant.startListening();
      });
      
    } else if (!isBlindMode && initialized.current) {
      initialized.current = false;
      voiceAssistant.destroy();
    }
    
    return () => {
      if (!isBlindMode && initialized.current) {
        voiceAssistant.destroy();
      }
    };
  }, [isBlindMode, candidateProfile]);

  // Handle Command Routing
  useEffect(() => {
    if (!isBlindMode) return;

    const handleCommand = (transcript: string) => {
      const parsed = parseCommand(transcript);
      
      // Emit debug
      voiceAssistant.emitDebug({ 
        transcript, 
        recognized: parsed.type !== 'unknown' ? JSON.stringify(parsed) : 'Unrecognized',
        status: 'executed' 
      });

      if (parsed.type === 'navigate') {
        voiceAssistant.executeCommand(() => navigate(parsed.payload), parsed.confirm);
      } 
      else if (parsed.type === 'accessibility') {
        voiceAssistant.executeCommand(() => {
          if (parsed.payload === 'highContrast_on') updatePrefs({ highContrast: true });
          if (parsed.payload === 'highContrast_off') updatePrefs({ highContrast: false });
          if (parsed.payload === 'largeText_on') updatePrefs({ largeText: true });
          if (parsed.payload === 'largeText_off') updatePrefs({ largeText: false });
          if (parsed.payload === 'textToSpeech_on') updatePrefs({ textToSpeech: true });
          if (parsed.payload === 'textToSpeech_off') updatePrefs({ textToSpeech: false });
        }, parsed.confirm);
      }
      else if (parsed.type === 'action') {
        if (parsed.payload === 'go_back') {
          voiceAssistant.executeCommand(() => navigate(-1), parsed.confirm);
        } else if (parsed.payload === 'submit_feedback') {
          voiceAssistant.executeCommand(() => {
            const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.toLowerCase().includes('submit feedback'));
            if (btn) btn.click();
          }, parsed.confirm);
        }
      }
      else if (parsed.type === 'read_page') {
        readCurrentPage();
      }
      else if (parsed.type === 'help') {
        voiceAssistant.executeCommand(() => {}, 
          "You can say things like: Open jobs, Start interview practice, Open feedback, Read this page, Open community, Open learning, Search jobs."
        );
      }
      else {
        voiceAssistant.executeCommand(() => {}, "Sorry, I didn't understand that. Please try again.");
      }
    };

    const unsubscribe = voiceAssistant.subscribe(handleCommand);
    return () => unsubscribe();
  }, [isBlindMode, navigate, updatePrefs]);

  const readCurrentPage = () => {
    const main = document.querySelector('main') || document.body;
    
    // Semantic parsing skipping decorative/hidden elements
    const elements = Array.from(main.querySelectorAll('h1, h2, h3, button, a, label, p, .card-title, .card-content'));
    const textArray = elements
      .map(el => {
        let text = el.getAttribute('aria-label') || (el as HTMLElement).innerText || '';
        
        // Skip decorative elements or empty text
        if (el.getAttribute('aria-hidden') === 'true' || !text.trim() || text.length < 2) return '';
        
        // Add type context semantically
        if (el.tagName === 'BUTTON' || el.getAttribute('role') === 'button') return `Button: ${text}`;
        if (el.tagName === 'A') return `Link: ${text}`;
        if (el.tagName === 'LABEL') return `Form Label: ${text}`;
        if (el.tagName === 'H1') return `Page Title: ${text}`;
        if (el.tagName === 'H2' || el.tagName === 'H3') return `Heading: ${text}`;
        
        return text;
      })
      .filter(t => t.length > 0);
      
    const textToRead = Array.from(new Set(textArray)).join('. ');

    if (textToRead) {
      voiceAssistant.executeCommand(() => {}, "Reading page. " + textToRead);
    } else {
      voiceAssistant.executeCommand(() => {}, "No readable content found on this page.");
    }
  };

  return {
    micStatus,
    isBlindMode,
    debugInfo,
    isSupported: voiceAssistant.isSupported
  };
};
