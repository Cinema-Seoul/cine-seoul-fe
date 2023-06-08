import { FormEventHandler, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function useMovieSearch() {
  const navigate = useNavigate();

  const onSubmitMovieSearch: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      const q = new FormData(e.currentTarget).get("q");
      navigate(`/movie/s?q=${q}`);
    },
    [navigate]
  );

  return { onSubmitMovieSearch, movieSearchInputName: "q" };
}
