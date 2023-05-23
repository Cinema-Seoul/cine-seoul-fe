import clsx from "clsx";

// TODO:
const data = {
  postUrl:
    "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ySLgOnBTgt7a3Sv1qTVJUDMZJvu.jpg",
};

export interface MovieCardProps extends BaseProps {}

export default function MovieCard({ className }: MovieCardProps) {
  return (
    <div
      className={clsx(
        className,
        "outline outline-1 outline-neutral-6 rounded overflow-hidden"
      )}
    >
      <div>
        <img src={data.postUrl} />
      </div>
      <div className="p-4">
        <h6 className="text-lg leading-6 font-bold">트랜짓</h6>
      </div>
    </div>
  );
}
