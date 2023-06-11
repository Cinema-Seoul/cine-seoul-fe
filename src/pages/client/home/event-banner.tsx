import { Loader } from "@/components/ui";
import { useGetApi } from "@/services/api";
import { getCurrentEvents } from "@/services/event.service";
import { PropsWithChildren, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "framer-motion-carousel";
import clsx from "clsx";

function EventCarousel({ children }: PropsWithChildren) {
  return (
    <Carousel
      autoPlay={true}
      interval={5000}
      loop={true}
      renderArrowLeft={() => null}
      renderArrowRight={() => null}
      renderDots={({ activeIndex, setActiveIndex }) => {
        return (
          <div className="absolute bottom-0 left-0 right-0 flex flex-row justify-start pt-8 space-x-2 p-4">
            {Array.isArray(children) &&
              children.map((_, i) => (
                <span
                  key={i}
                  className={clsx(
                    "w-12 h-2 pressable-opacity rounded",
                    i === activeIndex ? "bg-primary-9" : "bg-neutral-9 bg-opacity-50"
                  )}
                  onClick={() => setActiveIndex(i)}
                ></span>
              ))}
          </div>
        );
      }}
    >
      {children}
    </Carousel>
  );
}

export default function EventBanner() {
  const navigate = useNavigate();

  const Events = useGetApi(getCurrentEvents);

  const doOnClickBanner = useCallback(
    (eventNum: number) => {
      navigate(`/b/event/${eventNum}`);
    },
    [navigate]
  );

  return (
    <section className="bg-neutral-5">
      <div className="container text-center h-64">
        {Events.loading ? (
          <Loader className="w-16 h-16" />
        ) : Events.data ? (
          <EventCarousel>
            {Events.data.map(({ banner, eventNum, title }) => (
              <div className="relative h-full">
                <img
                  className="h-full w-full object-cover pressable-opacity"
                  key={eventNum}
                  src={banner}
                  onClick={() => doOnClickBanner(eventNum)}
                />
                <div className="absolute bottom-0 left-0 right-0 text-right py-2 px-4 font-bold bg-neutral-2 bg-opacity-80">
                  <span className="">{title}</span>
                </div>
              </div>
            ))}
          </EventCarousel>
        ) : null}
      </div>
    </section>
  );
}
