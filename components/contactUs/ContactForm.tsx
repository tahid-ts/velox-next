/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { Button } from "../shared/ui/Button";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Here you would normally send the data to your API
      console.log("Form submitted:", formData);

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full  bg-green rounded-xl shadow-2xl p-8 md:p-10">
      <h1 className="heading-lg text-white mb-8">Let's Talk</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-white text-md mb-2 font-plus_jakarta"
          >
            Name*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-transparent border border-white/70 rounded-md text-white placeholder-emerald-400 focus:outline-none focus:border-light-green focus:ring-2 focus:ring-lime-400/50 transition-all"
            // placeholder="Your name"
          />
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-white text-md mb-2 font-plus_jakarta"
          >
            Email*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-transparent border border-white/70 rounded-md text-white placeholder-emerald-400 focus:outline-none focus:border-light-green focus:ring-2 focus:ring-lime-400/50 transition-all"
            // placeholder="your.email@example.com"
          />
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block text-white text-md mb-2 font-plus_jakarta"
          >
            Message*
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 bg-transparent border border-white/70 rounded-md text-white placeholder-emerald-400 focus:outline-none focus:border-light-green focus:ring-2 focus:ring-lime-400/50 transition-all resize-none"
            // placeholder="Your message"
          />
        </div>

        {/* Submit Button */}
        <Button text={isSubmitting ? "Sending..." : "Contact Us"} />

        {/* Status Messages */}
        {submitStatus === "success" && (
          <p className="text-lime-400 text-sm text-center">
            Message sent successfully! We'll get back to you soon.
          </p>
        )}
        {submitStatus === "error" && (
          <p className="text-red-400 text-sm text-center">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
