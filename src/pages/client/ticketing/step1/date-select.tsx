import { DayPicker } from "react-day-picker";
import { useTicketingStore } from "@/stores/client";
import { StepSection } from "@/components/ticketing";
import { ko } from "date-fns/locale";
import { useMemo } from "react";
import { format } from "date-fns";

import datePickerStyles from 'react-day-picker/dist/style.module.css';
import clsx from "clsx";

export default function DateSelectSubpage({ className }: BaseProps) {
  const { selectedDate, updateDate, clearSelection } = useTicketingStore();

  const today = useMemo(() => new Date(), []);

  return (
    <StepSection title="날짜" value={selectedDate && format(selectedDate, "PPP", { locale: ko })} className={className} bodyClass="">
      <DayPicker
        mode="single"
        required
        selected={selectedDate}
        onSelect={updateDate}
        locale={ko}
        classNames={{
          month: "flex-1",
          table: "w-full"
        }}
        today={today}
        showOutsideDays
        fixedWeeks
        disabled={{ before: today }}
      />
    </StepSection>
  );
}
