import React, { createContext, useContext, useEffect, useState } from 'react';

export type AccessibilityProfile = 'default' | 'low-vision' | 'hearing' | 'motor' | 'cognitive';

type AccessibilityPreferences = {
  highContrast: boolean;
  largeText: boolean;
  dyslexiaFont: boolean;
  reducedMotion: boolean;
  language: string;
  profile: AccessibilityProfile;
};

type AccessibilityContextType = {
  prefs: AccessibilityPreferences;
  updatePrefs: (newPrefs: Partial<AccessibilityPreferences>) => void;
  setProfile: (profile: AccessibilityProfile) => void;
};

const defaultPrefs: AccessibilityPreferences = {
  highContrast: false,
  largeText: false,
  dyslexiaFont: false,
  reducedMotion: false,
  language: 'en',
  profile: 'default',
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
    
    // Profiles class
    root.classList.remove('profile-low-vision', 'profile-hearing', 'profile-motor', 'profile-cognitive');
    if (prefs.profile !== 'default') {
      root.classList.add(`profile-${prefs.profile}`);
    }

    // High contrast
    if (prefs.highContrast || prefs.profile === 'low-vision') {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Large text
    if (prefs.largeText || prefs.profile === 'low-vision') {
      root.classList.add('text-lg', 'md:text-xl');
    } else {
      root.classList.remove('text-lg', 'md:text-xl');
    }

    // Dyslexia font
    if (prefs.dyslexiaFont || prefs.profile === 'cognitive') {
      root.style.fontFamily = 'OpenDyslexic, sans-serif';
    } else {
      root.style.fontFamily = ''; // revert to default css
    }

    // Reduced motion
    if (prefs.reducedMotion || prefs.profile === 'motor' || prefs.profile === 'cognitive') {
      root.style.setProperty('--framer-motion-enabled', '0'); // custom handle if needed
      root.classList.add('reduced-motion');
    } else {
      root.style.setProperty('--framer-motion-enabled', '1');
      root.classList.remove('reduced-motion');
    }
    
  }, [prefs]);

  const updatePrefs = (newPrefs: Partial<AccessibilityPreferences>) => {
    setPrefs((prev) => ({ ...prev, ...newPrefs }));
  };

  const setProfile = (profile: AccessibilityProfile) => {
    setPrefs((prev) => ({ ...prev, profile }));
  };

  return (
    <AccessibilityContext.Provider value={{ prefs, updatePrefs, setProfile }}>
      <div className={prefs.highContrast ? 'dark' : ''}>{children}</div>
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return context;
};
