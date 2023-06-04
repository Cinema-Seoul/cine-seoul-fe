import clsx from "clsx";

export default function MainFooter({ className }: BaseProps) {
  return (
    <footer className={clsx(className, "py-6 bg-neutral-12 text-neutral-1")}>
      <div className="container mt-6">
        <h4 className="text-center text-lg font-bold">CinemaSeoul Ltd.</h4>
        <div className="text-center text-neutral-1 text-opacity-80 text-sm">
          <p>by UOS with ❤</p>
        </div>
      </div>
    </footer>
  )
}