'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ApiSettingsTab() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>API Key Management (Demo)</CardTitle>
          <CardDescription>
            Inputs are disabled as no real keys are stored in this prototype.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <Input id="api-key" value="********************" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="api-secret">Secret Key</Label>
            <Input id="api-secret" value="********************" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="api-passphrase">Passphrase (Optional)</Label>
            <Input id="api-passphrase" value="********************" disabled />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Security Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              In a real application, your API keys are treated with the highest level of security.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Keys are encrypted at rest and in transit.</li>
              <li>They are never exposed on the client-side. All broker communications happen through a secure backend server.</li>
              <li>This platform acts as a control panel, but order execution and account management happen directly with your broker.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
