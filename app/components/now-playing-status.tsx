'use client'

import { RenderedTimeAgo } from './rendered-time-age'
import { useEffect, useState } from 'react'
import PercentBar from './percent-bar'
import AnimatedShinyText from './animated-shiny-text'

export default function NowPlayingStatus({
  play_state,
  timestamp,
  play_percent,
  total_play_time,
  now_playing_time,
  show_bar,
}: {
  play_state: boolean
  timestamp: number
  play_percent: number
  total_play_time: string
  now_playing_time: string
  show_bar: boolean
}) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient)
    return (
      <div className={'flex h-6 items-center justify-between'}>
        <div className="flex flex-row items-center gap-x-1.5 pl-1">
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-neutral-200 dark:bg-neutral-700"></span>
          </span>
          <div className="h-2 w-36 rounded-md bg-neutral-200 dark:bg-neutral-700" />
        </div>
        <div className="mr-1 h-2 w-9 rounded-md bg-neutral-200 dark:bg-neutral-700" />
      </div>
    )

  let lastPlayedString = ''
  let isExpired = false
  if (timestamp) {
    const now = new Date()
    const timestampInMs = timestamp * 1000
    const lastPlayedDate = new Date(timestampInMs)
    const diff = now.getTime() - timestampInMs

    isExpired = diff >= 60 * 1000

    if (isExpired) {
      const formattedDate = lastPlayedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'Asia/Shanghai',
        hour12: false,
      })
      lastPlayedString = ` ${formattedDate}`
    }
  }

  if (isExpired) {
    return (
      <div className={'flex items-center justify-between'}>
        <div className="flex flex-row items-center gap-x-1.5 pl-1">
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-neutral-200 dark:bg-neutral-700"></span>
          </span>
          <div className="text-xs opacity-40">
            Last played on{lastPlayedString}
          </div>
        </div>
        <RenderedTimeAgo timestamp={timestamp * 1000} />
      </div>
    )
  }

  return (
    <>
      <div className={'flex h-6 items-center justify-between'}>
        <div className="flex flex-row items-center gap-x-1.5 pl-1">
          {play_state && (
            <>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-600 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-600"></span>
              </span>
              <AnimatedShinyText className={'text-xs'}>
                Listening now
              </AnimatedShinyText>
            </>
          )}
          {!play_state && (
            <>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-400"></span>
              </span>
              <div className="text-xs opacity-30">Paused</div>
            </>
          )}
        </div>

        {show_bar ? (
          <div className={'flex flex-col items-end px-1'}>
            <div className="flex min-w-[60px] items-center justify-end gap-[1px] text-[11px] font-semibold">
              {now_playing_time}
              <div className="mb-[1px] ml-[0.5px] text-[9px] font-light opacity-30">
                /
              </div>
              <div className="flex justify-end text-[11px]">
                {total_play_time}
              </div>
            </div>
            <PercentBar playing={play_state} value={play_percent} />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  )
}
