"use client";
import { useCanvas } from "@/app/context/CanvasContext";
import React from "react";

const StylePicker: React.FC = () => {
  const { handleColorChange, handleBrushSizeChange, brushSize, color } =
    useCanvas();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-1/4">
      <h2 className="text-xl font-semibold mb-4">Style Picker</h2>
      <div className="mb-6">
        <label
          htmlFor="color-picker"
          className="block text-gray-700 font-semibold mb-2"
        >
          Brush Color
        </label>
        <input
          id="color-picker"
          type="color"
          value={color}
          onChange={handleColorChange}
          className="w-full h-10 rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label
          htmlFor="brush-size"
          className="block text-gray-700 font-semibold mb-2"
        >
          Brush Size
        </label>
        <div className="flex items-center">
          <input
            id="brush-size"
            type="range"
            min={5}
            max={30}
            value={brushSize}
            onChange={handleBrushSizeChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <span className="ml-4 text-gray-700">{brushSize}</span>
        </div>
      </div>
    </div>
  );
};

export default StylePicker;
