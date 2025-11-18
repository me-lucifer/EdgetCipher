import { z } from 'zod';

export const strategySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, 'Name must be at least 3 characters'),
  type: z.enum(['Momentum', 'Mean Reversion', 'Breakout', 'Scalping']),
  market: z.string().min(1, 'Market is required'),
  timeframe: z.enum(['1m', '5m', '15m', '1h', '4h', 'Daily']),
  broker: z.string(),
  trades30d: z.number().min(0),
  winRate: z.number().min(0).max(100),
  netPnl: z.number(),
  maxDrawdown: z.number().min(0),
  status: z.enum(['Running', 'Paused', 'Draft']),
  description: z.string().min(10, 'Please provide a brief description.'),
  riskPerTrade: z.coerce.number().min(0.1).max(10),
  maxOpenPositions: z.coerce.number().min(1).max(10),
  notes: z.string().optional(),
});

export type Strategy = z.infer<typeof strategySchema>;
