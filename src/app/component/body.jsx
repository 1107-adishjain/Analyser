"use client";
import { Zap, BookCheck, Braces } from "lucide-react";
import Urlbox from "./url";
import Textbox from "./html";
import { useState } from "react";

export default function Body() {
  const [active, setActive] = useState("html");

  return (
    <main className="bg-gray-900 text-white min-h-screen p-8  w-95%">
      <div className="flex flex-col items-center gap-10">
        <h1 className="text-5xl font-bold text-center">
          Analyse the Web Accessibility
        </h1>
        <p className="text-2xl text-gray-400 text-center max-w-5xl">
          Powered by axe-core — Identify and fix accessibility issues to make your web pages inclusive for everyone.
        </p>

        <div className="flex gap-4 mt-10">
          <span className="text-xl bg-gray-500 p-2 flex items-center gap-2 rounded-md hover:bg-gray-600 transition">
            <Zap /> Instant Analysis
          </span>
          <span className="text-xl bg-gray-500 p-2 flex items-center gap-2 rounded-md hover:bg-gray-600 transition">
            <BookCheck /> WCAG Guideline
          </span>
          <span className="text-xl bg-gray-500 p-2 flex items-center gap-2 rounded-md hover:bg-gray-600 transition">
            <Braces /> Best Practices
          </span>
        </div>

        <div className="w-full max-w-7xl mt-20">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => setActive("html")}
              className={`text-xl p-3 rounded-md transition-all ${
                active === "html"
                  ? "bg-gray-600"
                  : "bg-gray-500 hover:bg-gray-600"
              }`}
            >
              Analyse HTML
            </button>
            <button
              onClick={() => setActive("url")}
              className={`text-xl p-3 rounded-md transition-all ${
                active === "url"
                  ? "bg-gray-600"
                  : "bg-gray-500 hover:bg-gray-600"
              }`}
            >
              Analyse URL
            </button>
          </div>

          {active === "html" ? <Textbox /> : <Urlbox />}
        </div>
      </div>
    </main>
  );
}
