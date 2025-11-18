'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { analyzePerformance, type FormState } from './actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import React from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Analyzing...' : 'Analyze Performance'}
    </Button>
  );
}

function ResultDisplay({ result }: { result: NonNullable<FormState['result']> }) {
  return (
    <div className="space-y-6">
       <Card>
          <CardHeader>
            <CardTitle>Analysis Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{result.summary}</p>
          </CardContent>
        </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Strengths</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{result.strengths}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Weaknesses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{result.weaknesses}</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{result.recommendations}</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default function PerformanceAnalyticsPage() {
  const [state, formAction] = useFormState(analyzePerformance, null);

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      {!state?.result ? (
        <Card className="max-w-4xl mx-auto">
          <form action={formAction}>
            <CardHeader>
              <CardTitle>Generate Performance Insights</CardTitle>
              <CardDescription>
                Provide your trading details below to receive an AI-powered analysis of your performance.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="tradingHistory" className="flex items-center gap-2">
                  Trading History
                  <InfoTooltip>
                    Paste your trade history here. Include assets, dates, entry/exit prices, and position sizes. The more detail, the better the analysis.
                  </InfoTooltip>
                </Label>
                <Textarea
                  id="tradingHistory"
                  name="tradingHistory"
                  placeholder="E.g., Bought 1 BTC at $68,000 on 2024-05-10, sold at $70,000 on 2024-05-12..."
                  rows={8}
                  required
                />
                {state?.errors?.tradingHistory && <p className="text-sm text-destructive">{state.errors.tradingHistory[0]}</p>}
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="riskTolerance">Risk Tolerance</Label>
                  <Textarea
                    id="riskTolerance"
                    name="riskTolerance"
                    placeholder="E.g., High, medium, low. I'm willing to risk 2% of my portfolio per trade..."
                    rows={4}
                    required
                  />
                  {state?.errors?.riskTolerance && <p className="text-sm text-destructive">{state.errors.riskTolerance[0]}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="investmentGoals">Investment Goals</Label>
                  <Textarea
                    id="investmentGoals"
                    name="investmentGoals"
                    placeholder="E.g., Long-term growth, short-term income, capital preservation..."
                    rows={4}
                    required
                  />
                  {state?.errors?.investmentGoals && <p className="text-sm text-destructive">{state.errors.investmentGoals[0]}</p>}
                </div>
              </div>

               {state?.message && !state.result && (
                <Alert variant="destructive">
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{state.message}</AlertDescription>
                </Alert>
              )}

            </CardContent>
            <CardFooter>
              <SubmitButton />
            </CardFooter>
          </form>
        </Card>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
           <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Analysis Complete</AlertTitle>
              <AlertDescription>
                Here are your personalized performance insights. You can generate a new report below.
              </AlertDescription>
            </Alert>
          <ResultDisplay result={state.result} />
           <Button onClick={() => window.location.reload()}>Generate New Report</Button>
        </div>
      )}
    </div>
  );
}
