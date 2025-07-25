"use client";

import { useState, useEffect } from 'react';
import { summarizeBlogPost } from '@/ai/flows/summarize-blog-post';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Bot } from 'lucide-react';

interface AiSummaryProps {
  blogPostContent: string;
}

export function AiSummary({ blogPostContent }: AiSummaryProps) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getSummary() {
      try {
        setLoading(true);
        setError('');
        const result = await summarizeBlogPost({ blogPostContent });
        setSummary(result.summary);
      } catch (e) {
        console.error(e);
        setError('Could not generate summary. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    getSummary();
  }, [blogPostContent]);

  return (
    <Card className="bg-secondary/30 border-secondary">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-secondary" />
          <CardTitle className="text-secondary">AI Gap Analysis</CardTitle>
        </div>
        <CardDescription>
          An AI-generated summary highlighting the key digital health equity issues in this post.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        )}
        {error && <p className="text-destructive">{error}</p>}
        {!loading && !error && <p className="text-secondary-foreground/80">{summary}</p>}
      </CardContent>
    </Card>
  );
}
