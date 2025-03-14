"use client";
import { Gradient } from "@/components/design/Hero";
import AuthService from "@/services/AuthService";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLogin({ ...login, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!login.email || !login.password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(login.email)) {
      setError("Please enter a valid email.");
      return;
    }

    // Clear error
    setError("");

    // Simulate API call or handle authentication
    await AuthService.login(login)
      .then((response) => {
        const data = response.data;
        localStorage.setItem("uid", data.user.uid);
        localStorage.setItem("token", data.token);
        router.push("/");
      })
      .catch((error) => {
        alert("Login Failed...");
        console.log(error);
      });
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50  border-b  border-n-6  lg:bg-n-8/90 lg:backdrop-blur-sm ${"bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 text-white rounded-lg shadow-md bg-n-11/100">
          <h2 className="mb-6 text-3xl font-bold text-center">
            Login
          </h2>

          {/* Display Error Message */}
          {error && (
            <div className="mb-4 text-sm absolute right-0 top-0 w-full text-red-600 bg-red-100 p-2 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium "
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={login.email}
                onChange={handleChange}
                className="w-full px-4 py-2 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium "
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={login.password}
                onChange={handleChange}
                className="w-full px-4 py-2 tracking-wider text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Login
            </button>
          </form>

          {/* Extra Links */}
          <div className="mt-4 text-center">
            <p
              onClick={() => router.push("/fwd")}
              className="text-sm text-blue-500 hover:underline cursor-pointer"
            >
              Forgot your password?
            </p>
          </div>
          <div className="mt-2 text-center">
            <p
              onClick={() => router.push("/signup")}
              className="text-sm text-blue-500 hover:underline cursor-pointer"
            >
              Don't have an account? Sign up
            </p>
          </div>
        </div>
      </div>
                  <Gradient />
    </div>
  );
};

export default Login;
