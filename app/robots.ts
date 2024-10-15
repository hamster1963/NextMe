export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: process.env.SITE_URL + '/sitemap.xml',
    host: process.env.SITE_URL,
  }
}
