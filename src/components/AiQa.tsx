"use client";

import { useState } from 'react';
import { answerQuestionsFromContent } from '@/ai/flows/answer-questions-from-content';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Bot, Sparkles, Send } from 'lucide-react';

interface AiQaProps {
  blogContent: string;
}

export function AiQa({ blogContent }: AiQaProps) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [asked, setAsked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setAsked(true);
    setError('');
    setAnswer('');

    try {
      const result = await answerQuestionsFromContent({ blogContent, question });
      setAnswer(result.answer);
    } catch (e) {
      console.error(e);
      setError('Could not get an answer. The AI may be sleeping on the job.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <CardTitle>Ask the AI</CardTitle>
        </div>
        <CardDescription>
          Have a question about this article? Ask our AI assistant.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4">
          <Input 
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g., What is the main issue discussed?"
            disabled={loading}
          />
          <Button type="submit" disabled={loading || !question.trim()}>
            {loading ? 'Asking...' : <><Send className="mr-2 h-4 w-4" /> Ask</>}
          </Button>
        </form>

        {asked && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            {loading && (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            )}
            {error && <p className="text-destructive">{error}</p>}
            {answer && (
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-primary font-bold">
                  <Bot className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <p>{answer}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
