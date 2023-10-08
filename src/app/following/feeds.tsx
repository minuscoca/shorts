"use client";

import { useAppSelector } from "@/app/redux/hooks";
import { useGetFollowingListQuery } from "@/app/redux/apis/video-list-api";
import { Carousel } from "@/app/components/carousel";

export default function Feeds() {
  const { data, isLoading } = useGetFollowingListQuery();
  const activeIndex = useAppSelector(
    (state) => state.app.following.activeIndex,
  );
  return (
    <Carousel
      data={data}
      isLoading={isLoading}
      page="following"
      initialSlide={activeIndex}
    />
  );
}
