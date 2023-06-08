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
  display: string;
  path: string;
}[] = [
  { display: "영화 및 인물 관리", path: "/admin/movie" },
  { display: "예매 관리", path: "/admin/ticketing" },
  { display: "회원 관리", path: "/admin/user" },
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
          <div className="flex-1">전호균 (직원)</div>
          <Button className="flex-0" iconStart={<IoLogOut />} />
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
        {MenuItems.map(({ display, path }) => (
          <li key={path}>
            <Button as={Link} variant={pathname === path ? "contained" : "text"} tint="primary" to={path}>
              {display}
            </Button>
          </li>
        ))}
      </ul>
      <SignedMenu className="flex-0" />
    </aside>
  );
}
