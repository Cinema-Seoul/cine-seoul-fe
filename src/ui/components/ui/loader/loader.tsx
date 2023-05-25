import clsx from "clsx";

export interface LoaderProps extends BaseProps {
  spinnerClass?: string;
}

const spinnerStyle = `:uno: 
  animate-spin animate-ease
  rounded-full box-border border-4px border-primary-10 !border-r-transparent
  w-full after:(block content-none pt-full)`;

export default function Loader({ className, spinnerClass }: LoaderProps) {
  return (
    <div className={className}>
      <div className={clsx(spinnerClass, spinnerStyle)} />
    </div>
  )
}