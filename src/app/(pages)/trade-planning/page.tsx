'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getRecommendations, type FormState } from './actions';
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
import { Terminal, Bot } from 'lucide-react';
import React from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Generating...' : 'Get Recommendations'}
    </Button>
  );
}

function ResultDisplay({ result }: { result: NonNullable<FormState['result']> }) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-start gap-4">
          <div className="bg-primary/10 p-3 rounded-full border border-primary/20">
            <Bot className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle>AI-Powered Recommendations</CardTitle>
            <CardDescription>
              Based on your profile, here are some tailored strategies.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm prose-invert max-w-none text-muted-foreground whitespace-pre-wrap">
            {result.recommendations}
          </div>
        </CardContent>
      </Card>
    );
  }
  
export default function TradePlanningPage() {
  const [state, formAction] = useFormState(getRecommendations, null);

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      {!state?.result ? (
        <Card className="max-w-4xl mx-auto">
          <form action={formAction}>
            <CardHeader>
              <CardTitle>Generate Trade Plan</CardTitle>
              <CardDescription>
                Describe your trading profile and history to receive AI-powered strategy recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="userProfile" className="flex items-center gap-2">
                  User Profile
                  <InfoTooltip>
                    Describe your risk tolerance, investment goals, preferred trading style (e.g., day trading, swing trading), and experience level.
                  </InfoTooltip>
                </Label>
                <Textarea
                  id="userProfile"
                  name="userProfile"
                  placeholder="E.g., Experienced day trader with high risk tolerance, aiming for short-term gains..."
                  rows={5}
                  required
                />
                {state?.errors?.userProfile && <p className="text-sm text-destructive">{state.errors.userProfile[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="historicalData" className="flex items-center gap-2">
                  Historical Data & Context
                  <InfoTooltip>
                    Provide a summary of your recent trading performance, including biggest wins and losses, and any specific market conditions you're observing.
                  </InfoTooltip>
                </Label>
                <Textarea
                  id="historicalData"
                  name="historicalData"
                  placeholder="E.g., Recently successful with BTC longs, but struggling with altcoin volatility. Watching for potential market reversal..."
                  rows={5}
                  required
                />
                {state?.errors?.historicalData && <p className="text-sm text-destructive">{state.errors.historicalData[0]}</p>}
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
          <ResultDisplay result={state.result} />
          <Button onClick={() => window.location.reload()}>Generate New Plan</Button>
        </div>
      )}
    </div>
  );
}
