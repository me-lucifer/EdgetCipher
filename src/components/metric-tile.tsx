import { ArrowDown, ArrowUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type MetricTileProps = {
  label: string;
  value: string;
  trend: string;
  isPositive: boolean;
};

export function MetricTile({ label, value, trend, isPositive }: MetricTileProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p
          className={cn(
            'text-xs text-muted-foreground flex items-center',
            isPositive ? 'text-emerald-500' : 'text-destructive'
          )}
        >
          {isPositive ? (
            <ArrowUp className="h-4 w-4 mr-1" />
          ) : (
            <ArrowDown className="h-4 w-4 mr-1" />
          )}
          {trend} vs last period
        </p>
      </CardContent>
    </Card>
  );
}
