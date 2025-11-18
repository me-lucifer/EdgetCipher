'use client';

import { useState, useMemo } from 'react';
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
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';

type StrategyDetailProps = {
  strategy: Strategy;
  onSaveNotes: (id: string, notes: string) => void;
};

const chartConfig = {
  value: {
    label: 'Value',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;


export function StrategyDetail({ strategy, onSaveNotes }: StrategyDetailProps) {
  const [notes, setNotes] = useState(strategy.notes || '');

  const chartData = useMemo(() => {
    // Generate mock data based on strategy performance
    const data = [];
    let value = 10000;
    const isProfitable = strategy.netPnl >= 0;
    for (let i = 30; i >= 0; i--) {
        const fluctuation = (Math.random() - (isProfitable ? 0.45 : 0.55)) * value * 0.05;
        value += fluctuation;
        data.push({ date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0], value: Math.round(value) });
    }
    return data;
  }, [strategy.id, strategy.netPnl]);

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

        <div className="h-[200px]">
           <ChartContainer config={chartConfig} className="w-full h-full">
              <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id={`fill-${strategy.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={strategy.netPnl >= 0 ? "hsl(var(--primary))" : "hsl(var(--destructive))"} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={strategy.netPnl >= 0 ? "hsl(var(--primary))" : "hsl(var(--destructive))"} stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={value => new Date(value).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={value => `$${value / 1000}k`} />
                <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                <Area dataKey="value" type="natural" fill={`url(#fill-${strategy.id})`} stroke={strategy.netPnl >= 0 ? "hsl(var(--primary))" : "hsl(var(--destructive))"} />
              </AreaChart>
            </ChartContainer>
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
