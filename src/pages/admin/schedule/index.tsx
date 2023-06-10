import AdminDataComplex, { OnGetDetailFunc, OnGetListFunc, OnSetCreated, OnSetEdited } from "@/components/admin-data-complex";
import { Button } from "@/components/ui";
import { createSchedule, getScheduleDetail, getSchedules, updateSchedule } from "@/services/schedule/schedule.service";
import { ScheduleCreation, ScheduleDetail, ScheduleListEntry, ScheduleUpdating } from "@/types";
import { fmt } from "@/utils/date";
import { ko } from "date-fns/locale";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, createContext, useCallback, useContext, useState } from "react";
import { DayPicker } from "react-day-picker";
import { IoCalendar } from "react-icons/io5";
import { createHead, detailHead, editHead, listHead } from "./display";

/* ------------------------------ Page Context ------------------------------ */

const PageContext = createContext<{
  date: Date;
  setDate: Dispatch<Date>;
}>({} as any);

/* -------------------------------------------------------------------------- */
/*                                 Components                                 */
/* -------------------------------------------------------------------------- */

function PageFilter() {
  const { date, setDate } = useContext(PageContext);

  const [expanded, setExpanded] = useState<"date" | null>(null);

  return (
    <div className="border-b border-solid border-neutral-6">
      <div className="flex flex-row p-2">
        {/* 날짜 선택 */}
        <div className="flex-0">
          <Button
            variant="text"
            iconStart={<IoCalendar />}
            onClick={() => setExpanded((o) => (o === "date" ? null : "date"))}
          >
            {fmt(date, "PPP")}
          </Button>
          <AnimatePresence>
            {expanded === "date" && (
              <motion.div
                key={expanded}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute card z-48"
              >
                <DayPicker
                  mode="single"
                  required
                  selected={date}
                  onSelect={setDate as (d?: Date) => void}
                  locale={ko}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

export default function AdminSchedulePage() {
  const [date, setDate] = useState<Date>(new Date());

  const onGetList: OnGetListFunc<ScheduleListEntry> = useCallback(
    (page, size) => getSchedules({ page, size, date }),
    [date]
  );

  const onGetDetail: OnGetDetailFunc<ScheduleListEntry, ScheduleDetail> = useCallback(
    ({ schedNum }) => getScheduleDetail(schedNum),
    []
  );

  const onSubmitEdit: OnSetEdited<ScheduleUpdating> = useCallback((result) => updateSchedule(result), []);

  const onSubmitCreate: OnSetCreated<ScheduleCreation> = useCallback((result) => createSchedule(result), []);

  return (
    <PageContext.Provider
      value={{
        date,
        setDate,
      }}
    >
      <div>
        <PageFilter />
        <AdminDataComplex
          //L
          listHead={listHead}
          onGetList={onGetList}
          listDeps={[date]}
          //D
          detailHead={detailHead}
          onGetDetail={onGetDetail}
          //E
          editHead={editHead}
          onSubmitEdit={onSubmitEdit}
          //C
          creationHead={createHead}
          onSubmitCreate={onSubmitCreate}
          // creationHead={}
        />
      </div>
    </PageContext.Provider>
  );
}
