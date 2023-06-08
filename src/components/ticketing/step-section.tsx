import clsx from "clsx";
import { motion } from "framer-motion";

import type { MouseEventHandler, PropsWithChildren } from "react";
import { Button } from "../ui";
import { IoArrowBack } from "react-icons/io5";

export interface StepSectionProps extends BaseProps, PropsWithChildren {
  title?: string;
  value?: string;
  bodyClass?: string;
  disabled?: boolean;
  onClickBack?: MouseEventHandler;
}

export default function StepSection({
  className,
  bodyClass,
  children,
  onClickBack,
  //
  title,
  value,
  disabled = false,
}: StepSectionProps) {
  return (
    <motion.section
      className={clsx(
        className,
        "relative rounded out-1 outline-neutral-6",
        disabled && "opacity-50"
      )}
      aria-disabled={disabled}
    >
      <div
        className={clsx(
          "p-4 flex flex-row items-center",
          "border-b border-solid border-neutral-6"
        )}
      >
        {onClickBack && (
          <Button
            className="flex-0 mr-4"
            variant="text"
            iconStart={<IoArrowBack />}
            onClick={onClickBack}
          >
            뒤로가기
          </Button>
        )}
        <div className="flex-1">
          <h2 className="text-xl font-bold">{title}</h2>
          {value && <span>{value}</span>}
        </div>
      </div>
      <div className={clsx(bodyClass, "overflow-y-auto")}>{children}</div>
      {disabled && <div className="absolute top-0 bottom-0 left-0 right-0" />}
    </motion.section>
  );
}
