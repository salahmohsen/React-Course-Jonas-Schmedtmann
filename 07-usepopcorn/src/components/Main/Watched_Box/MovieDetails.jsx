import { useKey } from "../../../hooks/useKey";
import StarRating from "./StarRating";
import { useState, useEffect, useRef } from "react";

export default function MovieDetails({
  movie,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [userRating, setUserRating] = useState("");
  const isWatched = watched.map((movie) => movie.imdbID).includes(movie.imdbID);
  const watchedUserRating = watched.find(
    (item) => item.imdbID === movie.imdbID
  )?.userRating;
  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  useEffect(() => {
    if (!movie.Title) return;
    document.title = `${movie.Title}`;
    return () => (document.title = "usePopcorn");
  }, [movie.Title]);

  useKey("Escape", onCloseMovie);

  function handleAddtoList(movie) {
    const newMovie = {
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      runtime: Number(movie.Runtime.split(" ").at(0)),
      imdbRating: Number(movie.imdbRating),
      userRating: userRating,
      countRatingDecisions: countRef,
    };
    onAddWatched((watched) => [...watched, newMovie]);
    onCloseMovie();
  }

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          ←
        </button>
        <img src={movie.Poster} alt={movie.Title} />
        <div className="details-overview">
          <h2>{movie.Title}</h2>
          <p>
            {movie.Released} • {movie.Runtime}
          </p>
          <p>{movie.Genre}</p>
          <p>
            <span>⭐</span> {movie.imdbRating} Imdb Rating
          </p>
        </div>
      </header>
      <section>
        {!isWatched && (
          <>
            <StarRating
              className="rating"
              size="24"
              maxRating="10"
              onSetRating={setUserRating}
            />
            {userRating && (
              <button
                className="btn-add"
                onClick={() => handleAddtoList(movie)}
              >
                + Add to List
              </button>
            )}
          </>
        )}
        {isWatched && (
          <p className="rating" style={{ justifyContent: "center" }}>
            You rated this movie with {watchedUserRating}
          </p>
        )}
        <p>
          <em>{movie.Plot}</em>
        </p>
        <p>Staring {movie.Actors}</p>
        <p>Directed by {movie.Director}</p>
      </section>
    </div>
  );
}
