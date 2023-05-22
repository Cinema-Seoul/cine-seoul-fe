import { motion } from "framer-motion";

import type { PropsWithChildren } from "react";

export interface MainLayoutProps extends PropsWithChildren, BaseProps {}

export default function MainLayout({ className, children }: MainLayoutProps) {
  return (
    <>
      <motion.main className={className}>{children}</motion.main>
    </>
  );
}
