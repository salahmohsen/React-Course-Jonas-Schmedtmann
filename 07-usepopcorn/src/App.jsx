import "./App.css";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import Main from "./components/Main/Main";
import Logo from "./components/NavBar/Logo";
import Search from "./components/NavBar/Search";
import NumResults from "./components/NavBar/NumResults";
import MovieList from "./components/Main/List_Box/MovieList";
import Box from "./components/Main/Box";
import WatchedSummary from "./components/Main/Watched_Box/WatchedSummary";
import WatchedMovieList from "./components/Main/Watched_Box/WatchedMovieList";
import MovieDetails from "./components/Main/Watched_Box/MovieDetails";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import { useMovies } from "./hooks/useMovies";
import { useMovie } from "./hooks/useMovie.js";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  // States
  const [watched, setWatched] = useLocalStorageState("watched", []);
  const [query, setQuery] = useState("");
  const [movieId, setMovieId] = useState(null);

  // Custom Hooks
  const { movies, isLoading, errorMessage } = useMovies(
    query,
    handleCloseMovieDetails
  );
  const { isMovieLoading, movieInfo, errorMovieMessage } = useMovie(movieId);

  // Handles
  function handleSelectMovie(id) {
    setMovieId((currID) => (currID === id ? null : id));
  }
  function handleCloseMovieDetails() {
    setMovieId(null);
  }
  function handleDeletedWatched(id) {
    setWatched(watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading.search && <Loader />}
          {!isLoading.search && !errorMessage && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {errorMessage && <ErrorMessage message={errorMessage} />}
        </Box>
        <Box>
          {isMovieLoading && <Loader />}
          {movieId && errorMessage && (
            <ErrorMessage message={errorMovieMessage} />
          )}
          {movieId && !isMovieLoading && !errorMovieMessage && (
            <MovieDetails
              movie={movieInfo}
              onCloseMovie={handleCloseMovieDetails}
              onAddWatched={setWatched}
              watched={watched}
            />
          )}

          {!movieId && (
            <>
              <WatchedSummary watched={watched} average={average} />
              <WatchedMovieList
                watched={watched}
                onDelete={handleDeletedWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
