import { getMovies } from "./movie.service";

describe("Movie Service", () => {
  it("get All Movies", async () => {
    const res = await getMovies({ type: "all", page: 0 });
    expect(res).toBe(
      await fetch("/api/movie?type=all&page=0", {
        method: "GET",
      })
    );
  });
});

// describe("Movie Application", () => {

// });
