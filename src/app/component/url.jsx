import { Button } from "@/components/ui/button";
import { Antenna } from "lucide-react";
export default function urlbox() {
    return (
        <div>
          <div className=" h-auto m-2 bg-gray-700 p-4  text-white rounded-md">
           <h1 className="text-4xl font-extrabold">Analyse using URL</h1>
           <h2 className="text-xl mt-2 text-gray-200 ">Paste your URL here</h2>

           <div className="mt-10">
            <input type="url" required className="mr-2 mt-2 p-4 w-full text-white rounded-md border-2 " placeholder="Paste your URL here" />
            <Button className={"mt-5 bg-gray-500 w-full text-2xl"} variant="ghost"> <Antenna /> Analyze</Button>
           </div>
          </div>
        </div>
    );
}