// Quick debug script to test Notion API connection
const { getBlogPostsFromNotion } = require('./src/lib/notion/official-api.ts')

console.log('Environment Check:')
console.log('NOTION_TOKEN exists:', !!process.env.NOTION_TOKEN)
console.log('BLOG_INDEX_ID:', process.env.BLOG_INDEX_ID)
console.log('NODE_OPTIONS:', process.env.NODE_OPTIONS)

console.log('\nTesting Notion API connection...')
getBlogPostsFromNotion()
  .then((posts) => {
    console.log('✅ Success! Found', Object.keys(posts).length, 'posts')
    console.log(
      'Post titles:',
      Object.values(posts).map((p) => p.title)
    )
  })
  .catch((err) => {
    console.error('❌ Error:', err.message)
  })
