"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Antenna, Box } from "lucide-react";

export default function Textbox() {
  const [html, setHtml] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!html.trim()) {
      alert("Please paste your HTML content before analyzing.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/analysehtml", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ html }),
      });

      const result = await res.json();
      setData(result);
      console.log("Response from API:", result);
    } catch (error) {
      console.error("Error during analysis:", error);
    } finally {
      setLoading(false);
      setHtml("");
    }
  };

  return (
    <>
      <div className="h-auto m-2 bg-gray-700 p-8 text-white rounded-md">
        <h1 className="text-3xl font-extrabold">HTML Accessibility Analyzer</h1>
        <h2 className="text-xl mt-2">
          Paste your HTML content below for instant accessibility analysis
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          rows="10"
          className="mr-2 mt-2 p-4 w-full text-white rounded-md bg-gray-700"
          placeholder="Paste your HTML content here"
          onChange={(e) => setHtml(e.target.value)}
          value={html}
        />
        <Button
          type="submit"
          className="mt-2 bg-gray-500 w-full text-2xl"
          variant="ghost"
        >
          <Box className="mr-2" size={48} />
          {loading ? "Analyzing..." : "Analyze"}
        </Button>
      </form>

      {
  loading && (
    <div className="flex items-center justify-center mt-4">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-200"></div>
    </div>
  )}

      {data && (
        <div className="mt-6 p-4 bg-gray-800 text-white rounded-md">
          <h2 className="text-2xl font-bold mb-2">Accessibility Report</h2>

          {data.violations?.length > 0 ? (
            <>
              <h3 className="text-xl text-red-400 mb-2">
                Violations Found: {data.violations.length}
              </h3>
              {data.violations.map((violation, i) => (
                <div key={i} className="mb-4 border-b border-gray-600 pb-2">
                  <p className="font-semibold">{violation.id}</p>
                  <p className="text-sm text-gray-300">{violation.description}</p>
                  <p className="text-sm italic text-gray-400">
                    Impact: {violation.impact}
                  </p>
                  <ul className="ml-4 list-disc">
                    {violation.nodes.map((node, j) => (
                      <li key={j}>
                        <code className="text-yellow-300">{node.html}</code>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          ) : (
            <h3 className="text-green-400 text-xl"> No accessibility violations found!</h3>
          )}
        </div>
      )}
    </>
  );
}
