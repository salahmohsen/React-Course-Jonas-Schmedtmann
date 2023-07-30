import { useState } from "react";
import MovieList from "./MovieList";
export default function LeftBox({ tempMovieData }) {
  const [isOpen1, setIsOpen1] = useState(true);
  const [movies, setMovies] = useState(tempMovieData);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && <MovieList movies={movies} />}
    </div>
  );
}
