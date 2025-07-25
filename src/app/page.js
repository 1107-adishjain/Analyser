import Image from "next/image";
import Navbar from "./component/navbar";
import Body from "./component/body";
export default function Home() {
  return (
    <>
      <div className="w-screen h-auto">
        {/* <div className="container w-full" > */}
<Navbar />
        
        <Body />
        {/* </div> */}
        
        
        
      </div>

    </>
  );
}
