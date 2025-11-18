'use client';

import * as React from 'react';

type Theme = 'deep-night' | 'aurora-neon' | 'light-pro' | 'solar-dawn' | string;

const THEME_STORAGE_KEY = 'edgecipher-theme';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  attribute?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'deep-night',
  setTheme: () => null,
};

const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'deep-night',
  storageKey = THEME_STORAGE_KEY,
  attribute = 'class',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(() => {
    try {
      return localStorage.getItem(storageKey) || defaultTheme;
    } catch (e) {
      return defaultTheme;
    }
  });

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('theme-deep-night', 'theme-aurora-neon', 'theme-light-pro', 'theme-solar-dawn');
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      try {
        localStorage.setItem(storageKey, theme);
      } catch (e) {
        console.error('Failed to save theme to localStorage', e);
      }
      setTheme(theme);
    },
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
