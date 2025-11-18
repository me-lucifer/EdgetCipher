import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/context/theme-context';
import { THEME_STORAGE_KEY } from '@/context/theme-context';
import { cookies } from 'next/headers';
import { THEMES } from '@/lib/themes';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'EdgeCipher',
  description: 'AI-Powered Crypto Trading Terminal',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const themeId = cookieStore.get(THEME_STORAGE_KEY)?.value || 'aurora-neon';
  const theme = THEMES.find(t => t.id === themeId) || THEMES.find(t => t.id === 'aurora-neon')!;

  return (
    <html lang="en" suppressHydrationWarning className={cn(theme.id, theme.isDark && 'dark')}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider>
            {children}
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
