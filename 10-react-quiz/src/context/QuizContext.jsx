import { createContext, useContext, useEffect, useReducer } from "react";

const QuizProvider = createContext();
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
  let { questions, status, index, points, highscore, remainingSeconds } = state;

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
      throw new Error("unknown Type!");
  }
}

export function QuizContext({ children }) {
  const [
    { questions, status, index, answer, points, highscore, remainingSeconds },
    dispatch,
  ] = useReducer(reducer, initialState);

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

  const numQuestions = questions.length;
  const maxPossiplePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

  return (
    <QuizProvider.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        remainingSeconds,
        dispatch,
        numQuestions,
        maxPossiplePoints,
      }}
    >
      {children}
    </QuizProvider.Provider>
  );
}

export function useQuizContext() {
  const context = useContext(QuizProvider);
  if (!context) throw new Error("Quiz context used outside its provider");
  return context;
}
