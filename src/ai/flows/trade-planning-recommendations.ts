'use server';
/**
 * @fileOverview This file implements the AI-powered trade planning recommendations flow.
 *
 * It provides tailored trading strategies based on the user's profile and historical data.
 * The flow uses a prompt to generate recommendations and returns them as a string.
 *
 * @interface TradePlanningRecommendationsInput - The input schema for the trade planning recommendations flow.
 * @interface TradePlanningRecommendationsOutput - The output schema for the trade planning recommendations flow.
 * @function getTradePlanningRecommendations - The main function to retrieve trade planning recommendations.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TradePlanningRecommendationsInputSchema = z.object({
  userProfile: z
    .string()
    .describe('The user profile, including risk tolerance and investment goals.'),
  historicalData:
    z.string().describe('The historical trading data of the user.'),
});

export type TradePlanningRecommendationsInput = z.infer<
  typeof TradePlanningRecommendationsInputSchema
>;

const TradePlanningRecommendationsOutputSchema = z.object({
  recommendations:
    z.string().describe('The AI-powered trade planning recommendations.'),
});

export type TradePlanningRecommendationsOutput = z.infer<
  typeof TradePlanningRecommendationsOutputSchema
>;

export async function getTradePlanningRecommendations(
  input: TradePlanningRecommendationsInput
): Promise<TradePlanningRecommendationsOutput> {
  return tradePlanningRecommendationsFlow(input);
}

const tradePlanningRecommendationsPrompt = ai.definePrompt({
  name: 'tradePlanningRecommendationsPrompt',
  input: {schema: TradePlanningRecommendationsInputSchema},
  output: {schema: TradePlanningRecommendationsOutputSchema},
  prompt: `You are an AI-powered trading strategy expert. Analyze the user profile and historical trading data provided, and generate tailored recommendations for ideal trading strategies.

User Profile: {{{userProfile}}}
Historical Data: {{{historicalData}}}

Provide a detailed recommendation on trading strategies that align with the user's profile and historical data, ensuring you provide reasoning for the suggested strategies.
`,
});

const tradePlanningRecommendationsFlow = ai.defineFlow(
  {
    name: 'tradePlanningRecommendationsFlow',
    inputSchema: TradePlanningRecommendationsInputSchema,
    outputSchema: TradePlanningRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await tradePlanningRecommendationsPrompt(input);
    return output!;
  }
);
