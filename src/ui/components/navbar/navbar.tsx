import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { IoMenu } from 'react-icons/io5';

import { Button } from "../ui";

import type { MainMenuItem } from "./navbar.types";
import { useAuthService } from "@/services/auth";
import useUserService from "@/services/user/user.service";
import { useCallback, useState } from "react";
import Loader from "../ui/loader";

/* TODO: 임시 */
const data = {
  brandName: "시네마서울",
};

const mainMenuItems: MainMenuItem[] = [
  { label: "영화", href: "/movie" },
  {
    label: "극장",
    // href: (e) => {
    //   alert("극장 클릭!");
    // },
    href: "/theatre"
  },
  { label: "이벤트", href: "#" },
  { label: "바로 예매", href: "#", accent: true },
  { label: "티켓 조회", href: "#", accent: true },
];

// ===

const Brand = ({ className }: BaseProps) => (
  <Link className={clsx(className, "inline-block cursor-pointer")} to="/">
    <h4 className="inline text-primary-11 font-bold text-5 leading-6">
      {data.brandName}
    </h4>
  </Link>
);

const UserSignMenu = ({ className }: BaseProps) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const authService = useAuthService();
  const userService = useUserService();

  const navigate = useNavigate();

  const doSignOut = useCallback(() => {
    setLoading(true);
    authService.signOut().then(() => {
      setLoading(false);
      navigate("/");
    });
  }, [authService, navigate]);

  const doSignIn = () => navigate('/signin');

  // const doSignIn = useCallback(() => {
  //   setLoading(true);
  //   authService.signIn("aaa", "bbb").finally(() => {
  //     setLoading(false);
  //   });
  // }, [authService]);

  const rootStyle = clsx(className, "rounded-full bg-neutral-3 flex flex-row h-8 out-1 outline-neutral-6 flex flex-row justify-center items-center px-4 space-x-4");

  if (isLoading) {
    return <div className={rootStyle}>
      <Loader className="w-6 mx-4" />
    </div>
  }
  
  if (userService.currentUser) {
    // Signed In
    return (
      <div className={rootStyle}>
        <p>안녕하세요, <u>{userService.currentUser.name}</u>님!</p>
        <a className="pressable-opacity" onClick={doSignOut}>로그아웃</a>
      </div>
    )
  } else {
    // Not Signed In
    return (
      <div className={rootStyle}>
        <a className="pressable-opacity" onClick={doSignIn}>로그인</a>
        <a className="pressable-opacity">회원가입</a>
      </div>
    )
  }
}

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
    <input
      id="menu-expand"
      type="checkbox"
      className="peer hidden"
      defaultChecked
    />
  </>
);

const MainMenu = ({
  className,
  items,
}: BaseProps & { items: MainMenuItem[] }) => (
  <ul className={clsx(className, "lt-md:block md:row justify-center")}>
    {items.map(({ label, href, accent = false }, index) => {
      const actions = {
        to: typeof href === "string" ? href : undefined,
        onClick: typeof href !== "string" ? href : undefined,
      };
      return (
        <li className="md:col-3 lg:col-2 my-2" key={`main-menu-it-${index}`}>
          <Button className="w-full" as={actions.to ? Link : "button"} variant="text" tint={accent ? 'primary' : 'neutral'} {...actions}>
            {label}
          </Button>
        </li>
      );
    })}
  </ul>
);

export interface NavbarProps extends BaseProps {}

export default function Navbar({ className }: NavbarProps) {
  return (
    <div
      className={clsx(
        className,
        "relative block sticky top-0 w-full z-24",
        "bg-neutral-1/80 backdrop-blur border-b border-solid border-neutral-6"
      )}
    >
      {/* Container Top */}
      <div className="container flex flex-row items-center justify-between h-14">
        <Brand className="" />
        <UserSignMenu className="justify-self-end" />
      </div>

      {/* Container Bottom */}
      <div className="container">
        <MenuExpandButton />
        <MainMenu className="transition-transform lt-md:peer-checked:(hidden)" items={mainMenuItems} />
      </div>
    </div>
  );
}
