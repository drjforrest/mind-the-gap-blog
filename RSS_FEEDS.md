# RSS and JSON Feeds

The Mind the Gap blog now includes RSS and JSON feeds for easy subscription and content syndication.

## Available Feeds

### RSS Feed (XML)
- **URL**: `/feed.xml`
- **Format**: RSS 2.0 with Atom extensions
- **Content Type**: `application/xml`
- **Features**:
  - Full post metadata (title, description, author, publication date)
  - Post categories and tags
  - Proper XML escaping
  - Markdown stripped from descriptions
  - Optimized caching headers

### JSON Feed
- **URL**: `/feed.json`
- **Format**: JSON Feed 1.1 specification
- **Content Type**: `application/feed+json`
- **Features**:
  - Modern JSON format
  - Both HTML (markdown) and plain text content
  - Structured metadata
  - Author information
  - Custom fields for article type and category

### Sitemap
- **URL**: `/sitemap.xml`
- **Format**: XML Sitemap
- **Purpose**: SEO optimization
- **Includes**: All posts, static pages with proper priorities and update frequencies

## Feed Discovery

The feeds are automatically discoverable through:

1. **HTML Meta Tags**: Added to `<head>` for automatic detection by feed readers
2. **Footer Links**: Visible RSS and JSON feed links for manual subscription
3. **Proper Content Types**: Correct MIME types for feed readers

## Features

- **Caching**: 24-hour cache with stale-while-revalidate
- **Content Processing**: 
  - Markdown stripped from descriptions for RSS compatibility
  - Full markdown preserved in JSON feed for flexible rendering
  - XML character escaping for RSS safety
- **Rich Metadata**:
  - Post categories and tags
  - Article types (Contemporary Viewpoint, History in Context, etc.)
  - Author information
  - Publication dates
  - Unique GUIDs for each post

## Usage

### For Feed Readers
Simply add one of these URLs to your feed reader:
- `https://blog.drjforrest.com/feed.xml` (RSS)
- `https://blog.drjforrest.com/feed.json` (JSON)

### For Developers
Both feeds are programmatically accessible with proper caching headers and structured data.

The JSON feed includes additional metadata in custom fields:
- `_article_type`: The article classification
- `_category`: Post category
- `content_html`: Raw markdown content
- `content_text`: Plain text version

### For SEO
The sitemap is automatically available at:
- `https://blog.drjforrest.com/sitemap.xml`

This helps search engines discover and index all blog content efficiently.