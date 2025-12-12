import { NOTION_TOKEN } from './server-constants'

const BLOG_INDEX_ID_RAW = process.env.BLOG_INDEX_ID

function getNotionClient() {
  const { Client } = require('@notionhq/client')
  return new Client({
    auth: NOTION_TOKEN,
  })
}

export async function getBlogPostsFromNotion() {
  try {
    const notion = getNotionClient()
    const response = await notion.databases.query({
      database_id: BLOG_INDEX_ID_RAW,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    })

    const posts = {}
    for (const page of response.results) {
      if ('properties' in page) {
        const properties = page.properties

        // Extract title from "Page" field
        let title = ''
        if (properties.Page && properties.Page.type === 'title') {
          title = properties.Page.title.map((t) => t.plain_text).join('')
        }

        // Always generate slug from title for consistency
        let slug = ''
        if (title) {
          slug = title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
        }

        // Extract other fields
        const published = properties.Published?.checkbox || false
        const date = properties.Date?.date?.start || ''
        const authors =
          properties.Authors?.people?.map(
            (person) => person.name || person.id
          ) || []

        if (title && slug) {
          posts[slug] = {
            id: page.id,
            title,
            slug,
            published,
            date,
            authors,
            // Legacy compatibility
            Page: title,
            Slug: slug,
            Published: published ? 'Yes' : 'No',
            Date: date ? new Date(date).getTime() : null,
            Authors: authors,
          }
        }
      }
    }

    return posts
  } catch (error) {
    console.error('Error fetching posts from Notion:', error)
    return {}
  }
}

export async function getPageContent(pageId) {
  try {
    const notion = getNotionClient()
    console.log('Fetching content for page:', pageId)
    const response = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
    })
    console.log('Got', response.results.length, 'blocks from Notion')

    // Convert Notion blocks to the format expected by the renderer
    const blocks = response.results.map((block) => {
      const value: any = {
        id: block.id,
        type: block.type,
        properties: {},
      }

      // Handle different block types
      if (block.type === 'paragraph' && block.paragraph) {
        value.type = 'text'
        value.properties.title = block.paragraph.rich_text.map((text) => [
          text.plain_text,
        ])
      } else if (block.type === 'heading_1' && block.heading_1) {
        value.type = 'header'
        value.properties.title = block.heading_1.rich_text.map((text) => [
          text.plain_text,
        ])
      } else if (block.type === 'heading_2' && block.heading_2) {
        value.type = 'sub_header'
        value.properties.title = block.heading_2.rich_text.map((text) => [
          text.plain_text,
        ])
      } else if (block.type === 'heading_3' && block.heading_3) {
        value.type = 'sub_sub_header'
        value.properties.title = block.heading_3.rich_text.map((text) => [
          text.plain_text,
        ])
      } else if (
        block.type === 'bulleted_list_item' &&
        block.bulleted_list_item
      ) {
        value.type = 'bulleted_list'
        value.properties.title = block.bulleted_list_item.rich_text.map(
          (text) => [text.plain_text]
        )
      } else if (
        block.type === 'numbered_list_item' &&
        block.numbered_list_item
      ) {
        value.type = 'numbered_list'
        value.properties.title = block.numbered_list_item.rich_text.map(
          (text) => [text.plain_text]
        )
      } else if (block.type === 'code' && block.code) {
        value.type = 'code'
        value.properties.title = [
          [block.code.rich_text.map((t) => t.plain_text).join('')],
        ]
        value.properties.language = [[block.code.language || 'plain text']]
      } else if (block.type === 'quote' && block.quote) {
        value.type = 'quote'
        value.properties.title = block.quote.rich_text.map((text) => [
          text.plain_text,
        ])
      } else if (block.type === 'divider') {
        value.type = 'divider'
      } else if (block.type === 'image' && block.image) {
        value.type = 'image'
        value.format = {
          display_source:
            block.image.type === 'external'
              ? block.image.external.url
              : block.image.file.url,
        }
      }

      return { value }
    })

    return blocks
  } catch (error) {
    console.error('Error fetching page content:', error)
    return []
  }
}
