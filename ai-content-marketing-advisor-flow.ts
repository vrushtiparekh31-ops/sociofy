'use server';
/**
 * @fileOverview An AI Digital Marketing Advisor that analyzes social media content and provides actionable insights.
 *
 * - aiContentMarketingAdvisor - A function that handles the AI content marketing analysis process.
 * - AiContentMarketingAdvisorInput - The input type for the aiContentMarketingAdvisor function.
 * - AiContentMarketingAdvisorOutput - The return type for the aiContentMarketingAdvisor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiContentMarketingAdvisorInputSchema = z.object({
  titleOrCaption: z.string().describe('The title or caption of the social media post/video.'),
  description: z.string().optional().describe('The description of the social media post/video, if available.'),
  engagementRate: z.number().describe('The calculated engagement rate for the content (e.g., likes + comments / views * 100).'),
  platformType: z.enum(['YouTube', 'Instagram']).describe('The social media platform the content is from.'),
  views: z.number().optional().describe('The number of views for the content (primarily for YouTube).'),
  likes: z.number().optional().describe('The number of likes for the content.'),
  comments: z.number().optional().describe('The number of comments on the content.'),
  followersCount: z.number().optional().describe('The number of followers for the account (primarily for Instagram, if views are not applicable).'),
});
export type AiContentMarketingAdvisorInput = z.infer<typeof AiContentMarketingAdvisorInputSchema>;

const AiContentMarketingAdvisorOutputSchema = z.object({
  strengths: z.array(z.string()).describe('List of identified strengths of the content.'),
  weaknesses: z.array(z.string()).describe('List of identified weaknesses of the content.'),
  viralScore: z.number().min(0).max(100).describe('A score (0-100) indicating the potential virality of the content.'),
  betterTitleSuggestions: z.array(z.string()).describe('Suggestions for improved titles or captions for similar content.'),
  captions: z.array(z.string()).describe('Alternative caption suggestions that could enhance engagement.'),
  hashtags: z.array(z.string()).describe('Relevant and trending hashtag suggestions to increase discoverability.'),
  bestPostingTime: z.string().describe('Suggested optimal time to post similar content for maximum reach and engagement (e.g., "Tuesday at 2 PM PST").'),
  contentImprovementTips: z.array(z.string()).describe('Actionable tips and strategies to improve future content strategy.'),
});
export type AiContentMarketingAdvisorOutput = z.infer<typeof AiContentMarketingAdvisorOutputSchema>;

const prompt = ai.definePrompt({
  name: 'aiContentMarketingAdvisorPrompt',
  input: { schema: AiContentMarketingAdvisorInputSchema },
  output: { schema: AiContentMarketingAdvisorOutputSchema },
  prompt: `You are an expert AI Digital Marketing Advisor for content creators.
Your task is to analyze social media content and provide comprehensive, actionable insights to help optimize content strategy and grow an audience.

Analyze the following content details and generate detailed insights based on the provided output schema:

Content Details:
- Platform: {{{platformType}}}
- Title/Caption: {{{titleOrCaption}}}
{{#if description}}- Description: {{{description}}}{{/if}}
- Engagement Rate: {{engagementRate}}%
{{#if views}}- Views: {{views}}{{/if}}
{{#if likes}}- Likes: {{likes}}{{/if}}
{{#if comments}}- Comments: {{comments}}{{/if}}
{{#if followersCount}}- Followers Count: {{followersCount}}{{/if}}

Provide the following in JSON format:
1.  **Strengths**: Identify positive aspects of the content, such as strong hook, clear call to action, good pacing, high quality visuals (if implied by description/engagement).
2.  **Weaknesses**: Point out areas for improvement, like vague title, low engagement for its niche, lack of clear topic, poor SEO.
3.  **Viral Score**: Assign a score from 0 to 100 based on the content's potential for widespread sharing and high engagement, considering its platform, topic, and current metrics.
4.  **Better Title Suggestions**: Generate 3-5 alternative titles/captions that are more engaging, keyword-rich, or clickbait-y, suitable for the platform.
5.  **Captions**: Provide 2-3 creative and engaging caption options that could be used for the content, tailored to the platform's style.
6.  **Hashtags**: Suggest 5-10 relevant and trending hashtags (mix of broad and niche) to increase discoverability.
7.  **Best Posting Time**: Recommend an optimal day and time to post similar content for maximum reach and engagement, based on general social media best practices (e.g., "Tuesday at 2 PM PST").
8.  **Content Improvement Tips**: Offer 3-5 specific, actionable tips for improving the content itself or the overall content strategy.

Ensure the output adheres strictly to the JSON schema provided.`,
});

const aiContentMarketingAdvisorFlow = ai.defineFlow(
  {
    name: 'aiContentMarketingAdvisorFlow',
    inputSchema: AiContentMarketingAdvisorInputSchema,
    outputSchema: AiContentMarketingAdvisorOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('AI did not return a valid output for content marketing advisor.');
    }
    return output;
  }
);

export async function aiContentMarketingAdvisor(input: AiContentMarketingAdvisorInput): Promise<AiContentMarketingAdvisorOutput> {
  return aiContentMarketingAdvisorFlow(input);
}
