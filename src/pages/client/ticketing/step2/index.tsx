import { motion } from "framer-motion";
import SeatSelectSubpage from "./seat-select";
import { useAuthGuard, useUser } from "@/services/user/user.application";
import NeedSignPage from "./need-sign";
import { useEffect } from "react";
import { useTicketingStore } from "@/stores/client";

export interface PageProps {}

export default function TicketingSecondaryPage() {
  const currentUser = useUser();

  if (!currentUser) {
    return <NeedSignPage />;
  }

  return (
    <motion.div className="container py-6 h-full flex flex-row">
      <SeatSelectSubpage className="flex-1" />
    </motion.div>
  );
}
