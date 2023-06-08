import { Fragment, PropsWithChildren, ReactNode, createContext, useCallback, useContext, useState } from "react";
import ModalPortal from "./modal-portal";
import { AnimatePresence } from "framer-motion";

type ModalContextProps = {
  showing: boolean;
  setShowing: (s: boolean) => void;
  element?: ReactNode;
  setElement: (s: ReactNode) => void;
};

const ModalContext = createContext<ModalContextProps>({
  showing: false,
  setShowing: () => undefined,
  element: undefined,
  setElement: () => undefined,
});

export function useModal() {
  const context = useContext(ModalContext);

  const showModal = useCallback(
    (element: ReactNode) => {
      console.log("modal open");
      context.setElement(element);
      context.setShowing(true);
    },
    [context]
  );

  const closeModal = useCallback(() => {
    context.setShowing(false);
    context.setElement(null);
  }, [context]);

  return {
    showModal,
    closeModal,
  } as const;
}

export function ModalProvider({ children }: PropsWithChildren) {
  const [showing, setShowing] = useState<boolean>(false);
  const [element, setElement] = useState<ReactNode>();

  return (
    <ModalContext.Provider
      value={{
        showing,
        setShowing,
        element,
        setElement,
      }}
    >
      <ModalPortal>
        <AnimatePresence>{showing && element}</AnimatePresence>
      </ModalPortal>
      <>{children}</>
    </ModalContext.Provider>
  );
}
