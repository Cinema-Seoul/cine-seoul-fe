import { Button } from "@/components/ui";
import { useUser, useUserActions } from "@/services/user/user.application";
import { UserRole } from "@/types";
import clsx from "clsx";
import { IoLogOut } from "react-icons/io5";
import { Link, Navigate, useLocation } from "react-router-dom";

/* -------------------------------------------------------------------------- */
/*                                  Constants                                 */
/* -------------------------------------------------------------------------- */

const MenuItems: {
  title?: string;
  items: {
    display: string;
    path: string;
  }[];
}[] = [
  {
    title: "정보 관리",
    items: [
      { display: "영화 정보 관리", path: "/admin/movie" },
      { display: "배우 정보 관리", path: "/admin/movie/actor" },
      { display: "감독 정보 관리", path: "/admin/movie/director" },
      { display: "배급사 정보 관리", path: "/admin/movie/distributor" },
    ],
  },
  {
    title: "극장 시설",
    items: [
      { display: "이벤트 관리", path: "/admin/event" },
      { display: "상영관 관리", path: "/admin/screen" },
      { display: "상영일정 관리", path: "/admin/schedule" },
    ],
  },
  {
    title: "극장 이용",
    items: [
      { display: "티켓 현황 관리", path: "/admin/ticket" },
      { display: "결제 현황 관리", path: "/admin/payment" },
      { display: "회원 관리", path: "/admin/user" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                                 SignedUser                                 */
/* -------------------------------------------------------------------------- */

function SignedMenu({ className }: BaseProps) {
  const currentUser = useUser();
  const { signOut } = useUserActions();

  if (currentUser) {
    if (currentUser.userRole === UserRole.admin) {
      return (
        <div className={clsx(className, "flex flex-row items-center")}>
          <div className="flex-1">{currentUser.name ?? currentUser.userId} (직원)</div>
          <Button className="flex-0" iconStart={<IoLogOut />} onClick={signOut} />
        </div>
      );
    } else {
      signOut();
    }
  }
  return <Navigate to="/admin/signin" />;
}

/* -------------------------------------------------------------------------- */
/*                               Main Component                               */
/* -------------------------------------------------------------------------- */

export default function AdminSidebar({ className }: BaseProps) {
  const { pathname } = useLocation();

  return (
    <aside className={clsx(className, "flex flex-col p-4 w-64 card")}>
      <ul className="flex-1 space-y-2">
        {MenuItems.map(({ items, title }, i) => (
          <li key={i}>
            {title && <h6 className="text-sm p-4 mt-2">{title}</h6>}
            <ul>
              {items.map(({ display, path }) => (
                <li key={path}>
                  <Button
                    as={Link}
                    className="justify-start"
                    variant={pathname === path ? "contained" : "text"}
                    tint="primary"
                    to={path}
                  >
                    {display}
                  </Button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <SignedMenu className="flex-0" />
    </aside>
  );
}
