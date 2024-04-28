import React from "react";
import Timer from "./Timer";

import { useGame } from "../context/GameContext";

export type RoundTime = {
  timeToComplete: number;
  startTime: number;
};

const RoundInfo: React.FC = () => {
  const { isWaitingForNextRd, roundTime, word, room } = useGame();

  return (
    <div className="bg-white w-full h-12 p-2 flex items-center justify-center mb-2 font-bold rounded-sm">
      {isWaitingForNextRd ? (
        <div className="text-black font-bg">Waiting for next round...</div>
      ) : roundTime && word ? (
        <div className="flex items-center justify-between gap-x-16">
          <div className="flex items-center">
            <Timer roundTime={roundTime}></Timer>
          </div>
          <div className="tracking-wider uppercase font-bold text-lg">
            {word}
          </div>
          <div className="tracking-wider uppercase font-bold text-lg">
            {room}
          </div>
        </div>
      ) : (
        <div className="text-gray-500">Waiting</div>
      )}
    </div>
  );
};

export default RoundInfo;
