"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

export function Leftbar() {
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/auth");
    } catch (error: any) {
      console.error("Error logging out:", error.message);
    }
  };
  return (
    <>
      {/* mobile menu bar */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500  text-white flex justify-between  md:hidden">
        {/* logo */}
        <a href="#" className="block p-4 text-white font-bold">
          IdeaSpark
        </a>
        {/* mobile menu button */}
        <button className="mobile-menu-button p-4 focus:outline-none focus:hover:bg-orange-700">
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {/* sidebar */}
      <div className="sidebar flex flex-col justify-between h-[100vh] bg-orange-500 bg-gradient-to-tr from-orange-500 to-red-5000 text-whote w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full transition duration-200 ease-in-out md:relative md:translate-x-0">
        {/* logo */}
        <div className="mt-4">
          <a href="#" className="text-white flex item-center space-x-2 px-4">
            <svg
              className="w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 8l3 5m0 0l3-5m-3 5v4m-3-5h6m-6 3h6m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-2xl font-extrabold">IdeaSpark</span>
          </a>
          {/* nav */}
          <nav className="text-white mt-4">
            <a
              href="/"
              className="block py-2.5 px-4 rounded hover:bg-orange-700 hover:text-white transition duration-200"
            >
              Home
            </a>
            <a
              href="/profile"
              className="block py-2.5 px-4 rounded hover:bg-orange-700 hover:text-white transition duration-200"
            >
              Profile
            </a>
            <a
              href="/settings"
              className="block py-2.5 px-4 rounded hover:bg-orange-700 hover:text-white transition duration-200"
            >
              Setting
            </a>
            <a
              href="/profile"
              className="block py-2.5 px-4 rounded hover:bg-blue-700 hover:text-white transition duration-200"
            >
              Profile
            </a>
          </nav>
        </div>
        <button
          onClick={logout}
          className="text-white flex item-center space-x-2 px-4 hover:bg-orange-700"
        >
          Logout
        </button>
      </div>
    </>
  );
}
