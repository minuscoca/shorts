'use client'

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetFollowingListQuery } from "../redux/apis/video-list-api";
import Player from "./player";
import { useState } from "react";

export function Carousel() {
  const { data, isLoading } = useGetFollowingListQuery()
  const [isSwiping, setIsSwiping] = useState(false)
  const [tappedTimes, setTapedTimes] = useState(0)

  return (
    <Swiper
      direction="vertical"
      className="w-full"
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