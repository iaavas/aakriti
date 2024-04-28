"use client";
import { useState } from "react";
import Home from "./components/ui/Home";

import GameProvider from "./context/GameContext";
import Game from "./components/Game";
export default function Page() {
  const [username, setUsername] = useState<string | null>(null);

  if (username == null) return <Home setUsername={setUsername} />;
  return (
    <GameProvider username={username} exitGame={() => setUsername(null)}>
      <Game canvasHeight={500} canvasWidth={500} />
    </GameProvider>
  );
}
