import { Controls } from "@vidstack/react";

import { Video } from "@/app/redux/apis/video-list-api";

import * as Buttons from "./buttons";
import * as Sliders from "./sliders";

export function VideoLayout({ data }: { data: Video }) {
  return (
    <Controls.Root className="absolute inset-0 z-10 flex flex-col-reverse">
      <Controls.Group className="flex w-full items-center">
        <Sliders.Time />
      </Controls.Group>

      <Controls.Group className="absolute inset-0 grid place-items-center">
        <Buttons.Play />
      </Controls.Group>

      <div className="px-[5%]">
        <h1 className="text-lg">{data.title}</h1>
      </div>

      <Controls.Group className="absolute top-[12%] left-[5%]">
        <Buttons.Unmute />
      </Controls.Group>
    </Controls.Root>
  );
}
