'use client';

import { AppShell } from '@/components/app-shell';
import { SettingsProvider } from '@/context/settings-context';
import { ThemeProvider } from '@/context/theme-context';

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
      <SettingsProvider>
        <AppShell>{children}</AppShell>
      </SettingsProvider>
  );
}
