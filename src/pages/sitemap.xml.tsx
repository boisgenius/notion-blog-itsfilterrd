import { GetServerSideProps } from 'next'
import getBlogIndex from '../lib/notion/getBlogIndex'
import { postIsPublished, getBlogLink } from '../lib/blog-helpers'

const SITE_URL = process.env.SITE_URL || 'https://yourdomain.com'

function generateSiteMap(posts: any[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${SITE_URL}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  ${posts
    .map((post) => {
      return `
  <url>
    <loc>${SITE_URL}${getBlogLink(post.Slug)}</loc>
    <lastmod>${post.Date ? new Date(post.Date).toISOString() : new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    })
    .join('')}
</urlset>`
}

function SiteMap() {
  // This component doesn't render anything
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const postsTable = await getBlogIndex()

  const posts = Object.keys(postsTable)
    .map((slug) => {
      const post = postsTable[slug]
      if (!postIsPublished(post)) return null
      return post
    })
    .filter(Boolean)

  const sitemap = generateSiteMap(posts)

  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
