import type { MouseEventHandler } from "react";

export type MainMenuItem = {
  label: string;
  accent?: boolean;
  href: string | MouseEventHandler;
}