'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Trade } from './types';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp } from 'lucide-react';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export function RecentTrades({ trades }: { trades: Trade[] }) {
  return (
    <Card className="max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle>Recent Journal Entries</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Direction</TableHead>
              <TableHead>Entry Date</TableHead>
              <TableHead>Entry Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trades.map((trade, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{trade.symbol}</TableCell>
                <TableCell>
                  <Badge
                    variant={trade.direction === 'Long' ? 'default' : 'destructive'}
                    className={cn(trade.direction === 'Long' ? 'bg-emerald-500/20 text-emerald-500 border-transparent' : 'bg-red-500/20 text-red-500 border-transparent')}
                  >
                     {trade.direction === 'Long' ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
                    {trade.direction}
                  </Badge>
                </TableCell>
                <TableCell>{format(trade.entryDate, 'PPp')}</TableCell>
                <TableCell>{formatCurrency(trade.entryPrice)}</TableCell>
                <TableCell>{trade.quantity}</TableCell>
                <TableCell>
                    <Badge variant="outline">{trade.tradeType}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
