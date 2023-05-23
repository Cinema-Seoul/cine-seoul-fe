import clsx from "clsx";

import * as $ from "./button.module.scss";

import type { ComponentPropsWithoutRef, ElementType } from "react";
import type { Size, Tint, Variant } from "./button.types";

const variantClasses: Record<Variant, string> = {
  tonal: $.__tonal,
  contained: $.__contained,
  text: $.__text,
};

const tintClasses: Record<Tint, string> = {
  primary: $.__primary,
  neutral: $.__neutral,
};

const sizeClasses: Record<Size, string|null> = {
  sm: $.__sm,
  md: null,
  lg: $.__lg,
};

interface ButtonPropsPlain {
  variant?: Variant;
  tint?: Tint;
  size?: Size;
}

export type ButtonProps<C extends ElementType> = ButtonPropsPlain & ComponentPropsWithoutRef<C> & {
  as?: C,
};

export default function Button<C extends ElementType = 'button'>({
  className,
  children,
  variant = "tonal",
  tint = "neutral",
  size = 'md',
  as,
  ...restProps
}: ButtonProps<C>) {
  const ComponentRoot: ElementType = as || 'button';

  return (
    <ComponentRoot
      className={clsx(
        className,
        $.root,
        variantClasses[variant],
        tintClasses[tint],
        sizeClasses[size],
      )}
      {...restProps}
    >
      <span className={$.label}>{children}</span>
    </ComponentRoot>
  );
}
