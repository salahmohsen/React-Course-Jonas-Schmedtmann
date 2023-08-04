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

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "670dd291";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState({
    search: false,
    movieDetials: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [movieId, setMovieId] = useState(null);
  const [movieInfo, setmovieInfo] = useState([]);

  // `http://www.omdbapi.com/?i=${movieId}&apikey=${KEY}`

  useEffect(() => {
    (async function fetchMovies() {
      try {
        setErrorMessage("");
        if (query.length < 3) {
          setMovies([]);
          setErrorMessage("");
          return;
        }
        setIsLoading((prevLoader) => ({ ...prevLoader, search: true }));
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies!");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found!");

        setMovies(data.Search);
      } catch (err) {
        setErrorMessage(err.message);
      } finally {
        setIsLoading((prevLoader) => ({ ...prevLoader, search: false }));
      }
    })();
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
            />
          )}

          {!movieId && (
            <>
              <WatchedSummary watched={watched} average={average} />
              <WatchedMovieList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
