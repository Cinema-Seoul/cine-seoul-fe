import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AnimatedOutlet from "./_layouts/animated-outlet";

export default function Root() {
  const location = useLocation();

  useEffect(() => {
    if (window) window.scrollTo(0, 0);
  }, [location]);
  
  return <AnimatePresence mode="wait">
    <Fragment key={location.pathname}>
      <AnimatedOutlet />
    </Fragment>
  </AnimatePresence>
}