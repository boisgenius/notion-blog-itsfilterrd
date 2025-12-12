import { Sema } from 'async-sema'
import { getBlogPostsFromNotion } from './official-api'
import { readFile, writeFile } from '../fs-helpers'
import { BLOG_INDEX_CACHE } from './server-constants'

export default async function getBlogIndex(previews = true) {
  let postsTable: any = null
  const useCache = process.env.USE_CACHE === 'true'
  const cacheFile = `${BLOG_INDEX_CACHE}${previews ? '_previews' : ''}`

  if (useCache) {
    try {
      postsTable = JSON.parse(await readFile(cacheFile, 'utf8'))
    } catch (_) {
      /* not fatal */
    }
  }

  if (!postsTable) {
    try {
      postsTable = await getBlogPostsFromNotion()
    } catch (err) {
      console.warn(`Failed to load Notion posts:`, err)
      return {}
    }

    const postsKeys = Object.keys(postsTable).splice(0, 10)

    // Skip previews to avoid rendering errors
    if (previews) {
      for (const postKey of postsKeys) {
        const post = postsTable[postKey]
        post.preview = null
      }
    }

    if (useCache) {
      writeFile(cacheFile, JSON.stringify(postsTable), 'utf8').catch(() => {})
    }
  }

  return postsTable
}
