# Complete Deployment and Rebranding Guide

## Overview

This guide will help you deploy your Notion blog and completely rebrand it as your own project, removing all traces of the original author and making it uniquely yours.

## Step 1: Rebrand the Project

### 1.1 Update package.json

```bash
# Edit package.json to change:
```

```json
{
  "name": "your-blog-name",
  "version": "1.0.0",
  "description": "Your personal blog powered by Notion",
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/your-blog-name.git"
  },
  "homepage": "https://your-blog-name.vercel.app"
}
```

### 1.2 Update Site Metadata

Edit `src/pages/_app.tsx` and update all meta tags:

```typescript
// Find and replace these values:
export const BLOG_NAME = 'Your Blog Name'
export const BLOG_DESCRIPTION = 'Your blog description'
export const AUTHOR_NAME = 'Your Name'
export const TWITTER_HANDLE = '@yourtwitterhandle'
export const DOMAIN = 'yourdomain.com'
```

### 1.3 Update Header Component

Edit `src/components/header.tsx`:

```typescript
// Replace the blog title and navigation
<h1>Your Blog Name</h1>
<nav>
  <Link href="/">Home</Link>
  <Link href="/blog">Blog</Link>
  <Link href="/about">About</Link>
  <Link href="/contact">Contact</Link>
</nav>
```

### 1.4 Update Footer Component

Edit the footer in your layout files to remove original author references:

```typescript
// Replace with your own footer
<footer>
  <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
  <p>
    Powered by <a href="https://notion.so">Notion</a> and{' '}
    <a href="https://nextjs.org">Next.js</a>
  </p>
</footer>
```

### 1.5 Update README.md

Create a new README.md:

```markdown
# Your Blog Name

A modern blog built with Next.js and Notion as CMS.

## Features

- 📝 Content managed through Notion
- ⚡ Fast static site generation with Next.js
- 🎨 Clean, responsive design
- 🚀 Deployed on Vercel

## Tech Stack

- Next.js 11.1.2
- React 17
- Notion API
- Vercel for deployment

## Getting Started

1. Clone this repository
2. Install dependencies: `npm install`
3. Set up your Notion integration and database
4. Configure environment variables
5. Run development server: `npm run dev`

## Environment Variables

Create a `.env` file with:
```

NOTION_TOKEN=your_notion_token
BLOG_INDEX_ID=your_database_id
NODE_OPTIONS=--openssl-legacy-provider

```

## Deployment

This blog is deployed on Vercel. Any push to the main branch automatically triggers a new deployment.

---

Made with ❤️ by [Your Name](https://yourdomain.com)
```

### 1.6 Remove Original Repository Links

Search and replace ALL instances of:

- `ijjk/notion-blog` → `yourusername/your-blog-name`
- `notion-blog.now.sh` → `your-domain.com`
- `@_ijjk` → `@yourtwitterhandle`

## Step 2: Set Up Your Own Repository

### 2.1 Create New GitHub Repository

1. Go to GitHub and create a new repository: `your-blog-name`
2. Make it public or private (your choice)
3. Don't initialize with README (we have our own)

### 2.2 Remove Original Git History and Add Yours

```bash
# Remove existing git history
rm -rf .git

# Initialize new git repository
git init

# Add all files
git add .

# Make first commit with your name
git commit -m "Initial commit: Personal blog setup

- Integrated with Notion CMS
- Next.js static site generation
- Custom branding and content
- Ready for Vercel deployment"

# Add your remote repository
git remote add origin https://github.com/yourusername/your-blog-name.git

# Push to your repository
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### 3.1 Connect to Vercel

1. Go to [Vercel.com](https://vercel.com)
2. Sign up/login with your GitHub account
3. Click "New Project"
4. Import your GitHub repository: `yourusername/your-blog-name`

### 3.2 Configure Environment Variables

In Vercel dashboard, add these environment variables:

```
NOTION_TOKEN=ntn_your_integration_token_here
BLOG_INDEX_ID=your_32_character_database_id_here
NODE_OPTIONS=--openssl-legacy-provider
```

### 3.3 Deploy Settings

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 3.4 Custom Domain (Optional)

1. Buy a domain from any provider (Namecheap, GoDaddy, etc.)
2. In Vercel, go to your project settings
3. Add your custom domain
4. Update DNS records as instructed by Vercel

## Step 4: Customize Design and Content

### 4.1 Update Styling

Edit CSS files in `src/styles/` to match your brand:

- Colors
- Fonts
- Layout
- Logo/favicon

### 4.2 Add Your Content Pages

Create additional pages:

- `/pages/about.tsx` - Your about page
- `/pages/contact.tsx` - Contact information
- `/pages/projects.tsx` - Your projects (optional)

### 4.3 Update Favicon and Images

Replace:

- `/public/favicon.ico` with your favicon
- `/public/og-image.png` with your social media image
- Any other branding images

## Step 5: SEO and Analytics

### 5.1 Add Google Analytics (Optional)

```typescript
// Add to _app.tsx
import { GoogleAnalytics } from 'nextjs-google-analytics'

export default function App({ Component, pageProps }) {
  return (
    <>
      <GoogleAnalytics trackPageViews />
      <Component {...pageProps} />
    </>
  )
}
```

### 5.2 Update Meta Tags

Ensure all pages have proper meta tags:

```typescript
<Head>
  <title>Your Page Title</title>
  <meta name="description" content="Your page description" />
  <meta property="og:title" content="Your Page Title" />
  <meta property="og:description" content="Your page description" />
  <meta property="og:image" content="https://yourdomain.com/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
</Head>
```

## Step 6: Maintenance and Updates

### 6.1 Content Updates

- All content is managed through your Notion database
- Changes in Notion automatically appear on your blog
- No code changes needed for new posts

### 6.2 Code Updates

```bash
# To update your blog with new features:
git add .
git commit -m "Description of changes"
git push origin main
# Vercel will auto-deploy
```

### 6.3 Backup Strategy

- Your Notion database serves as the content backup
- Your code is backed up on GitHub
- Vercel maintains deployment history

## Step 7: Final Checklist

Before going live, ensure:

- [ ] All original author references removed
- [ ] Your branding applied throughout
- [ ] Environment variables set in Vercel
- [ ] Custom domain configured (if using)
- [ ] Notion database properly configured
- [ ] All pages load correctly
- [ ] Mobile responsiveness tested
- [ ] SEO meta tags updated
- [ ] Analytics configured (if desired)
- [ ] Contact information updated

## Troubleshooting

### Common Deployment Issues

1. **Build Fails**: Check environment variables are set correctly
2. **Content Not Loading**: Verify Notion integration is shared with database
3. **Styling Issues**: Clear browser cache and check CSS imports
4. **404 Errors**: Ensure all page routes are properly configured

### Environment Variables

Make sure these are set in Vercel:

```
NOTION_TOKEN=ntn_your_token_here
BLOG_INDEX_ID=your_database_id_here
NODE_OPTIONS=--openssl-legacy-provider
```

## Support

If you encounter issues:

1. Check the build logs in Vercel dashboard
2. Verify your Notion integration has proper permissions
3. Test locally first: `npm run dev`
4. Check that all environment variables are correctly set

---

## Final Result

After following this guide, you'll have:

- ✅ A completely rebranded blog with no traces of original author
- ✅ Your own GitHub repository
- ✅ Live deployment on Vercel with your domain
- ✅ Content managed through your Notion database
- ✅ Professional, maintainable blog platform

Your blog will be 100% yours, with your branding, your repository, and your domain!
