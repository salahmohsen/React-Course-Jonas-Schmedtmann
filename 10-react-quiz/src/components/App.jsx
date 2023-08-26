import { useEffect, useReducer } from "react";
import "../App.css";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextQuestion from "./NextQuestion";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import { useQuizContext } from "../context/QuizContext";

export default function App() {
  const { status } = useQuizContext();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <footer>
              <NextQuestion />
              <Timer />
            </footer>
          </>
        )}
        {status === "finish" && <FinishScreen />}
      </Main>
    </div>
  );
}
