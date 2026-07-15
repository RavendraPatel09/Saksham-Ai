import React, { useState, useEffect } from 'react';
import { AccessibilityContext } from './AccessibilityContext';
import { 
  DEFAULT_PREFERENCES, 
  ACCESSIBILITY_STORAGE_KEY,
  WIZARD_COMPLETED_KEY 
} from './AccessibilitySettings';
import type { AccessibilityPreferences, AccessibilityProfile } from './AccessibilitySettings';

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [prefs, setPrefs] = useState<AccessibilityPreferences>(() => {
    const saved = localStorage.getItem(ACCESSIBILITY_STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_PREFERENCES;
  });

  const [isWizardCompleted, setIsWizardCompleted] = useState<boolean>(() => {
    return localStorage.getItem(WIZARD_COMPLETED_KEY) === 'true';
  });

  useEffect(() => {
    localStorage.setItem(ACCESSIBILITY_STORAGE_KEY, JSON.stringify(prefs));
    
    const root = document.documentElement;
    
    // Evaluate smart profiles overrides
    // High contrast
    if (prefs.highContrast || prefs.profile.visual) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Large text
    if (prefs.largeText || prefs.profile.visual) {
      root.classList.add('text-lg', 'md:text-xl');
    } else {
      root.classList.remove('text-lg', 'md:text-xl');
    }

    // Dyslexia font
    if (prefs.dyslexiaFont || prefs.profile.dyslexia) {
      root.style.fontFamily = 'OpenDyslexic, sans-serif';
    } else {
      root.style.fontFamily = ''; // revert to default css
    }

    // Reduced motion
    if (prefs.reducedMotion || prefs.profile.cognitive || prefs.profile.autism) {
      root.style.setProperty('--framer-motion-enabled', '0');
      root.classList.add('reduced-motion');
    } else {
      root.style.setProperty('--framer-motion-enabled', '1');
      root.classList.remove('reduced-motion');
    }

    // Mobility target sizing (via CSS variables)
    if (prefs.profile.mobility) {
      root.classList.add('mobility-mode');
    } else {
      root.classList.remove('mobility-mode');
    }

    // Calm mode (cognitive/autism)
    if (prefs.profile.autism || prefs.profile.cognitive) {
      root.classList.add('calm-mode');
    } else {
      root.classList.remove('calm-mode');
    }
    
  }, [prefs]);

  const updatePrefs = (newPrefs: Partial<AccessibilityPreferences>) => {
    setPrefs((prev) => ({ ...prev, ...newPrefs }));
  };

  const updateProfile = (profileUpdates: Partial<AccessibilityProfile>) => {
    setPrefs((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...profileUpdates
      }
    }));
  };

  const completeWizard = () => {
    setIsWizardCompleted(true);
    localStorage.setItem(WIZARD_COMPLETED_KEY, 'true');
  };

  return (
    <AccessibilityContext.Provider value={{ prefs, updatePrefs, updateProfile, isWizardCompleted, completeWizard }}>
      <div className={prefs.darkMode || prefs.highContrast || prefs.profile.visual ? 'dark' : ''}>
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
};
