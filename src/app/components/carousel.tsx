'use client'

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

type TData = {
  id: string
  title: string
}

const Data: TData[] = [
  { id: '1', title: "Slider 1" },
  { id: '2', title: "Slider 2" },
  { id: '3', title: "Slider 3" },
  { id: '4', title: "Slider 4" },
  { id: '5', title: "Slider 5" },
]

export function Carousel() {
  return (
    <Swiper direction="vertical" className="w-full">
      {Data.map((data) => (
        <SwiperSlide key={data.id} className="w-full">
          <CarouselItem>{data.title}</CarouselItem>
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
    <div {...props} className="p-4 h-full">
      {children}
    </div>
  )
}