import clsx from "clsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

import { Button } from "../ui";

import type { MainMenuItem } from "./navbar.types";
import { useCallback, useState } from "react";
import Loader from "../ui/loader";
import { useUserActions } from "@/services/user/user.application";

/* TODO: 임시 */
const data = {
  brandName: "시네마서울",
};

const mainMenuItems: MainMenuItem[] = [
  { label: "영화", href: "/movie" },
  {
    label: "극장",
    href: "/theatre",
  },
  { label: "이벤트", href: "/b/event" },
  { label: "바로 예매", href: "/ticketing", accent: true },
  { label: "내 정보 · 티켓", href: "/my", accent: true },
];

// ===

const Brand = ({ className }: BaseProps) => (
  <Link className={clsx(className, "inline-block cursor-pointer")} to="/">
    <h4 className="inline text-primary-11 font-bold text-5 leading-6">{data.brandName}</h4>
  </Link>
);

const UserSignMenu = ({ className }: BaseProps) => {
  const { currentUser, signOut } = useUserActions();

  const rootStyle = clsx(
    className,
    "rounded-full bg-neutral-3 flex flex-row h-8 out-1 outline-neutral-6 flex flex-row justify-center items-center px-4 space-x-4"
  );

  if (currentUser) {
    // Signed In
    return (
      <div className={rootStyle}>
        <p>안녕하세요, {currentUser.userId?.length ? <u>{currentUser.userId}</u> : "고객"}님!</p>
        <a className="pressable-opacity" onClick={signOut}>
          로그아웃
        </a>
      </div>
    );
  } else {
    // Not Signed In
    return (
      <div className={rootStyle}>
        <Link className="pressable-opacity" to="/signin">
          로그인/회원가입
        </Link>
      </div>
    );
  }
};

const MenuExpandButton = () => (
  <>
    <Button
      as="label"
      htmlFor="menu-expand"
      className="absolute left-0 top-0 h-14 md:hidden"
      variant="text"
      tint="neutral"
      onClick={(e) => {
        if (e.target instanceof HTMLElement) {
          e.target.blur();
        }
      }}
    >
      <IoMenu />
    </Button>
    <input id="menu-expand" type="checkbox" className="peer hidden" defaultChecked />
  </>
);

const MainMenu = ({ className, items }: BaseProps & { items: MainMenuItem[] }) => (
  <ul className={clsx(className, "lt-md:block md:row justify-center")}>
    {items.map(({ label, href, accent = false }, index) => {
      const actions = {
        to: typeof href === "string" ? href : undefined,
        onClick: typeof href !== "string" ? href : undefined,
      };
      return (
        <li className="md:col-3 lg:col-2 my-2" key={`main-menu-it-${index}`}>
          <Button
            className="w-full"
            as={actions.to ? Link : "button"}
            variant="text"
            tint={accent ? "primary" : "neutral"}
            {...actions}
          >
            {label}
          </Button>
        </li>
      );
    })}
  </ul>
);

export interface NavbarProps extends BaseProps {
  withMenu?: boolean;
}

export default function Navbar({ className, withMenu = true }: NavbarProps) {
  return (
    <div
      className={clsx(
        className,
        "relative block sticky top-0 w-full z-24",
        "bg-neutral-1 bg-opacity-90 backdrop-blur border-b border-solid border-neutral-6"
      )}
    >
      {/* Container Top */}
      <div className="container flex flex-row items-center justify-between h-14">
        <Brand className="" />
        <UserSignMenu className="justify-self-end" />
      </div>

      {/* Container Bottom */}
      {withMenu && (
        <div className="container">
          <MenuExpandButton />
          <MainMenu className="transition-transform lt-md:peer-checked:(hidden)" items={mainMenuItems} />
        </div>
      )}
    </div>
  );
}
