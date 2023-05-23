import MovieCard from "./movie-card";

export default function MovieCardBoxOffice({ className }: BaseProps) {
  return (
    <div className={className}>
      <div className="flex justify-between items-center py-2 text-neutral-11">
        <span className="text-8 leading-8 font-bold">1.</span>
        <span className="text-base leading-8 font-normal">예매율 25.4%</span>
      </div>
    <MovieCard />
    </div>
  )
}