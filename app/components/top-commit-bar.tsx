'use client'

import { motion } from 'framer-motion'
import { Disc } from 'lucide-react'
import { LoadingSpinner } from './loader-spin'

type TopCommitBarProps = {
  handleSubmit: () => Promise<void>
  handleCancel: () => void
  disabled: boolean
  loading: boolean
}

export default function TopCommitBar({
  handleSubmit,
  handleCancel,
  disabled,
  loading,
}: TopCommitBarProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        initial={{ y: -50, opacity: 0, filter: 'blur(10px)' }}
        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        exit={{ y: -50, opacity: 0, filter: 'blur(10px)' }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="fixed top-4 z-50 flex items-center justify-between gap-4 rounded-[50px] border-[1px] border-solid bg-white px-2 py-1.5 shadow-xl shadow-black/5 dark:border-stone-700 dark:bg-stone-800 dark:shadow-none"
      >
        <section className="flex items-center gap-1.5">
          <Disc className="h-4 w-4 flex-shrink-0" />
          <p className="text-[12.5px] font-medium">
            Uncommitted comments
          </p>
        </section>
        <section className="flex items-center gap-1.5">
          <button
            className="rounded-full border-[1px] border-stone-200 bg-transparent px-2 py-1 text-xs font-medium text-black transition-colors hover:bg-stone-100 dark:border-stone-700 dark:text-white dark:hover:bg-stone-700"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            disabled={disabled}
            className="rounded-full bg-black px-2 py-1 text-xs font-medium text-white transition-colors hover:bg-stone-700 dark:bg-stone-600"
            onClick={handleSubmit}
          >
            {loading ? <LoadingSpinner /> : 'Submit'}
          </button>
        </section>
      </motion.div>
    </div>
  )
}
