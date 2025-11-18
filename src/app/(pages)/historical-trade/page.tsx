'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { Upload, FileUp, Zap, BarChart2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from 'recharts';

type ManualTrade = {
  id: string;
  date: string;
  symbol: string;
  side: 'Long' | 'Short';
  quantity: number;
  entryPrice: number;
  exitPrice: number;
  pnl: number;
};

const MANUAL_TRADES_KEY = 'edge-cipher-manual-trades';

const summaryMetrics = {
    totalTrades: 821,
    winRate: '61%',
    avgR: '1.82',
    maxDrawdown: '-15.2%',
};

const pnlData = [
  { name: 'Jan', pnl: 4500 },
  { name: 'Feb', pnl: -1200 },
  { name: 'Mar', pnl: 7800 },
  { name: 'Apr', pnl: 2300 },
  { name: 'May', pnl: 9500 },
  { name: 'Jun', pnl: -500 },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};


export default function HistoricalTradePage() {
  const [fileImportResult, setFileImportResult] = useState(false);
  const [brokerSyncResult, setBrokerSyncResult] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [manualTrades, setManualTrades] = useState<ManualTrade[]>([]);
  
  const [manualSymbol, setManualSymbol] = useState('BTC/USDT');
  const [manualSide, setManualSide] = useState<'Long' | 'Short'>('Long');
  const [manualDate, setManualDate] = useState(new Date().toISOString().split('T')[0]);
  const [manualQty, setManualQty] = useState(0.1);
  const [manualEntry, setManualEntry] = useState(68000);
  const [manualExit, setManualExit] = useState(69000);

  const manualPnl = useMemo(() => {
    if (manualQty > 0 && manualEntry > 0 && manualExit > 0) {
      if (manualSide === 'Long') {
        return (manualExit - manualEntry) * manualQty;
      } else {
        return (manualEntry - manualExit) * manualQty;
      }
    }
    return 0;
  }, [manualSide, manualQty, manualEntry, manualExit]);
  
  useEffect(() => {
    try {
      const saved = localStorage.getItem(MANUAL_TRADES_KEY);
      if (saved) {
        setManualTrades(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load manual trades from localStorage', e);
    }
  }, []);
  
  useEffect(() => {
    try {
        localStorage.setItem(MANUAL_TRADES_KEY, JSON.stringify(manualTrades));
    } catch (e) {
        console.error("Failed to save manual trades to localStorage", e);
    }
  }, [manualTrades]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      toast({
        title: 'Demo: File Accepted',
        description: `Parsed ${e.target.files[0].name} and found 120 trades (mock data).`,
      });
      setFileImportResult(true);
    }
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      toast({
        title: 'Demo: Sync Complete',
        description: 'Fetched 2 years of trades from 2 connected accounts.',
      });
      setBrokerSyncResult(true);
      setIsSyncing(false);
    }, 2000);
  };
  
  const handleAddManualTrade = () => {
      const newTrade: ManualTrade = {
        id: `manual-${Date.now()}`,
        date: manualDate,
        symbol: manualSymbol,
        side: manualSide,
        quantity: manualQty,
        entryPrice: manualEntry,
        exitPrice: manualExit,
        pnl: manualPnl,
      };
      setManualTrades(prev => [newTrade, ...prev]);
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Historical Trade Import
          </h2>
          <p className="text-muted-foreground">
            Bring your past trades into EdgeCipher (demo).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* File Upload Card */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileUp /> File Upload
              <InfoTooltip side="top">
                In a real system, this would parse your broker export formats.
              </InfoTooltip>
            </CardTitle>
            <CardDescription>CSV / Excel / PDF (demo)</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <label
              htmlFor="file-upload"
              className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted transition-colors"
            >
              <div className="text-center">
                <Upload className="w-10 h-10 mx-auto text-muted-foreground" />
                <p className="mt-2 text-sm font-semibold">
                  Drop a trade file here, or click to browse
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Supported: Delta CSV, Binance CSV (mock)
                </p>
              </div>
              <input id="file-upload" type="file" className="absolute inset-0 w-full h-full opacity-0" onChange={handleFileChange} />
            </label>
             {fileImportResult && (
                <div className="mt-4 p-3 rounded-lg bg-muted/50 text-sm space-y-1">
                    <h4 className="font-semibold mb-2">Import Summary:</h4>
                    <p><strong>Trades:</strong> 120</p>
                    <p><strong>Period:</strong> 6 months</p>
                    <p><strong>Win Rate:</strong> 53%</p>
                    <p><strong>Net Return:</strong> <span className="text-emerald-500">+18%</span></p>
                </div>
            )}
          </CardContent>
        </Card>

        {/* Broker Sync Card */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap /> Broker Sync
            </CardTitle>
            <CardDescription>Use connected brokers</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground">
              Sync historical trades from your linked broker accounts (mock).
            </p>
             {brokerSyncResult && (
                <div className="mt-4 p-3 rounded-lg bg-muted/50 text-sm space-y-1">
                    <h4 className="font-semibold mb-2">Sync Summary:</h4>
                    <p><strong>Trades:</strong> 580</p>
                    <p><strong>Period:</strong> 2 years</p>
                    <p><strong>Win Rate:</strong> 62%</p>
                    <p><strong>Net Return:</strong> <span className="text-emerald-500">+45%</span></p>
                </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleSync} disabled={isSyncing} className="w-full">
              {isSyncing ? 'Syncing...' : 'Sync From Connected Brokers'}
            </Button>
          </CardFooter>
        </Card>

        {/* Manual Entry Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 /> Manual Entry
              <InfoTooltip side="top">
                Use this for trades on brokers that are not directly supported yet.
              </InfoTooltip>
            </CardTitle>
            <CardDescription>Add a single trade record</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
                 <div>
                    <Label htmlFor="manual-date">Date</Label>
                    <Input id="manual-date" type="date" value={manualDate} onChange={e => setManualDate(e.target.value)} />
                 </div>
                 <div>
                    <Label htmlFor="manual-symbol">Symbol</Label>
                    <Input id="manual-symbol" value={manualSymbol} onChange={e => setManualSymbol(e.target.value)} />
                 </div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                 <div>
                    <Label htmlFor="manual-side">Side</Label>
                    <Select value={manualSide} onValueChange={(v: 'Long' | 'Short') => setManualSide(v)}>
                        <SelectTrigger><SelectValue/></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Long">Long</SelectItem>
                            <SelectItem value="Short">Short</SelectItem>
                        </SelectContent>
                    </Select>
                 </div>
                 <div>
                    <Label htmlFor="manual-qty">Quantity</Label>
                    <Input id="manual-qty" type="number" value={manualQty} onChange={e => setManualQty(parseFloat(e.target.value))} />
                 </div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                 <div>
                    <Label htmlFor="manual-entry">Entry Price</Label>
                    <Input id="manual-entry" type="number" value={manualEntry} onChange={e => setManualEntry(parseFloat(e.target.value))} />
                 </div>
                  <div>
                    <Label htmlFor="manual-exit">Exit Price</Label>
                    <Input id="manual-exit" type="number" value={manualExit} onChange={e => setManualExit(parseFloat(e.target.value))} />
                 </div>
             </div>
             <div className="text-sm font-medium text-center p-2 rounded-md bg-muted/50">
                Calculated PnL: <span className={cn(manualPnl >= 0 ? 'text-emerald-500' : 'text-destructive')}>{formatCurrency(manualPnl)}</span>
             </div>
          </CardContent>
          <CardFooter>
              <Button onClick={handleAddManualTrade} className="w-full">Add Trade</Button>
          </CardFooter>
        </Card>
      </div>

       {manualTrades.length > 0 && (
         <Card>
            <CardHeader><CardTitle>Manually Added Trades</CardTitle></CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Symbol</TableHead>
                            <TableHead>Side</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Entry</TableHead>
                            <TableHead>Exit</TableHead>
                            <TableHead className="text-right">PnL</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {manualTrades.map(trade => (
                            <TableRow key={trade.id}>
                                <TableCell>{trade.date}</TableCell>
                                <TableCell>{trade.symbol}</TableCell>
                                <TableCell>{trade.side}</TableCell>
                                <TableCell>{trade.quantity}</TableCell>
                                <TableCell>{formatCurrency(trade.entryPrice)}</TableCell>
                                <TableCell>{formatCurrency(trade.exitPrice)}</TableCell>
                                <TableCell className={cn('text-right', trade.pnl >= 0 ? 'text-emerald-500' : 'text-destructive')}>{formatCurrency(trade.pnl)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
         </Card>
       )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Historical Summary</CardTitle>
            <CardDescription>Based on all imported data (mock).</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
             <div className="p-4 rounded-lg bg-muted/50">
                <div className="text-sm text-muted-foreground">Total Trades</div>
                <div className="text-2xl font-bold">{summaryMetrics.totalTrades}</div>
             </div>
             <div className="p-4 rounded-lg bg-muted/50">
                <div className="text-sm text-muted-foreground">Win Rate</div>
                <div className="text-2xl font-bold text-emerald-500">{summaryMetrics.winRate}</div>
             </div>
             <div className="p-4 rounded-lg bg-muted/50">
                <div className="text-sm text-muted-foreground">Avg. R-Multiple</div>
                <div className="text-2xl font-bold">{summaryMetrics.avgR}</div>
             </div>
             <div className="p-4 rounded-lg bg-muted/50">
                <div className="text-sm text-muted-foreground">Max Drawdown</div>
                <div className="text-2xl font-bold text-destructive">{summaryMetrics.maxDrawdown}</div>
             </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>PnL by Month</CardTitle>
             <CardDescription>Mocked monthly performance.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={pnlData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`}/>
                <Bar dataKey="pnl" radius={[4, 4, 0, 0]}>
                   {pnlData.map((entry, index) => (
                    <rect key={`cell-${index}`} fill={entry.pnl > 0 ? 'hsl(var(--primary))' : 'hsl(var(--destructive))'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
