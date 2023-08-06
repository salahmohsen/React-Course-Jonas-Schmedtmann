import WatchedMovie from "./WatchedMovie";

export default function WatchedMovieList({ watched, onDelete }) {
  return (
    <ul className="list list-movies">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} onDelete={onDelete} key={movie.imdbID} />
      ))}
    </ul>
  );
}
