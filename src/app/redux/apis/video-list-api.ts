import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Video = {
  title: string;
  cover: string;
  play_url: string;
};

// Define a service using a base URL and expected endpoints
export const videoListApi = createApi({
  reducerPath: "videoListApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8088" }),
  endpoints: (builder) => ({
    getFollowingList: builder.query<{ items: Video[] }, void>({
      query: () => "following_list",
    }),
    getForYouList: builder.query<{ items: Video[] }, void>({
      query: () => "for_you_list",
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetFollowingListQuery, useGetForYouListQuery } = videoListApi;
