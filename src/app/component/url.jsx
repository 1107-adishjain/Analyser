import { Button } from "@/components/ui/button";
import { Box } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

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
      <div className="h-auto m-2 bg-gray-700 p-4 text-white rounded-md">
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
            <Box className="h-24 w-24"/>Analyze
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
