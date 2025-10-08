import React, { useState, useRef } from "react";
import { MdLocationPin } from "react-icons/md";
import Button from "../Components/Button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import Modal from "../Components/CreateEvensSuccessModal";
import { toast } from "react-toastify";
import EventPreview from "./EventPreview";

export default function CreateEventForm() {
  const [showModal, setShowModal] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const initialFormData = {
    date: "",
    title: "",
    host: "",
    timeStart: "",
    timeEnd: "",
    location: "",
    online: false,
    description: "",
    category: "",
    tags: [],
    free: false,
    regular: "",
    vip: "",
    regularEnabled: false,
    vipEnabled: false,
  };

  const [formData, setFormData] = useState(initialFormData);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "free" && checked) {
      setFormData({
        ...formData,
        free: checked,
        regular: "",
        vip: "",
        regularEnabled: false,
        vipEnabled: false,
      });
      return;
    }

    if (name === "tags") {
      setFormData({
        ...formData,
        tags: value
          .split(" ")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Validate form
  const formValidate = () => {
    const {
      date,
      title,
      host,
      timeStart,
      timeEnd,
      location,
      online,
      description,
      category,
      tags,
      regular,
      vip,
      free,
      regularEnabled,
      vipEnabled,
    } = formData;

    const newErrors = {};
    if (!photo) newErrors.photo = "Photo is required";
    if (!title) newErrors.title = "Title is required";
    if (!host) newErrors.host = "Host is required";
    if (!date) newErrors.date = "Date is required";
    if (!timeStart) newErrors.timeStart = "Start time is required";
    if (!timeEnd) newErrors.timeEnd = "End time is required";
    if (!location && !online) newErrors.location = "Location is required";
    if (!description) newErrors.description = "Description is required";
    if (!category) newErrors.category = "Category is required";
    if (!tags || tags.length === 0) newErrors.tags = "Tags are required";

    if (!free) {
      if (regularEnabled && !regular) newErrors.regular = "Regular price is required.";
      if (vipEnabled && !vip) newErrors.vip = "VIP price is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle cancel
  const handleCancel = (e) => {
    e.preventDefault();
    setPhoto(null);
    setFormData(initialFormData);
    navigate("/");
  };

  // Handle preview
  const handleContinue = (e) => {
    e.preventDefault();
    if (!formValidate()) return;
    setIsPreviewing(true);
  };

  // Handle final submit
  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!formValidate()) {
      toast.error("Please fix form errors before continuing");
      return;
    }
    setIsLoading(true);

    // Build FormData
    const data = new FormData();
    if (photo) data.append("photo", photo);
    data.append("tags", JSON.stringify(formData.tags));

    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "tags") {
        data.append(key, typeof value === "boolean" ? (value ? "true" : "false") : value ?? "");
      }
    });

    const baseUrl = import.meta.env.VITE_EVENT_URL || "http://localhost:5000/api";
    const endpoint = `${baseUrl.replace(/\/$/, "")}/user/event/createevent`;
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoading(false);
      return toast.error("User not authenticated");
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });

      // Read body once
      const text = await response.text();
      let result = null;
      try {
        result = text ? JSON.parse(text) : null;
      } catch {
        console.warn("Response is not JSON:", text);
      }

      if (response.ok) {
        toast.success("Event Created!");
        setShowModal(true);
        // optionally reset form or navigate:
        // setFormData(initialFormData); setPhoto(null);
      } else {
        const message = result?.message || result?.error || "Failed to create an event!";
        toast.error(message);
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Network error: Failed to create an event.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle photo change
  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setPhoto(file);
      setErrors((prev) => ({ ...prev, photo: null }));
    } else {
      setErrors((prev) => ({ ...prev, photo: "Only image files are allowed" }));
    }
  };

  const handleEditPhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      {isPreviewing ? (
        <EventPreview
          formData={formData}
          photo={photo}
          onEdit={() => setIsPreviewing(false)}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      ) : (
        <motion.form
          onSubmit={handleContinue}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-full space-y-2"
        >
          {/* Photo Upload */}
          <label htmlFor="upload" className="block text-lg font-semibold">Upload Photo</label>
          <div className="w-full h-95 bg-gray-300 flex items-center justify-center rounded-lg overflow-hidden">
            {photo ? (
              <div className="w-full relative">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Uploaded"
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleEditPhoto}
                  className="py-2 px-8 hover:cursor-pointer rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black"
                >
                  Change Photo
                </button>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </div>
            ) : (
              <label className="rounded-md py-2 px-8 bg-white text-black text-lg font-semibold cursor-pointer">
                <input
                  name="photo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handlePhotoChange}
                />
                Choose Photo
              </label>
            )}
          </div>
          {errors.photo && <p className="text-red-500 font-semibold">{errors.photo}</p>}

          {/* Event Title */}
          <label htmlFor="title" className="block text-lg font-semibold">Event Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-[150px] lg:w-sm px-3 py-2 rounded bg-gray-200 text-black"
          />
          {errors.title && <p className="text-red-500 font-semibold">{errors.title}</p>}

          {/* Hosted By */}
          <label htmlFor="host" className="block text-lg font-semibold">Hosted by</label>
          <input
            type="text"
            name="host"
            value={formData.host}
            onChange={handleChange}
            className="w-[150px] lg:w-sm px-3 py-2 rounded bg-gray-200 text-black"
          />
          {errors.host && <p className="text-red-500 font-semibold">{errors.host}</p>}

          {/* Time & Location */}
          <h1 className="text-xl font-semibold py-2">Time & Location</h1>

          <label htmlFor="date" className="text-lg font-semibold">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="block w:xs lg:w-sm px-3 py-2 rounded bg-gray-200 text-black w-40"
          />
          {errors.date && <p className="text-red-500 font-semibold">{errors.date}</p>}

          <div className="flex gap-5">
            <div>
              <label className="text-lg font-semibold py-2" htmlFor="timeStart">Time(start)</label>
              <input
                type="time"
                name="timeStart"
                value={formData.timeStart}
                onChange={handleChange}
                className="block w:xs lg:w-sm px-3 py-2 rounded bg-gray-200 text-black w-40"
              />
              {errors.timeStart && <p className="text-red-500 font-semibold">{errors.timeStart}</p>}
            </div>

            <div>
              <label className="text-lg font-semibold py-2" htmlFor="timeEnd">Time(end)</label>
              <input
                type="time"
                name="timeEnd"
                value={formData.timeEnd}
                onChange={handleChange}
                className="block w:xs lg:w-sm px-3 py-2 rounded bg-gray-200 text-black w-40"
              />
              {errors.timeEnd && <p className="text-red-500 font-semibold">{errors.timeEnd}</p>}
            </div>
          </div>

          <label htmlFor="location" className="text-lg font-semibold py-2">Location</label>
          <div className="sm:flex-row lg:flex items-center gap-5">
            {!formData.online && (
              <div className="relative">
                <MdLocationPin className="absolute top-3 left-2" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter Location"
                  className="w-xs lg:w-4xl px-8 py-2 rounded bg-gray-200 text-black"
                />
              </div>
            )}

            {!formData.location && (
              <div className="flex items-center py-3 lg:py-0 gap-5">
                <label className="font-semibold" htmlFor="Online-toggle">Online</label>
                <div className="toggle-container">
                  <input
                    id="Online-toggle"
                    name="online"
                    onChange={handleChange}
                    checked={formData.online}
                    className="toggle-input"
                    type="checkbox"
                  />
                  <label htmlFor="Online-toggle" className="toggle-label"></label>
                </div>
              </div>
            )}
          </div>
          {errors.location && <p className="text-red-500 font-semibold">{errors.location}</p>}

          {/* Description */}
          <label htmlFor="description" className="text-lg font-semibold block">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            className="w-full h-50 px-3 py-2 rounded bg-gray-200 text-black"
          />
          {errors.description && <p className="font-semibold text-red-500">{errors.description}</p>}

          {/* Category & Tags */}
          <h1 className="text-xl font-semibold py-2">Category</h1>
          <div className="flex items-center gap-3">
            <div>
              <label className="block text-lg font-semibold" htmlFor="selectCategories">Select Categories</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-[180px] px-3 py-2 rounded border-1 border-gray-600 text-gray-600"
              >
                <option value="">Category</option>
                <option value="sports">sports</option>
                <option value="party">party</option>
                <option value="concert">concert</option>
                <option value="tech">tech</option>
                <option value="religion">religion</option>
                <option value="education">education</option>
              </select>
              {errors.category && <p className="font-semibold text-red-500">{errors.category}</p>}
            </div>
            <div className="flex flex-col">
              <label className="block text-lg font-semibold" htmlFor="tags">Tags</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-[150px] lg:w-sm px-3 py-2 rounded bg-gray-200 text-black"
              />
              {errors.tags && <p className="font-semibold text-red-500">{errors.tags}</p>}
            </div>
          </div>

          {/* Pricing & Buttons */}
          <h1 className="text-lg font-semibold py-2">Pricing</h1>
          <div className="flex items-center gap-20 lg:py-0 lg:gap-[250px]">
            <label className="font-semibold" htmlFor="free">Free</label>
            <div className="toggle-containerFree">
              <input
                name="free"
                checked={formData.free}
                onChange={handleChange}
                id="free-toggle"
                className="toggle-inputFree"
                type="checkbox"
              />
              <label htmlFor="free-toggle" className="toggle-labelFree"></label>
            </div>
          </div>

          {!formData.free && (
            <>
              {/* Regular & VIP */}
              <div>
                <label className="block font-semibold" htmlFor="regular">Regular</label>
                <div className="flex items-center gap-20 lg:gap-[250px]">
                  <input
                    className="w-[150px] lg:w-sm px-3 py-2 rounded bg-gray-200 text-black"
                    type="text"
                    name="regular"
                    onChange={handleChange}
                    value={formData.regular}
                  />
                  {errors.regular && <p className="text-red-900 font-semibold">{errors.regular}</p>}
                  <div className="toggle-containerRegular">
                    <input
                      id="regular-toggle"
                      className="toggle-inputRegular"
                      type="checkbox"
                      name="regularEnabled"
                      checked={formData.regularEnabled}
                      onChange={handleChange}
                    />
                    <label htmlFor="regular-toggle" className="toggle-labelRegular"></label>
                  </div>
                </div>

                <label className="block font-semibold" htmlFor="VIP">VIP</label>
                <div className="flex items-center gap-20 lg:gap-[250px]">
                  <input
                    name="vip"
                    value={formData.vip}
                    onChange={handleChange}
                    className="w-[150px] lg:w-sm px-3 py-2 rounded bg-gray-200 text-black"
                    type="text"
                  />
                  {errors.vip && <p className="text-red-900 font-semibold">{errors.vip}</p>}
                  <div className="toggle-containerVIP">
                    <input
                      id="VIP-toggle"
                      className="toggle-inputVIP"
                      onChange={handleChange}
                      name="vipEnabled"
                      checked={formData.vipEnabled}
                      type="checkbox"
                    />
                    <label htmlFor="VIP-toggle" className="toggle-labelVIP"></label>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="flex gap-25 py-5">
            <button
              type="button"
              onClick={handleCancel}
              className="w-[100px] font-bold border-2 rounded-md py-2 px-2 h-[50px] hover:bg-purple-500 hover:border-0 hover:text-white"
            >
              Cancel
            </button>
            <Button
              onClick={handleContinue}
              content={isLoading ? "Loading..." : "Continue"}
              type="submit"
              className="w-[120px]"
            />
          </div>
        </motion.form>
      )}
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}
