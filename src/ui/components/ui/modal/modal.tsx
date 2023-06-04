import clsx from "clsx";
import { KeyboardEventHandler, PropsWithChildren, useEffect } from "react";
import ModalPortal from "./modal-portal";

export interface ModalSheetProps extends PropsWithChildren, BaseProps {}

export function ModalSheet({ children, className }: ModalSheetProps) {
  return (
    <div
      className={clsx(
        className,
        "rounded-1 bg-neutral-2 out-1 outline-neutral-6 max-w-48 mx-a"
      )}
    >
      {children}
    </div>
  );
}

export interface ModalProps extends PropsWithChildren {
  sheet?: boolean;
  sheetClass?: string;
  backdrop?: boolean;
  onClose?: () => void;
  cancelable?: boolean;
}

export default function Modal({
  children,
  sheet = true,
  sheetClass,
  backdrop = true,
  onClose,
  cancelable = true,
}: ModalProps) {
  useEffect(() => {
    if (cancelable) {
      const handleKeydown = (ev: KeyboardEvent) => {
        if (ev.key === "Escape") {
          onClose && onClose();
        }
      };

      document.addEventListener("keydown", handleKeydown);

      return () => {
        document.removeEventListener("keydown", handleKeydown);
      };
    }
  }, [cancelable, onClose]);

  return (
    <ModalPortal>
      <div
        className={clsx(
          "fixed top-0 bottom-0 left-0 right-0 overflow-hidden",
          "flex flex-col justify-center items-center",
          backdrop && "bg-neutral-11 bg-opacity-50"
        )}
      >
        {sheet ? (
          <ModalSheet className={sheetClass}>{children}</ModalSheet>
        ) : (
          children
        )}
        <div
          className="absolute top-0 bottom-0 left-0 right-0"
          onClick={onClose}
        />
      </div>
    </ModalPortal>
  );
}
