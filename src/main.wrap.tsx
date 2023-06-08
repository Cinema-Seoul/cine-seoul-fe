import { ModalProvider } from "./components/ui/modal/modal-context";

export default function MainWrapper({ children }: any) {
  return <ModalProvider>{children}</ModalProvider>;
}
