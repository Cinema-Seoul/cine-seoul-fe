import clsx from "clsx";
import { Link } from "react-router-dom";
import { IoMenu } from 'react-icons/io5';

import { Button } from "../ui";

import type { MainMenuItem } from "./navbar.types";

/* TODO: 임시 */
const data = {
  brandName: "시네마서울",
};

const mainMenuItems: MainMenuItem[] = [
  { label: "영화", href: "/movie" },
  {
    label: "극장",
    href: (e) => {
      alert("극장 클릭!");
    },
  },
  { label: "이벤트", href: "#" },
  { label: "바로 예매", href: "#", accent: true },
];

// ===

const Brand = ({ className }: BaseProps) => (
  <Link className={clsx(className, "inline-block cursor-pointer")} to="/">
    <h4 className="inline text-primary-11 font-bold text-5 leading-6">
      {data.brandName}
    </h4>
  </Link>
);

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
      <div className="container flex flex-row items-center justify-center h-14">
        <Brand />
      </div>

      {/* Container Bottom */}
      <div className="container">
        <MenuExpandButton />
        <MainMenu className="transition-transform lt-md:peer-checked:(hidden)" items={mainMenuItems} />
      </div>
    </div>
  );
}
