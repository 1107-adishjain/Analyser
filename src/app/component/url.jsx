import { Button } from "@/components/ui/button";
import { Box } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import {Globe, Search} from "lucide-react";

export default function UrlBox() {
  const [url, setURL] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();

    data && setData(null); // Clear previous data

    if (!url.trim()) {
      alert("Please paste your URL before analyzing.");
      return;
    }

    let urlToSend = url.trim();

    if (!/^https?:\/\//i.test(urlToSend)) {
      urlToSend = "http://" + urlToSend;
    }
    setLoading(true);

    try {
      const res = await fetch("/api/analyseURL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: urlToSend }),
      });

      const data = await res.json();

      setData(data);
      console.log("Response from API:", data);


    } catch (err) {
      console.error("Error during fetch:", err);
    } finally {
      setLoading(false);
      setURL("");
    }
  };


  return (
    <div>
      {/* <div className="h-auto m-2 bg-gray-700 p-4 text-white rounded-md">
        <h1 className="text-4xl font-extrabold">Analyse using URL</h1>
        <h2 className="text-xl mt-2 text-gray-200">Paste your URL here</h2>

        <div className="mt-10">
          <input
            type="url"
            value={url}
            onChange={(e) => setURL(e.target.value)}
            required
            className="mr-2 mt-2 p-4 w-full text-white rounded-md border-2"
            placeholder="Paste your URL here"
          />
          <Button
            onClick={handleSubmit}
            className={"mt-5 bg-gray-500 w-full text-2xl"}
            variant="ghost"
          >
            <Box className="h-24 w-24" />Analyze
          </Button>
        </div>
      </div> */}



      <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-600/50 rounded-2xl p-8 shadow-2xl shadow-gray-900/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gray-700 rounded-xl border border-gray-600">
            <Globe className="w-6 h-6 text-gray-200" />
          </div>
          <h2 className="text-2xl font-bold text-white">URL Analysis</h2>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <input
              type="url"
              placeholder="Enter website URL (e.g., https://example.com)"
              value={url}
              onChange={(e) => setURL(e.target.value)}
              className=" w-full bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 h-14 text-lg rounded-xl pl-12 focus:border-gray-400 focus:ring-gray-400/20 transition-all duration-300"
            />
            <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          <Button
            className="w-full h-14 text-lg font-semibold bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/50 border border-gray-600 hover:border-gray-500"
            disabled={!url.trim()}
            onClick={handleSubmit}
          >
            <Search className="w-5 h-5 mr-2" />
            Analyze Accessibility
          </Button>
        </div>
      </div>



      {
        loading && (
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

    </div>
  );
}
