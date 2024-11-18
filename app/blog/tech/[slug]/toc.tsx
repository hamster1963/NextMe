'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const scrollToHeading = (text: string) => {
  const headingTag = document.getElementById(decodeURI(text))
  if (headingTag) {
    window.scrollTo({
      behavior: 'smooth',
      top: headingTag.offsetTop - 50,
    })
  }
}

export default function TOC({ headings }) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-50px 0px -50% 0px' }
    )

    headings.forEach((heading) => {
      const element = document.getElementById(decodeURI(heading.id))
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  return (
    <motion.div
      className="fixed left-0 top-[15%] z-10 hidden max-h-[75vh] overflow-y-auto p-4 lg:block"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <ul className={'text-left'}>
        <motion.a
          href={`#`}
          onClick={() => setActiveId('')}
          className="text-[15px] font-medium text-neutral-400 transition-colors hover:text-neutral-800 dark:text-neutral-600 dark:hover:text-neutral-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          TOC
        </motion.a>
        {headings.map((heading, index) => (
          <motion.li
            key={index}
            className={`py-[1px] ${getIndentClass(heading.level)}`}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.1 * (index + 1) }}
          >
            <a
              onClick={() => scrollToHeading(heading.id)}
              className={`cursor-pointer text-[13px] font-medium transition-colors hover:text-neutral-800 dark:hover:text-neutral-400 ${
                activeId === heading.id
                  ? 'text-neutral-800 dark:text-neutral-400'
                  : 'text-neutral-400 dark:text-neutral-600'
              }`}
            >
              {heading.text}
            </a>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

function getIndentClass(level: number): string {
  switch (level) {
    case 2:
      return 'ml-0'
    case 3:
      return 'ml-2'
    case 4:
      return 'ml-4'
    case 5:
      return 'ml-6'
    default:
      return 'ml-8'
  }
}
