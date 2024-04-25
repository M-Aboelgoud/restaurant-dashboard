// Answer.js
import React from "react";

const Answer = ({ answer, onSelectAnswer, selected }) => {
  return (
    <div
      className={`answer ${
        selected ? "bg-blue-100" : "bg-gray-100"
      } p-4 my-2 rounded-lg flex items-center`}
    >
      <input
        type="radio"
        name="question"
        id={`answer_${answer}`}
        onChange={() => onSelectAnswer(answer)}
        checked={selected}
        className="mr-2"
      />
      <label
        htmlFor={`answer_${answer}`}
        className="cursor-pointer font-bold text-gray-700"
      >
        {answer}
      </label>
    </div>
  );
};

export default Answer;
