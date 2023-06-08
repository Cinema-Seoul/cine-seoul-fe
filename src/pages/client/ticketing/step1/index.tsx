import { useTicketingStore } from "@/stores/client";
import DateSelectSubpage from "./date-select";
import MovieSelectSubpage from "./movie-select";
import ScheduleSelectSubpage from "./schedule-select";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function TicketingFirstPage() {
  return (
    <motion.div
    // initial={{ x: "24px" }}
    // exit={{ x: "-24px" }}
    // animate={{ x: 0 }}
      className="container py-6 h-full flex flex-row"
    >
      <div className="flex flex-col flex-0 w-96 mr-4 space-y-4">
        <DateSelectSubpage className="flex-0" />
        <MovieSelectSubpage className="flex-1" />
      </div>
      <ScheduleSelectSubpage className="flex-1" />
    </motion.div>
  );
}
