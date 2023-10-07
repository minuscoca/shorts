import { useMediaState, } from '@vidstack/react';
import { PlayIcon, MuteIcon } from '@vidstack/react/icons';

export function Play() {
  const isPaused = useMediaState('paused');

  if (!isPaused) return null

  return (
    <button className='rounded-full p-2 bg-slate-950/90' disabled>
      <PlayIcon size={48} />
    </button>
  );
}

export function Unmute() {
  const isMuted = useMediaState('muted');

  if (!isMuted) return null

  return (
    <button className='rounded-md px-4 py-1 flex items-center justify-center gap-2 bg-slate-50/90' disabled>
      <MuteIcon size={20} className='text-slate-950' />
      <p className='text-slate-950'>Unmute</p>
    </button>
  )
}