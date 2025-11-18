'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const PROFILE_KEY = 'edgecipher-profile';
const NOTIFICATIONS_KEY = 'edgecipher-notifications';
const PLATFORM_KEY = 'edgecipher-platform';
const ONBOARDING_KEY = 'edgecipher-onboarding-complete';

type Settings = {
  proactiveHelp: boolean;
  onboardingComplete: boolean;
};

type SettingsContextType = {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  updateSetting: (key: keyof Settings, value: boolean) => void;
};

const defaultSettings: Settings = {
  proactiveHelp: true,
  onboardingComplete: false,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const platformSettings = localStorage.getItem(PLATFORM_KEY);
      const onboardingComplete = localStorage.getItem(ONBOARDING_KEY);

      const loadedSettings = { ...defaultSettings };

      if (platformSettings) {
        const parsedPlatform = JSON.parse(platformSettings);
        if (typeof parsedPlatform.proactiveHelp === 'boolean') {
          loadedSettings.proactiveHelp = parsedPlatform.proactiveHelp;
        }
      }
      
      if (onboardingComplete === 'true') {
        loadedSettings.onboardingComplete = true;
      }
      
      setSettings(loadedSettings);
    } catch (e) {
      console.error('Failed to load settings from localStorage', e);
    }
    setIsInitialized(true);
  }, []);

  const updateSetting = (key: keyof Settings, value: boolean) => {
    setSettings(prev => {
        const newSettings = {...prev, [key]: value};
        
        // This feels a bit clumsy, but it ensures we write to the correct keys.
        if (key === 'proactiveHelp') {
            try {
                const platformSettings = JSON.parse(localStorage.getItem(PLATFORM_KEY) || '{}');
                platformSettings.proactiveHelp = value;
                localStorage.setItem(PLATFORM_KEY, JSON.stringify(platformSettings));
            } catch(e) { console.error(e) }
        }
        if (key === 'onboardingComplete') {
            try {
                localStorage.setItem(ONBOARDING_KEY, String(value));
            } catch(e) { console.error(e) }
        }
        
        return newSettings;
    });
  };

  if (!isInitialized) {
    return null; // or a loading spinner
  }

  return (
    <SettingsContext.Provider value={{ settings, setSettings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
