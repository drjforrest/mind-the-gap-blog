import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { AiSummary } from "@/components/AiSummary";
import { EquityGapSpotter } from "@/components/EquityGapSpotter";
import { PostConnectionMapper } from "@/components/PostConnectionMapper";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
  const allPosts = getAllPosts();

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto py-8">
      <header className="mb-8 text-center">
        <div className="mb-4">
          <Badge variant="secondary">{post.category}</Badge>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
          {post.title}
        </h1>
        <p className="text-muted-foreground">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <div className="mt-4 flex justify-center flex-wrap gap-2">
          {post.tags &&
            post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
        </div>
      </header>

      <div className="prose dark:prose-invert max-w-none text-lg">
        <p className="lead text-xl text-muted-foreground mb-8">
          {post.excerpt}
        </p>

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            img: ({ node, ...props }) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                {...props}
                className="rounded-lg shadow-md my-8 mx-auto"
                alt={props.alt || ""}
              />
            ),
            h1: ({ node, ...props }) => (
              <h1 {...props} className="text-3xl font-bold mt-8 mb-4" />
            ),
            h2: ({ node, ...props }) => (
              <h2 {...props} className="text-2xl font-bold mt-6 mb-3" />
            ),
            h3: ({ node, ...props }) => (
              <h3 {...props} className="text-xl font-bold mt-6 mb-3" />
            ),
            p: ({ node, ...props }) => (
              <p {...props} className="mb-4 leading-relaxed" />
            ),
            ul: ({ node, ...props }) => (
              <ul {...props} className="list-disc pl-6 mb-4 space-y-2" />
            ),
            ol: ({ node, ...props }) => (
              <ol {...props} className="list-decimal pl-6 mb-4 space-y-2" />
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote
                {...props}
                className="border-l-4 border-primary/30 pl-4 italic my-6 text-muted-foreground"
              />
            ),
            em: ({ node, ...props }) => (
              <em
                {...props}
                className="italic text-muted-foreground text-sm block text-center my-2"
              />
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      <div className="mt-12 space-y-8">
        <AiSummary blogPostContent={post.content} />
        <EquityGapSpotter 
          blogTitle={post.title}
          blogContent={post.content} 
        />
        <PostConnectionMapper 
          currentPost={post}
          allPosts={allPosts}
        />
      </div>
    </article>
  );
}
