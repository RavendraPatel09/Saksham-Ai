import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAccessibility } from '@/context/AccessibilityContext';
import { useAppContext } from '@/context/AppContext';
import { voiceAssistant } from '@/services/voiceAssistant';

export const useVoiceNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { prefs, updatePrefs } = useAccessibility();
  const { candidateProfile } = useAppContext();
  
  const [micStatus, setMicStatus] = useState(voiceAssistant.status);
  const initialized = useRef(false);
  const isBlindMode = prefs.blindMode;

  useEffect(() => {
    const unsubscribeStatus = voiceAssistant.onStatusChange((s) => {
      setMicStatus(s as any);
    });
    
    return () => {
      unsubscribeStatus();
    };
  }, []);

  // Handle initialization and greeting
  useEffect(() => {
    if (isBlindMode && !initialized.current) {
      initialized.current = true;
      
      if (!voiceAssistant.isSupported) {
        voiceAssistant.speak("Voice navigation is not supported in your browser.");
        return;
      }

      const name = candidateProfile?.name || 'Rahul';
      const greeting = `Welcome ${name}. How are you today? What can I help you with?`;
      
      // Speak the greeting, then automatically start listening
      voiceAssistant.speak(greeting, () => {
        voiceAssistant.startListening();
      });
      
    } else if (!isBlindMode && initialized.current) {
      initialized.current = false;
      voiceAssistant.stopListening();
      voiceAssistant.stopSpeaking();
    }
  }, [isBlindMode, candidateProfile]);

  // Handle Command Routing
  useEffect(() => {
    if (!isBlindMode) return;

    const executeWithConfirmation = (action: () => void, confirmation: string) => {
      voiceAssistant.setStatus('executed');
      voiceAssistant.speak(confirmation);
      action();
    };

    const handleCommand = (cmd: string) => {
      console.log("Interpreted Voice Command:", cmd);
      
      // NAVIGATION COMMANDS
      if (cmd.includes('go to job') || cmd.includes('open job') || cmd.includes('search job') || cmd.includes('search for software job')) {
        executeWithConfirmation(() => navigate('/jobs'), "Opening Jobs.");
      }
      else if (cmd.includes('open home') || cmd.includes('go home')) {
        executeWithConfirmation(() => navigate('/'), "Opening Home.");
      }
      else if (cmd.includes('take me to learning') || cmd.includes('open learning') || cmd.includes('open learn')) {
        executeWithConfirmation(() => navigate('/learning'), "Opening Learning.");
      }
      else if (cmd.includes('open my profile') || cmd.includes('show profile')) {
        executeWithConfirmation(() => navigate('/dashboard'), "Opening your profile.");
      }
      else if (cmd.includes('show community') || cmd.includes('open community')) {
        executeWithConfirmation(() => navigate('/community'), "Opening community.");
      }
      else if (cmd.includes('open saved') || cmd.includes('show saved')) {
        executeWithConfirmation(() => navigate('/saved'), "Showing your saved items.");
      }
      else if (cmd.includes('government scheme') || cmd.includes('show government')) {
        executeWithConfirmation(() => navigate('/government-support'), "Showing government schemes.");
      }
      
      // ACTIONS
      else if (cmd.includes('start interview') || cmd.includes('interview practice')) {
        executeWithConfirmation(() => navigate('/interview'), "Starting interview practice.");
      }
      else if (cmd.includes('open my resume') || cmd.includes('open resume')) {
        executeWithConfirmation(() => navigate('/resume-builder'), "Opening your resume.");
      }
      
      // ACCESSIBILITY SETTINGS
      else if (cmd.includes('increase text size') || cmd.includes('make text bigger')) {
        executeWithConfirmation(() => updatePrefs({ largeText: true }), "Increased text size.");
      }
      else if (cmd.includes('turn on high contrast') || cmd.includes('enable high contrast')) {
        executeWithConfirmation(() => updatePrefs({ highContrast: true }), "Turned on high contrast.");
      }
      else if (cmd.includes('enable caption')) {
        executeWithConfirmation(() => updatePrefs({ textToSpeech: true }), "Enabled captions.");
      }
      
      // FEEDBACK
      else if (cmd.includes('open feedback') || cmd.includes('read my latest feedback')) {
        executeWithConfirmation(() => navigate('/post-employment'), "Opening feedback.");
      }
      else if (cmd.includes('submit feedback')) {
        executeWithConfirmation(() => {
          const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.toLowerCase().includes('submit feedback'));
          if (btn) btn.click();
        }, "Submitting feedback.");
      }
      
      // SCREEN READER MODE
      else if (cmd.includes('read this page') || cmd.includes('read page')) {
        readCurrentPage();
      }
      
      // HELP
      else if (cmd.includes('help') || cmd.includes('what can i do') || cmd.includes('available command')) {
        voiceAssistant.speak("You can say things like: Open jobs, Start interview practice, Open feedback, Read this page, Open community, Open learning, Search jobs.");
      }
      
      // FALLBACK
      else {
        voiceAssistant.speak("Sorry, I didn't understand that. Please try again.");
      }
    };

    const unsubscribe = voiceAssistant.subscribe(handleCommand);
    return () => unsubscribe();
  }, [isBlindMode, navigate, updatePrefs]);

  const readCurrentPage = () => {
    voiceAssistant.setStatus('executed');
    const main = document.querySelector('main') || document.body;
    
    // Semantic parsing
    const elements = Array.from(main.querySelectorAll('h1, h2, h3, button, a, label, p'));
    const textArray = elements
      .map(el => {
        let text = el.getAttribute('aria-label') || (el as HTMLElement).innerText || '';
        
        // Skip decorative elements or empty text
        if (el.getAttribute('aria-hidden') === 'true' || !text.trim()) return '';
        
        // Add type context
        if (el.tagName === 'BUTTON') return `Button: ${text}`;
        if (el.tagName === 'A') return `Link: ${text}`;
        if (el.tagName === 'LABEL') return `Form Label: ${text}`;
        if (el.tagName === 'H1') return `Page Title: ${text}`;
        if (el.tagName === 'H2' || el.tagName === 'H3') return `Heading: ${text}`;
        
        return text;
      })
      .filter(t => t.length > 0);
      
    const textToRead = textArray.join('. ');

    if (textToRead) {
      voiceAssistant.speak("Reading page. " + textToRead);
    } else {
      voiceAssistant.speak("No readable content found on this page.");
    }
  };

  return {
    micStatus,
    isBlindMode
  };
};
