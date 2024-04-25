"use client";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Socket from "../utils/Socket";
import { waitFor } from "../utils/WaitFor";

type BoardEvent = React.MouseEvent<HTMLCanvasElement, MouseEvent>;
type PickerEvent = React.ChangeEvent<HTMLInputElement>;

export interface CanvasProps {
  isDrawing: boolean;
  setIsDrawing: (newVal: boolean) => void;
  handleMouseMove: (ev: BoardEvent) => void;
  handleMouseUp: (ev: BoardEvent) => void;
  handleMouseDown: (ev: BoardEvent) => void;
  ctx: CanvasRenderingContext2D;
  setCtx: (ctx: CanvasRenderingContext2D) => void;
  color: string;
  handleColorChange: (ev: PickerEvent) => void;
  brushSize: number;
  handleBrushSizeChange: (ev: PickerEvent) => void;
  setColor: Dispatch<SetStateAction<string>>;
  setBrushSize: Dispatch<SetStateAction<number>>;
}
export interface Line {
  x: number;
  y: number;
  color: string;
  brushSize: number;
  isEnding: boolean;
}

export const CanvasContext = React.createContext<Partial<CanvasProps>>({});

const CanvasProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [ctx, setCtx] = React.useState<CanvasRenderingContext2D>();
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(10);
  const socket = Socket.getSocket();

  const drawLine = useCallback(
    (line: Line) => {
      if (!ctx) {
        return;
      }
      ctx.strokeStyle = line.color;
      ctx.lineWidth = line.brushSize;
      ctx.lineTo(line.x, line.y);
      ctx.stroke();
      if (line.isEnding) {
        ctx.beginPath();
      }
    },
    [ctx]
  );

  useEffect(() => {
    if (ctx) {
      socket.on("lineDraw", (line: Line) => {
        drawLine(line);
      });
      socket.on("drawingState", async (lines: Line[]) => {
        for (const line of lines) {
          drawLine(line);
          await waitFor(5);
        }
      });
      socket.on("roundStart", () => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      });
    }
  }, [ctx, socket, drawLine]);

  const draw = (ev: BoardEvent, isEnding = false) => {
    if (!ctx || !isDrawing) {
      return;
    }
    const newLine = {
      x: ev.clientX - ctx.canvas.offsetLeft,
      y: ev.clientY - ctx.canvas.offsetTop,
      color,
      brushSize,
      isEnding,
    };
    drawLine(newLine);
    socket.emit("lineDraw", newLine);
  };
  const handleMouseMove = (ev: BoardEvent): void => {
    draw(ev);
  };
  const handleMouseDown = (ev: BoardEvent): void => {
    setIsDrawing(true);
    draw(ev);
  };
  const handleMouseUp = (ev: BoardEvent): void => {
    draw(ev, true);
    setIsDrawing(false);
  };
  const handleColorChange = (ev: PickerEvent): void => {
    setColor(ev.target.value);
  };
  const handleBrushSizeChange = (ev: PickerEvent): void => {
    setBrushSize(parseInt(ev.target.value));
  };
  return (
    <CanvasContext.Provider
      value={{
        isDrawing,
        setIsDrawing,
        setCtx,
        ctx,
        handleMouseMove,
        handleMouseDown,
        handleMouseUp,
        color,
        brushSize,
        handleBrushSizeChange,
        handleColorChange,
        setBrushSize,
        setColor,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => {
  const context = useContext(CanvasContext);
  if (!context)
    throw new Error("Canvas context must be within canvas provider");
  return context;
};

export default CanvasProvider;
