"use client"
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import TextArea from "./components/TextArea";
import { toast } from 'react-toastify';
import axios from "axios";
import { useSearchParams } from 'next/navigation'


export default function Home() {

  const [text, setText] = useState<string>("");
  const [id, setId] = useState<string>("");

  const searchParams = useSearchParams();
  const uuidv = searchParams.get('uuid');


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!uuidv || uuidv === undefined || uuidv === null) {
          const res = await axios.post("/api/create-new-doc");
          setId(res.data.data._id);
          return;
        }
        const res = await axios.get(`/api/get-doc/${uuidv}`);
        setId(res.data._id);
        setText(res.data.data);

      } catch (error: any) {
        toast.error(error.response.data.message);

      }
    };

    fetchData();
  }, [])


  const handleCopy = async (textToCopy: string) => {
    try {
      if (!navigator.clipboard) {
        toast.error('Clipboard API not supported');
        return;
      }
      if (!textToCopy) {
        toast.error('No text to copy');
        return;
      }
      await navigator.clipboard.writeText(textToCopy);
      toast.success('Text copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleDownload = () => {
    if (!text) {
      toast.error('No text to download');
      return;
    }
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "document.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  const handleSave = async () => {

    try {
      await axios.put(`/api/update-doc/${id}`, { text });

      toast.success('Document saved successfully!');

    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }
  const handleNewFile = async () => {
    try {
      setText("");
      const res = await axios.post("/api/create-new-doc");
      setId(res.data.data._id);

    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }
  const handleShareAbleLink = async () => {

    try {
      const res = await axios.get(`/api/shareable-url/${id}`);
      const link = res.data.data;
      if (!navigator.clipboard) {
        toast.error('Clipboard API not supported');
        return;
      }
      if (!link) {
        toast.error('No link to copy');
        return;
      }
      await navigator.clipboard.writeText(link);
      toast.success('Link copied to clipboard!');

    } catch (error: any) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);

    }

  }

  return (
    
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center py-6 px-4 bg-gray-100">
        <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <button
            className="cursor-pointer bg-gradient-to-r from-red-400 to-pink-500 transform hover:scale-105 transition-all duration-300 
            w-full sm:w-auto text-white px-4 py-2 rounded shadow-sm"
            onClick={handleNewFile}>
            New File
          </button>

          <div className="flex flex-wrap justify-center sm:justify-end gap-2 w-full sm:w-auto">
            <button
              className="cursor-pointer bg-gradient-to-r from-red-400 to-pink-500 transform hover:scale-105 transition-all duration-300 
              text-white px-4 py-2 rounded shadow-sm flex-1 sm:flex-none min-w-[120px]"
              onClick={handleDownload}>
              Download
            </button>
            <button
              className="cursor-pointer bg-gradient-to-r from-red-400 to-pink-500 transform hover:scale-105 transition-all duration-300 
              text-white px-4 py-2 rounded shadow-sm flex-1 sm:flex-none min-w-[180px]"
              onClick={handleShareAbleLink}>
              Copy Shareable Link
            </button>
            <button
              onClick={() => handleCopy(text)}
              className="cursor-pointer bg-gradient-to-r from-red-400 to-pink-500 transform hover:scale-105 transition-all duration-300 
              text-white px-4 py-2 rounded shadow-sm flex-1 sm:flex-none min-w-[120px]">
              Copy Text
            </button>
            <button
              className="cursor-pointer bg-gradient-to-r from-red-400 to-pink-500 transform hover:scale-105 transition-all duration-300 
              text-white px-4 py-2 rounded shadow-sm flex-1 sm:flex-none min-w-[120px]"
              onClick={handleSave}>
              Save
            </button>
          </div>
        </div>

        <div className="w-full max-w-6xl">
          <TextArea text={text} setText={setText} />
        </div>
      </div>
    </div>
  );
}


