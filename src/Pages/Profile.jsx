import React, { useState, useRef, useContext } from "react";
import { IoPencil, IoEye, IoEyeOff } from "react-icons/io5";
import AppLayout from "../Layouts/AppLayout";
import { AuthContext } from "../Context/AuthContext";
import profileImg from "../assets/profile image.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const { user, updateUser } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(user?.profileImage || null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingPasswordChange, setLoadingPasswordChange] = useState(false);

  // Show/hide password
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Inline validation errors
  const [errors, setErrors] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // --- Profile Image Handlers ---
  const handleEditClick = () => fileInputRef.current.click();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewURL = URL.createObjectURL(file);
    setSelectedImage(previewURL);
    updateUser({ ...user, profileImage: previewURL });

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:4000/api/user/profile-image", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to update profile picture");
        return;
      }

      updateUser(data.user);
      setSelectedImage(data.user.profileImage);
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.error("Network error uploading image:", error);
      toast.error("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- Password Change Handler ---
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    const newErrors = { current: "", new: "", confirm: "" };
    let hasError = false;

    // --- Frontend validation ---
    if (!currentPassword) {
      newErrors.current = "Current password is required.";
      hasError = true;
    }

    if (!newPassword) {
      newErrors.new = "New password is required.";
      hasError = true;
    } else {
      // At least 8 chars, uppercase, lowercase, number, special char
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]).{8,}$/;
      if (!passwordRegex.test(newPassword)) {
        newErrors.new =
          "Password must be 8+ chars, include uppercase, lowercase, number & special char.";
        hasError = true;
      } else if (newPassword === currentPassword) {
        newErrors.new = "New password cannot be the same as current password.";
        hasError = true;
      }
    }

    if (!confirmPassword) {
      newErrors.confirm = "Please confirm your new password.";
      hasError = true;
    } else if (newPassword !== confirmPassword) {
      newErrors.confirm = "Passwords do not match.";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    // If validation passes, call API
    try {
      setLoadingPasswordChange(true);
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:4000/api/user/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to change password");
      } else {
        toast.success("Password updated successfully!");
        setIsModalOpen(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setErrors({ current: "", new: "", confirm: "" });
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Network error. Try again.");
    } finally {
      setLoadingPasswordChange(false);
    }
  };

  return (
    <AppLayout>
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="flex flex-col page-container my-3">
        <section className="flex items-center justify-between mb-6">
          <div className="flex gap-4">
            {/* Profile Image */}
            <div className="relative w-20 h-20">
              <img
                src={selectedImage || user?.profileImage || profileImg}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border"
              />
              <button
                onClick={handleEditClick}
                disabled={loading}
                className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md text-gray-500 hover:text-[#9747FF]"
              >
                <IoPencil size={12} />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* User Info */}
            <div className="flex flex-col justify-center">
              <h1 className="font-semibold text-lg">{user?.fullName || "Your Name"}</h1>
              <p className="text-gray-600 text-sm">{user?.email || "Email"}</p>
            </div>
          </div>
        </section>

        <hr className="border-gray-300 mb-6" />

        <section className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-700">Name</span>
            <span className="font-medium">{user?.fullName || "Your Name"}</span>
          </div>
          <hr className="border-gray-300" />

          <div className="flex justify-between">
            <span className="text-gray-700">Email account</span>
            <span className="font-medium">{user?.email || "yourname@gmail.com"}</span>
          </div>
          <hr className="border-gray-300" />

          <div className="flex justify-between items-center">
            <span className="text-gray-700">Password</span>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-[#9747FF] hover:font-bold cursor-pointer"
            >
              Change password
            </button>
          </div>
          <hr className="border-gray-300" />

          <div className="flex justify-between">
            <span className="text-gray-700">Events hosted</span>
            <span className="font-medium">3</span>
          </div>
          <hr className="border-gray-300" />

          <div className="flex justify-between">
            <span className="text-gray-700">Events attended</span>
            <span className="font-medium">4</span>
          </div>
        </section>

        <button
          disabled={loading}
          className="bg-[#9747FF] w-[11%] rounded-xs py-3 px-2 text-white mt-6 disabled:opacity-70"
        >
          {loading ? "Saving..." : "Save changes"}
        </button>
      </div>

      {/* --- Change Password Modal --- */}
    {isModalOpen && (
  <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/40">
    <div className="bg-white p-10 rounded-lg w-11/12 max-w-lg shadow-lg relative">
      <h2 className="text-2xl font-semibold mb-4">Change Password</h2>

      {/* Close button */}
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl font-bold"
        onClick={() => setIsModalOpen(false)}
      >
        &times;
      </button>

      <form className="flex flex-col gap-5" onSubmit={handlePasswordChange}>
        {/* Current Password */}
        <div className="relative">
          <input
            type={showCurrent ? "text" : "password"}
            placeholder="Current Password"
            className={`border px-4 py-3 rounded w-full ${errors.current ? "border-red-500" : ""}`}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showCurrent ? <IoEyeOff /> : <IoEye />}
          </button>
          {errors.current && <p className="text-red-500 text-sm mt-1">{errors.current}</p>}
        </div>
        <small className="text-gray-500">
          Forgot your current password?{" "}
          <a href="/forgot-password" className="text-[#9747FF] underline">
            Reset it here
          </a>
        </small>

        {/* New Password */}
<div className="flex flex-col">
  <div className="relative w-full">
    <input
      type={showNew ? "text" : "password"}
      placeholder="New Password"
      className={`border px-4 py-3 rounded w-full ${errors.new ? "border-red-500" : ""}`}
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
    />
    <button
      type="button"
      onClick={() => setShowNew(!showNew)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
    >
      {showNew ? <IoEyeOff /> : <IoEye />}
    </button>
  </div>
  {errors.new && <p className="text-red-500 text-sm mt-1">{errors.new}</p>}
  <p className="text-gray-600 text-sm mt-1">
    Password must be at least 8 characters long and include:
    <br />
    - At least 1 uppercase letter<br />
    - At least 1 lowercase letter<br />
    - At least 1 number<br />
    - At least 1 special character (e.g., !@#$%^&*)
  </p>
</div>


        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm New Password"
            className={`border px-4 py-3 rounded w-full ${errors.confirm ? "border-red-500" : ""}`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showConfirm ? <IoEyeOff /> : <IoEye />}
          </button>
          {errors.confirm && <p className="text-red-500 text-sm mt-1">{errors.confirm}</p>}
        </div>

        <button
          type="submit"
          className="bg-[#9747FF] text-white py-3 rounded font-semibold disabled:opacity-70"
          disabled={loadingPasswordChange}
        >
          {loadingPasswordChange ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  </div>
)}

    </AppLayout>
  );
}
