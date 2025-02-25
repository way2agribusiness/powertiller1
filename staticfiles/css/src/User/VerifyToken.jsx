import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const VerifyToken = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  console.log("Frontend token is here:", token);

  const [verificationStatus, setVerificationStatus] = useState(token ? "verifying" : "pending");
  const [isTabVisible, setIsTabVisible] = useState(!document.hidden);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
      if (!document.hidden && verificationStatus === "pending") {
        setVerificationStatus("verifying");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [verificationStatus]);

  useEffect(() => {
    const verifyEmailToken = async () => {
      if (!token) {
        return;
      }
      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/verifyemail",
          { token },
          {
            headers: {
              "Content-Type": "application/json",
            }
          }
        );
        setVerificationStatus("success");
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        console.error("Verification error:", error.response?.data?.message || error.message);
        toast.error(error.response?.data?.message || "Something went wrong.");
        setVerificationStatus("failed");
      }
    };

    if (verificationStatus === "verifying") {
      verifyEmailToken();
    }
  }, [token, verificationStatus, navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          {verificationStatus === "pending" && (
            <>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Verify Your Email
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Please check your mailbox and verify your email.
              </p>
            </>

          )}
          {verificationStatus === "verifying" && (
            <>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                You can close this tab.
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Check your email...
              </p>
            </>

          )}
          {verificationStatus === "success" && (
            <>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Successfully Verify e-mail..
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Email verified successfully! Redirecting to Home page...
              </p>
            </>

          )}
          {verificationStatus === "failed" && (
            <p className="mt-2 text-center text-sm text-red-600">
              Failed to verify email. Please register again.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyToken;
