'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { MetricTile } from '@/components/metric-tile';
import { dashboardMetrics, portfolioPerformance, recentTrades } from '@/lib/mock-data';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

const chartConfig = {
  value: {
    label: 'Value',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <MetricTile key={metric.label} {...metric} />
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
            <CardDescription>
              Your portfolio performance over the last 12 months.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart
                accessibilityLayer
                data={portfolioPerformance}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <defs>
                    <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
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
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Trades</CardTitle>
            <CardDescription>
              A log of your 5 most recent trades.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">P&L</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTrades.map((trade) => (
                  <TableRow key={trade.id}>
                    <TableCell className="font-medium">{trade.asset}</TableCell>
                    <TableCell>{trade.type}</TableCell>
                    <TableCell
                      className={cn('text-right', {
                        'text-emerald-500': trade.isPositive,
                        'text-destructive': trade.isPositive === false,
                      })}
                    >
                      {trade.pnl}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          trade.status === 'Open' ? 'secondary' : 'outline'
                        }
                      >
                        {trade.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
