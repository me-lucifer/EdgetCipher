'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  CandlestickChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Candlestick,
  Tooltip,
} from 'recharts';

import TradePlanningCalculator from './trade-planning-calculator';
import { ChartConfig } from '@/components/ui/chart';

const chartData = [
  { date: '2024-07-20', open: 3480, high: 3510, low: 3470, close: 3500 },
  { date: '2024-07-21', open: 3500, high: 3525, low: 3490, close: 3515 },
  { date: '2024-07-22', open: 3515, high: 3540, low: 3505, close: 3520 },
  { date: '2024-07-23', open: 3520, high: 3522, low: 3480, close: 3485 },
  { date: '2024-07-24', open: 3485, high: 3500, low: 3460, close: 3495 },
  { date: '2024-07-25', open: 3495, high: 3550, low: 3490, close: 3540 },
  { date: '2024-07-26', open: 3540, high: 3580, low: 3535, close: 3575 },
  { date: '2024-07-27', open: 3575, high: 3600, low: 3560, close: 3590 },
  { date: '2024-07-28', open: 3590, high: 3595, low: 3550, close: 3560 },
  { date: '2024-07-29', open: 3560, high: 3570, low: 3500, close: 3505 },
];

const chartConfig = {
  price: {
    label: 'Price',
  },
} satisfies ChartConfig;

export default function TradePlanningPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Trade Planning</h2>
          <p className="text-muted-foreground">
            Plan your trade, know your risk, then execute with confidence.
          </p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
        {/* Left Column: Chart */}
        <div className="md:col-span-2 lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Price Chart (ETH/USDT Mock)</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-96 w-full">
                <CandlestickChart
                  data={chartData}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="date" tickFormatter={(tick) => new Date(tick).toLocaleDateString('en-US', { day: 'numeric', month: 'short'})} />
                  <YAxis domain={['dataMin - 20', 'dataMax + 20']} tickFormatter={(tick) => `$${tick}`} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="p-2 border rounded-lg bg-background shadow-lg">
                            <p>{`Date: ${data.date}`}</p>
                            <p>{`O: ${data.open} H: ${data.high}`}</p>
                            <p>{`L: ${data.low} C: ${data.close}`}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Candlestick
                    dataKey="price"
                    name="Price"
                    fill="hsl(var(--primary))"
                    stroke="hsl(var(--foreground))"
                    data={chartData.map(d => ({date: d.date, value: [d.open, d.high, d.low, d.close]}))}
                    isAnimationActive={false}
                  />
                </CandlestickChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Trade Plan Panel */}
        <div className="md:col-span-1 lg:col-span-2">
          <TradePlanningCalculator />
        </div>
      </div>
    </div>
  );
}
