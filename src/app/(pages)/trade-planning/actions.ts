'use server';

import {
  getTradePlanningRecommendations,
  type TradePlanningRecommendationsInput,
} from '@/ai/flows/trade-planning-recommendations';
import { z } from 'zod';

const schema = z.object({
  userProfile: z.string().min(10, 'Please provide a more detailed user profile.'),
  historicalData: z.string().min(10, 'Please provide more detailed historical data.'),
});

export type FormState = {
  message: string;
  result?: Awaited<ReturnType<typeof getTradePlanningRecommendations>>;
  errors?: {
    userProfile?: string[];
    historicalData?: string[];
  };
};

export async function getRecommendations(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  try {
    const validatedFields = schema.safeParse({
      userProfile: formData.get('userProfile'),
      historicalData: formData.get('historicalData'),
    });

    if (!validatedFields.success) {
      return {
        message: 'Please check the form for errors.',
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const input: TradePlanningRecommendationsInput = validatedFields.data;
    const result = await getTradePlanningRecommendations(input);

    return { message: 'Successfully generated recommendations.', result };
  } catch (e: any) {
    return {
      message: `An error occurred: ${e.message}`,
    };
  }
}
