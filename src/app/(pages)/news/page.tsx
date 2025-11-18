'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import { Search } from 'lucide-react';

type NewsCategory = 'Macro' | 'Crypto' | 'Regulation' | 'Platform';

type NewsItem = {
  id: string;
  source: string;
  time: string;
  headline: string;
  summary: string;
  category: NewsCategory;
  impact: 'High' | 'Medium' | 'Low';
  analysis: {
    meaning: string;
    exposedAssets: string[];
    suggestedAction: string;
  };
  tradeCheck: {
    trade: string;
    comment: string;
  }[];
};

const mockNews: NewsItem[] = [
  {
    id: 'news-1',
    source: 'MacroWire',
    time: '15 minutes ago',
    headline: 'US Federal Reserve Hints at Slower Rate Hikes',
    summary:
      'Officials suggest that the pace of interest rate increases may slow down in the coming months.',
    category: 'Macro',
    impact: 'High',
    analysis: {
      meaning:
        'A slower pace of rate hikes is generally bullish for risk assets like crypto as it reduces the appeal of bonds.',
      exposedAssets: ['BTC', 'ETH', 'Total Market'],
      suggestedAction: 'Watch for potential breakout in major assets.',
    },
    tradeCheck: [
      {
        trade: 'BTC Long',
        comment:
          'This news is favorable for your position. Consider holding.',
      },
      {
        trade: 'ETH Short',
        comment:
          'This news is unfavorable. Monitor price action closely and consider tightening your stop-loss.',
      },
    ],
  },
  {
    id: 'news-2',
    source: 'BlockDesk',
    time: '1 hour ago',
    headline: 'New Ethereum EIP-7251 Proposal for Increasing Max Validator Cap',
    summary:
      'A new Ethereum Improvement Proposal aims to raise the effective balance for validators.',
    category: 'Crypto',
    impact: 'Medium',
    analysis: {
      meaning:
        'This could improve staking economics and decentralization on the Ethereum network over the long term.',
      exposedAssets: ['ETH', 'LDO', 'Staking-related tokens'],
      suggestedAction: 'Expect increased discussion, minor short-term impact.',
    },
    tradeCheck: [
      {
        trade: 'ETH Short',
        comment:
          'This is a long-term bullish development; no immediate action required for a short-term trade.',
      },
    ],
  },
  {
    id: 'news-3',
    source: 'RegWatch',
    time: '4 hours ago',
    headline: 'SEC Delays Decision on Spot Ethereum ETF',
    summary: 'The agency has postponed its decision on several Ethereum ETF applications.',
    category: 'Regulation',
    impact: 'Medium',
    analysis: {
      meaning:
        'Delays create uncertainty, which can lead to sideways or downward price action until a final decision is made.',
      exposedAssets: ['ETH'],
      suggestedAction: 'Expect chop; reduce leverage on ETH positions.',
    },
    tradeCheck: [
      {
        trade: 'ETH Short',
        comment: 'This news supports your bearish thesis. Hold for now.',
      },
    ],
  },
  {
    id: 'news-4',
    source: 'Delta Exchange Blog',
    time: '1 day ago',
    headline: 'Delta Exchange Lists New Perpetual Contracts',
    summary: 'The exchange has added support for several new altcoin perpetual futures.',
    category: 'Platform',
    impact: 'Low',
    analysis: {
      meaning:
        'Increased trading options on the platform. No broad market impact expected.',
      exposedAssets: ['Specific new altcoins'],
      suggestedAction: 'No action needed for major positions.',
    },
    tradeCheck: [
      { trade: 'BTC Long', comment: 'No impact on your position.' },
    ],
  },
];

const categories: NewsCategory[] = ['Macro', 'Crypto', 'Regulation', 'Platform'];

export default function NewsPage() {
  const [filter, setFilter] = useState<NewsCategory | 'All'>('All');
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(
    mockNews[0].id
  );

  const filteredNews =
    filter === 'All' ? mockNews : mockNews.filter(n => n.category === filter);

  const selectedNews = mockNews.find(n => n.id === selectedNewsId);

  const ImpactBadge = ({ impact }: { impact: 'High' | 'Medium' | 'Low' }) => (
    <Badge
      variant="outline"
      className={cn(
        'font-bold',
        {
          'border-red-500/50 text-red-500': impact === 'High',
          'border-yellow-500/50 text-yellow-500': impact === 'Medium',
          'border-blue-500/50 text-blue-500': impact === 'Low',
        }
      )}
    >
      {impact.toUpperCase()} IMPACT
      <InfoTooltip side="bottom" className="ml-2">
        <div><strong>High:</strong> Likely to move markets significantly.</div>
        <div className="mt-1"><strong>Medium:</strong> Can create volatility but may be localized.</div>
        <div className="mt-1"><strong>Low:</strong> Worth knowing, but usually minor market effect.</div>
      </InfoTooltip>
    </Badge>
  );

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">News & AI Impact</h2>
          <p className="text-muted-foreground">
            See what matters and how it might affect your positions.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left Column: News Feed */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                   <Button variant={filter === 'All' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('All')}>All</Button>
                   {categories.map(cat => (
                     <Button key={cat} variant={filter === cat ? 'default' : 'outline'} size="sm" onClick={() => setFilter(cat)}>{cat}</Button>
                   ))}
                </div>
                 <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search headlines (demo)..." className="pl-8" />
                 </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {filteredNews.map(item => (
                  <div
                    key={item.id}
                    className={cn(
                      'p-4 border rounded-lg cursor-pointer transition-all',
                      selectedNewsId === item.id
                        ? 'bg-muted ring-2 ring-primary'
                        : 'hover:bg-muted/50'
                    )}
                    onClick={() => setSelectedNewsId(item.id)}
                  >
                    <div className="flex justify-between items-start text-xs text-muted-foreground">
                        <span>{item.source} &bull; {item.time}</span>
                        <Badge variant="secondary">{item.category}</Badge>
                    </div>
                    <h3 className="font-semibold mt-1">{item.headline}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.summary}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: AI Impact Panel */}
        <div className="lg:col-span-2">
          {selectedNews ? (
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>AI Impact Assessment</CardTitle>
                <CardDescription>
                  <ImpactBadge impact={selectedNews.impact} />
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                 <div>
                    <h4 className="font-semibold text-sm mb-2">Key Takeaways</h4>
                    <ul className="space-y-2 list-disc pl-5 text-sm text-muted-foreground">
                        <li><strong>Meaning:</strong> {selectedNews.analysis.meaning}</li>
                        <li><strong>Exposed Assets:</strong> {selectedNews.analysis.exposedAssets.join(', ')}</li>
                        <li><strong>Suggested Action:</strong> {selectedNews.analysis.suggestedAction}</li>
                    </ul>
                 </div>
                 <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        Active Trade Check
                        <InfoTooltip side="top">
                            This is a demo based on your mocked open trades.
                        </InfoTooltip>
                    </h4>
                     <div className="space-y-3">
                        {selectedNews.tradeCheck.map((check, idx) => (
                           <div key={idx} className="p-3 rounded-lg bg-muted/50 text-sm">
                             <p className="font-semibold">{check.trade}</p>
                             <p className="text-muted-foreground">{check.comment}</p>
                           </div>
                        ))}
                     </div>
                 </div>
              </CardContent>
            </Card>
          ) : (
             <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed shadow-sm bg-card text-muted-foreground">
                Select a headline to see AI-style impact analysis.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}