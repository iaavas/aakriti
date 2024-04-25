"use client";
import { useState } from "react";
import Home from "./components/ui/Home";
import RoomContainer from "./components/ui/RoomContainer";
import Link from "next/link";
export default function Page() {
  const [username, setUsername] = useState<string | null>(null);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center bg-hero bg-cover 	"
      // style={{ background: `url(${imgSrc})` }}
    >
      <Home setUsername={setUsername} />
      <p className="absolute bottom-0 text-black text-lg mb-2 bg-white px-2">
        Crafted by{" "}
        <Link className="underline " href={"https://www.instagram.com/iaavas"}>
          Aavash Baral
        </Link>
        . The source code is on{" "}
        <Link className="underline " href={"https://www.instagram.com/iaavas"}>
          Github
        </Link>
        .
      </p>
    </main>
  );
}
