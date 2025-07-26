import { Button } from "@/components/ui/button";
import { Antenna } from "lucide-react";
import React, { useState } from "react";

export default function UrlBox() {
  const [url, setURL] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!url.trim()) {
      alert("Please paste your URL before analyzing.");
      return;
    }

    let urlToSend = url.trim();

    if (!/^https?:\/\//i.test(urlToSend)) {
      urlToSend = "http://" + urlToSend;
    }

    try {
      const res = await fetch("/api/analyseURL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: urlToSend }),
      });

      const data = await res.json();
      console.log("Response from API:", data);
      setURL(""); // Clear input after success
    } catch (err) {
      console.error("Error during fetch:", err);
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
            <Antenna className="mr-2" /> Analyze
          </Button>
        </div>
      </div>
    </div>
  );
}
