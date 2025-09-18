import React, { useState } from "react";
import { MdLocationPin } from "react-icons/md";
import Button from "../Components/Button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function CreateEventForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    timeStart: "",
    timeEnd: "",
    location: "",
    online: false,
    description: "",
    category: "",
    tags: "",
    free: false,
    regular: "",
    vip: "",
    regularEnabled: false,
    vipEnabled: false,
  });

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
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const formValidate = () => {
    const {
      title,
      date,
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

    if (!title) newErrors.title = "Event title is required!";
    if (!photo) newErrors.photo = "Photo is required";
    if (!date) newErrors.date = "Date is required";
    if (!timeStart) newErrors.timeStart = "Start time is required";
    if (!timeEnd) newErrors.timeEnd = "End time is required";
    if (!location && !online) newErrors.location = "Location is required";
    if (!description) newErrors.description = "Description is required";
    if (!category) newErrors.category = "Category is required";
    if (!tags) newErrors.tags = "Tags are required";

    if (!free) {
      if (regularEnabled && !regular)
        newErrors.regular = "Regular price is required.";
      if (vipEnabled && !vip) newErrors.vip = "VIP price is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setPhoto(null);
    setFormData({
      title: "",
      date: "",
      timeStart: "",
      timeEnd: "",
      location: "",
      online: false,
      description: "",
      category: "",
      tags: "",
      free: false,
      regular: "",
      vip: "",
      regularEnabled: false,
      vipEnabled: false,
    });
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValidate()) return;
    setLoading(true);

    console.log(formData);
    const data = new FormData();
    data.append("photo", photo);
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      console.log("Submitted:", data);
    }, 1500);
  };

  return (
    <>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-full space-y-2"
      >
        <label htmlFor="upload" className="block text-lg font-semibold">
          Upload Photo
        </label>
        <div className="w-full h-95 bg-gray-300 flex items-center justify-center rounded-lg overflow-hidden">
          {photo ? (
            <img
              src={URL.createObjectURL(photo)}
              alt="Uploaded"
              className="h-full w-full object-cover"
            />
          ) : (
            <label className="rounded-md px-4 py-2 bg-white text-black text-lg font-semibold cursor-pointer">
              <input
                name="photo"
                type="file"
                className="hidden"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
              Choose Photo
            </label>
          )}
        </div>
        {errors.photo && (
          <p className="text-red-500 font-semibold">{errors.photo}</p>
        )}

        <label htmlFor="title" className="block text-lg font-semibold">
          Event Title
        </label>
        <input
          onChange={handleChange}
          type="text"
          className="w-[150px] px-3 py-2 rounded bg-gray-200 text-black"
          name="title"
          value={formData.title}
        />
        {errors.title && (
          <p className="text-red-500 font-semibold">{errors.title}</p>
        )}

        <h1 className="text-xl font-semibold py-2">Time & Location</h1>

        <label htmlFor="date" className="text-lg font-semibold">
          Date
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="block px-3 py-2 rounded bg-gray-200 text-black w-40"
        />
        {errors.date && <p className="text-red-500 font-semibold">{errors.date}</p>}

        <div className="flex gap-5">
          <div>
            <label
              className="text-lg font-semibold py-2"
              htmlFor="timeStart"
            >
              Time (start)
            </label>
            <input
              type="time"
              name="timeStart"
              value={formData.timeStart}
              onChange={handleChange}
              className="block px-3 py-2 rounded bg-gray-200 text-black w-40"
            />
            {errors.timeStart && (
              <p className="text-red-500 font-semibold">{errors.timeStart}</p>
            )}
          </div>

          <div>
            <label
              className="text-lg font-semibold py-2"
              htmlFor="timeEnd"
            >
              Time (end)
            </label>
            <input
              type="time"
              name="timeEnd"
              value={formData.timeEnd}
              onChange={handleChange}
              className="block px-3 py-2 rounded bg-gray-200 text-black w-40"
            />
            {errors.timeEnd && (
              <p className="text-red-500 font-semibold">{errors.timeEnd}</p>
            )}
          </div>
        </div>

        <label htmlFor="location" className="text-lg font-semibold py-2">
          Location
        </label>
        <div className="lg:flex items-center gap-5">
          {!formData.online && (
            <div className="relative">
              <MdLocationPin className="absolute top-3 left-2" />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter Location"
                className="px-8 py-2 rounded bg-gray-200 text-black"
              />
            </div>
          )}

          <div className="flex items-center py-3 lg:py-0 gap-5">
            <label className="font-semibold" htmlFor="Online-toggle">
              Online
            </label>
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
        </div>
        {errors.location && (
          <p className="text-red-500 font-semibold">{errors.location}</p>
        )}

        <label htmlFor="description" className="text-lg font-semibold block">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description"
          className="w-full h-50 px-3 py-2 rounded bg-gray-200 text-black"
        />
        {errors.description && (
          <p className="text-red-500 font-semibold">{errors.description}</p>
        )}

        <h1 className="text-xl font-semibold py-2">Category</h1>
        <div className="flex items-center gap-3">
          <div>
            <label
              className="block text-lg font-semibold"
              htmlFor="selectCategories"
            >
              Select Categories
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-[180px] px-3 py-2 rounded border border-gray-600 text-gray-600"
            >
              <option value="">Category</option>
              <option value="sport">Sports</option>
              <option value="party">Party</option>
              <option value="concert">Concert</option>
              <option value="tech">Tech</option>
              <option value="religion">Religion</option>
              <option value="education">Education</option>
            </select>
            {errors.category && (
              <p className="text-red-500 font-semibold">{errors.category}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              className="block text-lg font-semibold"
              htmlFor="tags"
            >
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-[150px] px-3 py-2 rounded bg-gray-200 text-black"
            />
            {errors.tags && (
              <p className="text-red-500 font-semibold">{errors.tags}</p>
            )}
          </div>
        </div>

        <h1 className="text-lg font-semibold py-2">Pricing</h1>
        <div className="flex items-center gap-20 lg:py-0 lg:gap-[250px]">
          <label className="font-semibold" htmlFor="free">
            Free
          </label>
          <div className="toggle-containerFree">
            <input
              name="free"
              checked={formData.free}
              onChange={handleChange}
              id="free-toggle"
              className="toggle-inputFree"
              type="checkbox"
            />
            <label
              htmlFor="free-toggle"
              className="toggle-labelFree"
            ></label>
          </div>
        </div>

        {!formData.free && (
          <>
            <label className="block font-semibold" htmlFor="regular">
              Regular
            </label>
            <div className="flex items-center gap-20 lg:gap-[250px]">
              <input
                className="w-[150px] px-3 py-2 rounded bg-gray-200 text-black"
                type="text"
                name="regular"
                onChange={handleChange}
                value={formData.regular}
              />
              <div className="toggle-containerRegular">
                <input
                  id="regular-toggle"
                  className="toggle-inputRegular"
                  type="checkbox"
                  name="regularEnabled"
                  checked={formData.regularEnabled}
                  onChange={handleChange}
                />
                <label
                  htmlFor="regular-toggle"
                  className="toggle-labelRegular"
                ></label>
              </div>
            </div>
            {errors.regular && (
              <p className="text-red-500 font-semibold">{errors.regular}</p>
            )}

            <label className="block font-semibold" htmlFor="VIP">
              VIP
            </label>
            <div className="flex items-center gap-20 lg:gap-[250px]">
              <input
                name="vip"
                value={formData.vip}
                onChange={handleChange}
                className="w-[150px] px-3 py-2 rounded bg-gray-200 text-black"
                type="text"
              />
              <div className="toggle-containerVIP">
                <input
                  id="VIP-toggle"
                  className="toggle-inputVIP"
                  onChange={handleChange}
                  name="vipEnabled"
                  checked={formData.vipEnabled}
                  type="checkbox"
                />
                <label
                  htmlFor="VIP-toggle"
                  className="toggle-labelVIP"
                ></label>
              </div>
            </div>
            {errors.vip && (
              <p className="text-red-500 font-semibold">{errors.vip}</p>
            )}
          </>
        )}

        <div className="flex gap-5 py-5">
          <button
            onClick={handleCancel}
            type="button"
            className="w-[100px] font-bold border-2 rounded-md py-2 px-2 h-[50px] hover:bg-purple-500 hover:border-0 hover:text-white"
          >
            Cancel
          </button>
          <Button
            content={loading ? "Submitting..." : "Continue"}
            type="submit"
            className="w-[120px]"
            disabled={loading}
          />
        </div>
      </motion.form>
    </>
  );
}
