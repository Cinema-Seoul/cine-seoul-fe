import { Loader } from "@/components/ui";
import { useGetApi } from "@/services/api";
import { getCurrentEvents } from "@/services/event.service";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

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
      <div className="container text-center py-8 h-48">
        {Events.loading ? (
          <Loader className="w-16 h-16" />
        ) : Events.data ? (
          Events.data.map(({ banner, eventNum }) => (
            <div key={eventNum} onClick={() => doOnClickBanner(eventNum)}>
              <img src={banner} />
            </div>
          ))
        ) : null}
      </div>
    </section>
  );
}
