import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AppState = Record<Page, PageParams>;
type PageParams = {
  activeIndex: number;
};

export const Pages = {
  following: "/following",
  foryou: "/foryou",
} as const;
export type Page = keyof typeof Pages;
export type Pathname = (typeof Pages)[Page];

const initialPageParams: PageParams = {
  activeIndex: 0,
};

const initialState: AppState = {
  following: initialPageParams,
  foryou: initialPageParams,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setActiveIndex: (
      state,
      action: PayloadAction<{ page: Page; activeIndex: number }>,
    ) => {
      const { page, activeIndex } = action.payload;
      state[page].activeIndex = activeIndex;
    },
  },
});

export const { setActiveIndex } = appSlice.actions;
