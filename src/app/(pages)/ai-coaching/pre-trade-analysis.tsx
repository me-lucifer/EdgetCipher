'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';


export default function PreTradeAnalysis() {
  const [riskPercent, setRiskPercent] = useState(1);
  const [checklist, setChecklist] = useState<string[] | null>(null);

  const handleGenerateChecklist = () => {
    const newChecklist = [
      'Risk/reward ratio appears acceptable for this setup.',
      'Entry point aligns with your pre-defined strategy rules.',
      'Market conditions are favorable for this type of trade.',
      'Do not move your stop-loss further away once in the trade.',
      'Consider your emotional state. Are you trading out of FOMO or discipline?'
    ];
    if (riskPercent > 3) {
      newChecklist.unshift('Risk per trade is above the recommended 3% threshold. Proceed with caution.');
    } else {
        newChecklist.unshift('Risk per trade is within your acceptable range.');
    }
    setChecklist(newChecklist);
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Pre-Trade Checklist</CardTitle>
        <CardDescription>
          Run your trade idea through this checklist to ensure it aligns with your plan.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="symbol">Symbol</Label>
            <Input id="symbol" defaultValue="BTC/USDT" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="direction">Direction</Label>
            <Select defaultValue="Long">
              <SelectTrigger id="direction">
                <SelectValue placeholder="Select direction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Long">Long</SelectItem>
                <SelectItem value="Short">Short</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="risk-percent">Risk per Trade (%)</Label>
            <Input
              id="risk-percent"
              type="number"
              value={riskPercent}
              onChange={(e) => setRiskPercent(parseFloat(e.target.value))}
              min="0.1"
              max="10"
              step="0.1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="setup-type">Setup Type</Label>
            <Select defaultValue="Breakout">
              <SelectTrigger id="setup-type">
                <SelectValue placeholder="Select setup" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Breakout">Breakout</SelectItem>
                <SelectItem value="Reversal">Reversal</SelectItem>
                <SelectItem value="Trend-follow">Trend-follow</SelectItem>
                <SelectItem value="Scalping">Scalping</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="reason">Reason for Trade</Label>
          <Textarea
            id="reason"
            placeholder="E.g., Strong bullish divergence on the 4H chart, breaking above key resistance..."
            rows={3}
          />
        </div>

        {checklist && (
            <div className="space-y-3 pt-4">
                 <h4 className="font-semibold">AI-Generated Checklist</h4>
                 {checklist.map((item, index) => {
                     const isWarning = item.includes('caution');
                     return (
                        <Alert key={index} variant={isWarning ? "destructive" : "default"} className={cn(!isWarning && "border-emerald-500/50")}>
                           {isWarning ? <AlertTriangle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4 text-emerald-500" />}
                           <AlertDescription className={cn(isWarning ? "text-destructive" : "text-foreground")}>{item}</AlertDescription>
                        </Alert>
                     )
                 })}
            </div>
        )}

      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleGenerateChecklist}>Generate Checklist</Button>
      </CardFooter>
    </Card>
  );
}
