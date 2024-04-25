import React, { useState } from "react";
import Answer from "./Answer";

const MCQ = ({ question, onAnswerSubmit }) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    onAnswerSubmit(selectedAnswer);
    setSelectedAnswer("");
  };

  return (
    <div className="quiz-area bg-white p-4">
      <h2 className="font-bold">{question.title}</h2>
      <div className="answers-area">
        {Object.values(question)
          .slice(1, 5)
          .map((answer, index) => (
            <Answer
              key={index}
              answer={answer}
              onSelectAnswer={handleSelectAnswer}
              selected={selectedAnswer === answer}
            />
          ))}
      </div>
      <button
        className="submit-button bg-blue-500 text-white font-bold py-3 px-6 rounded-full block w-full mt-4"
        onClick={handleSubmitAnswer}
      >
        Submit Answer
      </button>
    </div>
  );
};

export default MCQ;
