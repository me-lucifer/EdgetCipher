'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import AvailableBrokersTab from './available-brokers-tab';
import ConnectedAccountsTab from './connected-accounts-tab';
import ApiSettingsTab from './api-settings-tab';
import type { Broker, ConnectedAccount } from './types';

const BROKERS_STORAGE_KEY = 'edge-cipher-connected-brokers';
const ACCOUNTS_STORAGE_KEY = 'edge-cipher-connected-accounts';

const availableBrokers: Broker[] = [
    { id: 'delta', name: 'Delta Exchange', description: 'Advanced crypto derivatives.', markets: ['Futures', 'Options'], connected: false },
    { id: 'binance', name: 'Binance Futures', description: 'High liquidity futures.', markets: ['Futures'], connected: false },
    { id: 'bybit', name: 'Bybit', description: 'Popular for perpetual swaps.', markets: ['Futures', 'Spot'], connected: false },
    { id: 'okx', name: 'OKX', description: 'Global crypto exchange.', markets: ['Spot', 'Futures', 'Options'], connected: false },
    { id: 'paper', name: 'Demo / Paper', description: 'Trade with simulated money.', markets: ['Paper'], connected: false },
];


export default function BrokerIntegrationPage() {
    const [connectedBrokers, setConnectedBrokers] = useState<Broker[]>(availableBrokers);
    const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>([]);
     const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        try {
            const savedBrokers = localStorage.getItem(BROKERS_STORAGE_KEY);
            if (savedBrokers) {
                setConnectedBrokers(JSON.parse(savedBrokers));
            }

            const savedAccounts = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
            if (savedAccounts) {
                setConnectedAccounts(JSON.parse(savedAccounts));
            }
        } catch (e) {
            console.error("Failed to load from localStorage", e);
        }
    }, []);

    useEffect(() => {
        if (!isMounted) return;
        try {
            localStorage.setItem(BROKERS_STORAGE_KEY, JSON.stringify(connectedBrokers));
        } catch (e) {
            console.error("Failed to save brokers to localStorage", e);
        }
    }, [connectedBrokers, isMounted]);

    useEffect(() => {
        if (!isMounted) return;
        try {
            localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(connectedAccounts));
        } catch (e) {
            console.error("Failed to save accounts to localStorage", e);
        }
    }, [connectedAccounts, isMounted]);

    const handleConnect = (brokerId: string) => {
        setConnectedBrokers(prev => prev.map(b => b.id === brokerId ? { ...b, connected: true } : b));
        setConnectedAccounts(prev => {
            if (prev.some(acc => acc.brokerId === brokerId)) return prev;
            const broker = availableBrokers.find(b => b.id === brokerId);
            if (!broker) return prev;
            const newAccount: ConnectedAccount = {
                id: `${brokerId}-${Date.now()}`,
                brokerId: broker.id,
                brokerName: broker.name,
                nickname: `${broker.name} Main`,
                mode: broker.id === 'paper' ? 'Paper' : 'Live',
                status: 'Connected',
                lastSync: new Date().toISOString()
            };
            return [...prev, newAccount];
        });
    };

    const handleDisconnect = (brokerId: string) => {
        setConnectedBrokers(prev => prev.map(b => b.id === brokerId ? { ...b, connected: false } : b));
        setConnectedAccounts(prev => prev.filter(acc => acc.brokerId !== brokerId));
    };
    
    const handleAccountAction = (accountId: string, action: 'pause' | 'resume' | 'disconnect') => {
        setConnectedAccounts(prev => {
            if (action === 'disconnect') {
                const account = prev.find(a => a.id === accountId);
                if (account) {
                    handleDisconnect(account.brokerId);
                }
                return prev.filter(a => a.id !== accountId);
            }
            return prev.map(a => a.id === accountId ? { ...a, status: action === 'pause' ? 'Paused' : 'Connected' } : a);
        });
    };
    
    if (!isMounted) {
        return null; // or a loading skeleton
    }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Broker Integration Hub</h2>
          <p className="text-muted-foreground">
            Connect your live and paper trading accounts. Prototype only – no real keys.
          </p>
        </div>
         <Button>Add New Broker</Button>
      </div>

       {/* Top status row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Connected brokers</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-bold">{connectedAccounts.length}</div></CardContent>
          </Card>
          <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Last sync</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-bold">2 mins ago</div></CardContent>
          </Card>
          <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Uptime</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-bold">99.8%</div></CardContent>
          </Card>
          <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Avg. Latency</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-bold">128ms</div></CardContent>
          </Card>
      </div>

      <Tabs defaultValue="available" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="available">Available Brokers</TabsTrigger>
          <TabsTrigger value="connected">Connected Accounts</TabsTrigger>
          <TabsTrigger value="settings">API Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="available">
            <AvailableBrokersTab 
                brokers={connectedBrokers} 
                onConnect={handleConnect}
                onDisconnect={handleDisconnect}
            />
        </TabsContent>
        <TabsContent value="connected">
            <ConnectedAccountsTab 
                accounts={connectedAccounts} 
                onAction={handleAccountAction}
            />
        </TabsContent>
        <TabsContent value="settings">
            <ApiSettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
