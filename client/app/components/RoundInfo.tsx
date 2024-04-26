import React from "react";
import Timer from "./Timer";

import { useGame } from "../context/GameContext";

export type RoundTime = {
  timeToComplete: number;
  startTime: number;
};

const RoundInfo: React.FC = () => {
  const { isWaitingForNextRd, roundTime, word } = useGame();
  console.log(word);

  let renderedContent: JSX.Element;
  if (isWaitingForNextRd) {
    return (
      <div id="roundinfo-container">
        <div id="round-waiting">Waiting for next round...</div>
      </div>
    );
  }
  if (roundTime && word) {
    renderedContent = (
      <>
        <Timer roundTime={roundTime}></Timer>
        <div id="round-word">{word}</div>
      </>
    );
  } else {
    renderedContent = <div id="round-waiting">Waiting... haha</div>;
  }
  return <div id="roundinfo-container">{renderedContent}</div>;
};
export default RoundInfo;
