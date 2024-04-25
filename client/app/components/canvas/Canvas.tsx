"use client";
import { useCanvas } from "@/app/context/CanvasContext";
import React, { useLayoutEffect } from "react";

interface CanvasProps {
  width: number;
  height: number;
}

const Canvas: React.FC<CanvasProps> = (props) => {
  const { handleMouseDown, handleMouseMove, handleMouseUp, setCtx } =
    useCanvas();
  const ref = React.useRef<HTMLCanvasElement>(null);
  useLayoutEffect(() => {
    const canvas = ref.current as HTMLCanvasElement;
    canvas.height = 500;
    canvas.width = 500;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.lineWidth = 20;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    // @ts-ignore
    setCtx(ctx);
  }, [props.height, props.width, setCtx]);
  return (
    <canvas
      ref={ref}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      data-testid="canvas"
      className="bg-red-200"
    ></canvas>
  );
};
export default Canvas;
