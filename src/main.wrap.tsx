import { Suspense } from "react";
import { ModalProvider } from "./components/ui/modal/modal-context";
import { Loader } from "./components/ui";

export default function MainWrapper({ children }: any) {
  return (
    <Suspense fallback={<Loader className="w-16 h-16 m-32" />}>
      <ModalProvider>{children}</ModalProvider>
    </Suspense>
  );
}
