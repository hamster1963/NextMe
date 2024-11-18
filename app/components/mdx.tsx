import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import React from 'react'
import TechCard from './tech-card'
import { getFileBufferLocal, getPlaceholderBlogImage } from 'lib/images'
import BlogImage from './blog-image'
import sharp from 'sharp'
import path from 'path'
import { promises as fs } from 'fs'
import crypto from 'crypto'

function Table({ data }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ))
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function CustomLink(props) {
  let href = props.href

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

async function CenterImage(props: { src: string; alt: string }) {
  const { src, alt } = props

  if (src.startsWith('http')) {
    return <BlogImage src={src} alt={alt} />
  }

  const imagePath = src.replaceAll('%20', ' ')

  const isDev = process.env.NODE_ENV === 'development'

  if (isDev) {
    return (
      <>
        <BlogImage
          src={imagePath}
          alt={alt}
          width={1920}
          height={1080}
          hex={'ffffff'}
        />
        {alt.startsWith('alt:') && (
          <p className="-mb-0 mt-2 text-center text-[13px] text-neutral-400 dark:text-neutral-600">
            {alt.replace('alt:', '')}
          </p>
        )}
      </>
    )
  }

  const contentHash = crypto.createHash('md5').update(imagePath).digest('hex')

  const cacheDir = path.join(
    process.cwd(),
    '.next',
    'cache',
    'optimized-images'
  )
  const placeholderCacheFileName = `${contentHash}-placeholder.json`
  const placeholderCachePath = path.join(cacheDir, placeholderCacheFileName)

  let preImage

  try {
    const cachedPlaceholder = await fs.readFile(placeholderCachePath, 'utf-8')
    preImage = JSON.parse(cachedPlaceholder)
  } catch (error) {
    console.log('placeholder cache not found, generating new', imagePath)
    preImage = await getPlaceholderBlogImage(imagePath)

    await fs.mkdir(cacheDir, { recursive: true })
    await fs.writeFile(placeholderCachePath, JSON.stringify(preImage))
    console.log('placeholder cache generated', placeholderCachePath)
  }

  if (imagePath.toLowerCase().endsWith('.gif')) {
    return (
      <>
        <BlogImage
          src={imagePath}
          alt={alt}
          width={preImage.metadata!.width!}
          height={preImage.metadata!.height!}
          hex={preImage.placeholder.hex}
        />
        {alt.startsWith('alt:') && (
          <p className="-mb-0 mt-2 text-center text-[13px] text-neutral-400 dark:text-neutral-600">
            {alt.replace('alt:', '')}
          </p>
        )}
      </>
    )
  }

  const cacheFileName = `${contentHash}-optimized.webp`
  const cachePath = path.join(cacheDir, cacheFileName)

  const publicDir = path.join(process.cwd(), 'public', 'optimized')
  const publicFileName = `${contentHash}-optimized.webp`
  const publicPath = path.join(publicDir, publicFileName)

  try {
    await fs.access(cachePath)
    await fs.mkdir(publicDir, { recursive: true })
    await fs.copyFile(cachePath, publicPath)
  } catch (error) {
    console.log('image cache not found, optimizing', cachePath)
    const originalBuffer = await getFileBufferLocal(imagePath)
    const optimizedBuffer = await sharp(originalBuffer)
      .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 90, lossless: true })
      .toBuffer()

    await fs.mkdir(cacheDir, { recursive: true })
    await fs.mkdir(publicDir, { recursive: true })

    await fs.writeFile(cachePath, optimizedBuffer)
    await fs.writeFile(publicPath, optimizedBuffer)
    console.log('image cache generated', cachePath)
  }

  return (
    <>
      <BlogImage
        src={`/optimized/${publicFileName}`}
        alt={alt}
        width={preImage.metadata!.width!}
        height={preImage.metadata!.height!}
        hex={preImage.placeholder.hex}
      />
      {alt.startsWith('alt:') && (
        <p className="-mb-0 mt-2 text-center text-[13px] text-neutral-400 dark:text-neutral-600">
          {alt.replace('alt:', '')}
        </p>
      )}
    </>
  )
}

function Callout(props) {
  return (
    <div className="mb-8 flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 px-4 py-3 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100">
      <div className="mr-4 flex w-4 items-center">{props.emoji}</div>
      <div className="callout w-full">{props.children}</div>
    </div>
  )
}

function ProsCard({ title, pros }) {
  return (
    <div className="my-4 w-full rounded-xl border border-emerald-200 bg-neutral-50 p-6 dark:border-emerald-900 dark:bg-neutral-900">
      <span>{`${title}`}</span>
      <div className="mt-4">
        {pros.map((pro) => (
          <div key={pro} className="mb-2 flex items-baseline font-medium">
            <div className="mr-2 h-4 w-4">
              <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 24 24">
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </g>
              </svg>
            </div>
            <span>{pro}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ConsCard({ title, cons }) {
  return (
    <div className="my-6 w-full rounded-xl border border-red-200 bg-neutral-50 p-6 dark:border-red-900 dark:bg-neutral-900">
      <span>{`You might not use ${title} if...`}</span>
      <div className="mt-4">
        {cons.map((con) => (
          <div key={con} className="mb-2 flex items-baseline font-medium">
            <div className="mr-2 h-4 w-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-red-500"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </div>
            <span>{con}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Code({ children, ...props }) {
  let codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

export function slugify(str) {
  return (
    str
      .toString()
      .toLowerCase()
      .trim() // Remove whitespace from both ends of a string
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/&/g, '-and-') // Replace & with 'and'
      // .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
      .replace(/--+/g, '-')
  ) // Replace multiple - with single -
}

const CreateHeading =
  (level) =>
  ({ children }) => {
    const slug = slugify(children)
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }

let components = {
  h1: CreateHeading(1),
  h2: CreateHeading(2),
  h3: CreateHeading(3),
  h4: CreateHeading(4),
  h5: CreateHeading(5),
  h6: CreateHeading(6),
  img: CenterImage,
  a: CustomLink,
  Callout,
  ProsCard,
  ConsCard,
  code: Code,
  Table,
  TechCard,
}

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
