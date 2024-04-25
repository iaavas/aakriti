"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";

function RoomContainer() {
  const socket = io("http://localhost:3001");
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  function handleCreateClick() {
    if (roomId.length < 1) return;
    socket.emit("joinRoom", roomId);
    router.push(`/play?room=${roomId}`);
  }
  const Root = styled("div")(({ theme }) => ({
    width: "100%",
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    "& > :not(style) ~ :not(style)": {
      marginTop: theme.spacing(2),
    },
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase  text-6xl   tracking-wide  text-center mb-2 text-cyan-600  font-game">
          Aakriti
        </CardTitle>
        <CardDescription className="font-normal text-lg italic">
          Unleash your drawing and vocabularies
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="name">User Name</Label>
          <Input id="name" defaultValue="Pedro Duarte" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="username">Room Id</Label>
          <Input
            id="username"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-y-4 ">
        <Root className=" flex flex-col">
          <Button
            className="bg-green-700 text-white uppercase "
            onClick={handleCreateClick}
          >
            Create Room
          </Button>

          <Divider>OR</Divider>
          <Button className="bg-red-700 text-white uppercase">Join Room</Button>
        </Root>
      </CardFooter>
    </Card>
  );
}

export default RoomContainer;
