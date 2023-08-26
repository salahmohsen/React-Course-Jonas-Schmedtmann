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

const SEC_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  remainingSeconds: null,
};

function reducer(state, { type, payload }) {
  let {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    remainingSeconds,
  } = state;
  switch (type) {
    case "dataReceived":
      return { ...state, questions: payload, status: "ready" };
    case "failed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        remainingSeconds: questions.length * SEC_PER_QUESTION,
      };
    case "newAnswer": {
      const question = questions.at(index);
      return {
        ...state,
        answer: payload,
        points:
          payload === question.correctOption
            ? points + question.points
            : points,
      };
    }
    case "nextQuestion":
      return { ...state, index: ++index, answer: null };
    case "finish":
      return {
        ...state,
        status: "finish",
        highscore: points > highscore ? points : highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: questions,
        status: "ready",
        highscore: highscore,
      };
    case "tick":
      return {
        ...state,
        remainingSeconds:
          remainingSeconds > 0 ? --remainingSeconds : remainingSeconds,
        status: remainingSeconds === 0 ? "finish" : status,
      };

    default:
      throw new Error("unkown Type!");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highscore, remainingSeconds },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiplePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );
  useEffect(() => {
    async function fetchingData() {
      try {
        const res = await fetch("http://127.0.0.1:8000/questions");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "failed" });
      }
    }

    fetchingData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestions={numQuestions}
              maxPossiplePoints={maxPossiplePoints}
              index={index}
              points={points}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <footer>
              <NextQuestion
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
              <Timer remainingSeconds={remainingSeconds} dispatch={dispatch} />
            </footer>
          </>
        )}
        {status === "finish" && (
          <FinishScreen
            points={points}
            maxPossiplePoints={maxPossiplePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
