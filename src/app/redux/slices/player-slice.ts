import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type PlayerState = {
  isMuted: boolean;
};

const initialState: PlayerState = {
  isMuted: true,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setIsMuted: (state, action: PayloadAction<boolean>) => {
      state.isMuted = action.payload;
    },
  },
});

export const { setIsMuted } = playerSlice.actions;
export const selectIsMuted = (state: RootState) => state.player.isMuted;
