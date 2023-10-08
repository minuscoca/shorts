import { useCallback } from "react";
import { useMediaState } from "@vidstack/react";
import { PlayIcon, MuteIcon } from "@vidstack/react/icons";

import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { selectIsMuted, setIsMuted } from "@/app/redux/slices/player-slice";

export function Play() {
  const isPaused = useMediaState("paused");

  if (!isPaused) return null;

  return (
    <button className="rounded-full p-2 bg-slate-950/90" disabled>
      <PlayIcon size={48} />
    </button>
  );
}

export function Unmute() {
  const dispatch = useAppDispatch();
  const isMuted = useAppSelector(selectIsMuted);

  const unmute = useCallback(() => {
    if (isMuted) {
      dispatch(setIsMuted(false));
    }
  }, [isMuted, dispatch]);

  if (!isMuted) return null;

  return (
    <button
      id="unmute-btn"
      className="rounded-md px-4 py-1 flex items-center justify-center gap-2 bg-slate-50/90"
      onClick={(event) => {
        event.stopPropagation();
        unmute();
      }}
    >
      <MuteIcon size={20} className="text-slate-950" />
      <p className="text-slate-950">Unmute</p>
    </button>
  );
}
