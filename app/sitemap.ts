import { getBlogPosts } from 'app/db/blog'

export default async function sitemap() {
  let getPost = getBlogPosts()
  getPost = getPost.filter((post) => post.metadata.category !== 'Daily')
  let blogs = getPost.map((post) => ({
    url: process.env.SITE_URL + `/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let routes = ['', '/blog', '/guestbook', '/uses', '/work'].map((route) => ({
    url: process.env.SITE_URL + route,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs]
}
