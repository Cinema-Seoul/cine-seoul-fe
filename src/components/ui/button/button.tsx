import clsx from "clsx";

import * as $ from "./button.module.scss";

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
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

const sizeClasses: Record<Size, string | null> = {
  sm: $.__sm,
  md: null,
  lg: $.__lg,
};

interface ButtonPropsPlain {
  variant?: Variant;
  tint?: Tint;
  size?: Size;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
}

export type ButtonProps<C extends ElementType> = ButtonPropsPlain &
  ComponentPropsWithoutRef<C> & {
    as?: C;
  };

export default function Button<C extends ElementType = "button">({
  className,
  children,
  iconStart,
  iconEnd,
  variant = "tonal",
  tint = "neutral",
  size = "md",
  as,
  ...restProps
}: ButtonProps<C>) {
  const ComponentRoot: ElementType = as || "button";

  const withChildren = {
    children: (
      <>
        {iconStart && <span className={$.icon}>{iconStart}</span>}
        {children && <span className={$.label}>{children}</span>}
        {iconEnd && <span className={$.icon}>{iconEnd}</span>}
      </>
    ),
  };

  const withLabel = {
    label: children
  };

  const provideContent = as === 'input' ? withLabel : withChildren;

  return (
    <ComponentRoot
      className={clsx(
        className,
        $.root,
        variantClasses[variant],
        tintClasses[tint],
        sizeClasses[size]
      )}
      {...provideContent}
      {...restProps}
    />
  );
}
