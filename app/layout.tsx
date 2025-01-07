import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import React from 'react'
import Footer from './footer'
import NewBlurLayer from './components/blur-layer'
import type { Viewport } from 'next'
import Nav from './components/nav'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://nextjs.org'),
  title: {
    default: 'Hamster1963',
    template: '%s | Hamster1963',
  },
  description: 'Developer, writer, and creator.',
  openGraph: {
    title: 'Hamster1963',
    description: 'Developer, writer, and creator.',
    url: process.env.SITE_URL,
    siteName: 'Hamster1963',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Hamster1963',
    card: 'summary_large_image',
  },
  alternates: {
    canonical: process.env.SITE_URL,
    types: {
      'application/rss+xml': [{ url: 'rss', title: 'RSS 订阅' }],
    },
  },
}

const cx = (...classes: string[]) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'bg-white text-black dark:bg-[#111010] dark:text-white',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="relative mx-4 mb-28 mt-8 flex max-w-2xl flex-col antialiased sm:mx-auto md:flex-row">
        <main className="mt-6 flex min-w-0 flex-auto flex-col px-2 md:px-0">
          {children}
          <Nav />
          <Footer />
          <NewBlurLayer />
        </main>
      </body>
    </html>
  )
}
