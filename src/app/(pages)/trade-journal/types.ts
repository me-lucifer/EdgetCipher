import { z } from 'zod';

export const exitSchema = z.object({
  date: z.date(),
  price: z.coerce.number().positive('Exit price must be positive'),
  quantity: z.coerce.number().positive('Exit quantity must be positive'),
});

export const tradeSchema = z.object({
  id: z.string().optional(),
  symbol: z.string().min(1, 'Symbol is required'),
  direction: z.enum(['Long', 'Short']),
  entryDate: z.date(),
  tradeType: z.enum(['Manual', 'Image']),
  entryPrice: z.coerce.number().positive('Entry price must be positive'),
  quantity: z.coerce.number().positive('Quantity must be positive'),
  leverage: z.coerce.number().min(1).max(500),
  commission: z.coerce.number().min(0).optional(),
  notes: z.string().optional(),
  exits: z.array(exitSchema).optional(),
});

export type Trade = z.infer<typeof tradeSchema>;
export type Exit = z.infer<typeof exitSchema>;
