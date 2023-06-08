import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

import { Navbar } from "@/components";

import type { PropsWithChildren } from "react";
import MainFooter from "@/components/footer/main-footer";

export interface MainLayoutProps extends PropsWithChildren {
  insideClass?: string;
}

export default function MainLayout({ insideClass, children }: MainLayoutProps) {
  return (
    <>
      <Navbar />
      <motion.main
        className={insideClass}
        initial={{ opacity: 0, y: "-16px" }}
        exit={{ opacity: 0, y: "-32px" }}
        animate={{ opacity: 1, y: "0" }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {children}
      </motion.main>
      <MainFooter />
    </>
  );
}
