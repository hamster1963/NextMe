import RSS from 'rss'
import { getBlogPosts } from '../db/blog'

export const dynamic = 'force-static'

export async function GET() {
  const feed = new RSS({
    title: process.env.SITE_AUTHOR || 'Hamster1963',
    description: 'Developer, guitarist, and creator.',
    site_url: process.env.SITE_URL!,
    feed_url: process.env.SITE_URL + '/rss',
    language: 'zh-CN',
    image_url: process.env.SITE_URL + '/avatar.jpeg',
    generator: 'Next.js',
    custom_elements: [
      {
        follow_challenge: [
          {
            feedId: '123',
          },
          {
            userId: '123',
          },
        ],
      },
    ],
  })

  let getPost = getBlogPosts()
  getPost = getPost.filter((post) => post.metadata.category !== 'Daily')
  getPost.forEach((post) => {
    feed.item({
      title: post.metadata.title,
      description: post.metadata.ai ? post.metadata.ai : post.metadata.summary,
      url: process.env.SITE_URL + `/blog/${post.slug}`,
      date: post.metadata.publishedAt,
      author: process.env.SITE_AUTHOR || 'Hamster1963',
      enclosure: {
        url: post.metadata.rssImage
          ? process.env.SITE_URL + post.metadata.rssImage
          : process.env.SITE_URL + '/opengraph-image.png',
      },
    })
  })

  return new Response(feed.xml(), {
    headers: {
      'content-type': 'text/xml',
    },
  })
}
