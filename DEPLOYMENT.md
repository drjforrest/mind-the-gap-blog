# Deployment Guide

This guide covers deploying the Mind the Gap blog to Vercel.

## Prerequisites

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

## Environment Variables

Before deploying, make sure to set up your environment variables in Vercel:

1. Add your Gemini API key:
   ```bash
   vercel env add GEMINI_API_KEY
   ```
   When prompted, enter your Google AI (Gemini) API key.

## Deployment Commands

### First-time deployment:
```bash
vercel
```
This will walk you through the initial setup and create a preview deployment.

### Deploy to production:
```bash
npm run deploy
```
or
```bash
vercel --prod
```

### Deploy preview (for testing):
```bash
npm run deploy:preview
```
or
```bash
vercel
```

## Configuration Files

The following files configure the Vercel deployment:

- `vercel.json` - Main Vercel configuration
- `.vercelignore` - Files to exclude from deployment
- `package.json` - Build scripts and dependencies

## Post-Deployment

After deployment:

1. Verify the AI functionality works with your API key
2. Test the blog posts render correctly
3. Check that images load properly
4. Verify rate limiting is working for AI features

## Troubleshooting

- If AI features don't work, check that `GEMINI_API_KEY` is set in Vercel dashboard
- If builds fail, check the build logs in Vercel dashboard
- For function timeout issues, adjust `maxDuration` in `vercel.json`

## Cost Management

The current configuration uses:
- Gemini 1.5 Flash (cheapest Google AI model)
- 3 requests per hour rate limiting per user
- 30-second function timeout limit

Monitor your usage in the Google AI Studio dashboard to avoid surprise bills.