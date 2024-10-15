'use client'

import ms from 'ms'
import { useEffect, useRef, useState } from 'react'

// https://github.com/streamich/react-use/blob/master/src/useInterval.ts
const useInterval = (callback: Function, delay?: number | null) => {
  const savedCallback = useRef<Function>(() => {})

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    if (delay !== null) {
      const interval = setInterval(() => savedCallback.current(), delay || 0)
      return () => clearInterval(interval)
    }

    return undefined
  }, [delay])
}

export function RenderedTimeAgo({ timestamp }: { timestamp: number }) {
  const [msAgo, setMsAgo] = useState<number>(0)

  // update on page change
  useEffect(() => {
    setMsAgo(Date.now() - timestamp)
  }, [timestamp])

  // update every second
  useInterval(() => {
    setMsAgo(Date.now() - timestamp)
  }, 1000)

  return (
    <div
      className="flex h-6 w-20 flex-row items-center justify-end px-1"
      title={new Date(timestamp).toISOString()}
    >
      {msAgo ? (
        <>
          <span
            // https://react.dev/reference/react-dom/hydrate#suppressing-unavoidable-hydration-mismatch-errors
            suppressHydrationWarning={true}
            className="text-xs font-semibold tabular-nums opacity-70"
          >
            {msAgo >= 1000 ? ms(msAgo) : '0s'}
          </span>{' '}
          <span className="ml-0.5 text-xs opacity-50">ago</span>
        </>
      ) : null}
    </div>
  )
}
