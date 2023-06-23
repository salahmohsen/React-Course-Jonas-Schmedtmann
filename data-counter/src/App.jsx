import { useState } from "react";
import "./App.css";

export default function App() {
  const [steps, setSteps] = useState(1);
  const [count, setCount] = useState(0);

  const date = new Date();
  date.setDate(date.getDate() + count);
  const outputDate = date.toLocaleString("en-us", {
    dateStyle: "full",
  });

  return (
    <div>
      <div className="StepsContainer">
        <button onClick={() => setSteps((i) => (i > 1 ? (i -= 1) : 1))}>
          -
        </button>
        <p>Steps: {steps}</p>
        <button onClick={() => setSteps((i) => (i += 1))}>+</button>
      </div>
      <div className="CountContainer">
        <button onClick={() => setCount((i) => (i > 0 ? (i -= steps) : 0))}>
          -
        </button>
        <p>Count: {count}</p>
        <button onClick={() => setCount((i) => (i += steps))}>+</button>
      </div>
      <div className="dateContainer">
        <p>
          {count === 0
            ? "Today is " + outputDate
            : count + " days from today is " + outputDate}
        </p>
      </div>
      <div className="resetContainer">
        <button
          className="reset"
          onClick={() => {
            setSteps(1) & setCount(0);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
