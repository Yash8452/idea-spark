"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const verifyEmail = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/verifyEmail", { token });
      setIsVerified(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async () => {
    try {
      setLoading(true);
      const response = await axios.patch("/api/users/forgotPassword", {
        newPassword,email
      });
      console.log(response);
      // Assuming successful response means email is sent
      // You can show a success message or redirect the user to a page indicating that the password reset email has been sent
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    if (urlToken) {
      setToken(urlToken || "");
    }
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div>
      {!isVerified && (
        <>
          <h1>Verify Email</h1>
          {loading && <div>Loading...</div>}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
              <button onClick={forgotPassword}>Forgot Password?</button>
            </>
          )}
          {error && <p>Error: {error}</p>}
        </>
      )}
      {isVerified && (
        <div>
          <h2>Email Verified</h2>
          <Link href="/">Go Back to Home</Link>
        </div>
      )}
    </div>
  );
}
