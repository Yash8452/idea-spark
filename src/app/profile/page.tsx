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
        <>{user ? <h2>{user._id}</h2> : <p>No user data available</p>}</>
      )}
      <button onClick={logout}>Logout</button>
    </>
  );
}
