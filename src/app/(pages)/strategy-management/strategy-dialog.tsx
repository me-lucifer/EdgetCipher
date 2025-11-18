'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { Strategy } from './types';
import { strategySchema } from './types';
import { InfoTooltip } from '@/components/ui/info-tooltip';

type StrategyDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  strategy: Strategy | null;
  onSave: (data: Strategy) => void;
};

export function StrategyDialog({ isOpen, onOpenChange, strategy, onSave }: StrategyDialogProps) {
  const form = useForm<Strategy>({
    resolver: zodResolver(strategySchema),
    defaultValues: {
      name: '',
      market: 'BTC/USDT',
      type: 'Momentum',
      timeframe: '1h',
      status: 'Draft',
      riskPerTrade: 1,
      maxOpenPositions: 1,
      description: '',
      trades30d: 0,
      winRate: 0,
      netPnl: 0,
      maxDrawdown: 0,
      broker: 'Paper',
      notes: '',
    },
  });

  useEffect(() => {
    if (strategy) {
      form.reset(strategy);
    } else {
      form.reset({
        name: '', market: 'BTC/USDT', type: 'Momentum', timeframe: '1h', status: 'Draft',
        riskPerTrade: 1, maxOpenPositions: 1, description: '', trades30d: 0, winRate: 0, netPnl: 0,
        maxDrawdown: 0, broker: 'Paper', notes: '',
      });
    }
  }, [strategy, form, isOpen]);
  
  const onSubmit = (data: Strategy) => {
    onSave({ ...strategy, ...data });
    onOpenChange(false);
  };
  
  const handleSaveAndActivate = (data: Strategy) => {
    onSave({ ...strategy, ...data, status: 'Running' });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{strategy ? 'Edit Strategy' : 'Add New Strategy'}</DialogTitle>
          <DialogDescription>
            Define the parameters for your automated strategy. You can save as a draft or activate it immediately.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4">
             <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Strategy Name</FormLabel>
                    <FormControl><Input {...field} placeholder="e.g., EMA Cross on BTC/USDT" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="market"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Market</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                        <SelectContent>
                            <SelectItem value="BTC/USDT">BTC/USDT</SelectItem>
                            <SelectItem value="ETH/USDT">ETH/USDT</SelectItem>
                            <SelectItem value="SOL/USDT">SOL/USDT</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                        <SelectContent>
                            <SelectItem value="Momentum">Momentum</SelectItem>
                            <SelectItem value="Mean Reversion">Mean Reversion</SelectItem>
                            <SelectItem value="Breakout">Breakout</SelectItem>
                             <SelectItem value="Scalping">Scalping</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timeframe"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timeframe</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                        <SelectContent>
                            {['1m', '5m', '15m', '1h', '4h', 'Daily'].map(tf => <SelectItem key={tf} value={tf}>{tf}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <FormField
                control={form.control}
                name="riskPerTrade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">Risk per Trade (%) <InfoTooltip>Typical safe values are between 1-3%.</InfoTooltip></FormLabel>
                    <FormControl><Input type="number" min={0.1} max={10} step={0.1} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                control={form.control}
                name="maxOpenPositions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">Max Open Positions <InfoTooltip>Limiting open positions can reduce overexposure.</InfoTooltip></FormLabel>
                    <FormControl><Input type="number" min={1} max={10} step={1} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl><Textarea {...field} placeholder="A brief, non-technical explanation of how the strategy works." rows={3} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </form>
        </Form>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button type="button" variant="secondary" onClick={form.handleSubmit(onSubmit)}>Save as Draft</Button>
          <Button type="button" onClick={form.handleSubmit(handleSaveAndActivate)}>Save and Activate</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}