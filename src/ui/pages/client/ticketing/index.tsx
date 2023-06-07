import { useTicketingStore } from "@/stores/client";
import { Button } from "@/ui/components/ui";
import { IoClose } from "react-icons/io5";
import { Route, Routes, redirect, useLocation, useNavigate, useNavigation, useParams } from "react-router-dom";

import TicketingFirstPage from "./step1";
import TicketingSecondaryPage from "./step2";
import ClientErrorPage from "../_error";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function TicketingPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { "*": restParams } = useParams();

  const { selectedDate, selectedMovies, selectedSchedule } = useTicketingStore();

  useEffect(() => {
    if (restParams && (!selectedSchedule)) {
      navigate("/ticketing", { replace: true });
    }
  }, [restParams, selectedSchedule]);

  return (
    <>
      <div className="flex flex-col justify-stretch items-stretch absolute top-0 bottom-0 left-0 right-0">
        <header className="flex-0 bg-primary-3 sticky top-0">
          <div className="container relative h-16">
            <div className="relative flex justify-between items-center h-full w-full">
              <h2 className="text-center text-2xl font-bold text-primary-12 justify-self-center">예매하기</h2>
              <Button
                variant="text"
                tint="primary"
                className="justify-self-end"
                iconStart={<IoClose />}
                onClick={() => {
                  navigate(-1);
                }}
              >
                모두 취소
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-hidden">
          <AnimatePresence>
            <Routes key={location.pathname}>
              <Route index Component={TicketingFirstPage} />
              <Route path="seat" Component={TicketingSecondaryPage} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}
