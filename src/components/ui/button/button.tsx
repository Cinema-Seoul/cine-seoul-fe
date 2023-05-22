import clsx from "clsx";

import * as $ from "./button.module.scss";

import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import type { Variant, Tint } from "./button.types";

const variantClasses: Record<Variant, string> = {
  tonal: $.__tonal,
  contained: $.__contained,
  text: $.__text,
};

const tintClasses: Record<Tint, string> = {
  primary: $.__primary,
  neutral: $.__neutral,
};

export interface ButtonProps extends ComponentPropsWithoutRef<"a"> {
  variant?: Variant;
  tint?: Tint;
}

export default function Button({
  className,
  children,
  variant = "tonal",
  tint = "neutral",
  ...restProps
}: ButtonProps) {
  return (
    <a
      className={clsx(
        className,
        $.root,
        variantClasses[variant],
        tintClasses[tint]
      )}
      {...restProps}
    >
      <span className={$.label}>{children}</span>
    </a>
  );
}
