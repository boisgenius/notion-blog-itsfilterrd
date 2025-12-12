# Blog Styling Customization Guide

## Overview

This guide helps you customize the visual design and styling of your Notion-powered blog. Use this after completing the basic setup from the NOTION_BLOG_REBUILD_GUIDE.md.

## Style Architecture

Your blog uses the following styling system:

- **CSS Modules** for component-specific styles
- **Global CSS** for site-wide styles
- **CSS-in-JS** for dynamic styling
- **Tailwind CSS** (if enabled) for utility classes

## Key Style Files

### Global Styles

```
src/styles/
├── global.css          # Site-wide base styles
├── notion.css          # Notion content rendering styles
├── prism.css          # Code syntax highlighting
└── variables.css      # CSS custom properties
```

### Component Styles

```
src/components/
├── header.module.css  # Navigation header
├── footer.module.css  # Site footer
├── post.module.css    # Blog post layout
└── blog.module.css    # Blog listing page
```

## Common Customizations

### 1. Color Scheme

**Edit `src/styles/variables.css`:**

```css
:root {
  /* Primary colors */
  --primary-color: #your-brand-color;
  --secondary-color: #your-accent-color;

  /* Text colors */
  --text-primary: #333333;
  --text-secondary: #666666;
  --text-light: #999999;

  /* Background colors */
  --background-primary: #ffffff;
  --background-secondary: #f8f9fa;
  --background-accent: #f1f3f4;

  /* Border colors */
  --border-light: #e1e4e8;
  --border-medium: #d0d7de;
}
```

### 2. Typography

**Edit `src/styles/global.css`:**

```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font:wght@400;500;600;700&display=swap');

body {
  font-family: 'Your Font', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-primary);
}

/* Headings */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

h1 {
  font-size: 2.5rem;
}
h2 {
  font-size: 2rem;
}
h3 {
  font-size: 1.5rem;
}

/* Blog post content */
.notion-text {
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}
```

### 3. Header/Navigation

**Edit `src/components/header.tsx` and `src/styles/header.module.css`:**

```css
/* header.module.css */
.header {
  background: var(--background-primary);
  border-bottom: 1px solid var(--border-light);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  text-decoration: none;
}

.navLinks {
  display: flex;
  gap: 2rem;
}

.navLink {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.navLink:hover {
  color: var(--primary-color);
}
```

### 4. Blog Post Layout

**Edit `src/styles/post.module.css`:**

```css
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.content {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-primary);
}

/* Notion block styling */
.content h1,
.content h2,
.content h3 {
  margin-top: 3rem;
  margin-bottom: 1rem;
}

.content p {
  margin-bottom: 1.5rem;
}

.content blockquote {
  border-left: 4px solid var(--primary-color);
  padding-left: 1.5rem;
  margin: 2rem 0;
  font-style: italic;
  color: var(--text-secondary);
}

.content code {
  background: var(--background-secondary);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9em;
}

.content pre {
  background: var(--background-secondary);
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 2rem 0;
}
```

### 5. Blog Listing Page

**Edit `src/styles/blog.module.css`:**

```css
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  text-align: center;
  color: var(--text-primary);
}

.posts {
  display: grid;
  gap: 2rem;
}

.post {
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: 2rem;
  transition: box-shadow 0.2s;
}

.post:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.postTitle {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.postTitle a {
  color: inherit;
  text-decoration: none;
}

.postTitle a:hover {
  color: var(--primary-color);
}

.postMeta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.postExcerpt {
  color: var(--text-secondary);
  line-height: 1.6;
}
```

## Advanced Customizations

### Dark Mode Support

Add to `src/styles/variables.css`:

```css
/* Light mode (default) */
:root {
  --bg-primary: #ffffff;
  --text-primary: #333333;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #1a1a1a;
    --text-primary: #ffffff;
  }
}

/* Manual dark mode toggle */
[data-theme='dark'] {
  --bg-primary: #1a1a1a;
  --text-primary: #ffffff;
}
```

### Responsive Design

Add to your CSS files:

```css
/* Mobile */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .title {
    font-size: 2rem;
  }

  .nav {
    flex-direction: column;
    gap: 1rem;
  }
}

/* Tablet */
@media (max-width: 1024px) {
  .container {
    max-width: 90%;
  }
}
```

### Custom Components

Create reusable styled components:

**`src/components/Button.tsx`:**

```tsx
import styles from './Button.module.css'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  onClick?: () => void
}

export default function Button({
  variant = 'primary',
  children,
  onClick,
}: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[variant]}`} onClick={onClick}>
      {children}
    </button>
  )
}
```

**`src/components/Button.module.css`:**

```css
.button {
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.primary {
  background: var(--primary-color);
  color: white;
}

.primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.secondary {
  background: transparent;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
}

.secondary:hover {
  background: var(--primary-color);
  color: white;
}
```

## Implementation Steps

1. **Choose your color scheme** - Update CSS variables
2. **Select typography** - Import fonts and update font-family
3. **Customize layout** - Adjust spacing, sizing, containers
4. **Style components** - Header, footer, blog posts, etc.
5. **Add responsive design** - Mobile/tablet breakpoints
6. **Test thoroughly** - Check all pages and components
7. **Optimize** - Minimize CSS, check performance

## Testing Your Styles

After making changes:

```bash
# Build and test locally
NODE_OPTIONS="--openssl-legacy-provider" npm run build
NODE_OPTIONS="--openssl-legacy-provider" npm start

# Visit different pages to test:
# - Homepage: http://localhost:3000
# - Blog listing: http://localhost:3000/blog
# - Individual posts: http://localhost:3000/blog/[post-slug]
```

## Best Practices

1. **Use CSS variables** for consistent theming
2. **Mobile-first design** - Start with mobile, scale up
3. **Consistent spacing** - Use a spacing scale (8px, 16px, 24px, etc.)
4. **Accessible colors** - Ensure proper contrast ratios
5. **Performance** - Minimize CSS, use efficient selectors
6. **Maintainability** - Organize styles logically, use meaningful class names

## Troubleshooting

### Styles not applying?

- Check CSS module naming (camelCase in JS, kebab-case in CSS)
- Ensure imports are correct
- Check browser dev tools for CSS conflicts

### Layout issues?

- Use browser dev tools to inspect elements
- Check for CSS specificity conflicts
- Verify responsive breakpoints

### Performance issues?

- Minimize CSS files
- Remove unused styles
- Optimize images and fonts

---

**Next Steps:**

- Implement your chosen design
- Test across different devices
- Consider adding animations/transitions
- Set up a style guide for consistency
