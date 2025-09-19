import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ArticleTypeBadge } from "@/components/ui/article-type-badge";
import { AiSummary } from "@/components/AiSummary";
import { EquityGapSpotter } from "@/components/EquityGapSpotter";
import { PostConnectionMapper } from "@/components/PostConnectionMapper";
import ConsultingTransformationViz from "@/components/charts/blogArticle4-charts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const allPosts = getAllPosts();

  if (!post) {
    notFound();
  }

  // Split content around ConsultingTransformationViz component
  const contentParts = post.content.split('<ConsultingTransformationViz />');

  return (
    <article className="max-w-4xl mx-auto py-8">
      <header className="mb-8 text-center">
        <div className="mb-4 flex justify-center gap-2 flex-wrap">
          <ArticleTypeBadge articleType={post.articleType} />
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

        {contentParts.map((part, index) => (
          <div key={index}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ node, ...props }) => {
                  const alt = props.alt || "";
                  const src = props.src || "";

                  // Only specific academic papers/documents should keep larger size
                  const keepLargerSize =
                    (alt.toLowerCase().includes("publication") && alt.toLowerCase().includes("academic")) ||
                    (alt.toLowerCase().includes("paper") && alt.toLowerCase().includes("documenting")) ||
                    src.includes("hcq-publication") ||
                    src.includes("science-medical-reasoning") ||
                    src.includes("ledley-ct-scanner");

                  // Default to medium size for most images, smaller for general illustrations
                  const sizeClasses = keepLargerSize
                    ? "max-w-3xl max-h-[500px] object-contain"
                    : "max-w-xl max-h-80 object-contain";

                  return (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      {...props}
                      className={`rounded-lg shadow-md my-8 mx-auto border border-border/30 bg-card/30 p-2 ${sizeClasses}`}
                      alt={alt}
                    />
                  );
                },
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
              {part}
            </ReactMarkdown>
            {index < contentParts.length - 1 && (
              <div className="my-8">
                <ConsultingTransformationViz />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 space-y-8">
        <AiSummary blogPostContent={post.content} />
        <EquityGapSpotter blogTitle={post.title} blogContent={post.content} />
        <PostConnectionMapper currentPost={post} allPosts={allPosts} />
      </div>
    </article>
  );
}