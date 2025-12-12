import { NextApiRequest, NextApiResponse } from 'next'
import { getBlogPostsFromNotion } from '../../lib/notion/official-api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    const debug = {
      timestamp: new Date().toISOString(),
      host: req.headers.host,
      origin: req.headers.origin,
      userAgent: req.headers['user-agent'],
      environment: {
        hasNotionToken: !!process.env.NOTION_TOKEN,
        blogIndexId: process.env.BLOG_INDEX_ID,
        nodeOptions: process.env.NODE_OPTIONS,
      },
    }

    // Test Notion API
    console.log('Testing Notion API...')
    const posts = await getBlogPostsFromNotion()

    res.status(200).json({
      status: 'success',
      debug,
      postsFound: Object.keys(posts).length,
      postTitles: Object.values(posts)
        .map((p: any) => p.title)
        .slice(0, 5),
      message: `API working correctly from ${req.headers.host}`,
    })
  } catch (error) {
    console.error('Debug API Error:', error)
    res.status(500).json({
      status: 'error',
      debug: {
        timestamp: new Date().toISOString(),
        host: req.headers.host,
        origin: req.headers.origin,
        environment: {
          hasNotionToken: !!process.env.NOTION_TOKEN,
          blogIndexId: process.env.BLOG_INDEX_ID,
        },
      },
      error: error.message,
      message: `API failed from ${req.headers.host}`,
    })
  }
}
