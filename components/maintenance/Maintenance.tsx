/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Title from "../shared/ui/Title";
import { Button } from "../shared/ui/Button";

const Maintenance = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    saveSignIn: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("SignIn attempt:", {
        email: formData.email,
        saveSignIn: formData.saveSignIn,
      });

      alert("SignIn successful!");
    } catch (err) {
      console.error("SignIn error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <div>
        <div className="h-screen relative">
          <img
            src="/image/coming soon/Coming Soon.jpg"
            className="h-screen w-screen"
            alt=""
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center justify-center my-auto">
              <div className="grid grid-cols-2 gap-40">
                <div>
                  <img src="/image/logo/Logo2.png" alt="" />
                  <Title
                    title={"We are Under\n Maintenance Now"}
                    className="text-[56px]! mt-8"
                  />
                  <div className="mt-6">
                    <p className="text-secondary font-plus_jakarta">
                      Get notified about our launch, new features, and exclusive
                      early-bird benefits.
                    </p>
                  </div>
                  <div className="mt-10 w-4/5">
                    <form onSubmit={handleSubmit}>
                      <div className="flex gap-2">
                        <input
                          type="name"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-5 py-4 border rounded-full text-gray-900 placeholder-green focus:outline-none focus:ring-4 focus:ring-lime-400/50 transition-all text-lg font-plus_jakarta"
                          placeholder="Enter your Email"
                        />{" "}
                        <Button
                          type="submit"
                          text={isSubmitting ? "Subscribed..." : "Subscribe"}
                          variant="dark"
                          className="w-full"
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <div>
                  <img
                    src="/image/maintenance/freepik__talk__46203 1.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
