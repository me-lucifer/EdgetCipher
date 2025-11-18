'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Check, Info } from 'lucide-react';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { navLinks } from '@/lib/nav-links';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ThemeSwitcher } from '@/components/theme-switcher';

const mockNotifications = [
    { id: 1, text: "Market: BTC volatility is rising.", read: false },
    { id: 2, text: "AI: Your win rate improved vs last week.", read: false },
    { id: 3, text: "System: New module 'Risk Center' added.", read: true },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const avatar = PlaceHolderImages.find(img => img.id === 'user-avatar');
  const [notifications, setNotifications] = React.useState(mockNotifications);

  const currentPage = navLinks.find(
    link => link.href === pathname
  ) || navLinks[0];
  
  const handleMarkAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };
  
  const unreadCount = notifications.filter(n => !n.read).length;

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
            <div className="flex items-center gap-2">
                <ThemeSwitcher />
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            {unreadCount > 0 && (
                                <span className="absolute top-1 right-1 flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                            )}
                            <span className="sr-only">Notifications</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80" align="end">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="font-medium leading-none">Notifications</h4>
                                <p className="text-sm text-muted-foreground">
                                   You have {unreadCount} unread messages.
                                </p>
                            </div>
                            <div className="grid gap-2">
                                {notifications.map(n => (
                                    <div key={n.id} className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                                        <span className={cn("flex h-2 w-2 translate-y-1 rounded-full", n.read ? "" : "bg-primary")} />
                                        <div className="grid gap-1">
                                            <p className="text-sm font-medium">{n.text}</p>
                                            {!n.read && (
                                              <Button variant="link" size="sm" className="p-0 h-auto justify-start text-xs" onClick={() => handleMarkAsRead(n.id)}>
                                                  Mark as read
                                              </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
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
