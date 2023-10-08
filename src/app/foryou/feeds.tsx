"use client";

import { useGetForYouListQuery } from "../redux/apis/video-list-api";
import { Carousel } from "../components/carousel";
import { useAppSelector } from "../redux/hooks";

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
