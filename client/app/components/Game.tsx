"use client";
import React from "react";
import Canvas from "./canvas/Canvas";
import StylePicker from "./canvas/StylePicker";

import Socket from "../utils/Socket";
import { useGame } from "../context/GameContext";
import RoundInfo from "./RoundInfo";
import Chatbox from "./chat/Chatbox";
import Scoreboard from "./Scoreboard";
import RoundScoreOverlay from "./RoundScoreOverlay";

interface GameProps {
  canvasWidth: number;
  canvasHeight: number;
}

export type User = {
  id: string;
  score: number;
  username: string;
};

export type RoundScore = {
  userId: string;
  username: string;
  score: number;
};

const Game: React.FC<GameProps> = ({ canvasWidth, canvasHeight }) => {
  const { drawingPermission } = useGame();
  const socket = Socket.getSocket();
  return (
    <div className="bg-hero  p-2 flex flex-col " style={{ height: "100vh" }}>
      <RoundInfo />
      <div className="flex  justify-around gap-x-1 ">
        <RoundScoreOverlay />
        <Scoreboard />
        <Canvas width={canvasWidth} height={canvasHeight} />
        {drawingPermission ? <StylePicker /> : <Chatbox />}
      </div>
    </div>
  );
};

export default Game;
