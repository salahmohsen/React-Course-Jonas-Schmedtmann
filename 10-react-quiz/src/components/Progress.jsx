import { useQuizContext } from "../context/QuizContext";

function Progress() {
  const { numQuestions, maxPossiplePoints, index, points, answer } =
    useQuizContext();
  return (
    <div className="progress">
      <progress max={15} value={index + Number(answer !== null)}></progress>
      <p>
        Quesstion{" "}
        <strong>
          {index + 1}/{numQuestions}
        </strong>
      </p>
      <p>
        <strong>
          {points}/{maxPossiplePoints}
        </strong>
      </p>
    </div>
  );
}

export default Progress;
