'use client'

import {
  MediaPlayer,
  MediaProvider,
  Poster,
  type MediaPlayerInstance,
} from '@vidstack/react';
import { useEffect, useRef, useState } from 'react';
import type { Video } from '@/app/redux/apis/video-list-api'
import { VideoLayout } from './layout/video-layout';
import { useSwiperSlide } from "swiper/react";

type Props = {
  data: Video
  tappedTimes: number
  isSwiping: boolean
}

export default function Player({ data, tappedTimes, isSwiping }: Props) {
  const playerRef = useRef<MediaPlayerInstance>(null)
  const { isActive } = useSwiperSlide()
  const [paused, setPaused] = useState(false)

  // play or pause video when slide is tapped.
  useEffect(() => {
    if (playerRef.current) {
      const { canPlay, playing } = playerRef.current.state


      if (isActive && canPlay && !playing && tappedTimes % 2 === 1) {
        playerRef.current.play()
      } else {
        playerRef.current.pause()
      }
    }
  }, [isActive, tappedTimes])


  // // play video when slide is swiped to active.
  useEffect(() => {
    if (playerRef.current) {
      const { canPlay, playing } = playerRef.current.state
      if (isSwiping) {
        playerRef.current.pause()
      } else if (isActive && canPlay && !playing) {
        playerRef.current.currentTime = 0 // restart video
        playerRef.current.play()
      }
    }
  }, [isActive, isSwiping])

  return (
    <MediaPlayer
      ref={playerRef}
      className='relative w-full h-full flex items-center justify-center'
      title={data.title}
      src={data.play_url}
      onPause={() => setPaused(true)}
      onPlay={() => setPaused(false)}
    >
      <MediaProvider className='relative w-full h-full grid place-items-center overflow-hidden' mediaProps={{ className: 'w-full' }}>
        <Poster
          className="absolute top-1/2 -translate-y-1/2 w-full scale-110 "
          src={data.cover}
          alt={data.title}
          hidden={!paused}
        />
      </MediaProvider>

      <VideoLayout data={data} />
    </MediaPlayer>
  )
}