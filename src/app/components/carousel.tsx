'use client'

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Video } from "../redux/apis/video-list-api";
import Player from "./player";
import { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { setActiveIndex, type Page } from "../redux/slices/app-slice";
import { usePathname } from "next/navigation";

export function Carousel({
  data,
  isLoading,
  page,
  initialSlide,
}: {
  data: { items: Video[] } | undefined,
  isLoading: boolean
  page: Page
  initialSlide: number
}) {
  const dispatch = useAppDispatch()
  const [isSwiping, setIsSwiping] = useState(false)
  const [tappedTimes, setTapedTimes] = useState(0)

  return (
    <Swiper
      direction="vertical"
      className="w-full"
      initialSlide={initialSlide}
      onSlideChange={(swiper) => {
        dispatch(setActiveIndex({ page, activeIndex: swiper.activeIndex }))
      }}
      onSliderMove={(swiper, event) => {
        setIsSwiping(true)
        setTapedTimes(0)
      }}
      onTouchEnd={() => {
        setIsSwiping(false)
      }}
      onTap={() => {
        setTapedTimes(prev => prev + 1)
      }}
    >
      {data?.items?.map((video, index) => (
        <SwiperSlide
          key={video.title}
          className="w-full"
        >
          <CarouselItem>
            <Player
              data={video}
              tappedTimes={tappedTimes}
              isSwiping={isSwiping}
            />
          </CarouselItem>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

function CarouselItem({
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div {...props} className="h-full grid place-items-center">
      {children}
    </div>
  )
}