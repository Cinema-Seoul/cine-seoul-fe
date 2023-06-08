import { useEffect } from "react";
import { initApiFetcher } from "./services/api";
import { ModalProvider } from "./ui/components/ui/modal/modal-context";

export default function MainWrapper({ children }: any) {
  return <ModalProvider>{children}</ModalProvider>;
}
