'use client'

import { useGetFollowingListQuery } from "../redux/apis/video-list-api";
import { Carousel } from "../components/carousel";
import { useAppSelector } from "../redux/hooks";

export default function Feeds() {
  const { data, isLoading } = useGetFollowingListQuery()
  const activeIndex = useAppSelector(state => state.app.following.activeIndex)
  return (
    <Carousel
      data={data}
      isLoading={isLoading}
      page='following'
      initialSlide={activeIndex}
    />
  )
}