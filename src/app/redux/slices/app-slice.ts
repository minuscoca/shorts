import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type AppState = Record<Page, PageParams>;
type PageParams = {
  activeIndex: number;
};

const pages = ['following', 'foryou'] as const;
export type Page = (typeof pages)[number];

const initialState = pages.reduce<AppState>((acc, curr) => {
  acc[curr] = { activeIndex: 0 };
  return acc;
}, {} as AppState);

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActiveIndex: (
      state,
      action: PayloadAction<{ page: Page; activeIndex: number }>
    ) => {
      const { page, activeIndex } = action.payload;
      state[page].activeIndex = activeIndex;
    },
  },
});

export const { setActiveIndex } = appSlice.actions;
