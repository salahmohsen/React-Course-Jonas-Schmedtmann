function FinishScreen({ points, maxPossiplePoints, highscore, dispatch }) {
  const percentage = (points / maxPossiplePoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>You Scored <strong>{points}</strong> out of{" "}
        {maxPossiplePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(highScore: {highscore})</p>
      <button
        className={"btn btn-ui"}
        onClick={() => dispatch({ type: "restart" })}
      >
        Reset Quiz!
      </button>
    </>
  );
}

export default FinishScreen;
