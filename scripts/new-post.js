#!/usr/bin/env node

/**
 * Script to create a new blog post
 * Usage: npm run new-post "Post Title" "Category" "tag1,tag2,tag3"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function createPost(title, category, tags, excerpt = '') {
  const slug = slugify(title);
  const date = formatDate(new Date());
  const tagsArray = tags.split(',').map(tag => tag.trim());
  
  const frontmatter = `---
title: "${title}"
date: "${date}"
category: "${category}"
tags: [${tagsArray.map(tag => `"${tag}"`).join(', ')}]
excerpt: "${excerpt || `Brief description of ${title}`}"
---

# ${title}

Write your blog post content here using MDX syntax.

## Introduction

Start with an engaging introduction that hooks your readers.

## Main Content

Develop your main arguments or points here.

### Subsection

You can use subsections to organize your content.

## Key Points

- Use bullet points to highlight important information
- MDX supports all standard Markdown syntax
- You can also include React components if needed

## Conclusion

Wrap up your post with a compelling conclusion.

---

*This post was created on ${date} and is part of the "${category}" category.*
`;

  const postsDir = path.join(__dirname, '../content/posts');
  const filePath = path.join(postsDir, `${slug}.mdx`);
  
  // Check if file already exists
  if (fs.existsSync(filePath)) {
    console.error(`❌ Error: Post with slug "${slug}" already exists!`);
    process.exit(1);
  }
  
  // Create the file
  fs.writeFileSync(filePath, frontmatter);
  
  console.log(`✅ Created new blog post: ${filePath}`);
  console.log(`📝 Slug: ${slug}`);
  console.log(`🏷️  Category: ${category}`);
  console.log(`🏷️  Tags: ${tagsArray.join(', ')}`);
  console.log(`📅 Date: ${date}`);
  console.log('');
  console.log('💡 Next steps:');
  console.log('1. Edit the content in the generated MDX file');
  console.log('2. Add a meaningful excerpt in the frontmatter');
  console.log('3. Review and update the metro map if needed');
  console.log('4. Test your changes with npm run dev');
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length < 2) {
  console.log('Usage: node scripts/new-post.js "Post Title" "Category" "tag1,tag2,tag3" "Optional excerpt"');
  console.log('');
  console.log('Example:');
  console.log('  node scripts/new-post.js "AI in Remote Patient Monitoring" "Technology" "AI,Remote Care,IoT" "Exploring how AI transforms remote patient monitoring systems"');
  process.exit(1);
}

const [title, category, tags, excerpt] = args;
createPost(title, category, tags, excerpt || '');