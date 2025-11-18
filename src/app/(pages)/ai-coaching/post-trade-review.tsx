'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type Tag = 'Good' | 'Over-leverage' | 'Revenge' | 'Skipped Plan' | 'FOMO';

const mockTrades: {
  id: string;
  symbol: string;
  result: 'Win' | 'Loss';
  pnl: string;
  tag: Tag;
}[] = [
  { id: 'T01', symbol: 'BTC/USDT', result: 'Win', pnl: '+$1,500', tag: 'Good' },
  { id: 'T02', symbol: 'ETH/USDT', result: 'Loss', pnl: '-$350', tag: 'Revenge' },
  { id: 'T03', symbol: 'SOL/USDT', result: 'Win', pnl: '+$800', tag: 'Good' },
  { id: 'T04', symbol: 'LINK/USDT', result: 'Loss', pnl: '-$600', tag: 'Over-leverage' },
  { id: 'T05', symbol: 'XRP/USDT', result: 'Win', pnl: '+$250', tag: 'FOMO' },
  { id: 'T06', symbol: 'ADA/USDT', result: 'Loss', pnl: '-$150', tag: 'Skipped Plan' },
];

const feedbackMap: Record<Tag, string> = {
  'Good': "This was a well-executed trade that followed your plan. Notice how your patience paid off. What can you replicate from this trade in the future?",
  'Revenge': "You entered this trade immediately after a loss with a larger position size. This 'revenge trading' pattern often leads to bigger drawdowns. It's crucial to take a break after a losing trade.",
  'Over-leverage': "The leverage used here was significantly higher than your average. While it can amplify gains, it also dramatically increases risk and the likelihood of liquidation. Was the risk worth the potential reward?",
  'Skipped Plan': "Your entry for this trade did not match the criteria defined in your trading plan. What made you deviate? Sticking to a tested plan is key for long-term consistency.",
  'FOMO': "This trade was entered late into a strong move, a classic sign of 'Fear Of Missing Out'. These entries often have poor risk/reward ratios. How could you have identified this opportunity earlier?",
};

const REFLECTION_KEY_PREFIX = 'edge-cipher-reflection-';

export default function PostTradeReview() {
  const { toast } = useToast();
  const [selectedTrade, setSelectedTrade] = useState(mockTrades[1]);
  const [reflection, setReflection] = useState('');

  useEffect(() => {
    try {
      const savedReflection = localStorage.getItem(REFLECTION_KEY_PREFIX + selectedTrade.id);
      setReflection(savedReflection || '');
    } catch (e) {
      console.error("Failed to load reflection from localStorage", e);
      setReflection('');
    }
  }, [selectedTrade]);

  const handleSaveReflection = () => {
    try {
      localStorage.setItem(REFLECTION_KEY_PREFIX + selectedTrade.id, reflection);
      toast({
        title: 'Reflection Saved',
        description: `Your reflection for trade ${selectedTrade.id} has been saved locally.`
      });
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not save your reflection.'
      })
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Recent Trades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockTrades.map(trade => (
              <div
                key={trade.id}
                onClick={() => setSelectedTrade(trade)}
                className={cn(
                  'p-3 rounded-lg border cursor-pointer transition-all',
                  selectedTrade.id === trade.id
                    ? 'bg-muted ring-2 ring-primary'
                    : 'hover:bg-muted/50'
                )}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{trade.symbol}</span>
                  <Badge variant={trade.result === 'Win' ? 'secondary' : 'destructive'} className={cn(trade.result === 'Win' ? 'bg-emerald-500/20 text-emerald-500 border-transparent' : 'bg-red-500/20 text-red-500 border-transparent')}>
                    {trade.result}
                  </Badge>
                </div>
                <div className="flex justify-between items-end mt-2 text-sm">
                  <span
                    className={cn(
                      trade.result === 'Win' ? 'text-emerald-500' : 'text-destructive'
                    )}
                  >
                    {trade.pnl}
                  </span>
                  <Badge variant="outline">{trade.tag}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Reflection on {selectedTrade.symbol}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground p-4 bg-muted/50 rounded-lg">
                {feedbackMap[selectedTrade.tag]}
            </p>
          </div>
          <div className="space-y-2">
            <label htmlFor="reflection" className="text-sm font-medium">
              Your own reflection
            </label>
            <Textarea
              id="reflection"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="What did you do well? What could be improved? What did you learn?"
              rows={6}
            />
          </div>
          <Button onClick={handleSaveReflection}>Save Reflection</Button>
        </CardContent>
      </Card>
    </div>
  );
}
