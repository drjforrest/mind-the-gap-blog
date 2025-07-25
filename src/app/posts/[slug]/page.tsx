import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { AiSummary } from '@/components/AiSummary';
import { AiQa } from '@/components/AiQa';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto py-8">
      <header className="mb-8 text-center">
        <div className="mb-4">
          <Badge variant="secondary">{post.category}</Badge>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">{post.title}</h1>
        <p className="text-muted-foreground">
          {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <div className="mt-4 flex justify-center flex-wrap gap-2">
          {post.tags.map(tag => (
            <Badge key={tag} variant="outline">{tag}</Badge>
          ))}
        </div>
      </header>

      <div className="prose dark:prose-invert max-w-none space-y-6 text-lg">
        <p className="lead text-xl text-muted-foreground">{post.excerpt}</p>
        
        {/* Render markdown content. A more robust solution would use a markdown parser. */}
        {post.content.split('\\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-12 space-y-12">
        <AiSummary blogPostContent={post.content} />
        <AiQa blogContent={post.content} />
      </div>

    </article>
  );
}
