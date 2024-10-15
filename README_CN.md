<h1 align="center">NextMe</h1>

<strong>NextMe 是一个使用 Next.js 和 Tailwind CSS 构建的个人网站。</strong>

"厌倦了各种 CMS 和外部依赖？

这里有一个极简主义的博客，让你完全控制你的博客。"

<a href="https://buycoffee.top/blog/tech/nextme">项目详细介绍</a>

![screen-shot-one](/.github/shot.jpeg)

- **框架**: [Next.js](https://nextjs.org/)
- **部署**: [Vercel](https://vercel.com) & [Cloudflare Pages](https://pages.cloudflare.com/)
- **样式**: [Tailwind CSS](https://tailwindcss.com)

## 关键特性

- MDX: 使用 Markdown 编写你的博客文章。
- build-time-image-optimization: 自动优化你的博客图片。
- robots.ts & sitemap.ts: 自动生成 robots.txt 和 sitemap.xml 文件。
- rss: 自动生成 RSS 订阅。
- 移动端友好: 针对移动设备进行了优化。
- 深色模式: 支持深色模式。
- 静态导出: 静态 HTML 导出以提高性能和 SEO。
- SEO: 针对搜索引擎进行了优化。

## 部署你的网站

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhamster1963%2Fnextme&env=SITE_URL,SITE_AUTHOR)

- Cloudflare Pages - 框架预设 - Next.js(Static HTML Export)

  环境变量添加 BUN_VERSION = 1.1.29

## 环境变量

- SITE_URL: 你的网站 URL。
- SITE_AUTHOR: 名字。

## 本地开发

首先，运行开发服务器：

```bash
bun i
bun run dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000) 查看结果。

## Page Speed Insights

![Page Speed Insights](/.github/speed.png)
