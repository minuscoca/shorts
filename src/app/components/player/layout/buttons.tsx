import { useMediaState, } from '@vidstack/react';
import { PlayIcon, } from '@vidstack/react/icons';

export function Play() {
  const isPaused = useMediaState('paused');

  return (
    <div className='grid place-items-center'>
      <div className={`rounded-full p-2 ${isPaused && "bg-slate-950/60"}`}>
        <PlayIcon className={`w-12 h-12 opacity-0 ${isPaused ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    </div>
  );
}
