import clsx from "clsx";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";
import AdminSidebar from "./sidebar";

export interface AdminLayoutProps extends PropsWithChildren {
  insideClass?: string;
}

export default function AdminLayout({ insideClass, children }: AdminLayoutProps) {
  return (
    <>
      {/* <div className="flex flex-col w-full h-full"> */}
      <header className="flex justify-center items-center h-16">
        <h2 className="font-bold text-lg">
          시네마서울<small className="ml-2">관리자</small>
        </h2>
      </header>
      <div className="flex flex-row items-stretch absolute top-16 bottom-0 left-0 right-0 p-4">
        <AdminSidebar className="flex-0 mr-4" />
        <motion.main className={clsx(insideClass, "flex-1 out-1 outline-neutral-6 rounded overflow-y-auto")}>
          {children}
        </motion.main>
      </div>
      {/* </div> */}
    </>
  );
}
