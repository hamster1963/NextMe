'use client'

import { usePathname } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { cn } from 'lib/utils'
import { motion } from 'framer-motion'
import Link from 'next/link'

import {
  HomeIcon,
  InboxIcon,
  SparklesIcon,
  Square2StackIcon,
} from '@heroicons/react/20/solid'

export const siteUrlList = [
  {
    name: 'Home',
    url: '/',
    icon: HomeIcon,
  },
  {
    name: 'Work',
    url: '/work',
    icon: Square2StackIcon,
  },
  {
    name: 'Blog',
    url: '/blog',
    icon: InboxIcon,
  },
  {
    name: 'Chat',
    url: '/guestbook',
    icon: SparklesIcon,
  },
]

export default function Nav() {
  const nowPath = usePathname()
  const [path, setPath] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setPath(nowPath)
    }, 200)
    return () => clearTimeout(timer)
  }, [nowPath])

  const isActive = useMemo(() => {
    return (url: string) =>
      path === url ||
      (path.includes('/blog') && url.includes('/blog')) ||
      (path.includes('/work') && url.includes('/work'))
  }, [path])

  return (
    <div className="z-50 flex flex-col items-center justify-center">
      <div className="fixed bottom-4 flex items-center gap-1 rounded-[50px] border-[1px] border-solid border-white/15 bg-stone-100 p-[3px] dark:bg-stone-800">
        {siteUrlList.map((site) => (
          <Link
            key={site.name}
            href={site.url}
            prefetch={true}
            className={cn(
              'relative rounded-3xl px-2.5 py-[8px] text-[13px] font-[600] transition-all duration-500',
              isActive(site.url)
                ? 'text-black dark:text-white'
                : 'text-stone-400 dark:text-stone-500'
            )}
          >
            {isActive(site.url) && (
              <motion.div
                layoutId="nav-item"
                className="absolute inset-0 z-10 h-full w-full content-center bg-white shadow-lg shadow-black/5 dark:bg-stone-700 dark:shadow-white/5"
                style={{
                  originY: '0px',
                  borderRadius: 46,
                }}
              />
            )}
            <div className="relative z-20 flex items-center gap-1">
              <site.icon className="h-4 w-4 flex-shrink-0" />
              <p className="whitespace-nowrap">{site.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
