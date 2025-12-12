# Notion-Powered Next.js Blog

<div align="center">
  <img src="public/notion.png" alt="Notion Blog" width="100"/>
  <h3>A Modern Blog Platform Powered by Notion API</h3>
  <p>Built with Next.js 11, React 17, and the Official Notion API</p>
  
  [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Turboaitech/notion-blog)
  [![GitHub](https://img.shields.io/github/license/Turboaitech/notion-blog)](./license)
  [![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://notion-blog-ak5etj9mu-turbo-ais-projects.vercel.app)
</div>

---

## 🚀 Overview

This is a production-ready blog platform that seamlessly integrates with Notion as a CMS. Write your content in Notion, and it automatically appears on your blog - no manual publishing required. Features custom styling, responsive design, and optimized performance.

**Live Demo**: [https://notion-blog-ak5etj9mu-turbo-ais-projects.vercel.app](https://notion-blog-ak5etj9mu-turbo-ais-projects.vercel.app)

### ✨ Key Features

- 📝 **Notion as CMS** - Write in Notion, publish automatically
- ⚡ **Static Generation** - Fast page loads with Next.js SSG
- 🎨 **Custom Styling** - Fully customizable design system
- 📱 **Responsive Design** - Mobile-first approach
- 🔄 **Auto-sync** - Content updates without rebuilding
- 🎯 **SEO Optimized** - Meta tags, OpenGraph, structured data
- 🌙 **Dark Mode Ready** - CSS variables for theming
- 🚀 **One-click Deploy** - Deploy to Vercel instantly

## 📋 Table of Contents

- [Getting Started](#-getting-started)
- [Creating Your Database](#-creating-your-database)
- [Detailed Setup Guide](#-detailed-setup-guide)
- [Customization](#-customization)
- [Architecture](#-architecture)
- [Development](#-development)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Getting Started

### Prerequisites

- Node.js 16-18 (recommended for OpenSSL compatibility)
- Notion account with admin access
- Git installed

### 1. Clone & Install

```bash
git clone https://github.com/Turboaitech/notion-blog.git
cd notion-blog
npm install
```

### 2. Setup Notion Integration

1. Go to [Notion Developers](https://developers.notion.com/)
2. Create new integration, copy the token
3. Create a database with these properties:

   - **Page** (Title) - Post title
   - **Slug** (Text) - URL slug
   - **Published** (Checkbox) - Visibility control
   - **Date** (Date) - Publication date
   - **Authors** (People) - Post authors

4. Share database with your integration

### 3. Configure Environment

Create `.env` file:

```bash
NOTION_TOKEN=ntn_your_integration_token
BLOG_INDEX_ID=your_database_id_32_chars
NODE_OPTIONS=--openssl-legacy-provider
```

### 4. Run Locally

```bash
# Development
NODE_OPTIONS="--openssl-legacy-provider" npm run dev

# Production build (required before deployment)
NODE_OPTIONS="--openssl-legacy-provider" npm run build
NODE_OPTIONS="--openssl-legacy-provider" npm start
```

### 5. Deploy Your Own

Deploy your own Notion blog with Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Turboaitech/notion-blog)

**Or deploy manually:**

```bash
# Add environment variables to Vercel
# Then deploy
vercel
```

**Note**: If redeploying with `vercel` locally and you haven't made changes to the application source (only edited content in Notion), use `vercel -f` to bypass build de-duping.

## 📊 Creating Your Database

### Automatic Setup

The blog will automatically create the required database structure when you first visit `/blog` if no table is detected.

### Manual Database Creation

If you prefer to set up the database manually:

1. **Create a new page in Notion**
2. **Add an inline table** (not a full-page table - this requires different querying)
3. **Configure these exact properties**:

| Property Name | Type      | Required    | Description                                          |
| ------------- | --------- | ----------- | ---------------------------------------------------- |
| **Page**      | Title     | ✅ Yes      | The blog post title (default Notion property)        |
| **Slug**      | Rich Text | ⚪ Optional | URL slug (auto-generated from title if empty)        |
| **Published** | Checkbox  | ✅ Yes      | Controls post visibility (only checked posts appear) |
| **Date**      | Date      | ⚪ Optional | Publication date for sorting                         |
| **Authors**   | People    | ⚪ Optional | Post authors (Notion users)                          |

### Using the Pre-Configured Script

If you want to create the table programmatically:

```bash
# After cloning and installing dependencies
NOTION_TOKEN='your_token' BLOG_INDEX_ID='your_page_id' node scripts/create-table.js
```

## 📖 Detailed Setup Guide

For comprehensive setup instructions including Notion configuration, API integration, and troubleshooting, see:

**[📘 Complete Setup Guide](./docs/NOTION_BLOG_SETUP_GUIDE.md)**

This guide covers:

- Detailed Notion database setup
- Integration configuration
- Code modifications for official API
- Production deployment steps
- Common issues and solutions

## 🎨 Customization

### Styling & Theming

For complete styling customization instructions, see:

**[🎨 Styling Customization Guide](./docs/BLOG_STYLING_GUIDE.md)**

Quick customization options:

#### Change Colors

Edit `src/styles/global.css`:

```css
:root {
  --primary-color: #f37022; /* Your brand color */
  --text-primary: #333333;
  --background: #f6f1eb;
}
```

#### Update Typography

```css
body {
  font-family: Arial, sans-serif; /* Your font choice */
  font-size: 16px;
  line-height: 1.6;
}
```

#### Modify Layout

Components are in `src/components/`:

- `header.tsx` - Navigation
- `footer.tsx` - Footer
- Contact page with custom sparkle logo

## 🏗 Architecture

```
notion-blog/
├── src/
│   ├── components/        # React components
│   │   ├── header.tsx     # Navigation
│   │   ├── footer.tsx     # Footer
│   │   └── svgs/         # SVG icons
│   ├── lib/
│   │   └── notion/       # Notion API integration
│   │       ├── official-api.ts    # API client
│   │       └── getBlogIndex.ts    # Post fetching
│   ├── pages/            # Next.js pages
│   │   ├── index.tsx     # Homepage
│   │   ├── blog/
│   │   │   ├── index.tsx # Blog listing
│   │   │   └── [slug].tsx # Individual posts
│   │   └── contact.tsx   # Contact page
│   └── styles/           # CSS modules
├── public/               # Static assets
├── .env                  # Environment variables
└── package.json          # Dependencies
```

### Technology Stack

- **Framework**: Next.js 11.1.2
- **UI Library**: React 17.0.2
- **Styling**: CSS Modules + Global CSS
- **API**: Notion Official API v2.3.0
- **Deployment**: Vercel
- **Type Safety**: TypeScript

## 💻 Development

### Local Development

```bash
# Install dependencies
npm install

# Run development server
NODE_OPTIONS="--openssl-legacy-provider" npm run dev

# Build for production
NODE_OPTIONS="--openssl-legacy-provider" npm run build

# Test production build
NODE_OPTIONS="--openssl-legacy-provider" npm start
```

### Environment Variables

| Variable        | Description                 | Required |
| --------------- | --------------------------- | -------- |
| `NOTION_TOKEN`  | Notion integration token    | Yes      |
| `BLOG_INDEX_ID` | Notion database ID          | Yes      |
| `NODE_OPTIONS`  | OpenSSL compatibility flag  | Yes      |
| `USE_CACHE`     | Enable caching (true/false) | No       |

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub:

```bash
git add .
git commit -m "Initial deployment"
git push origin main
```

2. Import in Vercel:
   - Connect GitHub repository
   - Add environment variables
   - Deploy

## 🐛 Troubleshooting

### Common Issues

#### OpenSSL Error

```bash
Error: error:0308010C:digital envelope routines::unsupported
```

**Solution**: Ensure `NODE_OPTIONS="--openssl-legacy-provider"` is set

#### Posts Not Appearing

- Verify "Published" checkbox is checked in Notion
- Check database is shared with integration
- Confirm property names match exactly

#### Build Failures

- Use Node.js 16-18 for best compatibility
- Check all environment variables are set
- Run `npm run build` locally first

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](license) file for details.

## 👨‍💻 Author

**Bo Zhang (Turboaitech)**

- GitHub: [@Turboaitech](https://github.com/Turboaitech)
- Email: turboaitech@gmail.com

## 🙏 Acknowledgments

This project represents a complete rebuild and modernization of the notion-blog concept with significant enhancements:

- Full migration to Official Notion API
- Modern styling system with comprehensive customization
- Production-ready build process and deployment
- Enterprise-grade documentation and best practices
- Performance optimizations and monitoring

Built with dedication to providing developers with a robust, scalable blogging platform. Special thanks to the Notion team for their excellent API.

---

<div align="center">
  <p>Built with ❤️ using Next.js and Notion</p>
  <p>
    <a href="https://github.com/Turboaitech/notion-blog">GitHub</a> •
    <a href="https://notion-blog-ak5etj9mu-turbo-ais-projects.vercel.app">Live Demo</a> •
    <a href="./docs/NOTION_BLOG_SETUP_GUIDE.md">Documentation</a>
  </p>
</div>
