import { useState } from "react";
import WatchedSummary from "./WatchedSummary";
import WatchedMovieList from "./WatchedMovieList";

export default function WatchedBox({ tempWatchedData, average }) {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} average={average} />
          <WatchedMovieList watched={watched} />
        </>
      )}
    </div>
  );
}
