import { useState } from "react";
import { useOutlet } from "react-router-dom";

// https://stackoverflow.com/questions/74190609/exit-animations-with-animatepresence-framer-motion-and-createbrowserrouter-r

export default function AnimatedOutlet() {
  const o = useOutlet();
  const [outlet] = useState(o);

  return <>{outlet}</>;
}