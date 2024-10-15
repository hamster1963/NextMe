'use client'
import Link from 'next/link'
import Image from 'next/image'
import Spotify from '../../public/Spotify.webp'
import AppleMusic from '../../public/apple-music.webp'
import NowPlayingStatus from './now-playing-status'

type NowPlayingClientProps = {
  syncMusicData: any
}

export function NowPlayingClientSpotify(props: NowPlayingClientProps) {
  const { syncMusicData } = props
  return (
    <div className="flex flex-col gap-y-1 rounded-[10px] bg-neutral-200/40 p-1 dark:bg-neutral-700/50">
      <div className="relative flex w-full rounded-md border-[0.5px] border-neutral-200 bg-white/80 p-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-none dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-none">
        <div className="flex gap-x-2">
          <Link
            href={syncMusicData.spotify_url}
            className="bg-pro h-12 w-12 rounded-[3px]"
          >
            <img
              src={syncMusicData.artwork_url}
              width={50}
              height={50}
              className="h-12 w-12 rounded-[3px]"
              alt={syncMusicData.track_name}
            />
          </Link>
          <div className="flex flex-col justify-between py-1">
            <Link
              href={syncMusicData.spotify_url}
              className="flex items-center gap-1.5 text-sm font-medium"
            >
              {syncMusicData.track_name.toString().slice(0, 35)}
            </Link>
            <Link
              href={syncMusicData.artist_url}
              className="text-xs opacity-30"
            >
              {syncMusicData.artist}
            </Link>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 flex flex-col justify-end">
          <a
            href="https://developer.spotify.com/documentation/web-api/reference/get-information-about-the-users-current-playback"
            className="flex flex-row items-center gap-x-1.5"
          >
            <p className="text-[10px] opacity-30">Sync with</p>
            <Image
              src={Spotify}
              priority
              className="h-3 w-3 rounded-full"
              alt={'Spotify'}
            />
          </a>
        </div>
      </div>
      <NowPlayingStatus
        play_state={syncMusicData.player_state}
        timestamp={syncMusicData.timestamp}
        play_percent={syncMusicData.play_percent}
        total_play_time={syncMusicData.total_time}
        now_playing_time={syncMusicData.play_time}
        show_bar={true}
      />
    </div>
  )
}

export function NowPlayingClientApple(props: NowPlayingClientProps) {
  const { syncMusicData } = props
  return (
    <div className="flex flex-col gap-y-1 rounded-[10px] bg-neutral-200/40 p-1 dark:bg-neutral-700/50">
      <div className="relative flex w-full rounded-md border-[0.5px] border-neutral-200 bg-white/80 p-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-none dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-none">
        <div className="flex gap-x-2">
          <div className="relative h-12 w-12 rounded-[3px] bg-neutral-200 dark:bg-neutral-800">
            <Image
              src={syncMusicData.artwork_url}
              fill
              className={
                'h-full w-full rounded-[3px] object-cover transition-opacity duration-300 ease-in-out'
              }
              alt={syncMusicData.track_name}
            />
          </div>
          <div className="flex flex-col justify-between py-1">
            <div className="flex items-center gap-1.5 text-sm font-medium">
              {syncMusicData.track_name.toString().slice(0, 35)}
            </div>
            <div className="text-xs opacity-30">{syncMusicData.artist}</div>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 flex flex-col justify-end">
          <div className="flex flex-row items-center gap-x-1.5">
            <p className="text-[10px] opacity-30">Sync with</p>
            <Image
              src={AppleMusic}
              priority
              className="h-3 w-3 rounded-full"
              alt={'Apple Music'}
            />
          </div>
        </div>
      </div>
      <NowPlayingStatus
        play_state={syncMusicData.player_state}
        timestamp={syncMusicData.timestamp}
        play_percent={syncMusicData.play_percent}
        total_play_time={syncMusicData.total_time}
        now_playing_time={syncMusicData.play_time}
        show_bar={false}
      />
    </div>
  )
}

export function NowPlayingLoading() {
  return (
    <div className="flex flex-col gap-y-1 rounded-[10px] bg-neutral-200/40 p-1 dark:bg-neutral-700/50">
      <div className="flex w-full justify-between rounded-md border-[0.5px] border-neutral-200 bg-white/80 p-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-none dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-none">
        <div className="flex gap-x-2">
          <div className="h-12 w-12 rounded-[3px] bg-neutral-200 dark:bg-neutral-800" />
          <div className="flex flex-col justify-between py-1.5">
            <div className="h-4 w-24 rounded-[3px] bg-neutral-100 dark:bg-neutral-800" />
            <div className="h-3 w-10 rounded-[3px] bg-neutral-100 dark:bg-neutral-800" />
          </div>
        </div>
        <div className="flex flex-col justify-end"></div>
      </div>
      <div className={'flex h-6 items-center justify-between'}>
        <div className="flex flex-row items-center gap-x-1.5 pl-1">
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-neutral-200 dark:bg-neutral-700"></span>
          </span>
          <div className="h-2 w-36 rounded-md bg-neutral-200 dark:bg-neutral-700" />
        </div>
        <div className="mr-1 h-2 w-9 rounded-md bg-neutral-200 dark:bg-neutral-700" />
      </div>
    </div>
  )
}
