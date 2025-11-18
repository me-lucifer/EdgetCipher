'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import { toast } from '@/hooks/use-toast';
import { useSettings } from '@/context/settings-context';

type RiskProfile = 'Conservative' | 'Moderate' | 'Aggressive';

const profileData = {
  Conservative: {
    drawdown: '5-10%',
    riskPerTrade: '0.5-1%',
    leverage: '1-5x',
  },
  Moderate: {
    drawdown: '10-20%',
    riskPerTrade: '1-2%',
    leverage: '5-20x',
  },
  Aggressive: {
    drawdown: '20%+',
    riskPerTrade: '2-5%',
    leverage: '20x+',
  },
};

const GUARDRAILS_KEY = 'edgecipher-risk-guardrails';
const RISK_PROFILE_KEY = 'edgecipher-risk-profile';

type Guardrails = {
    maxRiskPerTrade: number;
    maxDailyLoss: number;
    maxTradesPerDay: number;
    maxConcurrentPositions: number;
};

export default function RiskCenterPage() {
  const { settings } = useSettings();
  const [selectedProfile, setSelectedProfile] = useState<RiskProfile>('Moderate');
  const [guardrails, setGuardrails] = useState<Guardrails>({
    maxRiskPerTrade: 2,
    maxDailyLoss: 5,
    maxTradesPerDay: 10,
    maxConcurrentPositions: 4,
  });

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem(RISK_PROFILE_KEY) as RiskProfile | null;
      if (savedProfile && profileData[savedProfile]) {
        setSelectedProfile(savedProfile);
      }
      
      const savedGuardrails = localStorage.getItem(GUARDRAILS_KEY);
      if (savedGuardrails) {
        setGuardrails(JSON.parse(savedGuardrails));
      }
    } catch (e) {
      console.error('Failed to load risk settings from localStorage', e);
    }
  }, []);

  const handleProfileSelect = (profile: RiskProfile) => {
    setSelectedProfile(profile);
    localStorage.setItem(RISK_PROFILE_KEY, profile);
    toast({ title: 'Profile Updated', description: `Your risk profile has been set to ${profile}.` });
  };

  const handleGuardrailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newGuardrails = { ...guardrails, [name]: parseFloat(value) };
    setGuardrails(newGuardrails);
    localStorage.setItem(GUARDRAILS_KEY, JSON.stringify(newGuardrails));
  };
  
  const showTooltips = settings.proactiveHelp;

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Risk Center</h2>
        <p className="text-muted-foreground">
          Define your guardrails and see how you behave against them.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Risk Profile</CardTitle>
          <CardDescription className="flex items-center gap-2">
            Select the profile that best matches your trading style.
             {showTooltips && (
                <InfoTooltip side="right">
                    In a real system, AI and strategy suggestions would adapt based on this choice.
                </InfoTooltip>
             )}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(Object.keys(profileData) as RiskProfile[]).map(profile => (
            <Card
              key={profile}
              onClick={() => handleProfileSelect(profile)}
              className={cn(
                'cursor-pointer transition-all hover:shadow-lg',
                selectedProfile === profile && 'ring-2 ring-primary'
              )}
            >
              <CardHeader>
                <CardTitle>{profile}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p><strong>Max Drawdown:</strong> {profileData[profile].drawdown}</p>
                <p><strong>Risk per Trade:</strong> {profileData[profile].riskPerTrade}</p>
                <p><strong>Leverage:</strong> {profileData[profile].leverage}</p>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
      
       <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
                <CardTitle>Guardrails</CardTitle>
                <CardDescription>Set your hard limits. The system will alert you if you deviate (demo).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="maxRiskPerTrade" className="flex items-center gap-2">Max Risk per Trade (%) {showTooltips && <InfoTooltip>It is generally recommended to keep this at or below 2%.</InfoTooltip>}</Label>
                    <Input id="maxRiskPerTrade" name="maxRiskPerTrade" type="number" value={guardrails.maxRiskPerTrade} onChange={handleGuardrailChange} />
                    {guardrails.maxRiskPerTrade > 2 && <p className="text-xs text-yellow-500">Consider keeping risk per trade at or below 2%.</p>}
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="maxDailyLoss" className="flex items-center gap-2">Max Daily Loss (% of Account) {showTooltips && <InfoTooltip>A hard stop for the day can prevent catastrophic emotional trading.</InfoTooltip>}</Label>
                    <Input id="maxDailyLoss" name="maxDailyLoss" type="number" value={guardrails.maxDailyLoss} onChange={handleGuardrailChange} />
                     {guardrails.maxDailyLoss > 5 && <p className="text-xs text-destructive">This daily loss limit is quite high and could lead to large equity swings.</p>}
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="maxTradesPerDay">Max Trades per Day</Label>
                    <Input id="maxTradesPerDay" name="maxTradesPerDay" type="number" value={guardrails.maxTradesPerDay} onChange={handleGuardrailChange} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="maxConcurrentPositions">Max Concurrent Positions</Label>
                    <Input id="maxConcurrentPositions" name="maxConcurrentPositions" type="number" value={guardrails.maxConcurrentPositions} onChange={handleGuardrailChange} />
                </div>
            </CardContent>
          </Card>
           <Card>
                <CardHeader>
                    <CardTitle>Behavior Snapshot (Mock)</CardTitle>
                    <CardDescription>How you are performing against your guardrails.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex justify-between text-sm"><span>Avg. risk per trade</span> <span className="text-emerald-500">1.8% (within limit)</span></div>
                    </div>
                     <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex justify-between text-sm"><span>Worst daily loss (30d)</span> <span className="text-yellow-500">4.9% (near limit)</span></div>
                    </div>
                     <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex justify-between text-sm"><span>Max trades in a day (30d)</span> <span className="text-destructive">17 (above limit of 10)</span></div>
                    </div>
                     <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex justify-between text-sm"><span>Max concurrent positions</span> <span className="text-emerald-500">3 (within limit)</span></div>
                    </div>
                </CardContent>
           </Card>
       </div>
    </div>
  );
}
