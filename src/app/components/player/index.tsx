'use client'

import {
  MediaPlayer,
  MediaProvider,
  Poster,
  type MediaPlayerInstance,
} from '@vidstack/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSwiperSlide } from "swiper/react";

import type { Video } from '@/app/redux/apis/video-list-api'
import { VideoLayout } from './layout/video-layout';
import { useAppSelector } from '@/app/redux/hooks';
import { selectIsMuted } from '@/app/redux/slices/player-slice'

type Props = {
  data: Video
  isSwiping: boolean
}

export default function Player({ data, isSwiping }: Props) {
  const playerRef = useRef<MediaPlayerInstance>(null)
  const { isActive } = useSwiperSlide()
  const isMuted = useAppSelector(selectIsMuted)
  const [isReady, setIsReady] = useState(false)

  /**
   * add/remove event listeners to handle video muted.
   */
  useEffect(() => {
    /**
     * tirggered when the unmute button is clicked.
     */
    const handleUnmute = () => {
      if (playerRef.current && isActive) {
        playerRef.current.muted = false
      }
    }

    /**
     * triggered when user start touching.
     */
    const handleTouchStart = () => {
      if (playerRef.current) {
        playerRef.current.muted = true
      }
    }

    /**
     * triggered when user end touching.
     */
    const handleTouchEnd = () => {
      if (playerRef.current) {
        playerRef.current.muted = isMuted
      }
    }

    const unmutBtnElement = document.getElementById('unmute-btn')
    if (unmutBtnElement) {
      unmutBtnElement.addEventListener('click', handleUnmute)
    }
    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      if (unmutBtnElement) {
        unmutBtnElement.removeEventListener('click', handleUnmute)
      }
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isActive, isMuted])

  /**
   * play paused active video when user stop swiping.
   */
  useEffect(() => {
    if (playerRef.current && isActive && !isSwiping) {
      const { paused } = playerRef.current.state
      if (isReady && paused) {
        playerRef.current.play()
      }
    }
  }, [isActive, isSwiping, isReady])

  /**
   * pause all playing video when swiping.
   */
  useEffect(() => {
    if (playerRef.current) {
      if (isSwiping && playerRef.current.state.playing)
        playerRef.current.pause()
    }
  }, [isSwiping])

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
      onCanPlay={() => setIsReady(true)}
      onClick={
        // tap to play or pause video.
        () => {
          if (playerRef.current && isActive && isReady) {
            if (playerRef.current.state.playing) {
              playerRef.current.pause()
            } else {
              playerRef.current.play()
            }
          }
        }}
    >
      <MediaProvider
        className='relative w-full h-full'
        mediaProps={{ className: 'w-full h-full' }}
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