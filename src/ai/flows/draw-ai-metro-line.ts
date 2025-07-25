'use server';

/**
 * @fileOverview A flow that draws a line between two areas of the metro map, as defined by tags or categories, to guide users to areas of interest.
 *
 * - drawAiMetroLine - A function that handles the process of determining the start and end points and returning them.
 * - DrawAiMetroLineInput - The input type for the drawAiMetroLine function.
 * - DrawAiMetroLineOutput - The return type for the drawAiMetroLine function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DrawAiMetroLineInputSchema = z.object({
  availableTags: z.array(z.string()).describe('An array of available tags in the metro map.'),
  availableCategories: z.array(z.string()).describe('An array of available categories in the metro map.'),
});
export type DrawAiMetroLineInput = z.infer<typeof DrawAiMetroLineInputSchema>;

const DrawAiMetroLineOutputSchema = z.object({
  start: z.string().describe('The starting tag or category for the metro line.'),
  end: z.string().describe('The ending tag or category for the metro line.'),
});
export type DrawAiMetroLineOutput = z.infer<typeof DrawAiMetroLineOutputSchema>;

export async function drawAiMetroLine(input: DrawAiMetroLineInput): Promise<DrawAiMetroLineOutput> {
  return drawAiMetroLineFlow(input);
}

const prompt = ai.definePrompt({
  name: 'drawAiMetroLinePrompt',
  input: {schema: DrawAiMetroLineInputSchema},
  output: {schema: DrawAiMetroLineOutputSchema},
  prompt: `You are an AI assistant designed to guide users through a metro-style map of blog content related to digital health equity.

  Given the following available tags: {{availableTags}}
  And the following available categories: {{availableCategories}}

  Determine a starting tag or category and an ending tag or category that might be of interest to the user, drawing a "line" between them.
  The start and end points should be different and relevant to digital health equity. Try to find the category/tag that is least visited by the user.
  Return the start and end points.
  `, // eslint-disable-line indent
});

const drawAiMetroLineFlow = ai.defineFlow(
  {
    name: 'drawAiMetroLineFlow',
    inputSchema: DrawAiMetroLineInputSchema,
    outputSchema: DrawAiMetroLineOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
