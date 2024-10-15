import { getBlogPosts } from '../db/blog'
import { getPlaceholderColorFromLocal } from '../../lib/images'
import BlogListClient from 'app/components/blog-list-client'

export default async function BlogList() {
  let allBlogs = getBlogPosts()

  allBlogs = allBlogs.filter((post) => post.metadata.category !== 'Daily')

  // Sort blogs by publication date
  allBlogs.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1
    }
    return 1
  })

  let placeholderImageBlogMap = new Map()
  for (const post of allBlogs) {
    let placeholderImage: { src: string; placeholder: any; metadata?: any } = {
      src: '',
      placeholder: {},
    }
    if (post?.metadata.image) {
      placeholderImage = await getPlaceholderColorFromLocal(
        post.slug,
        post.metadata.image
      )
    }
    placeholderImageBlogMap.set(post.slug, placeholderImage)
  }

  // Access the first blog post if it exists
  let firstBlog = allBlogs.length > 0 ? allBlogs[0] : null
  // Access the rest of the blog posts if it exists
  let restBlogs = allBlogs.length > 0 ? allBlogs.slice(1) : []
  return (
    <BlogListClient
      firstBlog={firstBlog}
      restBlogs={restBlogs}
      placeholderImageBlogMap={placeholderImageBlogMap}
    />
  )
}
