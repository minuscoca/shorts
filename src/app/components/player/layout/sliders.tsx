import { TimeSlider, useMediaState } from "@vidstack/react";
import { useSwiperSlide } from "swiper/react";
import { cn } from "@/app/libs/utils";

export function Time() {
  const isPaused = useMediaState("paused");
  const { isActive } = useSwiperSlide();

  return (
    <TimeSlider.Root
      className={cn(
        "time-slider group relative inline-flex w-full cursor-pointer touch-none select-none items-center outline-none transition-all duration-500 mt-[3%]",
        {
          "z-50 m-[5%]": isPaused && isActive,
        },
      )}
    >
      <TimeSlider.Chapters className="relative flex h-full w-full items-center">
        {(cues, forwardRef) =>
          cues.map((cue) => (
            <div
              className="last-child:mr-0 relative mr-0.5 flex h-full w-full items-center"
              style={{ contain: "layout style" }}
              key={cue.startTime}
              ref={forwardRef}
            >
              <TimeSlider.Track
                className={cn(
                  "relative ring-media-focus z-0 h-[5px] w-full bg-white/30",
                  {
                    "rounded-sm": isPaused && isActive,
                  },
                )}
              >
                <TimeSlider.TrackFill
                  className={cn(
                    "bg-red-500 absolute h-full w-[var(--chapter-fill)] will-change-[width]",
                    {
                      "rounded-sm": isPaused && isActive,
                    },
                  )}
                />
                <TimeSlider.Progress
                  className={cn(
                    "absolute z-10 h-full w-[var(--chapter-progress)] will-change-[width]",
                    {
                      "rounded-sm": isPaused && isActive,
                    },
                  )}
                />
              </TimeSlider.Track>
            </div>
          ))
        }
      </TimeSlider.Chapters>

      {isPaused && (
        <TimeSlider.Thumb
          className={cn(
            "absolute left-[var(--slider-fill)] top-1/2 z-20 h-[16px] w-[16px] -translate-x-1/2 -translate-y-1/2 will-change-[left] rounded-full transition-opacity bg-red-500 group-data-[dragging]:ring-4 group-data-[dragging]:border group-data-[dragging]:ring-white/25 group-data-[dragging]:border-[#cacaca] opacity-0",
            {
              "opacity-100": isPaused && isActive,
            },
          )}
        />
      )}
    </TimeSlider.Root>
  );
}
