import { useState } from "react";
import "./App.css";

export default function App() {
  const [billAmount, setBillAmount] = useState(0);
  const [serviceRate, setServiceRate] = useState(0);
  const [friendServiceRate, setFriendServiceRate] = useState(0);
  const tipsAmount = (billAmount * (serviceRate + friendServiceRate)) / 2 / 100;
  const amountPaid = billAmount + tipsAmount;

  function handleResetButton() {
    setBillAmount(0);
    setServiceRate(0);
    setFriendServiceRate(0);
  }
  return (
    <div className="container">
      <div className="question">
        <h2>How much the bill?</h2>
        <input
          type="number"
          value={billAmount}
          onChange={(e) => setBillAmount(Number(e.target.value))}
        ></input>
      </div>

      <ServiceRate setServiceRate={setServiceRate} selectedOption={serviceRate}>
        How did you like the service?
      </ServiceRate>
      <ServiceRate
        setServiceRate={setFriendServiceRate}
        selectedOption={friendServiceRate}
      >
        How did your friend like the service?
      </ServiceRate>
      <div className="displayAmount">
        {billAmount ? (
          <h1>
            You pay ${amountPaid} + (${billAmount} + ${tipsAmount} tip)
          </h1>
        ) : null}
      </div>
      <button onClick={handleResetButton}>Reset</button>
    </div>
  );
}

function ServiceRate({ setServiceRate, selectedOption, children }) {
  return (
    <div className="question">
      <h2>{children}</h2>
      <select
        onChange={(e) => setServiceRate(Number(e.target.value))}
        value={selectedOption}
      >
        <option value={0}>Dissatisfied (0%)</option>
        <option value={5}>it was okay (5%)</option>
        <option value={10}>it was good (10%)</option>
        <option value={20}>Absolutely amazing (20%)</option>
      </select>
    </div>
  );
}
