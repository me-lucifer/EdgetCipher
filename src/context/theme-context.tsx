'use client';

import * as React from 'react';

export type Theme = 'deep-night' | 'aurora-neon' | 'light-pro' | 'solar-dawn' | string;

export const THEME_STORAGE_KEY = 'edgecipher-theme';

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'aurora-neon',
  setTheme: () => null,
};

const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
     if (typeof window === 'undefined') {
      return 'aurora-neon';
    }
    try {
      return localStorage.getItem(THEME_STORAGE_KEY) || 'aurora-neon';
    } catch (e) {
      return 'aurora-neon';
    }
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      document.cookie = `${THEME_STORAGE_KEY}=${newTheme}; path=/; max-age=31536000; SameSite=Lax`;
    } catch (e) {
      console.error('Failed to save theme', e);
    }
  };

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.className = theme;
  }, [theme]);


  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
