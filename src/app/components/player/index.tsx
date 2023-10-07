'use client'

import {
  MediaPlayer,
  MediaProvider,
  Poster,
  type MediaPlayerInstance,
} from '@vidstack/react';
import { useCallback, useEffect, useRef } from 'react';
import type { Video } from '@/app/redux/apis/video-list-api'
import { VideoLayout } from './layout/video-layout';
import { useSwiperSlide } from "swiper/react";
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { selectIsMuted, setIsMuted } from '@/app/redux/slices/player-slice';

type Props = {
  data: Video
  tappedTimes: number
  isSwiping: boolean
}

export default function Player({ data, tappedTimes, isSwiping }: Props) {
  const playerRef = useRef<MediaPlayerInstance>(null)
  const { isActive } = useSwiperSlide()
  const dispatch = useAppDispatch()
  const isMuted = useAppSelector(selectIsMuted)
  const unmute = useCallback(() => {
    if (isMuted) {
      dispatch(setIsMuted(false))
    }
  }, [isMuted, dispatch])

  console.log('isMuted', isMuted)

  /**
   * play or pause video on user tap.
   */
  useEffect(() => {
    if (playerRef.current) {
      const { canPlay, playing } = playerRef.current.state

      if (tappedTimes === 1) {
        unmute()
      }

      if (isActive && canPlay && !playing && tappedTimes % 2 === 1) {
        playerRef.current.play()
      } else {
        playerRef.current.pause()
      }
    }
  }, [isActive, tappedTimes, unmute])

  /**
   * play video when user stop swiping.
   */
  useEffect(() => {
    if (playerRef.current && isActive && !isSwiping) {
      const { canPlay, playing } = playerRef.current.state

      if (canPlay && !playing) {
        playerRef.current.play()
      }
    }
  }, [isActive, isSwiping, unmute])

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
      className='w-full h-full'
      title={data.title}
      src={data.play_url}
      loop
      muted
      playsinline
    >
      <MediaProvider
        className='relative w-full h-full flex items-center justify-center'
        mediaProps={{ className: 'w-full' }}
      >
        <Poster
          className="absolute top-1/2 -translate-y-1/2 w-full scale-[102%]"
          src={data.cover}
          alt={data.title}
          hidden={!isSwiping} // show poster when user is swiping but keep the video playing
        />
      </MediaProvider>
      <VideoLayout data={data} />
    </MediaPlayer>
  )
}