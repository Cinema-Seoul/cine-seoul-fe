import { motion } from "framer-motion";
import clsx from "clsx";

import { Navbar } from "@/components";

import type { PropsWithChildren } from "react";

export interface MainLayoutProps extends PropsWithChildren, BaseProps {}

export default function MainLayout({ className, children }: MainLayoutProps) {
  return (
    <>
      <Navbar />
      <motion.main className={className}>{children}</motion.main>
    </>
  );
}
