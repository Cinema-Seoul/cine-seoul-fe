import { motion } from "framer-motion";
import SeatSelectSubpage from "./seat-select";
import { useUser } from "@/services/user/user.application";

export interface PageProps {}

export default function TicketingSecondaryPage() {

  const currentUser = useUser();

  if (!currentUser) {
    
  }

  return (
    <motion.div className="container py-6 h-full flex flex-row">
      <SeatSelectSubpage className="flex-1" />
    </motion.div>
  );
}
