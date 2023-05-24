import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

import { Navbar } from "@/ui/components";

import type { PropsWithChildren } from "react";

export interface MainLayoutProps extends PropsWithChildren {
  insideClass?: string;
}

export default function MainLayout({ insideClass, children }: MainLayoutProps) {
  return (
    <>
      <Navbar />
      <motion.main
        className={insideClass}
        initial={{ opacity: 0, y: '-24px' }}
        exit={{ opacity: 0, y: '24px' }}
        animate={{ opacity: 1, y: '0' }}
        transition={{ duration: .2, ease: 'easeIn' }}
      >
        {children}
      </motion.main>
    </>
  );
}
