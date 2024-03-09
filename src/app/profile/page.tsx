"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface User {
  _id: string;
  email: string;
  username: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get("/api/users/user");
      setUser(response.data.user);
    } catch (error: any) {
      console.error("Error fetching user:", error.message);
      // Handle error, such as redirecting to the login page
      router.push("/auth");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    try {
      const response = await axios.post("/api/users/forgotPassword", {
        email: user?.email,
      });
      console.log(response);
    } catch (error: any) {
      console.error("Error resetting password:", error.message);
    }
  };
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
      <h1>Profile Page</h1>
      {loading ? (
        <div role="status" className="max-w-sm animate-pulse">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5" />
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5" />
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5" />
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          {user ? (
            <>
              <h2>{user._id}</h2>
              <h2>{user.username}</h2>
              <button
                onClick={resetPassword}
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Password reset link
              </button>
            </>
          ) : (
            <p>No user data available</p>
          )}
        </>
      )}
      <button onClick={logout}>Logout</button>
    </>
  );
}
