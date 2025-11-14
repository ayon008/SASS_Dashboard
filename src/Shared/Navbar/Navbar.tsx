"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  Bell,
  Briefcase,
  LogOut,
  Mail,
  Moon,
  Search,
  User,
} from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  // Show Search Icon
  const [search, setSearch] = useState(false);
  // Search functions
  const searchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length === 0) {
      setSearch(false);
      return;
    }
    setSearch(true);
  };

  return (
    <nav className="flex items-center justify-between w-full p-4 border-b border-gray-300">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h2 className="text-lg font-bold text-black/80">Dashboard</h2>
      </div>
      <div className="flex items-center gap-6">
        <div className="max-w-sm relative">
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              searchValue(e)
            }
            type="search"
            placeholder="Search Here..."
            className="p-5! rounded-3xl placeholder:text-sm placeholder:font-medium bg-white!"
          />
          {!search && (
            <Search className="absolute top-1/2 -translate-y-1/2 right-4 w-5 h-5 text-gray-600" />
          )}
        </div>
        <div className="relative">
          <Moon
            className="w-5 h-5 text-primary cursor-pointer"
            fill="currentColor"
          />
        </div>
        <div className="relative">
          <Bell
            className="w-5 h-5 text-gray-600 cursor-pointer"
            fill="currentColor"
          />
          <span className="rounded-full w-5 h-5 flex items-center justify-center text-[8px] text-white font-semibold bg-pink-300 absolute -top-3 -right-2">
            76
          </span>
        </div>
        <div className="relative">
          <Mail className="w-5 h-5 text-gray-600 cursor-pointer" />
          <span className="rounded-full w-5 h-5 flex items-center justify-center text-[8px] text-white font-semibold bg-blue-300 absolute -top-3 -right-2">
            76
          </span>
        </div>
        <Briefcase className="w-5 h-5 text-gray-600 cursor-pointer" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="w-5 h-5 cursor-pointer">
              <AvatarImage src="/user-avatar.jpg" alt="User" />
              <AvatarFallback>Shariar Ayon</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 p-2">
            <DropdownMenuItem>
              <User className="text-blue-600" />
              <span className="">Shariar Ayon</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Mail className="text-green-600" />
              <span className="">Inbox</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="text-red-600" />
              <span className="">Log Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
