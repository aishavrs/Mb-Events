import React, { useState, useContext } from "react";
import AuthLayout from "../Layouts/AuthLayout";
import signInImage from "../assets/sign-in-image.png";
import MbEventLogo from "../assets/mb-event-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

export default function SignInPage() {
  const { login } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { email, password } = formData;
    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!password.trim()) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      await login(formData);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Incorrect email or password!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <AuthLayout image={signInImage}>
        <div className="flex flex-col items-center lg:mt-[12%] w-full">
          <div className="flex justify-center mb-6">
            <img
              src={MbEventLogo}
              alt="MB Event Logo"
              className="w-32 sm:w-40 md:w-44 lg:w-48"
            />
          </div>

          <div className="w-full max-w-md lg:max-w-lg px-6 sm:px-10 lg:px-0">
            <div className="mb-6 text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                Welcome Back
              </h1>
              <p className="text-base sm:text-lg lg:text-xl font-medium text-gray-700">
                Sign In To Your Account
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 sm:gap-5"
            >
              <div>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full h-12 sm:h-14 px-4 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#9747FF]"
                />
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full h-12 sm:h-14 px-4 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#9747FF]"
                />
              </div>

              <Link
                to="/forgot-password"
                className="text-sm sm:text-base text-[#9747FF] underline self-end"
              >
                Forgot Password?
              </Link>

              <div className="flex flex-col gap-6 mt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-md py-3 sm:py-4 bg-[#9747FF] text-white text-lg font-medium hover:bg-purple-700 transition disabled:opacity-50"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </button>

                <p className="text-center text-base sm:text-lg">
                  Don’t have an account?
                  <Link
                    to="/sign-up"
                    className="font-bold text-[#9747FF] ml-1 hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </AuthLayout>
    </div>
  );
}
