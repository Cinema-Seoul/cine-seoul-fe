import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export default function ModalPortal({ children }: PropsWithChildren) {
  return createPortal(
    children,
    document.getElementById("root-modal") as HTMLElement
  );
}
