import { getAllPosts } from '@/lib/posts';
import { NextResponse } from 'next/server';

const SITE_URL = 'https://blog.drjforrest.com';

export async function GET() {
  const posts = getAllPosts();
  
  const staticPages = [
    {
      url: SITE_URL,
      lastModified: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 1.0
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.8
    },
    {
      url: `${SITE_URL}/archive`,
      lastModified: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 0.9
    }
  ];

  const postPages = posts.map((post) => ({
    url: `${SITE_URL}/posts/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFreq: 'monthly',
    priority: 0.7
  }));

  const allPages = [...staticPages, ...postPages];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map((page) => 
  `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
).join('\n')}
</urlset>`;

  return new NextResponse(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  });
}