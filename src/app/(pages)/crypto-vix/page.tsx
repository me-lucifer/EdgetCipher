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
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import { TrendingUp } from 'lucide-react';

type Regime = 'Calm' | 'Normal' | 'Elevated' | 'Extreme';

type RegimeData = {
  label: Regime;
  range: string;
  description: string;
  advice: string;
  color: string;
  vixValue: number;
  guidance: string;
};

const regimeDetails: Record<Regime, RegimeData> = {
  Calm: {
    label: 'Calm',
    range: '0-25',
    description: 'Low volatility. Markets tend to trend smoothly with fewer sudden moves. Breakouts are often reliable.',
    advice: 'Trend-following strategies may perform well. Use standard position sizes and consider tighter stops.',
    color: 'text-emerald-500',
    vixValue: 22,
    guidance: 'Low volatility. Consider using standard risk parameters as trends are more likely to be stable.',
  },
  Normal: {
    label: 'Normal',
    range: '26-50',
    description: 'Typical market conditions with healthy price fluctuations. Most trading strategies are viable.',
    advice: 'This is the baseline. Stick to your primary trading plan and risk management rules.',
    color: 'text-yellow-500',
    vixValue: 45,
    guidance: 'Normal market conditions. Standard strategies and risk management should apply.',
  },
  Elevated: {
    label: 'Elevated',
    range: '51-75',
    description: 'Increased price swings and a higher chance of "whipsaws." Trends can be powerful but also reverse sharply.',
    advice: 'Consider reducing position size or leverage. Widen stop-losses to avoid being shaken out by noise. Mean-reversion strategies may become more effective.',
    color: 'text-orange-500',
    vixValue: 68,
    guidance: 'Elevated volatility. Consider reducing leverage and widening stop-losses to accommodate larger price swings.',
  },
  Extreme: {
    label: 'Extreme',
    range: '76+',
    description: 'Chaotic price action. High risk of forced liquidations and cascading price moves. "De-risking" is common.',
    advice: 'The most dangerous environment. It is often wise to significantly reduce size, stay flat, or only take very high-probability setups. Protect capital above all.',
    color: 'text-destructive',
    vixValue: 89,
    guidance: 'Extreme volatility. Capital protection is paramount. Consider reducing size significantly or staying out of the market.',
  },
};

export default function CryptoVixPage() {
  const [currentRegime, setCurrentRegime] = useState<Regime>('Elevated');
  const [simulate, setSimulate] = useState(false);

  const regimes: Regime[] = ['Calm', 'Normal', 'Elevated', 'Extreme'];
  
  const handleSimulationToggle = (checked: boolean) => {
    setSimulate(checked);
    if (!checked) {
        setCurrentRegime('Elevated'); // Reset to default when turned off
    } else {
        // Start cycling through regimes
        let currentIndex = regimes.indexOf(currentRegime);
        const nextIndex = (currentIndex + 1) % regimes.length;
        setCurrentRegime(regimes[nextIndex]);
    }
  };
  
  // Effect to cycle regimes when simulation is on
  useState(() => {
    if (!simulate) return;
    const interval = setInterval(() => {
        setCurrentRegime(prev => {
            const currentIndex = regimes.indexOf(prev);
            const nextIndex = (currentIndex + 1) % regimes.length;
            return regimes[nextIndex];
        });
    }, 2500);
    return () => clearInterval(interval);
  });

  const activeData = regimeDetails[currentRegime];

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Crypto VIX</h2>
          <p className="text-muted-foreground">
            A volatility index to help you adapt your risk.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>What is a Volatility Index?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              A Volatility Index (VIX), often called a "fear index," measures the market's expectation of future price swings. In traditional markets, it's derived from the prices of options contracts.
            </p>
            <p>
              For crypto, a VIX can be constructed using implied volatility from options on major assets like BTC and ETH, combined with recent realized price volatility. It gives a single number to gauge overall market risk and sentiment.
            </p>
            <p className="font-semibold text-foreground">
              Why should you care? Volatility directly impacts your trading strategy. Higher volatility might require smaller position sizes, wider stop-losses, and reduced leverage to manage the increased risk.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Current Volatility Regime
              <div className="flex items-center gap-2">
                  <Label htmlFor="simulate-switch">Simulate</Label>
                  <Switch id="simulate-switch" checked={simulate} onCheckedChange={handleSimulationToggle} />
              </div>
            </CardTitle>
            <CardDescription
              className={cn('text-lg font-semibold', activeData.color)}
            >
              {activeData.label}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-6 rounded-lg bg-muted/50">
              <div className="text-sm text-muted-foreground">
                Current Crypto VIX (Mock)
              </div>
              <div className={cn('text-7xl font-bold my-2', activeData.color)}>
                {activeData.vixValue}
              </div>
              <p className="text-sm text-foreground">{activeData.guidance}</p>
            </div>
             <div className="h-24 w-full flex items-center justify-center rounded-lg border border-dashed bg-muted/30">
              <TrendingUp className="h-10 w-10 text-muted-foreground/50" />
              <p className="text-muted-foreground ml-4">30-Day Volatility Chart Placeholder</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Volatility Regime Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Range</TableHead>
                  <TableHead>Regime</TableHead>
                  <TableHead>Typical Conditions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.values(regimeDetails).map(regime => (
                  <TableRow key={regime.label} className={cn(currentRegime === regime.label && 'bg-muted/50')}>
                    <TableCell className={cn('font-mono', regime.color)}>{regime.range}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{regime.label}</span>
                        <InfoTooltip side="right">{regime.advice}</InfoTooltip>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{regime.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How EdgeCipher Uses Volatility (Mock)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4 list-disc pl-5 text-muted-foreground">
              <li>
                <strong className="text-foreground">Position Sizing:</strong> The Trade Planner automatically suggests smaller position sizes when volatility is high to keep your risk amount consistent.
              </li>
              <li>
                <strong className="text-foreground">AI Coaching:</strong> The AI Coach becomes more cautious in its recommendations during "Extreme" volatility, prioritizing capital preservation.
              </li>
              <li>
                <strong className="text-foreground">Strategy Flags:</strong> Strategies in your management hub that are known to underperform in the current regime will be automatically flagged for review.
              </li>
               <li>
                <strong className="text-foreground">Risk Center:</strong> Your overall portfolio's sensitivity to volatility is calculated, providing alerts if a sudden spike could pose a significant threat.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
