import { getBlogPosts } from '../db/blog'

export const dynamic = 'force-static'

type BlogPost = {
  title: string
  slug: string
  metadata: {
    title: string
    summary: string
    publishedAt: string
  }
}

type TechBlogData = {
  count: number
  posts: BlogPost[]
}

type DailyBlogData = {
  count: number
  posts: BlogPost[]
}

type BlogSiteData = {
  blog_count: number
  tech_blog_count: number
  daily_blog_count: number
  tech_blog_data: TechBlogData
  daily_blog_data: DailyBlogData
}

export async function GET() {
  const blogPosts = getBlogPosts()
  const techBlogPosts = blogPosts.filter(
    (post) => post.metadata.category === 'Tech'
  )
  const dailyBlogPosts = blogPosts.filter(
    (post) => post.metadata.category === 'Daily'
  )

  // 添加排序函数
  const sortByPublishedAt = (a: BlogPost, b: BlogPost) => {
    return (
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
    )
  }

  const blogSiteData: BlogSiteData = {
    blog_count: blogPosts.length,
    tech_blog_count: techBlogPosts.length,
    daily_blog_count: dailyBlogPosts.length,
    tech_blog_data: {
      count: techBlogPosts.length,
      posts: techBlogPosts
        .map((post) => ({
          title: post.metadata.title,
          slug: post.slug,
          metadata: {
            title: post.metadata.title,
            summary: post.metadata.summary,
            publishedAt: post.metadata.publishedAt,
          },
        }))
        .sort(sortByPublishedAt),
    },
    daily_blog_data: {
      count: dailyBlogPosts.length,
      posts: dailyBlogPosts
        .map((post) => ({
          title: post.metadata.title,
          slug: post.slug,
          metadata: {
            title: post.metadata.title,
            summary: post.metadata.summary,
            publishedAt: post.metadata.publishedAt,
          },
        }))
        .sort(sortByPublishedAt),
    },
  }

  return new Response(JSON.stringify(blogSiteData), {
    headers: { 'Content-Type': 'application/json' },
  })
}
