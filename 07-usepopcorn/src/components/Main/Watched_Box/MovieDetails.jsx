import StarRating from "./StarRating";

export default function MovieDetials({ movie, onCloseMovie }) {
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
        <StarRating className="rating" size="24" maxRating="10" />
        <p>
          <em>{movie.Plot}</em>
        </p>
        <p>Staring {movie.Actors}</p>
        <p>Directed by {movie.Director}</p>
      </section>
    </div>
  );
}
