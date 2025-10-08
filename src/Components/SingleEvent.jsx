import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { HiTicket } from "react-icons/hi2";
import { Link } from "react-router-dom";
import moment from "moment";

export default function SingleEvent({
  _id,
  photo,
  title,
  host,
  category,
  location,
  date,
  free,
  regular,
  vip,
  online,
}) {
  // ✅ Format date safely
  const formattedDate = date
    ? moment(new Date(date)).format("MMM Do YYYY")
    : "No date provided";

  // ✅ Parse numbers safely
  const vipCount = Number(vip) || 0;
  const regularCount = Number(regular) || 0;

  // ✅ Handle online or location clearly
  let displayLocation = "No location provided";
  if (online) {
    displayLocation = "Online";
  } else if (location && location.trim() !== "") {
    displayLocation =
      location.charAt(0).toUpperCase() + location.slice(1);
  }

  // ✅ Handle host correctly whether it's an object or string
  const displayHost =
    typeof host === "object"
      ? host?.name || "Unknown"
      : host || "Unknown";

  return (
    <Link
      to={`/event/${_id}`}
      className="block text-gray-900 w-full max-w-sm mx-auto my-6"
    >
      <div
        className="
          bg-white rounded-xl overflow-hidden 
          shadow-sm hover:shadow-xl transition-all duration-300 
          flex flex-col justify-between h-[420px]
          border border-gray-100 hover:-translate-y-1
        "
      >
        {/* ✅ Image Section */}
        <div className="w-full h-56 bg-gray-100 overflow-hidden">
          <img
            src={photo}
            alt={title ? `${title} event poster` : "Event poster"}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* ✅ Event Details */}
        <div className="flex flex-col justify-between flex-1 p-4 capitalize">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold line-clamp-1">
              {title || "Untitled Event"}
            </h3>

            <p className="text-sm text-gray-700">
              <span className="font-semibold">Host:</span> {displayHost}
            </p>

            <p className="text-sm text-gray-700">
              <span className="font-semibold">Category:</span>{" "}
              {category || "Uncategorized"}
            </p>

            {/* ✅ Location (Always visible, online or physical) */}
            <div className="flex items-center text-sm text-gray-700 gap-2">
              <FaLocationDot className="text-[#9747FF]" />
              <span className="truncate">{displayLocation}</span>
            </div>

            {/* ✅ Date */}
            <div className="flex items-center text-sm text-gray-700 gap-2">
              <FaCalendarAlt className="text-[#9747FF]" />
              <span>{formattedDate}</span>
            </div>
          </div>

          {/* ✅ Price Section */}
          <div className="flex items-center gap-2 text-sm font-semibold mt-3 text-gray-800">
            <HiTicket className="text-[#9747FF]" />
            {free ? (
              <span>Free</span>
            ) : (
              <span>
                {vipCount > 0 && "VIP"}
                {vipCount > 0 && regularCount > 0 && ", "}
                {regularCount > 0 && "Regular"}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
