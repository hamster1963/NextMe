'use client'
import { motion, Variants } from 'framer-motion'
import React, { useState, useEffect, useRef } from 'react'

type TextEffectProps = {
  children: string
  className?: string
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, filter: 'blur(15px)' },
  visible: { opacity: 1, filter: 'blur(0px)' },
}

const AnimationComponent: React.FC<{ word: string }> = React.memo(
  ({ word }) => (
    <motion.span
      aria-hidden="true"
      variants={itemVariants}
      className="inline-block"
    >
      {word}
    </motion.span>
  )
)

function splitText(text: string): string[] {
  if ('Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter('zh-CN', { granularity: 'word' })
    return Array.from(segmenter.segment(text), (segment) => segment.segment)
  } else {
    return text.split(/\s+/)
  }
}

export function TextEffect({ children, className }: TextEffectProps) {
  const words = React.useMemo(() => splitText(children), [children])
  const [visibleWords, setVisibleWords] = useState<string[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerHeight, setContainerHeight] = useState(20)

  useEffect(() => {
    const delays = words.map(() => Math.random() * 50 + 30)
    let timeouts: NodeJS.Timeout[] = []

    words.forEach((word, index) => {
      const timeout = setTimeout(
        () => {
          setVisibleWords((prev) => [...prev, word])
        },
        delays.slice(0, index + 1).reduce((sum, delay) => sum + delay, 0)
      )
      timeouts.push(timeout)
    })

    return () => timeouts.forEach(clearTimeout)
  }, [words])

  useEffect(() => {
    if (containerRef.current) {
      const height = containerRef.current.scrollHeight
      if (height < 20) {
        setContainerHeight(20)
      } else {
        setContainerHeight(containerRef.current.scrollHeight)
      }
    }
  }, [visibleWords])

  return (
    <motion.div
      style={{ height: containerHeight }}
      animate={{ height: containerHeight }}
      transition={{ duration: 0.2 }}
    >
      <motion.p
        ref={containerRef}
        initial="hidden"
        animate="visible"
        aria-label={children}
        variants={containerVariants}
        className={`${className} whitespace-normal`}
      >
        {visibleWords.map((word, wordIndex) => (
          <AnimationComponent key={`word-${wordIndex}`} word={word} />
        ))}
      </motion.p>
    </motion.div>
  )
}
