import { Suspense } from "react";
import { ModalProvider } from "./components/ui/modal/modal-context";
import { Loader } from "./components/ui";
import Lottie from "react-lottie";

import loadingJson from "@/assets/loading.json";

function Load() {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
      <Lottie
        options={{
          animationData: loadingJson,
        }}
        height={128}
        width={128}
      />
      {/* <Loader className="w-64 h-64" /> */}
    </div>
  );
}

export default function MainWrapper({ children }: any) {
  return (
    <Suspense fallback={<Load />}>
      <ModalProvider>{children}</ModalProvider>
    </Suspense>
  );
}
