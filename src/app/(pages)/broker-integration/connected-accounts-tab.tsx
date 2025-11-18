'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { ConnectedAccount } from './types';
import { InfoTooltip } from '@/components/ui/info-tooltip';

type ConnectedAccountsTabProps = {
  accounts: ConnectedAccount[];
  onAction: (accountId: string, action: 'pause' | 'resume' | 'disconnect') => void;
};

export default function ConnectedAccountsTab({ accounts, onAction }: ConnectedAccountsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Accounts</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Broker</TableHead>
              <TableHead>Nickname</TableHead>
              <TableHead>Mode</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Sync</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">No accounts connected.</TableCell>
                </TableRow>
            ) : (
                accounts.map(account => (
                <TableRow key={account.id}>
                    <TableCell className="font-medium">{account.brokerName}</TableCell>
                    <TableCell>{account.nickname}</TableCell>
                    <TableCell>
                        <div className='flex items-center gap-2'>
                        <Badge variant={account.mode === 'Live' ? 'destructive' : 'secondary'}>
                            {account.mode}
                        </Badge>
                        <InfoTooltip side="top">
                            {account.mode === 'Live' ? 'Uses your real broker account.' : 'Simulated trades only, no real money.'}
                        </InfoTooltip>
                        </div>
                    </TableCell>
                    <TableCell>
                        <Badge variant={account.status === 'Connected' ? 'default' : 'outline'} className={account.status === 'Connected' ? 'bg-emerald-500/20 text-emerald-500 border-transparent' : 'bg-yellow-500/20 text-yellow-500 border-transparent'}>
                            {account.status}
                        </Badge>
                    </TableCell>
                    <TableCell>{formatDistanceToNow(new Date(account.lastSync), { addSuffix: true })}</TableCell>
                    <TableCell className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            {account.status === 'Connected' ? (
                                <DropdownMenuItem onClick={() => onAction(account.id, 'pause')}>Pause</DropdownMenuItem>
                            ) : (
                                <DropdownMenuItem onClick={() => onAction(account.id, 'resume')}>Resume</DropdownMenuItem>
                            )}
                                <DropdownMenuItem onClick={() => onAction(account.id, 'disconnect')} className="text-destructive">Disconnect</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
