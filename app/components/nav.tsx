'use client'

import { usePathname } from 'next/navigation'
import React, { useEffect, useMemo, useState, useRef, createRef } from 'react'
import { cn } from 'lib/utils'
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
  const navRefs = useRef(siteUrlList.map(() => createRef<HTMLAnchorElement>()))
  const [indicator, setIndicator] = useState<{ x: number; w: number }>({
    x: 0,
    w: 0,
  })

  const isActive = useMemo(() => {
    return (url: string) =>
      nowPath === url ||
      (nowPath.includes('/blog') && url.includes('/blog')) ||
      (nowPath.includes('/work') && url.includes('/work'))
  }, [nowPath])

  useEffect(() => {
    const activeIndex = siteUrlList.findIndex((site) => isActive(site.url))
    if (activeIndex !== -1) {
      const currentElement = navRefs.current[activeIndex]?.current
      if (currentElement) {
        setIndicator({
          x: currentElement.offsetLeft,
          w: currentElement.offsetWidth,
        })
      }
    }
  }, [nowPath, isActive])

  return (
    <div className="z-50 flex flex-col items-center justify-center">
      <div className="fixed bottom-4 flex items-center gap-1 rounded-[50px] border-[1px] border-solid border-white/15 bg-stone-100 p-[3px] dark:bg-stone-800">
        {indicator.w > 0 && (
          <div
            className="absolute inset-0 top-[3px] h-[35px] bg-white shadow-lg shadow-black/5 dark:bg-stone-700 dark:shadow-none"
            style={{
              borderRadius: 46,
              width: `${indicator.w}px`,
              transform: `translateX(${indicator.x}px)`,
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        )}
        {siteUrlList.map((site, index) => (
          <Link
            key={site.name}
            href={site.url}
            ref={navRefs.current[index]}
            prefetch={true}
            className={cn(
              'relative rounded-3xl px-2.5 py-[8px] text-[13px] font-[600] transition-all duration-500',
              isActive(site.url)
                ? 'text-black dark:text-white'
                : 'text-stone-400 dark:text-stone-500'
            )}
          >
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
