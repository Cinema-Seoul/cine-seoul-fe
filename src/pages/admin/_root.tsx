import { Fragment, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import AnimatedOutlet from "../_layouts/animated-outlet";
import AdminLayout from "./_layout";

export default function AdminRoot() {
  const location = useLocation();

  useEffect(() => {
    if (window) window.scrollTo(0, 0);
  }, [location]);

  return (
    <AnimatePresence>
      <AdminLayout>
        <AnimatedOutlet key={location.pathname} />
      </AdminLayout>
    </AnimatePresence>
  );
}
