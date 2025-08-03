"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {Code, Search} from "lucide-react";
import Link from "next/link";

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
   
      // console.log("Response from API:", result);
    } catch (error) {
      console.error("Error during analysis:", error);
    } finally {
      setLoading(false);
      setHtml("");
    }
  };
useEffect(() => {
  if (data) {
    console.log(data.passes, "passes");

    console.log("inapplicable", data.inapplicable);
    console.log("incomplete", data.incomplete);
  }
}, [data]);
  

  return (
    <>
      
       <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-600/50 rounded-2xl p-8 shadow-2xl shadow-gray-900/30">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gray-700 rounded-xl border border-gray-600">
          <Code className="w-6 h-6 text-gray-200" />
        </div>
        <h2 className="text-2xl font-bold text-white">HTML Analysis</h2>
      </div>

      <div className="space-y-6">
        <div className="relative">

          <textarea
            placeholder="Paste your HTML code here..."
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            className="bg-gray-700/50 w-full border-gray-600/50 text-white placeholder-gray-400 p-7 min-h-[300px] rounded-xl font-mono focus:border-gray-400 focus:ring-gray-400/20 transition-all duration-300 resize-none text-xl"
          />
        </div>

        <Button
          className="w-full h-14 text-lg font-semibold bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/50 border border-gray-600 hover:border-gray-500"
          disabled={!html.trim()}
          onClick={handleSubmit}
        >
          <Search className="w-5 h-5 mr-2" />
          Analyze Accessibility
        </Button>
      </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center mt-4">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-200"></div>
        </div>
      )}

      {data && (
        <>
          <div className="mt-6 p-4 bg-gray-800 text-white rounded-md">
            <h2 className="text-4xl font-bold mb-2 text-center">Accessibility Report</h2>

            {data.violations?.length > 0 ? (
              <>
                <div ><h3 className="text-2xl text-red-400 mb-2 m-4 text-center">
                  Violations Found: {data.violations.length}
                </h3></div>

                {data.violations.map((violation, i) => (
                  <div key={i} className="mb-4 border-b border-gray-600 p-4 bg-gray-900 rounded-md">
                    <p className="font-semibold text-2xl">{(violation.id).charAt(0).toUpperCase() + (violation.id).slice(1)}</p>

                    <p className="text-xl text-gray-100" > Description : {violation.description}</p>
                    <Link className="text-xl text-gray-100 flex gap-2 " href={violation.helpUrl}> Help : <h1 className="hover:text-blue-400  hover:underline" >{violation.helpUrl}</h1></Link>
                    <p className="text-xl font-bold italic text-gray-400 flex gap-3">
                      {/* // i want to show impact in a better way */}
                      Impact: {violation.impact === "critical" ? <h1 className="text-red-400 text-xl font-bold "> ⚠️ Critical</h1> : violation.impact === "serious" ? <h1 className="text-orange-400 text-xl font-bold">⚠️ Serious</h1> : violation.impact === "moderate" ? <h1 className="text-yellow-400 text-xl font-bold">ℹ️ Moderate</h1> : <h1 className="text-green-400 text-xl font-bold">ℹ️ Minor</h1>}
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
        </>
      )}
    </>
  );
}
