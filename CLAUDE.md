# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

- **Start development server**: `npm run dev` (runs on port 9002 with Turbopack)
- **Build project**: `npm run build`
- **Start production server**: `npm start`
- **Lint code**: `npm run lint`
- **Type check**: `npm run typecheck`
- **Start Genkit dev server**: `npm run genkit:dev`
- **Start Genkit with watch mode**: `npm run genkit:watch`

## Project Architecture

### Core Structure
This is a Next.js 15 blog application focused on digital health equity topics. The project follows a standard Next.js App Router structure with TypeScript and uses Firebase Genkit for AI functionality.

### Key Components & Architecture

**AI Integration (`src/ai/`)**
- Uses Firebase Genkit with Google AI (Gemini 2.0 Flash model)
- Main configuration in `src/ai/genkit.ts`
- AI flows in `src/ai/flows/`:
  - `summarize-blog-post.ts` - Generates summaries highlighting digital health equity issues
  - `draw-ai-metro-line.ts` - Creates AI-suggested connections between content topics
  - `answer-questions-from-content.ts` - Provides Q&A functionality

**Content Management (`src/lib/posts.ts`)**
- Blog posts are hardcoded as an array of Post objects (no external CMS)
- Each post has: slug, title, date, category, tags, excerpt, content
- Utility functions: getAllPosts(), getPostBySlug(), getAllTags(), getAllCategories()

**Interactive Metro Map (`src/components/MetroMap.tsx`)**
- Main visual feature displaying content as an interactive subway map
- Categories appear as stations, tags as stops along lines
- Uses SVG rendering with dynamic line generation
- Integrates AI-suggested routes between topics via `drawAiMetroLine` flow

**UI Framework**
- Built with Radix UI components and Tailwind CSS
- Extensive component library in `src/components/ui/`
- Uses shadcn/ui pattern for component structure

### Important Notes

**Path Aliases**
- `@/*` maps to `./src/*` (configured in tsconfig.json)

**Environment Variables**
- Requires `GEMINI_API_KEY` for AI functionality

**Build Configuration**
- TypeScript and ESLint errors are ignored during builds (see next.config.ts)
- Allows placeholder images from placehold.co
- Uses Turbopack in development for faster builds

**Data Flow**
- Blog content is static (no database)
- AI features are server-side using Genkit flows
- Client-side components fetch AI data via API calls to flows