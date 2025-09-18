import React, { useContext, useState } from "react";
import AuthLayout from "../Layouts/AuthLayout";
import signUpImage from "../assets/sign-up-image.png";
import MbEventLogo from "../assets/mb-event-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

export default function SignUpPage() {
  const { register } = useContext(AuthContext);

  const [isloading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    checkBox: false,
  });

  const [error, setError] = useState({});

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setError((prevError) => ({ ...prevError, [name]: "" }));
  };

  const validateForm = () => {
    const { fullName, email, password, confirmPassword, checkBox } = formData;
    const newErrors = {};

    if (!fullName.trim()) newErrors.fullName = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";

    // Password requirements: min 8 chars, at least 1 uppercase, 1 number, 1 special char
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must be at least 8 characters, include an uppercase letter, a number, and a special character";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Please re-enter password";
    } else if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!checkBox) newErrors.checkBox = "You must accept the terms";

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    setError({});
    try {
      await register(formData);
      navigate("/sign-in");
    } catch (error) {
      setError("Something went wrong, Try again!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <AuthLayout image={signUpImage}>
        <div className="flex flex-col gap-[15px] lg:gap-[28px]">
          <div className="flex flex-col lg:justify-center items-center">
            <img src={MbEventLogo} alt="" className="mt-5 lg:mt-0" />
          </div>

          <div className="flex flex-col px-6 lg:px-17 gap-[2px] lg:gap-[5px]">
            <div>
              <h1 className="text-[28px] lg:text-[32px] font-semibold lg:font-bold">
                Create Account
              </h1>
              <p className="text-[15px] lg:text-[20px] font-medium lg:font-semibold">
                Let’s get you started so you can start joining and creating
                events
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-[12px] lg:gap-[15px]"
            >
              {/* Email */}
              <input
                type="text"
                onChange={handleChange}
                name="email"
                value={formData.email}
                placeholder="Email"
                className="h-[44px] px-[10px] border border-[#CDC7C7] rounded-[6px]"
              />
              {error.email && (
                <p className="text-red-500 text-xs">{error.email}</p>
              )}

              {/* Fullname */}
              <input
                type="text"
                onChange={handleChange}
                name="fullName"
                value={formData.fullName}
                placeholder="Fullname"
                className="h-[44px] px-[10px] border border-[#CDC7C7] rounded-[6px]"
              />
              {error.fullName && (
                <p className="text-red-500 text-xs">{error.fullName}</p>
              )}

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  name="password"
                  value={formData.password}
                  placeholder="Password"
                  className="h-[44px] w-full px-[10px] pr-10 border border-[#CDC7C7] rounded-[6px]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {error.password && (
                <p className="text-red-500 text-xs">{error.password}</p>
              )}

              {/* Confirm Password */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  onChange={handleChange}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  placeholder="Confirm Password"
                  className="h-[44px] w-full px-[10px] pr-10 border border-[#CDC7C7] rounded-[6px]"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {error.confirmPassword && (
                <p className="text-red-500 text-xs">{error.confirmPassword}</p>
              )}

              {/* Terms */}
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="checkBox"
                  checked={formData.checkBox}
                  onChange={handleChange}
                />
                <label className="text-[13px]">
                  I agree to the{" "}
                  <a href="#" className="text-[#9747FF] underline">
                    terms
                  </a>{" "}
                  &{" "}
                  <a href="#" className="text-[#9747FF] underline">
                    conditions
                  </a>
                </label>
              </div>
              {error.checkBox && (
                <p className="text-red-500 text-xs">{error.checkBox}</p>
              )}

              {/* Submit */}
              <div className="flex flex-col gap-[20px] mt-5 lg:mt-10">
                <button
                  type="submit"
                  className="rounded-[4px] py-[12px] px-[36px] bg-[#9747FF] text-white"
                >
                  {isloading ? "Signing up..." : "Sign up"}
                </button>
                <p className="lg:text-[20px]">
                  Already have an account?
                  <Link
                    to="/sign-in"
                    className="font-extrabold text-[#9747FF] ml-1"
                  >
                    Sign In
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
