"use client";

import { useAppSelector } from "@/app/redux/hooks";
import { useGetForYouListQuery } from "@/app/redux/apis/video-list-api";
import { Carousel } from "@/app/components/carousel";

export default function Feeds() {
  const { data, isLoading } = useGetForYouListQuery();
  const activeIndex = useAppSelector((state) => state.app.foryou.activeIndex);

  return (
    <Carousel
      data={data}
      isLoading={isLoading}
      page="foryou"
      initialSlide={activeIndex}
    />
  );
}
