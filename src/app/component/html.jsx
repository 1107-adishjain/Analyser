"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Antenna } from "lucide-react";
// import useform from "react-hook-form";

export default function textbox() {
  const [html, setHtml] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!html) {
      alert("Please paste your HTML content before analyzing.");
      return;
    }

    console.log("Submitting HTML content for analysis:", html);

    const res = await fetch('/api/analysehtml', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ html }),
    });

    console.log("Response from API:", res);
    // Call your API or perform the analysis here
  };

  const handleInput = (event) => {
    setHtml(event.target.value);
  };

  return (
    <div>
      <div className=" h-auto m-2 bg-gray-700 p-8 text-white rounded-md">
        <h1 className="text-3xl font-extrabold">HTML Accessibility Analyser</h1>
        <h2 className="text-xl mt-2 ">Paste your HTML content bellow for instant accessibility analysis</h2>
      </div>
      <form>
        <textarea   rows="10" 
        className="mr-2 mt-2 p-4 w-full text-white rounded-md bg-gray-700"
         placeholder="Paste your HTML content here" 
         onChange={handleInput} 
         value={html}
         >
        </textarea>
      </form>

      <Button className={"mt-2 bg-gray-500 w-full text-2xl"} variant="ghost" onClick={handleSubmit} > <Antenna /> Analyze</Button>
    </div>
  );
}