"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="h-[120vh] bg-white" >
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="flex items-center justify-center gap-[440px] mt-10 mb-2" >
          <button className="cursor-pointer bg-gradient-to-r from-red-400 to-pink-500  transform hover:scale-105 transition-all duration-300 w-[10vw] text-white px-4 py-2 rounded">New File</button>
          <div className="flex items-center gap-2">
            <button className="cursor-pointer bg-gradient-to-r from-red-400 to-pink-500 transform hover:scale-105 transition-all duration-300 w-[10vw] text-white px-4 py-2 rounded">Download</button>
            <button className="cursor-pointer bg-gradient-to-r from-red-400 to-pink-500 transform hover:scale-105 transition-all duration-300 w-[15vw] text-white px-4 py-2 rounded">Copy Shareable Link</button>
            <button className="cursor-pointer bg-gradient-to-r from-red-400 to-pink-500 transform hover:scale-105 transition-all duration-300 w-[10vw] text-white px-4 py-2 rounded">Copy Text</button>
            <button className="cursor-pointer bg-gradient-to-r from-red-400 to-pink-500 transform hover:scale-105 transition-all duration-300 w-[10vw] text-white px-4 py-2 rounded">Save</button>
          </div>
        </div>
        <div>
          <textarea
            className="w-[90vw] h-[40vw] bg-white text-gray-800 p-4 rounded-lg  border-gray-300 resize-none border-2 focus:outline-none focus:border-gray-500"
            placeholder="Enter your text here..."
          ></textarea>
        </div>

      </div>
    </div>
  );
}
