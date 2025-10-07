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
}) {
  const formattedDate = date
    ? moment(new Date(date)).format("MMM Do YYYY")
    : "No date provided";

  const vipCount = Number(vip) || 0;
  const regularCount = Number(regular) || 0;

  // ✅ Fix for location display
  const displayLocation =
    location && location.trim() !== ""
      ? location.charAt(0).toUpperCase() + location.slice(1)
      : "No location provided";

  return (
    <Link to={`/events/${_id}`} className="text-gray-900 mx-auto my-4 w-full">
      <div
        className="
          mx-auto my-8 lg:my-0 w-full max-w-sm bg-white rounded-md overflow-hidden 
          flex flex-col justify-between
          transition-all duration-300
          hover:shadow-lg hover:-translate-y-1
        "
        style={{ height: "420px" }}
      >
        {/* Uniform Image */}
        <div className="w-full h-56 overflow-hidden">
          <img
            src={photo}
            alt={title ? `${title} event poster` : "Event poster"}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Event Info */}
        <div className="flex flex-col justify-between flex-1 p-3 capitalize">
          <div>
            <h3 className="text-lg font-semibold line-clamp-1">
              {title || "No title"}
            </h3>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Host:</span> {host}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-semibold">Category:</span> {category}
            </p>

            <div className="flex items-center text-sm text-gray-700 gap-2">
              <FaLocationDot /> <span>{displayLocation}</span>
            </div>

            <div className="flex items-center text-sm text-gray-700 gap-2 mt-1">
              <FaCalendarAlt /> <span>{formattedDate}</span>
            </div>
          </div>

          {/* ✅ Fixed Price Section — consistent alignment */}
          <div className="flex items-center gap-2 text-sm font-semibold">
            <HiTicket />
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
