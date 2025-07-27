import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Login() {
    return (
        <>
            <div>
                <div className="text-center m-4 p-4 bg-gradient-to-r from-gray-1000 via-gray-500 to-gray-1000 text-white rounded-md shadow-md">
                    <h1 className="text-4xl font-extrabold">Login Page</h1>
                    <h2 className="text-xl mt-2 text-gray-200">Please enter your credentials</h2>
                </div>

                <div className=" flex flex-col items-center justify-center mt-10 ">
                    <div className="flex flex-col items-center justify-center mt-10 w-1/2 border-2 h-150">
                        <div className="flex flex-col items-center justify-center mt-10">
                            <h1> don't have an account?</h1>
                            <Link href="/register"  ><button className="text-xl font-bold p-1 text-center m-3 underline cursor-pointer rounded-2xl">SignUp</button></Link>
                        </div>
                        <button className="flex items-center bg-white text-gray-800 rounded-md px-4 py-2 shadow-md cursor-pointer mt-8">
                            <img src="icons8-google.svg" alt="Google Logo" className="w-5 h-5 mr-2" />
                            Sign in with Google
                        </button>

                        <div className="flex flex-col items-center justify-center mt-5 w-3/4 gap-10">
                            <form className="flex flex-col items-center justify-center w-3/4  ">
                                <ul className="w-full">
                                    <li className="flex flex-col items-center justify-center">
                                        <label >Email: </label>
                                        <input type="email" placeholder="Enter your email" className="border-2 rounded-md p-2 m-2 w-full" />
                                    </li>

                                    <li className="flex flex-col items-center justify-center">
                                        <label>Password: </label>
                                        <input type="password" placeholder="Enter your password" className="border-2 rounded-md p-2 m-2 w-full" />
                                    </li>

                                </ul>
                            </form>

                            <Button variant={"outline"}> submit </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}