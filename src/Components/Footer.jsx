import React, { useState } from "react";
import { Link } from "react-router-dom";
import mbLogo from "../assets/mb-event-logo-white.png";
import { LuFacebook, LuInstagram, LuTwitter, LuYoutube } from "react-icons/lu";
import { toast } from "react-toastify";

export default function Footer() {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error as user types
  };

  // Validation logic
  const formValidate = () => {
    const { email } = formData;
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValidate()) return;

    setErrors({});
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Subscription failed");

      setFormData({ email: "" });
      toast.success("Subscribed successfully!", { position: "top-center" });
      return data;
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Subscription failed", {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="w-full bg-black text-white py-12">
      <div className="page-container flex flex-col lg:flex-row lg:justify-between lg:items-center gap-12">
        {/* Left section */}
        <div className="flex flex-col gap-6 lg:max-w-lg">
          <img
            src={mbLogo}
            alt="MB Event Logo"
            className="w-36 md:w-40 lg:w-44 object-contain"
          />
          <p className="text-sm md:text-base leading-relaxed text-gray-300">
            Stay connected and informed with our updates. Subscribe to our
            newsletter for the latest updates on mental health tips, app
            features, and exclusive offers. Join our community to receive
            valuable insights and support right in your inbox.
          </p>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col sm:flex-row gap-3 mt-4 w-full bg-white px-3 py-2 rounded-sm"
          >
            <div className="flex flex-col w-full">
              <input
                onChange={handleChange}
                name="email"
                value={formData.email}
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-md outline-0 placeholder:text-black text-black"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              } transition text-white px-6 py-3 rounded-md flex items-center justify-center`}
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          {errors.email && ( <p className="text-red-500 text-sm mt-1">{errors.email}</p>)}
        </div>

        {/* Quick links */}
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg md:text-xl">Quick Links</h2>
          <ul className="flex flex-col gap-2 text-gray-300">
            <Link
              to="/"
              className="hover:text-purple-400 cursor-pointer transition"
            >
              Home
            </Link>
            <Link
              to="/event"
              className="hover:text-purple-400 cursor-pointer transition"
            >
              Events
            </Link>
            <li className="hover:text-purple-400 cursor-pointer transition">
              About
            </li>
            <li className="hover:text-purple-400 cursor-pointer transition">
              Contact
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg md:text-xl">Socials</h2>
          <div className="flex gap-4 text-2xl">
            <LuFacebook className="hover:text-purple-400 cursor-pointer transition" />
            <LuInstagram className="hover:text-purple-400 cursor-pointer transition" />
            <LuTwitter className="hover:text-purple-400 cursor-pointer transition" />
            <LuYoutube className="hover:text-purple-400 cursor-pointer transition" />
          </div>
        </div>
      </div>
    </footer>
  );
}
