# Mind the Gap Article Types

The blog now supports a comprehensive article type taxonomy to help categorize and organize content around digital health equity themes.

## Article Types

### 📰 Contemporary Viewpoint
**Purpose**: Analysis of current events and trends related to digital health & equity
**Description**: Based on articles you read, these provide analysis related to digital health & equity topics. These pieces respond to current events, policy changes, or emerging trends in the field.
**Example**: "How AI Is Reshaping Consulting—and Why Health Equity Is at Risk"

### 📚 History in Context  
**Purpose**: Narrative pieces exploring historical events, moments or people who shaped digital health & equity
**Description**: Often in short mini-series format, these pieces tell the stories of events, moments, or people who shape how we think about digital health & equity today.
**Examples**: 
- "The Unlikely Heroes Who Computerized Medicine: The Ledley & Lusted Revolution"
- "The Farm Boy Who Decoded How Ideas Spread: Everett Rogers and the Diffusion of Innovations"

### 🔬 Field Notes
**Purpose**: Pieces based on direct research experience and field work
**Description**: For pieces based on your direct research experience, observations from fieldwork, or insights gained from hands-on involvement in digital health initiatives.

### 🤝 Partnership Perspectives
**Purpose**: Analysis of North-South collaboration dynamics in digital health
**Description**: Analyzing North-South collaboration dynamics, examining how partnerships between developed and developing nations impact digital health equity outcomes.

### 🚀 Digital Health Futures
**Purpose**: Forward-looking pieces about emerging technologies and their equity implications
**Description**: Forward-looking pieces about emerging technologies, future trends, and their potential impact on health equity. These explore what's coming next and how we can prepare.
**Example**: "Artificial Intelligence: Both Contagion and Cure"

## Implementation

### Adding Article Type to Posts
Add the `articleType` field to your blog post front matter:

```yaml
---
title: "Your Post Title"
date: "2025-09-16"
category: "Your Category"
tags: ["tag1", "tag2"]
excerpt: "Your excerpt"
articleType: "Contemporary Viewpoint"
---
```

### Visual Design
- Each article type has a unique color scheme and icon
- Article type badges appear prominently on post cards and individual post pages
- Colors are derived from the blog's design system using CSS custom properties

### Filtering and Navigation
- Article types can be filtered on the archive page
- Homepage includes article type exploration section
- URL parameters support direct linking to filtered views
- Search functionality works across all article types

## Benefits

1. **Better Content Organization**: Readers can easily find the type of content they're looking for
2. **Clear Editorial Direction**: Writers have clear frameworks for different types of content
3. **Enhanced Discovery**: Multiple pathways for readers to explore related content
4. **Professional Presentation**: Adds academic/professional credibility to the blog

## Usage Guidelines

- Choose the article type that best fits your content's primary purpose
- Contemporary Viewpoint should respond to recent events or publications
- History in Context should focus on past events that inform current understanding
- Field Notes should be grounded in direct experience or research
- Partnership Perspectives should analyze collaborative dynamics
- Digital Health Futures should look ahead to emerging trends and technologies