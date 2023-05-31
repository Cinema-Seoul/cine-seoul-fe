import { useEffect } from "react";
import { initApiFetcher } from "./services/api";

export default function MainWrapper({ children }: any) {
  useEffect(() => {
    initApiFetcher();
  }, []);

  return <>{children}</>;
}
