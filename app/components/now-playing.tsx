'use client'
import { motion, AnimatePresence } from 'framer-motion'
import {
  NowPlayingClientApple,
  NowPlayingClientSpotify,
} from './now-playing-client'

import { NowPlayingLoading } from './now-playing-client'

type MusicData = {
  client_type: 'Apple Music' | 'spotify' | string
}



const clientComponents = {
  'Apple Music': NowPlayingClientApple,
  spotify: NowPlayingClientSpotify,
}

export default function NowPlayingInit() {
  const data = {
    "album": "Timeless",
    "artist": "Khalil Fong",
    "artist_url": "",
    "artwork_placeholder_url": "",
    "artwork_url": "https://pub-85fe3948f0644e2cba137d74f3630b8b.r2.dev/IMG_4040.jpeg",
    "client_type": "Apple Music",
    "play_percent": 0,
    "play_time": "",
    "player_state": true,
    "spotify_url": "",
    "timestamp": 1726282587,
    "total_time": "",
    "track_name": "Red Bean"
  }

  return (
    <div style={{ position: 'relative', minHeight: '100px' }}>
      <AnimatePresence>
        {!data ? (
          <motion.div
            key="loading"
            style={{ position: 'absolute', width: '100%' }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <NowPlayingLoading />
          </motion.div>
        ) : (
          <motion.div
            key="nowPlaying"
            style={{
              position: 'absolute',
              width: '100%',
              animation: 'blurFadeIn 0.8s forwards',
            }}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
          >
            <NowPlaying fallbackData={data} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function NowPlaying({ fallbackData }: { fallbackData: MusicData }) {

  const ClientComponent = clientComponents[fallbackData.client_type]

  if (ClientComponent) {
    return <ClientComponent syncMusicData={fallbackData} />
  }

  return <div>Unknown client type</div>
}
