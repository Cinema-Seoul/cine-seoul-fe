import { motion } from "framer-motion";
import SeatSelectSubpage from "./seat-select";

export interface PageProps {}

export default function TicketingSecondaryPage() {
  return (
    <motion.div
      // initial={{ x: "-50%" }}
      // exit={{ x: "50%" }}
      // animate={{ x: 0 }}
      className="container py-6 h-full flex flex-row"
    >
      <SeatSelectSubpage className="flex-1" />
    </motion.div>
  );
}
