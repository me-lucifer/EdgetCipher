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
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

import TradePlanningCalculator from './trade-planning-calculator';
import { ChartConfig } from '@/components/ui/chart';
import { CustomCandlestick } from './custom-candlestick';

const chartData = [
  { date: '2024-07-20', uv: [3480, 3510, 3470, 3500] },
  { date: '2024-07-21', uv: [3500, 3525, 3490, 3515] },
  { date: '2024-07-22', uv: [3515, 3540, 3505, 3520] },
  { date: '2024-07-23', uv: [3520, 3522, 3480, 3485] },
  { date: '2024-07-24', uv: [3485, 3500, 3460, 3495] },
  { date: '2024-07-25', uv: [3495, 3550, 3490, 3540] },
  { date: '2024-07-26', uv: [3540, 3580, 3535, 3575] },
  { date: '2024-07-27', uv: [3575, 3600, 3560, 3590] },
  { date: '2024-07-28', uv: [3590, 3595, 3550, 3560] },
  { date: '2024-07-29', uv: [3560, 3570, 3500, 3505] },
];

const chartConfig = {
  price: {
    label: 'Price',
  },
  uv: {
    label: 'Price',
    color: 'hsl(var(--primary))',
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
                <ComposedChart
                  data={chartData}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="date" tickFormatter={(tick) => new Date(tick).toLocaleDateString('en-US', { day: 'numeric', month: 'short'})} />
                  <YAxis domain={['dataMin - 20', 'dataMax + 20']} tickFormatter={(tick) => `$${tick}`} />
                   <ChartTooltip
                    content={
                      <ChartTooltipContent
                        labelFormatter={(value) => {
                           return new Date(value).toLocaleDateString('en-US', { day: 'numeric', month: 'short'});
                        }}
                        formatter={(value: any, name, props) => {
                          if (name === 'uv' && Array.isArray(value)) {
                            return `O: ${value[0]}, H: ${value[1]}, L: ${value[2]}, C: ${value[3]}`
                          }
                          return value;
                        }}
                        nameKey="name"
                      />
                    }
                  />
                  <CustomCandlestick dataKey="uv" />
                </ComposedChart>
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
