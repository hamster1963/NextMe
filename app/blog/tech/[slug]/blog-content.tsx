import Link from 'next/link'
import AI from './ai'
import { notFound } from 'next/navigation'
import { CustomMDX, slugify } from '../../../components/mdx'
import { getBlogPosts } from '../../../db/blog'
import { getPlaceholderColorFromLocal } from '../../../../lib/images'
import TOC from './toc'
import { BackIcon } from '../../../components/Icon'

interface Heading {
  level: number
  id: string
  text: string
}

function extractHeadings(source: string) {
  const headings: Heading[] = []

  const cleanedSource = source.replace(/```[\s\S]*?```/g, '')

  const headingRegex = /^(#{1,6})\s+(.*)$/gm
  let match: string[] | null

  while ((match = headingRegex.exec(cleanedSource)) !== null) {
    const level = match[1].length
    let text = match[2].trim()

    text = text.replace(/\*\*(.*?)\*\*/g, '$1')

    const id = slugify(text)
    headings.push({ level, id, text })
  }
  return headings
}

export default async function BlogContent({ slug }) {
  const getPost = getBlogPosts()

  if (!getPost) {
    notFound()
  }
  let post = getPost.find((post) => post.slug === slug)

  let placeholderImage
  if (post?.metadata.image) {
    placeholderImage = await getPlaceholderColorFromLocal(
      post.slug,
      post.metadata.image
    )
  }

  if (!post) {
    notFound()
  }
  const headings = extractHeadings(post.content)
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
        <Link
          style={{
            viewTransitionName: post.metadata.title,
          }}
          href={'/blog'}
          className="flex items-center justify-start"
        >
          <BackIcon />
          {post.metadata.title}
        </Link>
      </h1>
      <div className="mb-8 mt-2 flex max-w-[650px] items-center justify-between text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>
      {post.metadata.ai && <AI ai={post.metadata.ai} />}
      <div className="flex w-full flex-col">
        {post.metadata.image && (
          <div
            className={
              'z-20 overflow-hidden rounded-xl transition-all duration-300 sm:my-20 sm:scale-150 dark:brightness-75 dark:hover:brightness-100'
            }
            style={{ backgroundColor: placeholderImage.placeholder.hex }}
          >
            <img
              alt={'Hamster1963'}
              src={post.metadata.image}
              width={
                placeholderImage.metadata.width
                  ? placeholderImage.metadata.width
                  : 1920
              }
              height={
                placeholderImage.metadata.height
                  ? placeholderImage.metadata.height
                  : 1080
              }
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}
      </div>
      <article className="prose prose-neutral prose-quoteless text-[15px] dark:prose-invert">
        <CustomMDX source={post.content} />
      </article>
      <TOC headings={headings} />
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
