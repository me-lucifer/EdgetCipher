'use server';

import {
  getPerformanceInsights,
  type PerformanceInsightsInput,
} from '@/ai/flows/performance-insights';
import { z } from 'zod';

const schema = z.object({
  tradingHistory: z.string().min(10, 'Please provide a more detailed trading history.'),
  riskTolerance: z.string().min(3, 'Please describe your risk tolerance.'),
  investmentGoals: z.string().min(10, 'Please describe your investment goals in more detail.'),
});

export type FormState = {
  message: string;
  result?: Awaited<ReturnType<typeof getPerformanceInsights>>;
  errors?: {
    tradingHistory?: string[];
    riskTolerance?: string[];
    investmentGoals?: string[];
  };
};

export async function analyzePerformance(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  try {
    const validatedFields = schema.safeParse({
      tradingHistory: formData.get('tradingHistory'),
      riskTolerance: formData.get('riskTolerance'),
      investmentGoals: formData.get('investmentGoals'),
    });

    if (!validatedFields.success) {
      return {
        message: 'Please check the form for errors.',
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
    
    const input: PerformanceInsightsInput = validatedFields.data;
    const result = await getPerformanceInsights(input);

    return { message: 'Successfully generated insights.', result };
  } catch (e: any) {
    return {
      message: `An error occurred: ${e.message}`,
    };
  }
}
