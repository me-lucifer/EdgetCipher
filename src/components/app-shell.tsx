'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { navLinks } from '@/lib/nav-links';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const avatar = PlaceHolderImages.find(img => img.id === 'user-avatar');

  const currentPage = navLinks.find(
    link => link.href === pathname
  ) || navLinks[0];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo className="group-data-[collapsible=icon]:hidden" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navLinks.map((link, index) => {
              if (link.href === '/settings') return null; // Settings is in footer
              return (
                <SidebarMenuItem key={link.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === link.href}
                    tooltip={link.label}
                  >
                    <Link href={link.href}>
                      <link.icon />
                      <span>{link.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/settings'} tooltip="Settings">
                <Link href="/settings">
                  {navLinks.find(l => l.href === '/settings')?.icon ? (
                    React.createElement(navLinks.find(l => l.href === '/settings')!.icon)
                  ) : null}
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center justify-between gap-4 border-b bg-background/95 px-4 sticky top-0 z-40 backdrop-blur-sm md:px-6">
            <div className="flex items-center gap-4">
                 <SidebarTrigger className="md:hidden" />
                 <div>
                    <h1 className="text-lg font-semibold md:text-xl">{currentPage.label}</h1>
                    <p className="text-xs text-muted-foreground hidden md:block">{currentPage.subtitle}</p>
                 </div>
            </div>
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                </Button>
                <Avatar className="h-9 w-9">
                  {avatar && <AvatarImage src={avatar.imageUrl} alt="User avatar" data-ai-hint={avatar.imageHint} />}
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
            </div>
        </header>
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
