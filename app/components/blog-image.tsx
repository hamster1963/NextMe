'use client'

import { cn } from 'lib/utils'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BlogImage({
  src,
  alt,
  width,
  height,
  hex,
}: {
  src: string
  alt: string
  width?: number
  height?: number
  hex?: string
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <>
      <div
        className={cn('relative h-full w-full', !isMobile && 'cursor-zoom-in')}
        onClick={() => !isMobile && setIsExpanded(true)}
      >
        <div
          className="absolute inset-0 rounded-xl"
          style={{ backgroundColor: hex }}
        />
        <img
          className={cn(
            'relative h-full w-full rounded-xl object-cover transition-all duration-500 dark:brightness-75 dark:hover:brightness-100',
            isLoading ? 'opacity-0 blur-lg' : 'opacity-100 blur-0'
          )}
          width={width}
          height={height}
          alt={alt}
          src={src}
          onLoad={() => setIsLoading(false)}
        />
        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10 dark:ring-white/10" />
      </div>

      <AnimatePresence>
        {isExpanded && !isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black bg-opacity-50 backdrop-blur-md"
            onClick={() => setIsExpanded(false)}
          >
            <motion.img
              src={src}
              alt={alt}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-h-[80vh] max-w-[80vw] rounded-lg object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
