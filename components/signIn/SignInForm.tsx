/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../shared/ui/Button";

const SignInForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    saveSignIn: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("SignIn attempt:", {
        email: formData.email,
        saveSignIn: formData.saveSignIn,
      });

      alert("SignIn successful!");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error("SignIn error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-145 bg-green rounded-xl  p-7">
      {/* Header */}
      <div className="mb-8">
        <h1 className="heading-xl text-white mb-3">Sign In</h1>
        <p className="text-gray-300 paragraph-md ">
          SignIn your account to get your access.
        </p>
      </div>

      {/* SignIn Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-white text-lg mb-3">
            Name
          </label>
          <input
            type="name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 bg-white rounded-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-lime-400/50 transition-all text-lg"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-white text-lg mb-3">
            Mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 bg-white rounded-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-lime-400/50 transition-all text-lg"
          />
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-white text-lg mb-3">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 bg-white rounded-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-lime-400/50 transition-all text-lg"
          />
        </div>

        {/* Save SignIn & Forget Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center cursor-pointer group">
            <input
              type="checkbox"
              name="saveSignIn"
              checked={formData.saveSignIn}
              onChange={handleChange}
              className="w-6 h-6 rounded border-2 border-white bg-transparent checked:bg-lime-400 checked:border-lime-400 focus:ring-2 focus:ring-lime-400 focus:ring-offset-0 cursor-pointer transition-all appearance-none relative
                checked:after:content-['✓'] checked:after:absolute checked:after:text-emerald-900 checked:after:font-bold checked:after:text-lg checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
            />
            <span className="ml-3 text-white text-lg group-hover:text-lime-400 transition-colors">
              I Agree with terms and conditions.
            </span>
          </label>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* SignIn Button */}
        <Button
          type="submit"
          text={isSubmitting ? "Logging in..." : "Sign In"}
          variant="white"
          className="w-full"
        />

        {/* Sign Up Link */}
        <p className="text-start text-gray-300 text-lg pt-4">
          Don't have account?{" "}
          <Link href="/signup" className="text-white  transition-colors">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};
export default SignInForm;
