<h1 align="center">NextMe</h1>

<strong>NextMe is a personal website built with Next.js and Tailwind CSS.</strong>

"Tired of various CMS and external dependencies?

Here is a minimalist blog that gives you full control to customize your blog."

![screen-shot-one](/.github/shot.jpeg)

- **Framework**: [Next.js](https://nextjs.org/)
- **Deployment**: [Vercel](https://vercel.com) & [Cloudflare Pages](https://pages.cloudflare.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)

## Key features

- MDX: Write your blog posts in Markdown.
- build-time-image-optimization: Automatically optimize your blog images.
- robots.ts & sitemap.ts: Automatically generate robots.txt and sitemap.xml files.
- rss: Automatically generate RSS feed.
- loading skeleton: Beautiful loading skeletons for your blog posts.
- mobile-friendly: Optimized for mobile devices.
- dark mode: Supports dark mode.
- static export: Static HTML export for performance and SEO.
- SEO: Optimized for search engines.

## Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhamster1963%2Fnextme&env=SITE_URL,SITE_AUTHOR)

- Cloudflare Pages - Framework preset - Next.js(Static HTML Export)

  Environment variable add BUN_VERSION = 1.1.29

## Environment variables

- SITE_URL: Your site url.
- SITE_AUTHOR: Your name.

## Local development

First, run the development server:

```bash
bun i
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Page Speed Insights

![Page Speed Insights](/.github/speed.png)
