import { Button } from "@/components/ui";
import clsx from "clsx";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";
import { IoLogOut } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

/* Constants */

const MenuItems: {
  display: string;
  path: string;
}[] = [
  { display: "영화 및 인물 관리", path: "/admin/movie" },
  { display: "예매 관리", path: "/admin/ticketing" },
  { display: "회원 관리", path: "/admin/user" },
];

export interface AdminLayoutProps extends PropsWithChildren {
  insideClass?: string;
}

export default function AdminLayout({
  insideClass,
  children,
}: AdminLayoutProps) {

  const {pathname} = useLocation();

  return (
    <>
      {/* <div className="flex flex-col w-full h-full"> */}
        <header className="flex justify-center items-center h-16">
          <h2 className="font-bold text-lg">
            시네마서울<small className="ml-2">관리자</small>
          </h2>
        </header>
        <div className="flex flex-row items-stretch absolute top-16 bottom-0 left-0 right-0 p-4">
          <aside className="flex flex-col flex-0 p-4 w-64 bg-neutral-2 out-1 outline-neutral-6 rounded mr-4">
            <ul className="flex-1 space-y-2">
              {MenuItems.map(({ display, path }, index) => (
                <li key={path}>
                  <Button as={Link} variant={pathname === path ? "contained" : "text"} tint="primary" to={path}>{display}</Button>
                </li>
              ))}
            </ul>
            <div className="flex flex-row items-center flex-0">
              <div className="flex-1">전호균 (직원)</div>
              <Button className="flex-0" iconStart={<IoLogOut />} />
            </div>
          </aside>
          <motion.main className={clsx(insideClass, "flex-1 out-1 outline-neutral-6 rounded overflow-y-auto")}>
            {children}
          </motion.main>
        </div>
      {/* </div> */}
    </>
  );
}
