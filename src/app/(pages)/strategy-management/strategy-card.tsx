'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import { cn } from '@/lib/utils';
import type { Strategy } from './types';
import { MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

type StrategyCardProps = {
  strategy: Strategy;
  onView: () => void;
  onEdit: () => void;
  onStatusToggle: () => void;
  onDelete: () => void;
  isSelected: boolean;
};

export function StrategyCard({
  strategy,
  onView,
  onEdit,
  onStatusToggle,
  onDelete,
  isSelected,
}: StrategyCardProps) {
  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  return (
    <Card className={cn('transition-all hover:shadow-lg', isSelected && 'ring-2 ring-primary')}>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-lg flex items-center gap-2">
                    {strategy.name}
                     <InfoTooltip side="right">{strategy.description}</InfoTooltip>
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <span>{strategy.type}</span> &middot; <span>{strategy.broker}</span>
                </div>
            </div>
             <Badge variant={
                strategy.status === 'Running' ? 'default' : 
                strategy.status === 'Paused' ? 'secondary' : 'outline'
             } className={cn(
                strategy.status === 'Running' && 'bg-emerald-500/20 text-emerald-500 border-transparent',
                strategy.status === 'Paused' && 'bg-yellow-500/20 text-yellow-500 border-transparent'
             )}>
                {strategy.status}
            </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <Metric label="Trades (30d)" value={strategy.trades30d} />
            <Metric label="Win Rate" value={`${strategy.winRate}%`} />
            <Metric label="Net PnL" value={formatCurrency(strategy.netPnl)} isPositive={strategy.netPnl >= 0} />
            <Metric label="Max DD" value={`${strategy.maxDrawdown}%`} isPositive={false} />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={onView}>
          View Details
        </Button>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                 <DropdownMenuItem onClick={onStatusToggle}>
                    {strategy.status === 'Running' ? 'Pause' : 'Resume'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete} className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </CardFooter>
    </Card>
  );
}

const Metric = ({ label, value, isPositive }: { label: string; value: string | number, isPositive?: boolean }) => (
    <div>
        <div className="text-muted-foreground">{label}</div>
        <div className={cn('font-semibold text-lg', isPositive === true && 'text-emerald-500', isPositive === false && 'text-destructive')}>
            {value}
        </div>
    </div>
)
