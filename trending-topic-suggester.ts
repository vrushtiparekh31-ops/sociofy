'use server';
/**
 * @fileOverview This file implements a Genkit flow for suggesting trending topics, hashtags, audio, and formats.
 *
 * - suggestTrendingTopics - A function that triggers the trending topic suggestion process.
 * - TrendingTopicSuggesterInput - The input type for the suggestTrendingTopics function.
 * - TrendingTopicSuggesterOutput - The return type for the suggestTrendingTopics function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TrendingTopicSuggesterInputSchema = z.object({
  contentCategory: z
    .string()
    .optional()
    .describe('The niche, category, or specific content title/URL to find trends for.'),
});
export type TrendingTopicSuggesterInput = z.infer<
  typeof TrendingTopicSuggesterInputSchema
>;

const TrendingTopicSuggesterOutputSchema = z.object({
  topics: z
    .array(
      z.object({
        topic: z.string().describe('The suggested trending topic.'),
        reason: z.string().describe('A brief reason for its current relevance.'),
        hashtags: z
          .array(z.string())
          .describe('A list of highly relevant hashtags for the topic.'),
        suggestedAudio: z.string().describe('A type of trending audio or specific sound style to use (e.g., "Lofi Chill", "Upbeat Phonk").'),
        recommendedFormat: z.string().describe('The best format for this trend (e.g., "60s Reel with text overlays", "10m Deep Dive Video").'),
      })
    )
    .describe('A list of suggested trending topics with reasons, hashtags, audio, and formats.'),
  overallExplanation: z
    .string()
    .describe(
      'An overall explanation of current trends and how to leverage them for content creation.'
    ),
});
export type TrendingTopicSuggesterOutput = z.infer<
  typeof TrendingTopicSuggesterOutputSchema
>;

export async function suggestTrendingTopics(
  input: TrendingTopicSuggesterInput
): Promise<TrendingTopicSuggesterOutput> {
  return trendingTopicSuggesterFlow(input);
}

const trendingTopicSuggesterPrompt = ai.definePrompt({
  name: 'trendingTopicSuggesterPrompt',
  input: {schema: TrendingTopicSuggesterInputSchema},
  output: {schema: TrendingTopicSuggesterOutputSchema},
  prompt: `You are an expert digital marketing advisor specializing in identifying current trends for content creators. Your goal is to suggest timely and discoverable content ideas and associated hashtags.

Imagine you have access to real-time trending data across various social media platforms and search engines.

Based on the current digital landscape and the provided content niche or specific reference:
{{#if contentCategory}}
  Reference/Niche: {{{contentCategory}}}
{{else}}
  Reference: General (no specific niche provided, provide general trending ideas)
{{/if}}

Suggest 3-5 highly relevant trending topics that a content creator could leverage. For each topic:
1. Provide a reason for relevance.
2. Suggest 3-5 hashtags.
3. Identify a 'Suggested Audio' style (trending tracks or genres).
4. Recommend a 'Recommended Format' (video length, style, or specific platform feature like Reels/Shorts).

Finally, provide a general explanation for how these trends can be leveraged for maximum discoverability.

Ensure the output is structured as a JSON object matching the provided schema.`,
});

const trendingTopicSuggesterFlow = ai.defineFlow(
  {
    name: 'trendingTopicSuggesterFlow',
    inputSchema: TrendingTopicSuggesterInputSchema,
    outputSchema: TrendingTopicSuggesterOutputSchema,
  },
  async (input) => {
    const {output} = await trendingTopicSuggesterPrompt(input);
    if (!output) {
      throw new Error('Failed to generate trending topics.');
    }
    return output;
  }
);
