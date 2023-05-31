import clsx from "clsx";
import { motion } from "framer-motion";

import type { PropsWithChildren } from "react";

export interface StepSectionProps extends BaseProps, PropsWithChildren {
  title?: string;
  bodyClass?: string;
}

export default function StepSection({
  className,
  bodyClass,
  children,
  //
  title,
}: StepSectionProps) {
  return (
    <motion.section
      className={clsx(className, "rounded out-1 outline-neutral-6")}
    >
      <div className={clsx("p-4", "border-b border-solid border-neutral-6")}>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className={bodyClass}>
        {children}
      </div>
      <div></div>
    </motion.section>
  );
}
