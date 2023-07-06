import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

// // Selecting DOM elements
// const step1 = document.querySelector(".step-1");
// const step2 = document.querySelector(".step-2");
// const step3 = document.querySelector(".step-3");
// const message = document.querySelector(".message");
// const btnPrevious = document.querySelector(".previous");
// const btnNext = document.querySelector(".next");

// // "State"
// let step = 1;

// // Manually updating the DOM: changing text content and adding/removing classes (imperative approach)
// const updateUIValues = function () {
//   message.textContent = `Step ${step}: ${messages[step - 1]}`;

//   if (step >= 1) step1.classList.add("active");
//   else step1.classList.remove("active");

//   if (step >= 2) step2.classList.add("active");
//   else step2.classList.remove("active");

//   if (step >= 3) step3.classList.add("active");
//   else step3.classList.remove("active");
// };

// // Initial setup
// updateUIValues();

// // Manually attaching event listeners
// btnPrevious.addEventListener("click", function () {
//   if (step > 1) step -= 1;
//   updateUIValues();
// });

// btnNext.addEventListener("click", function () {
//   if (step < 3) step += 1;
//   updateUIValues();
// });

export default function App() {
  const [step, setStep] = useState(1);

  function handleNext() {
    if (step < 3) setStep((s) => s + 1);
  }
  function handlePrev() {
    if (step > 1) setStep((s) => s - 1);
  }

  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={`step-1, ${step >= 1 ? "active" : ""}`}>1</div>
            <div className={`step-2, ${step >= 2 ? "active" : ""}`}>2</div>
            <div className={`step-3, ${step >= 3 ? "active" : ""}`}>3</div>
          </div>

          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>

          <div className="buttons">
            <Button bgColor={"#7950f2"} textColor={"#fff"} onClick={handlePrev}>
              <span>👈🏽</span>previous
            </Button>
            <Button bgColor={"#7950f2"} textColor={"#fff"} onClick={handleNext}>
              Next<span>👉🏽</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function Button({ bgColor, textColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
