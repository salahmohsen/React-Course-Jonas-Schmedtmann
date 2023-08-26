function Progress({ numQuestions, maxPossiplePoints, index, points, answer }) {
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
