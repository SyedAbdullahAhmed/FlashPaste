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
  const [uuid, setUuid] = useState<string | null>(""); 

  const searchParams = useSearchParams();
  const uuidv = searchParams.get('uuid');
  

  useEffect(() => {
    const fetchData = async () => {
      setUuid(uuidv);
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
        console.error("Error fetching data:", error);
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
      console.error("Error fetching data:", error);
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
      console.error("Error fetching data:", error);
    }

  }

  return (
    <div className="h-[120vh] bg-white" >
      <Navbar />
      <div className="flex flex-col items-center justify-start h-screen bg-gray-100">
        <div className="flex items-center justify-center gap-[440px] mt-10 mb-2" >
          <button className="cursor-pointer bg-gradient-to-r from-red-400 to-pink-500  transform hover:scale-105 transition-all duration-300 w-[10vw] text-white px-4 py-2 rounded" onClick={handleNewFile}>New File</button>
          <div className="flex items-center gap-2">
            <button className="cursor-pointer bg-gradient-to-r from-red-400 to-pink-500 transform hover:scale-105 transition-all duration-300 w-[10vw] text-white px-4 py-2 rounded" onClick={handleDownload}>Download</button>
            <button className="cursor-pointer bg-gradient-to-r from-red-400 to-pink-500 transform hover:scale-105 transition-all duration-300 w-[15vw] text-white px-4 py-2 rounded" onClick={handleShareAbleLink}>Copy Shareable Link</button>
            <button
              onClick={() => handleCopy(text)} className="cursor-pointer bg-gradient-to-r from-red-400 to-pink-500 transform hover:scale-105 transition-all duration-300 w-[10vw] text-white px-4 py-2 rounded">Copy Text</button>
            <button className="cursor-pointer bg-gradient-to-r from-red-400 to-pink-500 transform hover:scale-105 transition-all duration-300 w-[10vw] text-white px-4 py-2 rounded" onClick={handleSave}>Save</button>
          </div>
        </div>
        <div>
          <TextArea text={text} setText={setText}  />
        </div>

      </div>
    </div>
  );
}
