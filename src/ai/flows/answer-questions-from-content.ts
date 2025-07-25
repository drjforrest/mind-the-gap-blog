'use server';

/**
 * @fileOverview A question answering AI agent for blog post content.
 *
 * - answerQuestionsFromContent - A function that answers questions based on blog content.
 * - AnswerQuestionsFromContentInput - The input type for the answerQuestionsFromContent function.
 * - AnswerQuestionsFromContentOutput - The return type for the answerQuestionsFromContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerQuestionsFromContentInputSchema = z.object({
  blogContent: z.string().describe('The content of the blog post.'),
  question: z.string().describe('The question to be answered.'),
});
export type AnswerQuestionsFromContentInput = z.infer<typeof AnswerQuestionsFromContentInputSchema>;

const AnswerQuestionsFromContentOutputSchema = z.object({
  answer: z.string().describe('The answer to the question based on the blog content.'),
});
export type AnswerQuestionsFromContentOutput = z.infer<typeof AnswerQuestionsFromContentOutputSchema>;

export async function answerQuestionsFromContent(input: AnswerQuestionsFromContentInput): Promise<AnswerQuestionsFromContentOutput> {
  return answerQuestionsFromContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerQuestionsFromContentPrompt',
  input: {schema: AnswerQuestionsFromContentInputSchema},
  output: {schema: AnswerQuestionsFromContentOutputSchema},
  prompt: `You are an AI assistant that answers questions based on the provided blog post content.

Blog Post Content: {{{blogContent}}}

Question: {{{question}}}

Answer:`,
});

const answerQuestionsFromContentFlow = ai.defineFlow(
  {
    name: 'answerQuestionsFromContentFlow',
    inputSchema: AnswerQuestionsFromContentInputSchema,
    outputSchema: AnswerQuestionsFromContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
