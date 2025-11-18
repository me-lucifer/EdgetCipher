'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ManualEntryForm from './manual-entry-form';
import ImageUploadForm from './image-upload-form';
import type { Trade } from './types';
import { RecentTrades } from './recent-trades';

export default function TradeJournalPage() {
  const [activeTab, setActiveTab] = useState('manual');
  const [recentTrades, setRecentTrades] = useState<Trade[]>([]);

  const addTrade = (trade: Trade) => {
    setRecentTrades(prev => [trade, ...prev]);
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Trade Journal</h2>
          <p className="text-muted-foreground">
            Capture every trade with structured notes and screenshots.
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-5xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          <TabsTrigger value="image">Image Upload</TabsTrigger>
        </TabsList>
        <TabsContent value="manual">
          <ManualEntryForm
            onSwitchTab={() => setActiveTab('image')}
            onAddTrade={addTrade}
          />
        </TabsContent>
        <TabsContent value="image">
          <ImageUploadForm
            onSwitchTab={() => setActiveTab('manual')}
            onAddTrade={addTrade}
          />
        </TabsContent>
      </Tabs>
      
      {recentTrades.length > 0 && <RecentTrades trades={recentTrades} />}

    </div>
  );
}
