'use client'

import { useEffect, useState } from 'react'
import TopBlurLayer from 'app/components/top-blur-layer'
import TopCommitBar from 'app/components/top-commit-bar'
import { AnimatePresence } from 'framer-motion'

export default function Form() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [entry, setEntry] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [unsubmitted, setUnsubmitted] = useState(false)

  useEffect(() => {
    if (name || email || entry) {
      setUnsubmitted(true)
    } else {
      setUnsubmitted(false)
    }
  }, [name, email, entry])

  const handleSubmit = async () => {
    if (!name || !email || !entry) {
      alert('Please fill in all fields')
      return
    }
    setDisabled(true)
    setLoading(true)
    // TODO: Add your logic here
    // await CreateGuestbookEntry(email, entry, name)
    setEmail('')
    setEntry('')
    setName('')
    setUnsubmitted(false)
    setDisabled(false)
    setLoading(false)
  }

  const handleCancel = () => {
    setEmail('')
    setEntry('')
    setName('')
  }

  return (
    <>
      <AnimatePresence>
        {unsubmitted && (
          <>
            <TopBlurLayer />
            <TopCommitBar
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
              disabled={disabled}
              loading={loading}
            />
          </>
        )}
      </AnimatePresence>
      <form className="relative">
        <section className="relative grid gap-2 md:grid-cols-2">
          <input
            aria-label="Your name"
            placeholder="Name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block rounded-lg border-neutral-300 bg-neutral-100 py-2 pl-4 text-[14px] text-neutral-900 placeholder-neutral-400 outline-none dark:bg-neutral-800 dark:text-neutral-100"
          />
          <input
            aria-label="Your email"
            placeholder="Email"
            name="email"
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block rounded-lg border-neutral-300 bg-neutral-100 py-2 pl-4 text-[14px] text-neutral-900 placeholder-neutral-400 outline-none dark:bg-neutral-800 dark:text-neutral-100"
          />
        </section>
        <textarea
          aria-label="Your message"
          placeholder="Message..."
          name="entry"
          required
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          className="mb-4 mt-2 block min-h-[80px] w-full rounded-lg border-neutral-300 bg-neutral-100 py-4 pl-4 pr-32 text-[14px] text-neutral-900 placeholder-neutral-400 outline-none dark:bg-neutral-800 dark:text-neutral-100"
        />
      </form>
    </>
  )
}
