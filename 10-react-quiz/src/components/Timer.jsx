import { useEffect } from "react";

function Timer({ remainingSeconds, dispatch }) {
  const mins = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  //   function convertSecondsToTime(seconds) {
  //     const mins = Math.floor(seconds / 60);
  //     const remainingSeconds = seconds % 60;
  //     const formattedMinutes = String(mins).padStart(2, "0");
  //     const formattedSeconds = String(remainingSeconds).padStart(2, "0");
  //     return `${formattedMinutes}:${formattedSeconds}`;
  //   }
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}
export default Timer;
