import clsx from "clsx";

export default function MainFooter({ className }: BaseProps) {
  return (
    <footer className={clsx(className, "py-6 bg-neutral-1 text-neutral-12 border-t border-solid border-neutral-6")}>
      <div className="container mt-6 space-y-2">
        <h4 className="text-center text-lg font-bold">CinemaSeoul Ltd.</h4>
        <div className="text-center text-neutral-11 text-sm">
          <ul>
            <li>
              <a href="https://github.com/cinema-seoul">Github</a>
            </li>
          </ul>
        </div>
        <div className="text-center text-neutral-11 text-opacity-80 text-sm">
          <p>by UOS with ❤</p>
        </div>
      </div>
    </footer>
  )
}