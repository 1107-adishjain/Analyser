import { Button } from "@/components/ui/button";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const auth = false; 
  const user ={
    name:"Ravi",
    email:"pHtIg@example.com"
  }

  return (
    <>
      <div className=" h-auto">
        <div className="flex justify-between m-4 items-center p-4 text-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-md shadow-md">
          <div className="ml-7 ">
           <Link href="/">Analyser</Link>
          </div>

          {auth ? (
            <UserModelComponent user={user} />
          ) : (
            <div className="flex gap-4 mr-4">
              <Link href="/login"><Button>Login</Button></Link>
              <Link href="/register"><Button>Register</Button></Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const UserModelComponent = ({ user}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <CircleUserRound  className="size-8 hover:scale-110 transition-all duration-200"/>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className={"text-sm font-bold"}>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
        <DropdownMenuItem>Log-Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
