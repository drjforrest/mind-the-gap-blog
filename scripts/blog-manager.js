#!/usr/bin/env node

/**
 * Blog Management Script
 * Provides utilities for managing blog content and metro map updates
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsDir = path.join(__dirname, '../content/posts');

function getAllPosts() {
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx'));
  return files.map(file => {
    const content = fs.readFileSync(path.join(postsDir, file), 'utf8');
    const frontmatterMatch = content.match(/^---\\n([\\s\\S]*?)\\n---/);
    if (!frontmatterMatch) return null;
    
    const frontmatter = {};
    const frontmatterLines = frontmatterMatch[1].split('\\n');
    frontmatterLines.forEach(line => {
      const match = line.match(/^(\\w+):\\s*(.+)$/);
      if (match) {
        const [, key, value] = match;
        if (key === 'tags') {
          frontmatter[key] = JSON.parse(value.replace(/'/g, '\"'));
        } else {
          frontmatter[key] = value.replace(/^[\"']|[\"']$/g, '');
        }
      }
    });
    
    return {
      slug: file.replace('.mdx', ''),
      ...frontmatter
    };
  }).filter(Boolean);
}

function listPosts() {
  console.log('📚 Current Blog Posts:\\n');
  const posts = getAllPosts();
  
  if (posts.length === 0) {
    console.log('No posts found.');
    return;
  }
  
  posts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .forEach(post => {
      console.log(`📝 ${post.title}`);
      console.log(`   Slug: ${post.slug}`);
      console.log(`   Date: ${post.date}`);
      console.log(`   Category: ${post.category}`);
      console.log(`   Tags: ${post.tags?.join(', ') || 'None'}`);
      console.log('');
    });
}

function showStats() {
  const posts = getAllPosts();
  console.log('📊 Blog Statistics:\\n');
  
  // Category breakdown
  const categories = {};
  const tags = {};
  
  posts.forEach(post => {
    categories[post.category] = (categories[post.category] || 0) + 1;
    post.tags?.forEach(tag => {
      tags[tag] = (tags[tag] || 0) + 1;
    });
  });
  
  console.log(`Total Posts: ${posts.length}`);
  console.log('\\n📂 Categories:');
  Object.entries(categories)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      console.log(`   ${cat}: ${count} post${count > 1 ? 's' : ''}`);
    });
  
  console.log('\\n🏷️  Tags:');
  Object.entries(tags)
    .sort((a, b) => b[1] - a[1])
    .forEach(([tag, count]) => {
      console.log(`   ${tag}: ${count} post${count > 1 ? 's' : ''}`);
    });
    
  console.log('\\n🚇 Metro Map Impact:');
  console.log(`   Station types needed: ${Object.keys(categories).length} categories + ${Object.keys(tags).length} tags`);
  console.log(`   Total stations: ${Object.keys(categories).length + Object.keys(tags).length}`);
}

function validatePosts() {
  const posts = getAllPosts();
  let hasErrors = false;
  
  console.log('🔍 Validating Blog Posts...\\n');
  
  posts.forEach(post => {
    const errors = [];
    
    if (!post.title) errors.push('Missing title');
    if (!post.date) errors.push('Missing date');
    if (!post.category) errors.push('Missing category');
    if (!post.excerpt) errors.push('Missing excerpt');
    if (!post.tags || post.tags.length === 0) errors.push('Missing tags');
    
    // Date format validation
    if (post.date && !post.date.match(/^\\d{4}-\\d{2}-\\d{2}$/)) {
      errors.push('Invalid date format (should be YYYY-MM-DD)');
    }
    
    if (errors.length > 0) {
      hasErrors = true;
      console.log(`❌ ${post.slug}:`);
      errors.forEach(error => console.log(`   • ${error}`));
      console.log('');
    }
  });
  
  if (!hasErrors) {
    console.log('✅ All posts are valid!');
  }
  
  return !hasErrors;
}

// Command line interface
const command = process.argv[2];

switch (command) {
  case 'list':
    listPosts();
    break;
  case 'stats':
    showStats();
    break;
  case 'validate':
    const isValid = validatePosts();
    process.exit(isValid ? 0 : 1);
    break;
  default:
    console.log('Blog Manager - Content Management Utilities\\n');
    console.log('Usage: node scripts/blog-manager.js <command>\\n');
    console.log('Available commands:');
    console.log('  list      - List all blog posts');
    console.log('  stats     - Show blog statistics');
    console.log('  validate  - Validate all posts for required fields');
    console.log('\\nExamples:');
    console.log('  npm run blog -- list');
    console.log('  npm run blog -- stats');
    console.log('  npm run blog -- validate');
}