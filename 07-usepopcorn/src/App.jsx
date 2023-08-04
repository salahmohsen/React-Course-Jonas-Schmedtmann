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
import MovieDetials from "./components/Main/Watched_Box/MovieDetails";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "670dd291";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState({
    search: false,
    movieDetials: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [movieId, setMovieId] = useState(null);
  const [movieInfo, setmovieInfo] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        if (query.length < 3) {
          setMovies([]);
          setErrorMessage("");
          return;
        }
        setIsLoading((prevLoader) => ({ ...prevLoader, search: true }));
        setErrorMessage("");

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies!");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found!");
        setMovies(data.Search);
        setErrorMessage("");
      } catch (err) {
        if (err.name !== "AbortError") setErrorMessage(err.message);
      } finally {
        setIsLoading((prevLoader) => ({ ...prevLoader, search: false }));
      }
    }
    fetchMovies();
    return () => controller.abort();
  }, [query]);

  useEffect(() => {
    (async function fetchMovies() {
      try {
        if (!movieId) return;
        setIsLoading((prevLoader) => ({ ...prevLoader, movieDetials: true }));
        const res = await fetch(
          `http://www.omdbapi.com/?i=${movieId}&apikey=${KEY}`
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching the movie!");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found!");
        setmovieInfo(data);
      } catch (err) {
        setErrorMessage(err.message);
      } finally {
        setIsLoading((prevLoader) => ({ ...prevLoader, movieDetials: false }));
      }
    })();
  }, [movieId]);

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
          {isLoading.movieDetials && <Loader />}
          {movieId && errorMessage && <ErrorMessage message={errorMessage} />}
          {movieId && !isLoading.movieDetials && !errorMessage && (
            <MovieDetials
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
