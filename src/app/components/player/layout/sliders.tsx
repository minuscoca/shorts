import { TimeSlider, useMediaState } from '@vidstack/react';
import { useSwiperSlide } from 'swiper/react';

export function Time() {
  const isPaused = useMediaState('paused');
  const { isActive } = useSwiperSlide()

  return (
    <TimeSlider.Root
      className={`
      time-slider group relative inline-flex w-full cursor-pointer touch-none select-none items-center outline-none transition-all duration-500 mt-[3%]
      ${isPaused && isActive && "z-50 m-[5%]"}
    `}
    >
      <TimeSlider.Chapters className="relative flex h-full w-full items-center">
        {(cues, forwardRef) =>
          cues.map((cue) => (
            <div
              className="last-child:mr-0 relative mr-0.5 flex h-full w-full items-center"
              style={{ contain: 'layout style' }}
              key={cue.startTime}
              ref={forwardRef}
            >
              <TimeSlider.Track className={`relative ring-media-focus z-0 h-[5px] w-full bg-white/30 ${isPaused && isActive ? 'rounded-sm' : 'rounded-none'}`}>
                <TimeSlider.TrackFill className={`bg-red-500 absolute h-full w-[var(--chapter-fill)] will-change-[width] ${isPaused && isActive ? 'rounded-sm' : 'rounded-none'}`} />
                <TimeSlider.Progress className={`absolute z-10 h-full w-[var(--chapter-progress)] will-change-[width] ${isPaused && isActive ? 'rounded-sm' : 'rounded-none'}`} />
              </TimeSlider.Track>
            </div>
          ))
        }
      </TimeSlider.Chapters>

      {isPaused && <TimeSlider.Thumb
        className={`
        absolute 
        left-[var(--slider-fill)] 
        top-1/2 
        z-20 
        h-[16px] 
        w-[16px] 
        -translate-x-1/2 
        -translate-y-1/2 
        will-change-[left]
        rounded-full 
        transition-opacity 
        bg-red-500 
        group-data-[dragging]:ring-4 
        group-data-[dragging]:border 
        group-data-[dragging]:ring-white/25 
        group-data-[dragging]:border-[#cacaca] 
        ${isPaused && isActive ? "opacity-100" : "opacity-0"}
        `}
      />}
    </TimeSlider.Root>
  );
}
