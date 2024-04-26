import React from "react";

import { useGame } from "../context/GameContext";

const RoundScoreOverlay: React.FC = () => {
  const { wordReal, isWaitingForNextRd, roundScores } = useGame();
  if (!isWaitingForNextRd) {
    return <></>;
  }
  return (
    <div id="overlay">
      <h3>The word was &apos;{wordReal}&apos;</h3>
      {roundScores &&
        roundScores.map((roundScore) => (
          <div
            className="round-score"
            key={roundScore.userId}
            style={{ color: roundScore.score === 0 ? "red" : "green" }}
          >
            <b>{roundScore.username}:</b> {roundScore.score}
          </div>
        ))}
    </div>
  );
};
export default RoundScoreOverlay;
