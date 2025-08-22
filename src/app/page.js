import Image from "next/image";
import Navbar from "./component/navbar";
import Body from "./component/body";
import About from "./component/about";

import Contact from "./component/contact";
export default function Home() {
  return (
    <>
      <div className="w-95%">
        {/* <Navbar /> */}
        <Body />
        <About />
        <Contact/>
      </div>

    </>
  );
}
