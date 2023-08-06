import { useEffect, useState } from "react";
const KEY = import.meta.env.VITE_KEY;

export function useMovie(movieId) {
  const [isMovieLoading, setisMovieLoading] = useState(false);
  const [movieInfo, setMovieInfo] = useState([]);
  const [errorMovieMessage, setErrorMovieMessage] = useState("");

  useEffect(() => {
    (async function fetchMovies() {
      try {
        if (!movieId) return;
        setisMovieLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?i=${movieId}&apikey=${KEY}`
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching the movie!");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found!");
        setMovieInfo(data);
      } catch (err) {
        setErrorMovieMessage(err.message);
      } finally {
        setisMovieLoading(false);
      }
    })();
  }, [movieId]);
  return { isMovieLoading, movieInfo, errorMovieMessage };
}
