import React, { createContext, useContext, useEffect, useState } from 'react';

type AccessibilityPreferences = {
  highContrast: boolean;
  largeText: boolean;
  dyslexiaFont: boolean;
  reducedMotion: boolean;
  language: string;
};

type AccessibilityContextType = {
  prefs: AccessibilityPreferences;
  updatePrefs: (newPrefs: Partial<AccessibilityPreferences>) => void;
};

const defaultPrefs: AccessibilityPreferences = {
  highContrast: false,
  largeText: false,
  dyslexiaFont: false,
  reducedMotion: false,
  language: 'en',
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [prefs, setPrefs] = useState<AccessibilityPreferences>(() => {
    const saved = localStorage.getItem('accessibilityPrefs');
    return saved ? JSON.parse(saved) : defaultPrefs;
  });

  useEffect(() => {
    localStorage.setItem('accessibilityPrefs', JSON.stringify(prefs));
    
    const root = document.documentElement;
    
    // High contrast
    if (prefs.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Large text
    if (prefs.largeText) {
      root.classList.add('text-lg', 'md:text-xl');
    } else {
      root.classList.remove('text-lg', 'md:text-xl');
    }

    // Dyslexia font
    if (prefs.dyslexiaFont) {
      root.style.fontFamily = 'OpenDyslexic, sans-serif';
    } else {
      root.style.fontFamily = ''; // revert to default css
    }

    // Reduced motion
    if (prefs.reducedMotion) {
      root.style.setProperty('--framer-motion-enabled', '0'); // custom handle if needed
    } else {
      root.style.setProperty('--framer-motion-enabled', '1');
    }
    
  }, [prefs]);

  const updatePrefs = (newPrefs: Partial<AccessibilityPreferences>) => {
    setPrefs((prev) => ({ ...prev, ...newPrefs }));
  };

  return (
    <AccessibilityContext.Provider value={{ prefs, updatePrefs }}>
      <div className={prefs.highContrast ? 'dark' : ''}>{children}</div>
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return context;
};
