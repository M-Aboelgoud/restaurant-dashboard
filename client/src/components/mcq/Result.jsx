// Result.js
import React from "react";

const Result = ({ totalQuestions, rightAnswers, onReset }) => {
  const getResultMessage = () => {
    if (rightAnswers === totalQuestions) {
      return "Perfect, All Answers Are Correct!";
    } else if (
      rightAnswers > totalQuestions / 2 &&
      rightAnswers < totalQuestions
    ) {
      return `Good, ${rightAnswers} out of ${totalQuestions} Correct`;
    } else {
      return `Bad, Only ${rightAnswers} out of ${totalQuestions} Correct`;
    }
  };

  return (
    <div className="results bg-white p-4">
      <span className="font-bold">{getResultMessage()}</span>
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full block mt-4"
        onClick={onReset}
      >
        Start Again
      </button>
    </div>
  );
};

export default Result;
