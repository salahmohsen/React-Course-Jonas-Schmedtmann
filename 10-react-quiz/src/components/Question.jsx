import { useQuizContext } from "../context/QuizContext";
import Options from "./Options";

function Question() {
  const { questions, index } = useQuizContext();
  const question = questions.at(index);
  return (
    <>
      <div>
        <h4>{question.question}</h4>
        <Options />
      </div>
    </>
  );
}

export default Question;
