'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useSettings } from '@/context/settings-context';
import { useTheme } from '@/context/theme-context';
import { THEMES } from '@/lib/themes';

const PROFILE_KEY = 'edgecipher-profile';
const NOTIFICATIONS_KEY = 'edgecipher-notifications';
const SECURITY_KEY = 'edgecipher-security';
const PRIVACY_KEY = 'edgecipher-privacy';
const PLATFORM_KEY = 'edgecipher-platform';


export default function SettingsPage() {
  const { toast } = useToast();
  const { settings, updateSetting } = useSettings();
  const { theme, setTheme } = useTheme();

  const [profile, setProfile] = useState({
    displayName: 'Trader Joe',
    email: 'trader.joe@example.com',
    timezone: 'America/New_York',
    baseCurrency: 'USD',
  });

  const [notifications, setNotifications] = useState({
    highImpactNews: true,
    mediumImpactNews: false,
    tradeExecution: true,
    dailySummary: true,
  });

  const [security, setSecurity] = useState({
    twoFactor: true,
    confirmCloseAll: true,
  });

  const [privacy, setPrivacy] = useState({
    shareForAI: true,
    shareForLeaderboard: false,
  });

  const [platform, setPlatform] = useState({
    proactiveHelp: true,
  });

   useEffect(() => {
    const keys = {
      [PROFILE_KEY]: setProfile,
      [NOTIFICATIONS_KEY]: setNotifications,
      [SECURITY_KEY]: setSecurity,
      [PRIVACY_KEY]: setPrivacy,
    };
    
    Object.entries(keys).forEach(([key, setter]) => {
      try {
        const item = localStorage.getItem(key);
        if (item) {
          setter(prev => ({...prev, ...JSON.parse(item)}));
        }
      } catch (e) { console.error(`Failed to load ${key}`, e); }
    });

    setPlatform({ proactiveHelp: settings.proactiveHelp });

  }, [settings.proactiveHelp]);

  const handleSave = (key: string, data: any, name: string) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      toast({ title: `${name} Saved`, description: `Your ${name.toLowerCase()} settings have been updated.` });
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: `Could not save ${name.toLowerCase()} settings.` });
    }
  };
  
  const handlePlatformChange = (field: keyof typeof platform, value: boolean) => {
    const newState = { ...platform, [field]: value };
    setPlatform(newState);
    if (field === 'proactiveHelp') {
      updateSetting('proactiveHelp', value);
    }
  };

  const savePlatformSettings = () => {
    try {
      localStorage.setItem(PLATFORM_KEY, JSON.stringify(platform));
      toast({ title: 'Platform Settings Saved' });
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not save platform settings.' });
    }
  }

  const isDarkTheme = THEMES.find(t => t.id === theme)?.isDark ?? true;


  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>
      <p className="text-muted-foreground">
        Configure your profile, alerts, and platform behavior.
      </p>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="platform">Platform</TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile">
            <Card>
                <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input id="displayName" value={profile.displayName} onChange={e => setProfile({...profile, displayName: e.target.value})} />
                     </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} />
                     </div>
                     <div className="grid md:grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <Label htmlFor="timezone">Timezone</Label>
                            <Select value={profile.timezone} onValueChange={value => setProfile({...profile, timezone: value})}>
                                <SelectTrigger><SelectValue/></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                                    <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                                    <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                                </SelectContent>
                            </Select>
                         </div>
                         <div className="space-y-2">
                            <Label htmlFor="baseCurrency">Base Currency</Label>
                            <Select value={profile.baseCurrency} onValueChange={value => setProfile({...profile, baseCurrency: value})}>
                                <SelectTrigger><SelectValue/></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="USD">USD</SelectItem>
                                    <SelectItem value="EUR">EUR</SelectItem>
                                    <SelectItem value="USDT">USDT</SelectItem>
                                </SelectContent>
                            </Select>
                         </div>
                     </div>
                     <Button onClick={() => handleSave(PROFILE_KEY, profile, 'Profile')}>Save Profile</Button>
                </CardContent>
            </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
             <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
             <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                    <Label htmlFor="highImpactNews">News Alerts - High Impact</Label>
                    <Switch id="highImpactNews" checked={notifications.highImpactNews} onCheckedChange={checked => setNotifications({...notifications, highImpactNews: checked})} />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                    <Label htmlFor="mediumImpactNews">News Alerts - Medium Impact</Label>
                    <Switch id="mediumImpactNews" checked={notifications.mediumImpactNews} onCheckedChange={checked => setNotifications({...notifications, mediumImpactNews: checked})} />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                    <Label htmlFor="tradeExecution">Trade Execution Alerts</Label>
                    <Switch id="tradeExecution" checked={notifications.tradeExecution} onCheckedChange={checked => setNotifications({...notifications, tradeExecution: checked})} />
                </div>
                 <div className="flex items-center justify-between p-4 rounded-lg border">
                    <Label htmlFor="dailySummary">Daily AI Summary</Label>
                    <Switch id="dailySummary" checked={notifications.dailySummary} onCheckedChange={checked => setNotifications({...notifications, dailySummary: checked})} />
                </div>
                 <Button onClick={() => handleSave(NOTIFICATIONS_KEY, notifications, 'Notifications')}>Save Notifications</Button>
             </CardContent>
          </Card>
        </TabsContent>

         {/* Security Tab */}
        <TabsContent value="security">
           <Card>
             <CardHeader><CardTitle>Security</CardTitle></CardHeader>
             <CardContent className="space-y-4">
                 <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">Security options here are simulated and do not connect to any backend.</p>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                    <Label htmlFor="twoFactor">Two-Factor Authentication (demo only)</Label>
                    <Switch id="twoFactor" checked={security.twoFactor} onCheckedChange={checked => setSecurity({...security, twoFactor: checked})} />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                    <Label htmlFor="confirmCloseAll">Confirm before closing all positions</Label>
                    <Switch id="confirmCloseAll" checked={security.confirmCloseAll} onCheckedChange={checked => setSecurity({...security, confirmCloseAll: checked})} />
                </div>
                 <Button onClick={() => handleSave(SECURITY_KEY, security, 'Security')}>Save Security Settings</Button>
             </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy">
           <Card>
             <CardHeader><CardTitle>Privacy</CardTitle></CardHeader>
             <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">Privacy options are conceptual for this prototype.</p>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                    <Label htmlFor="shareForAI">Allow anonymized performance data to be used to improve AI</Label>
                    <Switch id="shareForAI" checked={privacy.shareForAI} onCheckedChange={checked => setPrivacy({...privacy, shareForAI: checked})} />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                    <Label htmlFor="shareForLeaderboard">Show my performance ranking in anonymous leaderboards</Label>
                    <Switch id="shareForLeaderboard" checked={privacy.shareForLeaderboard} onCheckedChange={checked => setPrivacy({...privacy, shareForLeaderboard: checked})} />
                </div>
                 <Button onClick={() => handleSave(PRIVACY_KEY, privacy, 'Privacy')}>Save Privacy Settings</Button>
             </CardContent>
          </Card>
        </TabsContent>

        {/* Platform Tab */}
        <TabsContent value="platform">
            <Card>
             <CardHeader>
                <CardTitle>Platform</CardTitle>
                <CardDescription>Adjust the look and feel of the application.</CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="space-y-1">
                        <Label htmlFor="darkTheme">Dark Theme</Label>
                        <p className="text-xs text-muted-foreground">Toggle between a dark or light user interface.</p>
                    </div>
                    <Switch 
                        id="darkTheme" 
                        checked={isDarkTheme} 
                        onCheckedChange={(checked) => {
                            if (checked) {
                                // Default to a dark theme if switching from light
                                if (theme === 'light-pro' || theme === 'solar-dawn') {
                                    setTheme('deep-night');
                                }
                            } else {
                                // Default to a light theme if switching from dark
                                if (theme === 'deep-night' || theme === 'aurora-neon') {
                                    setTheme('light-pro');
                                }
                            }
                        }} 
                    />
                </div>
                 <div className="flex items-center justify-between p-4 rounded-lg border">
                     <div className="space-y-1">
                        <Label htmlFor="proactiveHelp">Proactive help and tooltips</Label>
                        <p className="text-xs text-muted-foreground">Show helpful tips and onboarding guides.</p>
                     </div>
                    <Switch id="proactiveHelp" checked={platform.proactiveHelp} onCheckedChange={checked => handlePlatformChange('proactiveHelp', checked)} />
                </div>
                 <Button onClick={savePlatformSettings}>Save Platform Settings</Button>
             </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
