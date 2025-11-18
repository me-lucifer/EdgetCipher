// Implemented a Genkit flow to generate personalized trading performance insights using AI.
'use server';
/**
 * @fileOverview Generates AI-driven insights on past trading performance.
 *
 * - getPerformanceInsights - A function that generates performance insights.
 * - PerformanceInsightsInput - The input type for the getPerformanceInsights function.
 * - PerformanceInsightsOutput - The return type for the getPerformanceInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PerformanceInsightsInputSchema = z.object({
  tradingHistory: z.string().describe('A detailed history of the user\'s past trades, including dates, assets, quantities, and outcomes.'),
  riskTolerance: z.string().describe('The user\'s self-assessed risk tolerance level (e.g., low, medium, high).'),
  investmentGoals: z.string().describe('The user\'s stated investment goals (e.g., capital preservation, income generation, growth).'),
});
export type PerformanceInsightsInput = z.infer<typeof PerformanceInsightsInputSchema>;

const PerformanceInsightsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the user\'s trading performance.'),
  strengths: z.string().describe('Key strengths identified in the user\'s trading strategy.'),
  weaknesses: z.string().describe('Areas where the user could improve their trading strategy.'),
  riskTendencies: z.string().describe('An analysis of the user\'s risk-taking behavior and tendencies.'),
  habits: z.string().describe('Notable trading habits observed in the user\'s trading history.'),
  recommendations: z.string().describe('Specific recommendations for improving the user\'s trading performance and risk management.'),
});
export type PerformanceInsightsOutput = z.infer<typeof PerformanceInsightsOutputSchema>;

export async function getPerformanceInsights(input: PerformanceInsightsInput): Promise<PerformanceInsightsOutput> {
  return performanceInsightsFlow(input);
}

const performanceInsightsPrompt = ai.definePrompt({
  name: 'performanceInsightsPrompt',
  input: {schema: PerformanceInsightsInputSchema},
  output: {schema: PerformanceInsightsOutputSchema},
  prompt: `You are an AI-powered trading coach. Analyze the user's trading history, risk tolerance, and investment goals to provide personalized insights.

Trading History: {{{tradingHistory}}}
Risk Tolerance: {{{riskTolerance}}}
Investment Goals: {{{investmentGoals}}}

Generate a summary of the user's trading performance, highlighting strengths, weaknesses, risk tendencies, and habits. Provide specific recommendations for improvement.

Ensure that the output follows the schema provided, and that each field is populated with relevant and helpful information.
`,
});

const performanceInsightsFlow = ai.defineFlow(
  {
    name: 'performanceInsightsFlow',
    inputSchema: PerformanceInsightsInputSchema,
    outputSchema: PerformanceInsightsOutputSchema,
  },
  async input => {
    const {output} = await performanceInsightsPrompt(input);
    return output!;
  }
);
