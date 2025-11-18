'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Strategy } from './types';
import { mockTradeLog } from './mock-data';

type StrategyDetailProps = {
  strategy: Strategy;
  onSaveNotes: (id: string, notes: string) => void;
};

export function StrategyDetail({ strategy, onSaveNotes }: StrategyDetailProps) {
  const [notes, setNotes] = useState(strategy.notes || '');

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  const performanceSummary = [
      { label: "30d Return", value: formatCurrency(strategy.netPnl), isPositive: strategy.netPnl >= 0 },
      { label: "Sharpe Ratio", value: (strategy.netPnl / (strategy.maxDrawdown * 1000)).toFixed(2) || '0.00' },
      { label: "Max Drawdown", value: `${strategy.maxDrawdown}%`, isPositive: false },
  ]

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>{strategy.name}</CardTitle>
        <CardDescription>{strategy.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
            <h4 className="font-semibold text-sm mb-2">Performance Summary</h4>
            <div className="grid grid-cols-3 gap-4 rounded-lg bg-muted/50 p-4">
                {performanceSummary.map(item => (
                    <div key={item.label}>
                        <div className="text-muted-foreground text-xs">{item.label}</div>
                        <div className={cn("font-semibold text-lg", item.isPositive === true && "text-emerald-500", item.isPositive === false && "text-destructive")}>
                            {item.value}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="h-[200px] flex items-center justify-center rounded-lg border border-dashed bg-muted/30">
            <p className="text-muted-foreground">Strategy Equity Curve Placeholder</p>
        </div>

        <div>
            <h4 className="font-semibold text-sm mb-2">Recent Signals / Trades</h4>
            <div className="h-64 overflow-y-auto rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Time</TableHead>
                            <TableHead>Signal</TableHead>
                            <TableHead>Asset</TableHead>
                            <TableHead className="text-right">Result</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockTradeLog.map(log => (
                            <TableRow key={log.id}>
                                <TableCell className="font-mono text-xs">{log.time.split(' ')[1]}</TableCell>
                                <TableCell>
                                    <span className={cn(log.signal === 'BUY' ? 'text-emerald-500' : 'text-destructive')}>{log.signal}</span>
                                </TableCell>
                                <TableCell>{log.asset}</TableCell>
                                <TableCell className={cn("text-right font-mono", log.result.startsWith('+') ? 'text-emerald-500' : 'text-destructive')}>
                                    {log.result}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
        
        <div className="space-y-2">
            <h4 className="font-semibold text-sm">Strategy Notes</h4>
            <Textarea 
                value={notes} 
                onChange={e => setNotes(e.target.value)}
                placeholder="Add your personal notes and observations about this strategy..." 
                rows={4}
            />
            <Button size="sm" onClick={() => onSaveNotes(strategy.id, notes)}>Save Notes</Button>
        </div>
      </CardContent>
    </Card>
  );
}