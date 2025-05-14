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
                className="w-[90vw] h-[30vw] bg-white text-gray-800 p-4 rounded-lg  border-gray-300 resize-none border-2 focus:outline-none focus:border-gray-500"
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