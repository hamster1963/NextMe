import type { Metadata } from 'next'
import { getBlogPosts } from 'app/db/blog'
import BlogContent from './blog-content'

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  let getPost = getBlogPosts()
  if (!getPost) {
    return
  }
  let post = getPost.find((post) => post.slug === params.slug)

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post!.metadata
  let ogImage = image
    ? process.env.SITE_URL + image
    : process.env.SITE_URL + '/og?title=' + title

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: process.env.SITE_URL + '/blog/tech/' + post!.slug,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export async function generateStaticParams() {
  let getPost = getBlogPosts()
  getPost = getPost.filter((post) => post.metadata.category !== 'Daily')

  return getPost.map((post) => ({
    slug: post.slug,
  }))
}

export default async function Blog({ params }) {
  const { slug } = params
  return (
    <section className="sm:px-14 sm:pt-6">
      <BlogContent slug={slug} />
    </section>
  )
}
