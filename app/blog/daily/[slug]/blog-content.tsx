import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CustomMDX } from '../../../components/mdx'
import { getBlogPosts } from '../../../db/blog'
import { BackIcon } from '../../../components/Icon'

export default async function DailyContent({ slug }) {
  const getPost = getBlogPosts()

  if (!getPost) {
    notFound()
  }
  let post = getPost.find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? process.env.SITE_URL + post.metadata.image
              : process.env.SITE_URL + '/og?title=' + post.metadata.title,
            url: process.env.SITE_URL + '/blog/' + post.slug,
            author: {
              '@type': 'Person',
              name: process.env.SITE_AUTHOR,
            },
          }),
        }}
      />
      <h1 className="mb-2 text-2xl font-medium tracking-tighter transition-opacity hover:opacity-50">
        <Link href={'/blog/daily'} className="flex items-center justify-start">
          <BackIcon />
          {post.metadata.title}
        </Link>
      </h1>
      <div className="mb-8 mt-2 flex max-w-[650px] items-center justify-between text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>
      <article className="prose prose-neutral prose-quoteless dark:prose-invert">
        <CustomMDX source={post.content} />
      </article>
    </>
  )
}

function formatDate(date: string) {
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }

  let fullDate = new Date(date).toLocaleString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return `${fullDate}`
}
