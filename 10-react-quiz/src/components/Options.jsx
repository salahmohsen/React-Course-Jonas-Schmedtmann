import { useQuizContext } from "../context/QuizContext";

function Options() {
  const { questions, dispatch, answer, index } = useQuizContext();
  const question = questions.at(index);

  const hasAnswerd = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => {
        return (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              hasAnswerd && index === question.correctOption
                ? "correct"
                : "wrong"
            }`}
            key={option}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            disabled={hasAnswerd}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
