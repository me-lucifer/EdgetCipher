'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type SetupType = 'Trend' | 'Reversal' | 'Range' | 'High Volatility' | 'Breakout';
const allSetups: SetupType[] = ['Trend', 'Reversal', 'Range', 'High Volatility'];

const mockMarketData: {
  symbol: string;
  setup: SetupType;
  volatility: 'Low' | 'Normal' | 'High';
  confidence: number;
}[] = [
  { symbol: 'BTC/USDT', setup: 'Trend', volatility: 'Normal', confidence: 85 },
  { symbol: 'ETH/USDT', setup: 'Reversal', volatility: 'High', confidence: 78 },
  { symbol: 'ADA/USDT', setup: 'Range', volatility: 'Low', confidence: 92 },
  { symbol: 'AVAX/USDT', setup: 'High Volatility', volatility: 'High', confidence: 65 },
  { symbol: 'MATIC/USDT', setup: 'Trend', volatility: 'Normal', confidence: 88 },
  { symbol: 'DOT/USDT', setup: 'Range', volatility: 'Low', confidence: 95 },
  { symbol: 'XRP/USDT', setup: 'Breakout', volatility: 'Normal', confidence: 72 },
  { symbol: 'BNB/USDT', setup: 'Reversal', volatility: 'High', confidence: 81 },
];

export default function MarketScanner() {
  const [activeFilter, setActiveFilter] = useState<SetupType | 'All'>('All');
  const [scannerData, setScannerData] = useState(mockMarketData);

  const handleFilter = (filter: SetupType | 'All') => {
      setActiveFilter(filter);
      if (filter === 'All') {
          setScannerData(mockMarketData);
          return;
      }
      const filtered = mockMarketData.filter(d => d.setup === filter || (filter === 'Breakout' && d.setup === 'Breakout'));
      const others = mockMarketData.filter(d => d.setup !== filter && !(filter === 'Breakout' && d.setup === 'Breakout'));
      setScannerData([...filtered, ...others]);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Scanner (Mock)</CardTitle>
        <div className="flex flex-wrap gap-2 pt-2">
            <Button
                variant={activeFilter === 'All' ? 'default' : 'outline'}
                onClick={() => handleFilter('All')}
            >
                All
            </Button>
          {allSetups.map(filter => (
            <Button
              key={filter}
              variant={activeFilter === filter ? 'default' : 'outline'}
              onClick={() => handleFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Setup</TableHead>
              <TableHead>Volatility</TableHead>
              <TableHead className="text-right">Confidence</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scannerData.map(item => (
              <TableRow key={item.symbol} className={cn(activeFilter !== 'All' && activeFilter !== item.setup && 'opacity-50')}>
                <TableCell className="font-medium">{item.symbol}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{item.setup}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn({
                      'border-green-500/50 text-green-500': item.volatility === 'Low',
                      'border-yellow-500/50 text-yellow-500': item.volatility === 'Normal',
                      'border-red-500/50 text-red-500': item.volatility === 'High',
                    })}
                  >
                    {item.volatility}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono">{item.confidence}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
