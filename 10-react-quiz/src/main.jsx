import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import { QuizContext } from "./context/QuizContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QuizContext>
      <App />
    </QuizContext>
  </React.StrictMode>
);
