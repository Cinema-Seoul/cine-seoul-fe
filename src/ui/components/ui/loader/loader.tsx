import clsx from "clsx";

export interface LoaderProps extends BaseProps {}

const spinnerStyle = `:uno:
  animate-spin animate-ease
  rounded-full box-border border-4px border-primary-7 !border-r-transparent
  w-full after:(block content-none pt-full)`;

export default function Loader({ className }: LoaderProps) {
  return (
    <div className={clsx(className, "inline-block")}>
      <div className={spinnerStyle} />
    </div>
  )
}