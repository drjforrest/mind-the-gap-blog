'use server';

/**
 * @fileOverview A question answering AI function for blog post content.
 *
 * - answerQuestionsFromContent - A function that answers questions based on blog content.
 * - AnswerQuestionsFromContentInput - The input type for the answerQuestionsFromContent function.
 * - AnswerQuestionsFromContentOutput - The return type for the answerQuestionsFromContent function.
 */

import { callDeepSeekWithStructuredOutput } from '@/ai/deepseek';
import { z } from 'zod';

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
  const prompt = `You are an AI assistant that answers questions based on the provided blog post content.

Blog Post Content: ${input.blogContent}

Question: ${input.question}

Please provide a helpful answer based on the blog content. If the question cannot be answered from the provided content, say so clearly.

Return your response as JSON with an "answer" field containing your response.`;

  return await callDeepSeekWithStructuredOutput(
    prompt,
    AnswerQuestionsFromContentOutputSchema,
    (content: string) => {
      const parsed = JSON.parse(content);
      return AnswerQuestionsFromContentOutputSchema.parse(parsed);
    }
  );
}
