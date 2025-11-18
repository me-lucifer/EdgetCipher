'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { cn } from '@/lib/utils';
import {
  ArrowUp,
  TrendingUp,
  TrendingDown,
  Info,
  ListTodo,
} from 'lucide-react';
import {
  dashboardMetrics,
  portfolioPerformance,
  marketSnapshot,
  aiDailyBriefing,
  nextBestActions,
} from '@/lib/mock-data';
import { InfoTooltip } from '@/components/info-tooltip';
import NextBestActions from './next-best-actions';

const chartConfig = {
  value: {
    label: 'Value',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Your AI-assisted trading cockpit at a glance.
          </p>
        </div>
      </div>

      {/* Top metrics row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardMetrics.map(metric => (
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
              <div className="text-3xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {metric.isPositive ? (
                  <ArrowUp className="h-3 w-3 mr-1 text-emerald-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1 text-destructive" />
                )}
                <span
                  className={cn(
                    'mr-1',
                    metric.isPositive ? 'text-emerald-500' : 'text-destructive'
                  )}
                >
                  {metric.trend}
                </span>
                vs last 30 days
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Second row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>Portfolio Performance</CardTitle>
              <InfoTooltip>
                This chart summarizes your account value over time.
              </InfoTooltip>
            </div>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <AreaChart
                accessibilityLayer
                data={portfolioPerformance}
                margin={{
                  left: 12,
                  right: 12,
                  top: 5,
                  bottom: 5,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={value => value.slice(0, 3)}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={value => `$${value / 1000}k`}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <defs>
                  <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="value"
                  type="natural"
                  fill="url(#fillValue)"
                  stroke="hsl(var(--primary))"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <p className="text-muted-foreground">Current Equity</p>
                <p className="font-bold">$160,000</p>
              </div>
              <div>
                <p className="text-muted-foreground">Max Drawdown</p>
                <p className="font-bold text-destructive">-5.2%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Best Day</p>
                <p className="font-bold text-emerald-500">+$2,150</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
          <CardHeader>
            <CardTitle>Market Snapshot</CardTitle>
            <CardDescription>Sample crypto asset data.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {marketSnapshot.map(asset => (
                <li key={asset.ticker} className="flex items-center">
                  <div className="font-bold">{asset.ticker}</div>
                  <div className="ml-auto text-right">
                    <div>{asset.price}</div>
                    <div
                      className={cn(
                        'text-xs',
                        asset.change24h.startsWith('+')
                          ? 'text-emerald-500'
                          : 'text-destructive'
                      )}
                    >
                      {asset.change24h}
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn('ml-4 w-16 justify-center', {
                      'border-green-500/50 text-green-500':
                        asset.volatility === 'Low',
                      'border-yellow-500/50 text-yellow-500':
                        asset.volatility === 'Normal',
                      'border-red-500/50 text-red-500':
                        asset.volatility === 'High',
                    })}
                  >
                    {asset.volatility}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Third row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>AI Daily Briefing</CardTitle>
              <InfoTooltip>
                This is simulated. In a real application, this would be
                generated by the AI.
              </InfoTooltip>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 list-disc pl-5 text-muted-foreground">
              {aiDailyBriefing.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListTodo className="h-5 w-5" />
              Next Best Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <NextBestActions items={nextBestActions} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
