import WatchedMovie from "./WatchedMovie";

export default function WatchedMovieList({ watched }) {
  return (
    <ul className="list list-movies">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
