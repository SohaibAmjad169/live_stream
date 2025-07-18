"use client";

import { useState } from "react";
import AuthContainer from "@/components/ui/AuthContainer";
import InputField from "@/components/ui/InputField";
import Cookies from "js-cookie";
import AuthButton from "@/components/ui/AuthButton";
import Link from "next/link";
import AuthHeader from "@/components/ui/AuthHeader";
import { useRouter } from "next/navigation";

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("seller");
  const [error, setError] = useState("");
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserType(e.target.value);
    setError("");
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    setError("");

    try {
      const BASE_URL = "http://localhost:3000";
      let apiUrl = "";
      let redirectPath = "";

      // Dynamically determine the API endpoint and redirect path based on userType
      switch (userType) {
        case "seller":
          apiUrl = `${BASE_URL}/api/seller/sign-in`;
          redirectPath = "/seller/dashboard";
          break;
        case "admin":
          apiUrl = `${BASE_URL}/api/admin/sign-in`;
          redirectPath = "/admin/dashboard";
          break;
        case "superadmin":
          apiUrl = `${BASE_URL}/api/super-admin/sign-in`;
          redirectPath = "/superadmin/dashboard";
          break;
        default:
          setError("Invalid user type selected.");
          return;
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI2ODdhMzkzYTE1NWE5MTI1OTdlZDFlOTciLCJyb2xlIjoic3VwZXJfYWRtaW4iLCJlbWFpbCI6ImpvaG5Ac3RyZWFtcHJvcy51cyIsImlhdCI6MTc1Mjg0ODI4MywiZXhwIjoxNzUzNDUzMDgzfQ.ZEFFeMyz1nKSALQHAW-zPjJAr6W33RyqNIYSW3gsRjk",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.success) {
          Cookies.set("isLoggedIn", "true", { expires: 1 });
          Cookies.set("userRole", userType, { expires: 1 });
          Cookies.set("authToken", data.token, { expires: 1 });
          router.push(redirectPath);
        } else {
          setError(data.message || "Login failed. Please try again.");
        }
      } else {
        setError(
          data.message || `API Error: ${response.status} ${response.statusText}`
        );
      }
    } catch (err) {
      console.error("Login API call failed:", err);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <AuthContainer imageSrc="/assets/login-image.svg">
      <AuthHeader
        logoClass="bg-[#C4C4C4]"
        heading="Welcome"
        subheading="Enter your details to login to Live Commerce Pro"
      />

      {/* Radio Buttons */}
      <div className="w-full">
        <label className="block text-center text-sm text-[#666666] mb-2">
          Select Role
        </label>
        <div className="flex flex-wrap justify-center gap-4">
          <label className="inline-flex items-center gap-2 text-sm text-[#333]">
            <input
              type="radio"
              name="userType"
              value="seller"
              checked={userType === "seller"}
              onChange={handleRadioChange}
              className="accent-[#1E3A8A]"
            />
            I am a Seller
          </label>

          <label className="inline-flex items-center gap-2 text-sm text-[#333]">
            <input
              type="radio"
              name="userType"
              value="admin"
              checked={userType === "admin"}
              onChange={handleRadioChange}
              className="accent-[#1E3A8A]"
            />
            I am a Company Admin
          </label>

          <label className="inline-flex items-center gap-2 text-sm text-[#333]">
            <input
              type="radio"
              name="userType"
              value="superadmin"
              checked={userType === "superadmin"}
              onChange={handleRadioChange}
              className="accent-[#1E3A8A]"
            />
            I am a Super Admin
          </label>
        </div>
      </div>

      {/* Email Input */}
      <div className="w-full">
        <label htmlFor="email" className="block text-sm mb-1 text-[#666666]">
          Email address
        </label>
        <InputField
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>

      {/* Password Input */}
      <div className="w-full">
        <label htmlFor="password" className="block text-sm mb-1 text-[#666666]">
          Password
        </label>
        <InputField
          id="password"
          type={passwordVisible ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
          showPasswordToggle={true}
          onTogglePasswordVisibility={togglePasswordVisibility}
        />
      </div>

      {/* Error Message Display */}
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

      {/* Login Button */}
      <AuthButton text="Login" onClick={handleLogin} />

      {/* Forgot Password */}
      <Link
        href="/forgot-password"
        className="text-md underline text-[#666666]"
      >
        Forgot Password?
      </Link>
    </AuthContainer>
  );
}
