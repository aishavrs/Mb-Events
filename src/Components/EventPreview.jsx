import React from "react";
import { MdLocationPin } from "react-icons/md";
import Button from "../Components/Button";
import { motion } from "framer-motion";

export default function EventPreview({ formData, photo, onEdit, onSubmit, isLoading }) {
  const photoURL = React.useMemo(() => (photo ? URL.createObjectURL(photo) : null), [photo]);

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="w-full space-y-2"
    >
      {/* Photo */}
      <label className="block text-lg font-semibold">Uploaded Photo</label>
      <div className="w-full h-95 bg-gray-300 flex items-center justify-center rounded-lg overflow-hidden">
        {photoURL ? (
          <img src={photoURL} alt="Event" className="h-full w-full object-cover" />
        ) : (
          <p className="italic text-gray-500">No photo uploaded</p>
        )}
      </div>

      {/* Event Title */}
      <label className="block text-lg font-semibold">Event Title</label>
      <p className="w-[150px] lg:w-sm px-3 py-2 rounded bg-gray-200 text-black">
        {formData.title || "Not provided"}
      </p>

      {/* Hosted By */}
      <label className="block text-lg font-semibold">Hosted by</label>
      <p className="w-[150px] lg:w-sm px-3 py-2 rounded bg-gray-200 text-black">
        {formData.host || "Not provided"}
      </p>

      {/* Time & Location */}
      <h1 className="text-xl font-semibold py-2">Time & Location</h1>

      <label className="text-lg font-semibold">Date</label>
      <p className="block w-40 px-3 py-2 rounded bg-gray-200 text-black">
        {formData.date || "Not set"}
      </p>

      <div className="flex gap-5">
        <div>
          <label className="text-lg font-semibold py-2">Time(start)</label>
          <p className="block w-40 px-3 py-2 rounded bg-gray-200 text-black">
            {formData.timeStart || "Not set"}
          </p>
        </div>

        <div>
          <label className="text-lg font-semibold py-2">Time(end)</label>
          <p className="block w-40 px-3 py-2 rounded bg-gray-200 text-black">
            {formData.timeEnd || "Not set"}
          </p>
        </div>
      </div>

      {/* Location */}
      <label className="text-lg font-semibold py-2">Location</label>
      {formData.online ? (
        <p className="px-3 py-2 rounded bg-green-200 text-green-800 w-60 font-semibold">
          Online Event
        </p>
      ) : (
        <div className="relative w-full">
          <MdLocationPin className="absolute top-3 left-2 text-purple-600" />
          <p className="w-xs lg:w-4xl px-8 py-2 rounded bg-gray-200 text-black">
            {formData.location || "Not provided"}
          </p>
        </div>
      )}

      {/* Description */}
      <label className="text-lg font-semibold block">Description</label>
      <p className="w-full h-50 px-3 py-2 rounded bg-gray-200 text-black">
        {formData.description || "No description"}
      </p>

      {/* Category & Tags */}
      <h1 className="text-xl font-semibold py-2">Category</h1>
      <div className="flex items-center gap-3">
        <div>
          <label className="block text-lg font-semibold">Selected Category</label>
          <p className="px-3 py-3 rounded bg-gray-200 text-black w-[180px]">
            {formData.category || "None"}
          </p>
        </div>

        <div>
          <label className="block text-lg font-semibold">Tags</label>
          <div className="flex flex-wrap bg-gray-200 py-3 px-3 rounded-md gap-2 mt-1">
            {formData.tags && formData.tags.length > 0 ? (
              formData.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-white rounded-md text-sm shadow-sm">
                  {tag}
                </span>
              ))
            ) : (
              <p className="px-3 py-2 text-gray-500">No tags</p>
            )}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <h1 className="text-lg font-semibold py-2">Pricing</h1>
      {formData.free ? (
        <p className="px-3 py-2 rounded bg-gray-200 text-black w-40">Free Event</p>
      ) : (
        <>
          <div className="flex items-center gap-10">
            <label className="font-semibold">Regular</label>
            <p className="px-3 py-2 rounded bg-gray-200 text-black w-[150px]">
              {formData.regularEnabled ? `₦${formData.regular}` : "Not available"}
            </p>
          </div>
          <div className="flex items-center gap-10">
            <label className="font-semibold">VIP</label>
            <p className="px-3 py-2 rounded bg-gray-200 text-black w-[150px]">
              {formData.vipEnabled ? `₦${formData.vip}` : "Not available"}
            </p>
          </div>
        </>
      )}

      {/* Buttons */}
      <div className="flex gap-5 py-5">
        <motion.button
          whileHover={{ scale: 1.1, transition: { type: "spring", stiffness: 300, damping: 10 } }}
          whileTap={{ scale: 0.9, transition: { type: "spring", stiffness: 500, damping: 20 } }}
          onClick={onEdit}
          type="button"
          className="w-[100px] font-bold border-2 rounded-md py-2 px-2 h-[50px] hover:bg-purple-500 hover:border-0 hover:text-white"
        >
          Edit
        </motion.button>

        <Button
          content={isLoading ? "Creating Event..." : "Create Event"}
          type="submit"
          className="w-[120px]"
        />
      </div>
    </motion.form>
  );
}
