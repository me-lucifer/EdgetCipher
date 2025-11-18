'use client';

import * as React from 'react';
import { Palette, Check } from 'lucide-react';
import { useTheme } from '@/context/theme-context';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { THEMES } from '@/lib/themes';
import { cn } from '@/lib/utils';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Palette className="h-5 w-5" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64 p-2">
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground px-2 py-1.5">Select Theme</p>
          {THEMES.map(t => (
            <button
              key={t.id}
              className={cn(
                'w-full text-left flex items-center justify-between px-2 py-1.5 text-sm rounded-md',
                'hover:bg-muted',
                theme === t.id && 'bg-muted'
              )}
              onClick={() => setTheme(t.id)}
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: t.colors.background }}
                  />
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: t.colors.primary }}
                  />
                   <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: t.colors.accent }}
                  />
                </div>
                <span>{t.name}</span>
              </div>
              {theme === t.id && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
