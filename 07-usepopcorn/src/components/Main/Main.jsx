import { useState } from "react";
import ListBox from "./List_Box/ListBox";
import WatchedBox from "./Watched_Box/WatchedBox";

export default function Main({
  tempMovieData,
  tempWatchedData,
  average,
  movies,
}) {
  return (
    <main className="main">
      <ListBox tempMovieData={tempMovieData} movies={movies} />
      <WatchedBox tempWatchedData={tempWatchedData} average={average} />
    </main>
  );
}
