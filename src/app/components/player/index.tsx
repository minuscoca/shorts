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
  const [playedTimes, setPlayedTimes] = useState(0)

  /**
   * play or pause video on user tap.
   */
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

  /**
   * pause viedo when user is swiping.
   * play video when user stop swiping.
   */
  useEffect(() => {
    if (playerRef.current) {
      const { canPlay, playing } = playerRef.current.state

      if (isSwiping) {
        playerRef.current.pause()
        setPlayedTimes(0)
      } else if (isActive && canPlay && !playing) {
        playerRef.current.play()
      }
    }
  }, [isActive, isSwiping])

  /**
   * restart when user swipe to a different video.
   */
  useEffect(() => {
    if (playerRef.current && isActive) {
      playerRef.current.currentTime = 0
    }
  }, [isActive])

  return (
    <MediaPlayer
      ref={playerRef}
      className='relative w-full h-full flex items-center justify-center'
      title={data.title}
      src={data.play_url}
      onPlay={() => setPlayedTimes(prev => prev + 1)}
      autoplay
    >
      <MediaProvider className='relative w-full h-full grid place-items-center overflow-hidden' mediaProps={{ className: 'w-full' }}>
        <Poster
          className="absolute top-1/2 -translate-y-1/2 w-full scale-[102%]"
          src={data.cover}
          alt={data.title}
          hidden={playedTimes !== 0}
        />
      </MediaProvider>
      <VideoLayout data={data} />
    </MediaPlayer>
  )
}