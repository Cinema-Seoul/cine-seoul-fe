import { StepSection } from "@/components/ticketing";
import { motion } from "framer-motion";

export default function TicketingPaymentPage() {
  return (
    <motion.div className="container py-6 h-full flex flex-row">
      <StepSection
        title="결제"
        className="flex flex-col flex-1"
        bodyClass="flex flex-row flex-1 items-stretch"
      >
        <div className="relative flex-1 p-4 overflow-y-auto">
          sdfsdf
        </div>
      </StepSection>
    </motion.div>
  );
}
