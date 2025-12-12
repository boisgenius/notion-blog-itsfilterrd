# Blog Styling Customization Guide

## Overview

This guide helps you customize the visual design and styling of your Notion-powered blog. The project uses a modern CSS architecture with CSS Modules for component styling and global CSS for site-wide styles.

## Current Project Structure

Your blog uses the following styling system:

- **CSS Modules** for component-specific styles (`.module.css` files)
- **Global CSS** for site-wide styles and CSS variables
- **Custom SVG Components** for icons and logos

## Actual Style Files

### Global Styles

```
src/styles/
├── global.css          # Site-wide styles, CSS variables, and typography
├── header.module.css   # Navigation header styles
├── contact.module.css  # Contact page specific styles
├── blog.module.css     # Blog listing page styles
└── shared.module.css   # Shared component styles
```

### Component Styles

```
src/components/
└── svgs/              # Custom SVG components
    ├── sparkle.tsx    # Custom logo component
    ├── github.tsx     # Social media icons
    └── ...           # Other SVG icons
```

## Quick Customizations

### 1. Change Primary Color (Currently Orange)

**Edit `src/styles/global.css`:**

```css
/* Update the main link colors */
a {
  color: #your-new-color; /* Currently #F37022 (orange) */
  text-decoration: none;
}

a:hover {
  color: #your-hover-color; /* Currently #FF8C42 (lighter orange) */
}
```

**Edit `src/styles/header.module.css`:**

```css
.header :global(a.active) {
  color: #your-new-color; /* Currently #F37022 */
  font-weight: 600;
}
```

### 2. Update Typography (Currently Arial)

**Edit `src/styles/global.css`:**

```css
:root {
  --font-sans: 'Your Font', Arial, sans-serif; /* Currently just Arial */
}

body {
  font-family: 'Your Font', Arial, sans-serif; /* Update body font */
}
```

To use Google Fonts, add to `src/pages/_document.tsx`:

```tsx
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

### 3. Customize Color Scheme with CSS Variables

Add to the `:root` section in `src/styles/global.css`:

```css
:root {
  /* Colors */
  --primary-color: #f37022;
  --secondary-color: #ff8c42;
  --background: #f6f1eb;
  --text-primary: #000;
  --text-secondary: #333;
  --accent-1: #111;
  --accent-2: #333;
  --accent-3: #888;

  /* Spacing */
  --gap-quarter: 0.25rem;
  --gap-half: 0.5rem;
  --gap: 1rem;
  --gap-double: 2rem;

  /* Border radius */
  --radius: 8px;
}
```

### 4. Update Background and Layout

**Site Background** (edit `src/styles/global.css`):

```css
body {
  background: var(--background); /* Currently #f6f1eb */
  color: var(--text-primary);
}
```

**Container Widths** (edit `src/styles/shared.module.css`):

```css
.layout {
  max-width: 1200px; /* Adjust max width */
  margin: 0 auto;
  padding: 0 2rem;
}
```

## Advanced Customizations

### 1. Create Custom Logo

Replace the sparkle logo in `src/components/svgs/sparkle.tsx`:

```tsx
const YourLogo = ({ height = 60 }) => (
  <svg height={height} viewBox="0 0 100 100" fill="none">
    {/* Your custom SVG path */}
    <path d="..." fill="#F37022" />
  </svg>
)

export default YourLogo
```

### 2. Header Customization

**Edit `src/components/header.tsx`** to modify navigation:

```tsx
const navItems = [
  { label: 'Home', page: '/' },
  { label: 'Blog', page: '/blog' },
  { label: 'About', page: '/about' }, // Add new pages
  { label: 'Contact', page: '/contact' },
]
```

**Style the header** in `src/styles/header.module.css`:

```css
.header {
  background: var(--background); /* Header background */
  border-bottom: 1px solid #ddd; /* Add border */
  position: sticky; /* Make sticky */
  top: 0;
  z-index: 100;
}
```

### 3. Blog Post Styling

**Create or edit** `src/styles/blog.module.css`:

```css
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.post {
  background: white;
  border-radius: var(--radius);
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.postTitle {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.postMeta {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-bottom: 1rem;
}
```

### 4. Dark Mode Support

Add dark mode variables to `src/styles/global.css`:

```css
/* Light mode (default) */
:root {
  --bg-primary: #f6f1eb;
  --text-primary: #000;
  --text-secondary: #333;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #1a1a1a;
    --text-primary: #ffffff;
    --text-secondary: #cccccc;
  }

  body {
    background: var(--bg-primary);
    color: var(--text-primary);
  }
}
```

### 5. Responsive Design

Add mobile styles to your CSS:

```css
/* Mobile breakpoint */
@media (max-width: 768px) {
  .layout {
    padding: 0 1rem;
  }

  .header ul li {
    padding: 0 5px; /* Reduce spacing on mobile */
  }

  h1 {
    font-size: 1.75rem; /* Smaller headings on mobile */
  }
}

/* Tablet breakpoint */
@media (max-width: 1024px) {
  .layout {
    max-width: 90%;
  }
}
```

## Testing Your Changes

After making styling changes:

1. **Development mode**:

```bash
NODE_OPTIONS="--openssl-legacy-provider" npm run dev
```

2. **Production build** (important for final testing):

```bash
NODE_OPTIONS="--openssl-legacy-provider" npm run build
NODE_OPTIONS="--openssl-legacy-provider" npm start
```

3. **Test different pages**:
   - Homepage: `http://localhost:3000/`
   - Blog: `http://localhost:3000/blog`
   - Contact: `http://localhost:3000/contact`

## Best Practices

1. **Use CSS Variables** - Define colors and spacing in `:root` for consistency
2. **Mobile First** - Design for mobile, then add tablet/desktop styles
3. **Component Isolation** - Use CSS modules (`.module.css`) for component-specific styles
4. **Performance** - Minimize CSS, avoid complex selectors
5. **Accessibility** - Ensure good color contrast and readable font sizes

## Real Examples from This Project

### Current Color Implementation

```css
/* global.css - Main links */
a {
  color: #f37022;  /* Orange primary color */
}

/* header.module.css - Active navigation */
.header :global(a.active) {
  color: #f37022;  /* Same orange for consistency */
}

/* sparkle.tsx - Logo color */
fill="#F37022"  /* Matching orange in SVG */
```

### Current Typography

```css
/* global.css - Site font */
body {
  font-family: Arial, sans-serif; /* Simple, clean font */
  font-size: 20px; /* Readable base size */
}
```

## Troubleshooting

### Styles Not Updating?

- Clear browser cache
- Restart development server
- Check for CSS syntax errors
- Ensure CSS module imports match filename

### Colors Not Changing?

- Check CSS specificity (use browser dev tools)
- Verify you're editing the correct file
- Look for `!important` declarations that might override

### Layout Issues?

- Use browser dev tools to inspect elements
- Check CSS box model (padding, margin, border)
- Verify responsive breakpoints

---

**Next Steps:**

1. Choose your color scheme and update CSS variables
2. Select and implement your typography
3. Customize the logo and branding elements
4. Test across different devices and screen sizes
5. Consider adding animations or micro-interactions for polish
