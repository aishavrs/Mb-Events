import React, { useState } from "react";
import mbLogo from "../assets/mb-event-logo.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPassword() {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors });
  };

  const formValidate = () => {
    const { email } = formData;
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValidate()) return;

    setErrors({});
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      let data = {};
      try {
        data = await response.json(); // safely parse JSON
      } catch {
        data = {}; // fallback if response is empty or invalid
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to send reset password email");
      }

      toast.success(data.message || "Reset Password Email sent", {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to send email", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-[28px] h-screen">
      <ToastContainer /> {/* This enables toast messages */}
      <img src={mbLogo} alt="Logo" />
      <div className="flex flex-col justify-center items-left gap-3 w-[350px] lg:w-[450px]">
        <h1 className="text-[28px] lg:text-[32px] font-medium">Forgot Password</h1>
        <p className="text-[15px] lg:text-[20px] font-normal">
          No worries, we’ll send you instructions to help.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full rounded-[6px] px-[10px] py-[12px] border border-[#CDC7C7] mb-1"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-2">{errors.email}</p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-[4px] py-[12px] px-[36px] bg-[#9747FF] text-white text-center w-full disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
