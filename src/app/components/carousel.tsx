'use client'

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetFollowingListQuery } from "../redux/apis/video-list-api";

export function Carousel() {
  const { data, isLoading } = useGetFollowingListQuery()

  return (
    <Swiper direction="vertical" className="w-full">
      {data?.items?.map((video) => (
        <SwiperSlide key={video.title} className="w-full">
          <CarouselItem>{video.title}</CarouselItem>
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
    <div {...props} className="p-4 h-full grid place-items-center">
      {children}
    </div>
  )
}