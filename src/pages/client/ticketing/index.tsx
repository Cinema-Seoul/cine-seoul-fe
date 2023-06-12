import { Button } from "@/components/ui";
import { IoClose } from "react-icons/io5";
import { Navigate, Route, Routes, redirect, useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { Navbar } from "@/components";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useEffect, useMemo } from "react";
import TicketingPaymentPage from "./payment";
import TicketingFirstPage from "./step1";
import TicketingSecondaryPage from "./step2";
import { useTicketingStore } from "@/stores/client";

export default function TicketingPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams({
    redirect: "/",
  });

  const redirectUrl = useMemo(() => searchParams.get("redirect") ?? "/", [searchParams]);
  const doRedirect = () => navigate(redirectUrl);

  return (
    <>
      <div className="flex flex-col justify-stretch items-stretch absolute top-0 bottom-0 left-0 right-0 overflow-hidden">
        <Navbar withMenu={false} />
        <header className="flex-0 bg-primary-3 sticky top-0">
          <div className="container relative h-16">
            <div className="relative flex justify-between items-center h-full w-full">
              <h2 className="text-center text-2xl font-bold text-primary-12 justify-self-center">예매하기</h2>
              <Button
                variant="text"
                tint="primary"
                className="justify-self-end"
                iconStart={<IoClose />}
                onClick={doRedirect}
              >
                닫기
              </Button>
            </div>
          </div>
        </header>
        <AnimatePresence mode="wait">
          <motion.main
            className="flex-1 overflow-hidden"
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              ease: "linear",
            }}
          >
            <Routes>
              <Route index Component={TicketingFirstPage} />
              <Route path="seat" Component={TicketingSecondaryPage} />
              <Route path="payment" Component={TicketingPaymentPage} />
              <Route path="*" element={<Navigate to={"/ticketing"} replace />} />
            </Routes>
          </motion.main>
        </AnimatePresence>
      </div>
    </>
  );
}
