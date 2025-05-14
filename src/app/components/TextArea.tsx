"use client"
import React, { useState, useEffect } from 'react'

const TextArea = ({ text, setText }: { text: string, setText: React.Dispatch<React.SetStateAction<string>> }) => {
    const [newText, setNewText] = useState(text);

    // Sync with parent prop
    useEffect(() => {
        setNewText(text);
    }, [text]);

    return (
        <>
            <textarea
                className="w-full h-64 sm:h-80 md:h-96 lg:h-[26rem] bg-white text-gray-800 p-3 sm:p-4 
                rounded-lg shadow-sm border-gray-300 resize-none border-2 focus:outline-none 
                focus:border-gray-500 transition-all duration-200"
                placeholder="Enter your text here..."
                maxLength={5000}
                value={newText}
                onChange={(e) => {
                    setText(e.target.value); setNewText(e.target.value)
                }}
            ></textarea>
        </>
    )
}

export default TextArea