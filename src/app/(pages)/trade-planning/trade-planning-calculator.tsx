'use client';

import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import { toast } from '@/hooks/use-toast';
import { AlertTriangle, ShieldCheck, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

const tradePlanSchema = z.object({
  symbol: z.string().default('ETH/USDT'),
  currentPrice: z.coerce.number().positive().default(3500),
  accountBalance: z.coerce.number().positive().default(25000),
  riskPercent: z.coerce.number().min(0.1).max(10).default(1),
  entry: z.coerce.number().positive().default(3500),
  stopLoss: z.coerce.number().positive().default(3450),
  takeProfit: z.coerce.number().positive().default(3650),
});

type TradePlanFormValues = z.infer<typeof tradePlanSchema>;

const LOCAL_STORAGE_KEY = 'edge-cipher-trade-template';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export default function TradePlanningCalculator() {
  const [defaultValues, setDefaultValues] = useState<TradePlanFormValues | null>(null);

  useEffect(() => {
    try {
      const savedTemplate = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedTemplate) {
        const parsed = JSON.parse(savedTemplate);
        // Validate parsed data against schema to avoid loading malformed data
        const validation = tradePlanSchema.safeParse(parsed);
        if (validation.success) {
          setDefaultValues(validation.data);
        } else {
          setDefaultValues(tradePlanSchema.parse({}));
        }
      } else {
        setDefaultValues(tradePlanSchema.parse({}));
      }
    } catch {
      setDefaultValues(tradePlanSchema.parse({}));
    }
  }, []);

  const form = useForm<TradePlanFormValues>({
    resolver: zodResolver(tradePlanSchema),
    mode: 'onChange',
  });

  const { watch, reset } = form;
  const formValues = watch();

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const calculations = useMemo(() => {
    const { accountBalance, riskPercent, entry, stopLoss, takeProfit } = formValues;
    if (!accountBalance || !riskPercent || !entry || !stopLoss || !takeProfit || stopLoss === entry) {
      return null;
    }

    const riskAmount = accountBalance * (riskPercent / 100);
    const riskPerUnit = Math.abs(entry - stopLoss);
    const positionSize = riskPerUnit > 0 ? riskAmount / riskPerUnit : 0;
    const totalTradeValue = positionSize * entry;
    const marginRequirement = totalTradeValue / 10; // Assume 10x leverage
    const potentialProfit = positionSize * Math.abs(takeProfit - entry);
    const riskRewardRatio = riskAmount > 0 ? potentialProfit / riskAmount : 0;

    return {
      riskAmount,
      riskPerUnit,
      positionSize,
      totalTradeValue,
      marginRequirement,
      potentialProfit,
      riskRewardRatio,
    };
  }, [formValues]);

  const warnings = useMemo(() => {
    if (!calculations || !formValues.accountBalance) return [];
    const alerts = [];
    const { riskAmount, marginRequirement } = calculations;
    const { entry, stopLoss, accountBalance } = formValues;

    if (riskAmount > accountBalance * 0.1) {
      alerts.push('Max Risk Alert: You are risking more than 10% of your account.');
    }
    if (Math.abs(entry - stopLoss) / entry < 0.005) { // Stop is within 0.5% of entry
      alerts.push('Stop Loss Warning: Stop is very close to entry, liquidation risk is high.');
    }
    if (marginRequirement > accountBalance) {
      alerts.push('Margin Warning: Not enough margin for this trade.');
    }

    return alerts;
  }, [calculations, formValues]);

  const handleSaveTemplate = () => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(form.getValues()));
      toast({
        title: 'Template Saved',
        description: 'Your current trade plan is now the default template.',
      });
    } catch {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not save the template.',
      });
    }
  };

  const handleConfirmPlan = () => toast({ title: 'Plan Confirmed (Simulation)' });
  const handlePaperTrade = () => toast({ title: 'Paper Trade Started (Simulation)' });
  const handleShare = () => toast({ title: 'Plan Shared to Community (Demo)' });

  if (!defaultValues) {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </CardContent>
            <CardFooter className="flex-col items-stretch space-y-3">
                 <Skeleton className="h-10 w-full" />
                <div className="grid grid-cols-3 gap-2">
                    <Skeleton className="h-9 w-full" />
                    <Skeleton className="h-9 w-full" />
                    <Skeleton className="h-9 w-full" />
                </div>
            </CardFooter>
        </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Plan Your Trade</CardTitle>
        <CardDescription>
          Define your entry, stop, and target. We'll calculate size, margin, and risk.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField name="symbol" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Symbol</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
              )} />
              <FormField name="currentPrice" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Current Price</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>
              )} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField name="accountBalance" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Account Balance</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>
              )} />
              <FormField name="riskPercent" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1.5">Risk % per Trade <InfoTooltip side="top">Typical safe values are between 1-3%.</InfoTooltip></FormLabel>
                  <FormControl><Input type="number" min={0.1} max={10} step={0.1} {...field} /></FormControl>
                </FormItem>
              )} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <FormField name="entry" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Entry</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>
              )} />
              <FormField name="stopLoss" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Stop Loss</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>
              )} />
              <FormField name="takeProfit" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Take Profit</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>
              )} />
            </div>
            <FormMessage>{form.formState.errors.root?.message}</FormMessage>

            {calculations && (
              <>
                <Separator />
                <div className="space-y-3 rounded-lg bg-muted/50 p-4">
                  <h4 className="font-semibold">Trade Summary</h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <SummaryItem label="Risk Amount" value={formatCurrency(calculations.riskAmount)} className="text-destructive" tooltip="The maximum amount you are willing to lose on this trade." />
                    <SummaryItem label="Potential Profit" value={formatCurrency(calculations.potentialProfit)} className="text-emerald-500" />
                    <SummaryItem label="Risk/Reward Ratio" value={`1 : ${calculations.riskRewardRatio.toFixed(2)}`} tooltip="A ratio of 1:2 or better is often recommended." />
                    <SummaryItem label="Risk per Unit" value={formatCurrency(calculations.riskPerUnit)} />
                    <SummaryItem label="Position Size" value={`${calculations.positionSize.toFixed(4)} ${formValues.symbol?.split('/')[0] || ''}`} />
                    <SummaryItem label="Total Value" value={formatCurrency(calculations.totalTradeValue)} />
                    <SummaryItem label="~ Margin (10x)" value={formatCurrency(calculations.marginRequirement)} />
                  </div>
                </div>
              </>
            )}
            
            {warnings.length > 0 && (
              <Alert variant="destructive" className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-5">
                    {warnings.map((warn, i) => <li key={i}>{warn}</li>)}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

          </CardContent>
          <CardFooter className="flex-col items-stretch space-y-3">
             <Button type="button" onClick={handleConfirmPlan}><ShieldCheck /> Confirm Plan</Button>
            <div className="grid grid-cols-3 gap-2">
              <Button type="button" variant="secondary" onClick={handlePaperTrade}>Paper Trade</Button>
              <Button type="button" variant="secondary" onClick={handleSaveTemplate}>Save as Template</Button>
              <Button type="button" variant="secondary" onClick={handleShare}>Share</Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

function SummaryItem({ label, value, className, tooltip }: { label: string, value: string | number, className?: string, tooltip?: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-muted-foreground flex items-center gap-1.5">{label} {tooltip && <InfoTooltip side="top">{tooltip}</InfoTooltip>}</span>
      <span className={cn('font-semibold', className)}>{value}</span>
    </div>
  );
}
