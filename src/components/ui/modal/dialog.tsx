import {
  KeyboardEventHandler,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import clsx from "clsx";
import { ModalContext, useModal } from "./modal-context";
import { motion } from "framer-motion";

export interface DialogContainerProps extends PropsWithChildren {
  dim?: boolean;
  onCloseRequest?: () => void;
}

export function DialogContainer({ dim = true, onCloseRequest, children }: DialogContainerProps) {
  const doOnKeyDown: KeyboardEventHandler = useCallback(
    (e) => {
      if (onCloseRequest && e.key === "Escape") {
        onCloseRequest();
      }
    },
    [onCloseRequest]
  );

  return (
    <motion.div
      className={clsx(
        "z-48 fixed top-0 bottom-0 left-0 right-0 overflow-hidden",
        "flex flex-col justify-center items-center",
        dim && "bg-neutral-11 bg-opacity-50"
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="z-32 absolute top-0 bottom-0 left-0 right-0"
        onClick={onCloseRequest}
        onKeyDown={doOnKeyDown}
      ></div>
      <div className="z-48 overflow-hidden p-8">
        {children}
      </div>
    </motion.div>
  );
}

export function DialogSheet({ children }: PropsWithChildren) {
  return (
    <motion.div
      className="rounded-lg out-1 outline-neutral-6 shadow-xl bg-neutral-2 container px-none overflow-hidden h-full"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6 }}
    >
      {children}
    </motion.div>
  );
}

export function DialogLayout({ children }: PropsWithChildren) {
  return <div className="flex flex-col items-stretch overflow-hidden h-full">{children}</div>;
}

export interface DialogHeaderProps {
  title?: string;
  subtitle?: string;
}

export function DialogHeader({ title, subtitle }: DialogHeaderProps) {
  return (
    <div className="flex flex-row flex-0 border-b border-solid border-neutral-6">
      {(title || subtitle) && (
        <div className="p-4">
          {title && <h2 className="text-lg font-bold">{title}</h2>}
          {subtitle && <h4 className="text-sm font-normal">{subtitle}</h4>}
        </div>
      )}
    </div>
  );
}

export function DialogBody({ className, children }: PropsWithChildren<BaseProps>) {
  return <div className={clsx(className, "flex-1 px-4 py-6 overflow-y-auto")}>{children}</div>;
}

export function DialogFooter({ className, children }: PropsWithChildren<BaseProps>) {
  return (
    <div className={clsx(className, "flex-0 p-4 overflow-y-auto border-t border-solid border-neutral-6")}>{children}</div>
  );
}

export interface DialogOptions {
  contentGen?: () => ReactNode;
  closeWhenOutsideClick?: boolean;
}

export function useDialog({ contentGen, closeWhenOutsideClick = true }: DialogOptions = {}) {
  const { showModal, closeModal } = useModal();

  const showDialog: typeof showModal = useCallback(
    (content) => {
      showModal(
        <DialogContainer onCloseRequest={closeWhenOutsideClick ? closeModal : undefined}>
          {content ?? (contentGen && contentGen())}
        </DialogContainer>
      );
    },
    [closeModal, closeWhenOutsideClick, contentGen, showModal]
  );

  const closeDialog = closeModal;

  return { showDialog, closeDialog };
}
