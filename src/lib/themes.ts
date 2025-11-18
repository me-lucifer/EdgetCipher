export type Theme = {
  id: 'deep-night' | 'aurora-neon' | 'light-pro' | 'solar-dawn';
  name: string;
  isDark: boolean;
  colors: {
    background: string;
    primary: string;
    accent: string;
  };
};

export const THEMES: Theme[] = [
  {
    id: 'deep-night',
    name: 'Deep Night',
    isDark: true,
    colors: {
      background: '#0A192F',
      primary: '#64FFDA',
      accent: '#FF4500',
    },
  },
  {
    id: 'aurora-neon',
    name: 'Aurora Neon',
    isDark: true,
    colors: {
      background: '#050816',
      primary: '#A855F7',
      accent: '#22C55E',
    },
  },
  {
    id: 'light-pro',
    name: 'Light Pro',
    isDark: false,
    colors: {
      background: '#F5F7FB',
      primary: '#2563EB',
      accent: '#EF4444',
    },
  },
  {
    id: 'solar-dawn',
    name: 'Solar Dawn',
    isDark: false,
    colors: {
      background: '#FFF7ED',
      primary: '#EA580C',
      accent: '#16A34A',
    },
  },
];
