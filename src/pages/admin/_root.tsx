import { Fragment, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import AnimatedOutlet from "../_layouts/animated-outlet";
import AdminLayout from "./_layout";
import { useUser } from "@/services/user/user.application";
import { UserRole } from "@/types";
import { useAlertDialog } from "@/components/ui/modal/dialog-alert";

export default function AdminRoot() {
  const location = useLocation();
  const currentUser = useUser();
  const alertDialog = useAlertDialog();

  useEffect(() => {
    if (window) window.scrollTo(0, 0);
  }, [location]);
  if (currentUser && currentUser.userRole !== UserRole.admin) {
    alertDialog("권한이 없습니다.");
    return <Navigate to="/" />;
  }

  return (
    <AnimatePresence>
      <AdminLayout>
        <AnimatedOutlet key={location.pathname} />
      </AdminLayout>
    </AnimatePresence>
  );
}
