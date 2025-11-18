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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { InfoTooltip } from '@/components/ui/info-tooltip';
import {
  performanceMetrics,
  equityData,
  drawdownProfile,
  returnDistribution,
  tradeMix,
  strategyBreakdown,
  assetBreakdown,
} from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { MetricTile } from '@/components/metric-tile';
import { Button } from '@/components/ui/button';

type Strategy = (typeof strategyBreakdown)[0];

export default function PerformanceAnalyticsPage() {
  const [timeframe, setTimeframe] = useState('30d');
  const [tradeFilter, setTradeFilter] = useState('all');
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<
    (typeof assetBreakdown)[0] | null
  >(null);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Performance Analytics
          </h2>
          <p className="text-muted-foreground">
            Understand your edge across time, assets and strategies.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="3m">3 months</SelectItem>
              <SelectItem value="6m">6 months</SelectItem>
              <SelectItem value="1y">1 year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={tradeFilter} onValueChange={setTradeFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select trades" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All trades</SelectItem>
              <SelectItem value="manual">Manual only</SelectItem>
              <SelectItem value="strategy">Strategy only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        {performanceMetrics.map(metric => (
          <Card
            key={metric.label}
            className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.label}
              </CardTitle>
              <InfoTooltip>{metric.tooltip}</InfoTooltip>
            </CardHeader>
            <CardContent>
              <div
                className={cn(
                  'text-3xl font-bold',
                  metric.isPositive === true && 'text-emerald-500',
                  metric.isPositive === false && 'text-destructive'
                )}
              >
                {metric.value}
              </div>
              <p className="text-xs text-muted-foreground">{metric.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Equity and Drawdown */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        <Card className="lg:col-span-3 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>Equity Curve (Mocked)</CardTitle>
              <InfoTooltip>
                This chart visualizes your account balance over time, showing
                growth and declines.
              </InfoTooltip>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full flex items-center justify-center rounded-lg border border-dashed bg-muted/30">
              <p className="text-muted-foreground">Equity Chart Placeholder</p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <p className="text-muted-foreground">Start Equity</p>
                <p className="font-bold">{formatCurrency(equityData.start)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Current Equity</p>
                <p className="font-bold">{formatCurrency(equityData.current)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Net Return</p>
                <p className="font-bold text-emerald-500">
                  {formatCurrency(equityData.netReturn)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
          <CardHeader>
            <CardTitle>Drawdown Profile</CardTitle>
            <CardDescription>How your account handles losses.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Current Drawdown</span>
                <span
                  className={cn(
                    'font-mono',
                    drawdownProfile.current > 0
                      ? 'text-destructive'
                      : 'text-emerald-500'
                  )}
                >
                  -{drawdownProfile.current.toFixed(2)}%
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Max Drawdown</span>
                <span className="font-mono text-destructive">
                  -{drawdownProfile.max.toFixed(2)}%
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Average Drawdown</span>
                <span className="font-mono text-destructive">
                  -{drawdownProfile.average.toFixed(2)}%
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">
                  Average Recovery Time
                </span>
                <span className="font-mono">
                  {drawdownProfile.avgRecoveryTime}
                </span>
              </li>
            </ul>
            <div>
              <label className="text-sm font-medium">Pain Level</label>
              <Progress
                value={drawdownProfile.painLevel}
                className="mt-1 h-3"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Distribution and Trade Mix */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        <Card className="lg:col-span-3 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
          <CardHeader>
            <CardTitle>Return Distribution</CardTitle>
            <CardDescription>
              The frequency of different trade outcomes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={returnDistribution}>
                <XAxis
                  dataKey="name"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={value => `${value}`}
                />
                <Bar dataKey="trades" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
          <CardHeader>
            <CardTitle>Trade Mix</CardTitle>
            <CardDescription>Performance by direction and setup.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Trades</TableHead>
                  <TableHead className="text-right">Win Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Long</TableCell>
                  <TableCell>{tradeMix.long.trades}</TableCell>
                  <TableCell className="text-right">
                    {tradeMix.long.winRate}%
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Short</TableCell>
                  <TableCell>{tradeMix.short.trades}</TableCell>
                  <TableCell className="text-right">
                    {tradeMix.short.winRate}%
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
             <Table className="mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead>Setup</TableHead>
                  <TableHead>Trades</TableHead>
                  <TableHead className="text-right">Net PnL</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                 {tradeMix.setups.map(setup => (
                    <TableRow key={setup.name}>
                        <TableCell>{setup.name}</TableCell>
                        <TableCell>{setup.trades}</TableCell>
                        <TableCell className={cn("text-right font-mono", setup.pnl >= 0 ? "text-emerald-500" : "text-destructive")}>{formatCurrency(setup.pnl)}</TableCell>
                    </TableRow>
                 ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      {/* Strategy and Asset Breakdown */}
       <div className="grid gap-6 md:grid-cols-2">
            <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                    <CardTitle>By Strategy</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Trades</TableHead>
                                <TableHead>Win Rate</TableHead>
                                <TableHead className="text-right">Net PnL</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {strategyBreakdown.map(s => (
                                <TableRow key={s.name} onClick={() => setSelectedStrategy(s)} className="cursor-pointer">
                                    <TableCell className="font-medium">{s.name}</TableCell>
                                    <TableCell>{s.trades}</TableCell>
                                    <TableCell>{s.winRate}%</TableCell>
                                    <TableCell className={cn("text-right font-mono", s.netPnl >= 0 ? "text-emerald-500" : "text-destructive")}>{formatCurrency(s.netPnl)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                     {selectedStrategy && (
                        <div className="mt-4 p-3 rounded-lg bg-muted/50 text-sm">
                            <p className="font-semibold">{selectedStrategy.name} Notes:</p>
                            <p className="text-muted-foreground">{selectedStrategy.commentary}</p>
                        </div>
                     )}
                </CardContent>
            </Card>
            <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                    <CardTitle>By Asset</CardTitle>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Symbol</TableHead>
                                <TableHead>Trades</TableHead>
                                <TableHead>Avg. Hold</TableHead>
                                <TableHead className="text-right">Net PnL</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {assetBreakdown.map(a => (
                                <TableRow key={a.symbol} onClick={() => setSelectedAsset(a)} className="cursor-pointer">
                                    <TableCell className="font-medium">{a.symbol}</TableCell>
                                    <TableCell>{a.trades}</TableCell>
                                    <TableCell>{a.avgHold}</TableCell>
                                    <TableCell className={cn("text-right font-mono", a.netPnl >= 0 ? "text-emerald-500" : "text-destructive")}>{formatCurrency(a.netPnl)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {selectedAsset && (
                        <div className="mt-4 p-3 rounded-lg bg-muted/50 text-sm">
                            <p className="font-semibold">{selectedAsset.symbol} Notes:</p>
                            <p className="text-muted-foreground">{selectedAsset.commentary}</p>
                        </div>
                     )}
                </CardContent>
            </Card>
       </div>

    </div>
  );
}

    