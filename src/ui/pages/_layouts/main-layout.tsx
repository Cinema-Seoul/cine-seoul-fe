import { motion } from "framer-motion";
import clsx from "clsx";

import { Navbar } from "@/ui/components";

import type { PropsWithChildren } from "react";

export interface MainLayoutProps extends PropsWithChildren {
  insideClass?: string
}

export default function MainLayout({ insideClass, children }: MainLayoutProps) {
  return (
    <>
      <Navbar />
      <motion.main className={insideClass}>{children}</motion.main>
    </>
  );
}
