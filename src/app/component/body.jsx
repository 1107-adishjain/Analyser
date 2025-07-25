"use client"
import { Zap } from "lucide-react"
import { BookCheck } from "lucide-react"
import { Braces } from "lucide-react"
import Urlbox from "./url"
import Textbox from "./html"

import { useState } from "react"
export default function body() {
    const [active, setActive] = useState('url')

    return (
        <>
            <div className="" >
                <div className="h-auto m-4 bg-gray-800 p-8 text-white">

                    <div className="font-bold h-3/4 color-blue flex flex-col items-center justify-center gap-10">
                        <p className=" text-5xl ">Analyse the web assecibility</p>
                        <p className="text-2xl text-center text-gray-400">Powered by axe-core - Identify and fix accessibility issues to make your web pages inclusive for everyone</p>

                        <div className="flex gap-4 mt-10">
                            <p className="text-xl bg-gray-500 p-2 flex gap-2 rounded-md hover:bg-gray-600 transition-all duration-150"> <Zap></Zap>Instant Analysis</p>
                            <p className="text-xl bg-gray-500 p-2 flex gap-2 rounded-md hover:bg-gray-600 transition-all duration-150"> <BookCheck /> WCAG Guideline </p>
                            <p className="text-xl bg-gray-500 p-2 flex gap-2 rounded-md hover:bg-gray-600 transition-all duration-150"> <Braces />Best Practises</p>

                        </div>
                    </div>
<div>
                    <div className=" flex flex-col items-center ">
                        <div className="w-9/12 p-4 mt-20 grid grid-cols-2 gap-4  ">
                            <button onClick={() => setActive('html')} className="bg-gray-500 p-2 rounded-md text-xl hover:bg-gray-600 transition-all duration-150 cursor-pointer"  >Analyse HTML</button>
                            <button onClick={() => setActive('url')} className="bg-gray-500 p-2 rounded-md text-xl hover:bg-gray-600 transition-all duration-150 cursor-pointer">Analyse Url</button>
                        </div>
                    </div>

                    <div className="flex flex-col items-center ">
                        <div className="w-9/12">
                            {active === 'html' && <Textbox />}
                            {active === 'url' && <Urlbox />}
                        </div>
                    </div>
                    </div>

                </div>
            </div>





        </>
    )
}