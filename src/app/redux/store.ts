import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import { videoListApi } from "./apis/video-list-api";
import { appSlice } from "./slices/app-slice";
import { playerSlice } from "./slices/player-slice";

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    player: playerSlice.reducer,

    // Add the generated reducer as a specific top-level slice
    [videoListApi.reducerPath]: videoListApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(videoListApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
