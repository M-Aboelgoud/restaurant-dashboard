import React, { useState } from "react";


const FlipCard = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div class="group h-96 w-80 [perspective:1000px]">
      <div class="relative h-96 w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div class="rounded-xl bg-black/45 flex min-h-full flex-col items-center justify-center px-8">
          <h1 class="text-2xl text-slate-200 font-bold">{question}</h1>
        </div>

        <div class="absolute inset-0 h-full w-full rounded-xl bg-black px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div class="flex min-h-full flex-col items-center justify-center">
            <p class="text-base">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
