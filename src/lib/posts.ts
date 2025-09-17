import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ArticleType } from './articleTypes';

export interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: string;
  articleType: ArticleType;
}

interface PostFrontmatter {
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  articleType: ArticleType;
}

const postsDirectory = path.join(process.cwd(), 'content/posts');

function getAllMarkdownPosts(): Post[] {
  // Get all .md and .mdx files from the posts directory
  const fileNames = fs.readdirSync(postsDirectory).filter(name => name.endsWith('.md') || name.endsWith('.mdx'));
  
  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.(mdx?|md)$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const frontmatter = data as PostFrontmatter;
    
    return {
      slug,
      ...frontmatter,
      content,
    };
  });
  
  return posts;
}

// Cache posts in development/production
let cachedPosts: Post[] | null = null;

function getAllPostsFromMarkdown(): Post[] {
  if (cachedPosts && process.env.NODE_ENV === 'production') {
    return cachedPosts;
  }
  
  try {
    const posts = getAllMarkdownPosts();
    cachedPosts = posts;
    return posts;
  } catch (error) {
    console.error('Error reading markdown posts:', error);
    // Fallback to empty array if directory doesn't exist or other error
    return [];
  }
}

export function getAllPosts() {
  const posts = getAllPostsFromMarkdown();
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string) {
  const posts = getAllPostsFromMarkdown();
  return posts.find((post) => post.slug === slug);
}

export function getAllTags() {
  const posts = getAllPostsFromMarkdown();
  const allTags = posts.flatMap((post) => post.tags);
  return [...new Set(allTags)];
}

export function getAllCategories() {
  const posts = getAllPostsFromMarkdown();
  const allCategories = posts.map((post) => post.category);
  return [...new Set(allCategories)];
}

export function getAllArticleTypes() {
  const posts = getAllPostsFromMarkdown();
  const allArticleTypes = posts.map((post) => post.articleType);
  return [...new Set(allArticleTypes)];
}

export function getPostsByArticleType(articleType: ArticleType) {
  const posts = getAllPostsFromMarkdown();
  return posts.filter((post) => post.articleType === articleType);
}
