'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import LiveTradeCoaching from './live-trade-coaching';
import PreTradeAnalysis from './pre-trade-analysis';
import MarketScanner from './market-scanner';
import PostTradeReview from './post-trade-review';
import { cn } from '@/lib/utils';
import { InfoTooltip } from '@/components/ui/info-tooltip';

type CoachingMode =
  | 'live'
  | 'pre-trade'
  | 'scanner'
  | 'post-trade';

const TABS: { id: CoachingMode; label: string; tooltip: string }[] = [
  {
    id: 'live',
    label: 'Live Trade Coaching',
    tooltip:
      'This is a simulation of real-time feedback on active trades. In a production app, this would connect to your live broker data.',
  },
  {
    id: 'pre-trade',
    label: 'Pre-Trade Analysis',
    tooltip:
      'Use this tool to slow down, review your plan, and check for potential issues before entering a trade.',
  },
  {
    id: 'scanner',
    label: 'Market Scanning',
    tooltip: 'This is a mock scanner. In a real app, it would actively find trading setups based on your criteria.',
  },
  {
    id: 'post-trade',
    label: 'Post-Trade Review',
    tooltip:
      'Journaling and structured reflection are key to improving discipline and recognizing behavioral patterns.',
  },
];

export default function AiCoachingPage() {
  const [activeTab, setActiveTab] = useState<CoachingMode>('live');

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Coaching</h2>
          <p className="text-muted-foreground">
            Guidance before, during, and after your trades.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-lg bg-muted p-1">
        {TABS.map(tab => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex-1 md:flex-none',
              activeTab === tab.id
                ? 'bg-background text-foreground shadow-sm'
                : 'hover:bg-muted-foreground/20'
            )}
          >
            {tab.label}
            <InfoTooltip side="bottom" className="ml-2">
              {tab.tooltip}
            </InfoTooltip>
          </Button>
        ))}
      </div>

      <div className="transition-all duration-300">
        {activeTab === 'live' && <LiveTradeCoaching />}
        {activeTab === 'pre-trade' && <PreTradeAnalysis />}
        {activeTab === 'scanner' && <MarketScanner />}
        {activeTab === 'post-trade' && <PostTradeReview />}
      </div>
    </div>
  );
}
