"use client";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";

import { Video } from "@/app/redux/apis/video-list-api";
import { useAppDispatch } from "@/app/redux/hooks";
import { setActiveIndex, type Page } from "@/app/redux/slices/app-slice";

import Player from "./player";

export function Carousel({
  data,
  isLoading,
  page,
  initialSlide,
}: {
  data: { items: Video[] } | undefined;
  isLoading: boolean;
  page: Page;
  initialSlide: number;
}) {
  const dispatch = useAppDispatch();
  const [isSwiping, setIsSwiping] = useState(false);

  return (
    <Swiper
      direction="vertical"
      className="w-full"
      initialSlide={initialSlide}
      onSliderMove={() => setIsSwiping(true)}
      onTouchEnd={() => setIsSwiping(false)}
      onSlideChange={(swiper) => {
        const { activeIndex } = swiper;
        dispatch(setActiveIndex({ page, activeIndex }));
      }}
    >
      {data?.items?.map((video) => (
        <SwiperSlide key={video.title} className="w-full">
          <CarouselItem>
            <Player data={video} isSwiping={isSwiping} />
          </CarouselItem>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function CarouselItem({ children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className="h-full grid place-items-center overflow-hidden" {...props}>
      {children}
    </div>
  );
}
