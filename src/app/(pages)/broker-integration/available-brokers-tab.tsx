'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import type { Broker } from './types';

type AvailableBrokersTabProps = {
  brokers: Broker[];
  onConnect: (id: string) => void;
  onDisconnect: (id: string) => void;
};

export default function AvailableBrokersTab({ brokers, onConnect, onDisconnect }: AvailableBrokersTabProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {brokers.map(broker => (
        <Card key={broker.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {broker.name}
              <Badge variant={broker.connected ? 'default' : 'outline'} className={broker.connected ? 'bg-emerald-500/20 text-emerald-500 border-transparent' : ''}>
                {broker.connected ? 'Connected' : 'Not Connected'}
              </Badge>
            </CardTitle>
            <CardDescription>{broker.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {broker.markets.map(market => (
                <Badge key={market} variant="secondary">{market}</Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <InfoTooltip side="top">
              This is a simulation. In a real application, this would use OAuth or an API key flow to securely connect.
            </InfoTooltip>
            {broker.connected ? (
              <Button variant="destructive" onClick={() => onDisconnect(broker.id)}>Disconnect</Button>
            ) : (
              <Button onClick={() => onConnect(broker.id)}>Connect</Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
