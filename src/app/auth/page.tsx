"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface User {
  email: string;
  password: string;
  username?: string;
}

export default function AuthPage() {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    username: "",
  });
  const [isSignup, setIsSignup] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false); // New loading state

  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    setError("");
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

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignup) {
        const response = await axios.post("/api/users/signup", user);
        console.log("Signup successful:", response.data);
        setIsSignup(false);
      } else {
        // Handle login
        const response = await axios.post("/api/users/login", user);
        console.log("Login successful:", response.data);
        router.push("/");
      }
    } catch (err: any) {
      console.warn("Authentication failed:", err);
      setError(err.response?.data?.message || "Authentication failed");
    } finally {
      setUser({ email: "", password: "", username: "" });
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-[100vh] flex flex-col bg-orange-500 bg-gradient-to-tr from-orange-500 to-red-500 justify-center items-center">
        <form className="flex flex-col justify-center items-center space-y-2">
          <h1>{isSignup ? "Sign Up" : "Login"}</h1>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-white px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Enter an email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
          {isSignup && (
            <input
              className="flex h-10 w-full rounded-md border border-black/30 bg-white px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Enter a username"
              name="username"
              value={user.username}
              onChange={handleInputChange}
            />
          )}
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-white px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="password"
            placeholder="Enter a password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            autoComplete="password"
          />

          <button
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={handleSubmit}
          >
            {isLoading ? "Loading..." : isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        {error && <p className="text-white text-center">{error}</p>}

        <div>
          {isSignup ? (
            <>
              <p>
                Already have an account?{" "}
                <a
                  className="cursor-pointer "
                  onClick={() => setIsSignup(false)}
                >
                  Login
                </a>
              </p>
            </>
          ) : (
            <p>
              <a
                onClick={resetPassword}
                className="cursor-pointer hover:underline"
              >
                Forgot Password
              </a>
              <br />
              Don't have an account?{" "}
              <a
                className="cursor-pointer hover:underline"
                onClick={() => setIsSignup(true)}
              >
                Sign Up
              </a>
            </p>
          )}
        </div>
      </div>
    </>
  );
}
