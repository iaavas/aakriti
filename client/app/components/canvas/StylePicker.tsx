"use client";
import { useCanvas } from "@/app/context/CanvasContext";
import React from "react";

const StylePicker: React.FC = () => {
  const { handleColorChange, handleBrushSizeChange, brushSize, color } =
    useCanvas();
  return (
    <form id="stylepicker-container">
      <label htmlFor="color-picker">Brush color</label>
      <input
        id="color-picker"
        type="color"
        value={color}
        onChange={handleColorChange}
      />
      <label htmlFor="brush-size"> Brush size</label>
      <input
        id="brush-size"
        type="range"
        min={5}
        max={30}
        value={brushSize}
        onChange={handleBrushSizeChange}
      />
    </form>
  );
};
export default StylePicker;
