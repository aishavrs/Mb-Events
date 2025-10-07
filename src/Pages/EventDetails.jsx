import React, { useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { LuChevronRight } from "react-icons/lu";
import calendarIcon from "../assets/calendar-svgrepo-com.png";
import locationIcon from "../assets/location-svgrepo-com 1.png";
import SingleEvent from "../Components/SingleEvent";
import moment from "moment";
import { EventContext } from "../Context/EventContext";
import AppLayout from "../Layouts/AppLayout";

export default function EventDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantities, setQuantities] = useState({});
  const { id } = useParams();
  const { allEvents } = useContext(EventContext);

  // Find the event
  const event = allEvents.find((e) => String(e._id) === String(id));

  if (!event) {
    return (
      <AppLayout>
        <div className="page-container py-10">
          <h1 className="text-2xl font-bold">Event not found</h1>
        </div>
      </AppLayout>
    );
  }

  // Quantity handlers
  const increase = (type) =>
    setQuantities((prev) => ({ ...prev, [type]: (prev[type] || 0) + 1 }));

  const decrease = (type) =>
    setQuantities((prev) => ({
      ...prev,
      [type]: Math.max((prev[type] || 0) - 1, 0),
    }));

  // Pricing
  const pricing = [];
  if (event.free) pricing.push({ type: "Free", price: 0 });
  if (event.regular) pricing.push({ type: "Regular", price: Number(event.regular) });
  if (event.vip) pricing.push({ type: "VIP", price: Number(event.vip) });

  const total = pricing.reduce(
    (acc, price) => acc + (quantities[price.type] || 0) * price.price,
    0
  );

  // Date + time format
  const formatDateTime = (date, timeStart, timeEnd) => {
    if (!date) return "Date not set";
    const formattedDate = moment(date).format("MMM Do YYYY");

    const start = timeStart
      ? moment(timeStart, ["HH:mm", moment.ISO_8601]).format("h:mm A")
      : null;
    const end = timeEnd
      ? moment(timeEnd, ["HH:mm", moment.ISO_8601]).format("h:mm A")
      : null;

    if (start && end) return `${formattedDate} • ${start} - ${end}`;
    if (start) return `${formattedDate} • ${start}`;
    return formattedDate;
  };

  return (
    <AppLayout>
      {/* Breadcrumbs */}
      <section className="page-container mt-4 flex gap-2 items-center text-sm text-gray-600">
        <Link to="/" className="flex items-center hover:underline">
          Home <LuChevronRight className="mx-1" />
        </Link>
        <Link to="/event" className="flex items-center hover:underline">
          Events <LuChevronRight className="mx-1" />
        </Link>
        <p className="text-black font-medium">Event Details</p>
      </section>

      {/* Banner */}
      <section className="page-container mt-5">
        <img
          src={event.photo}
          alt={event.title}
          className="w-full h-[500px] object-cover rounded-md" // ✅ fixed: balanced height
        />
      </section>

      {/* Main Info */}
      <section className="page-container mt-8 flex flex-col lg:flex-row gap-10 items-start">
        <div className="lg:w-[80%] flex flex-col gap-5">
          {/* Date & Time */}
          <div className="flex items-center gap-2">
            <img src={calendarIcon} alt="Date" className="w-5 h-5" />
            <span className="font-medium text-lg lg:text-xl text-gray-800">
              {formatDateTime(event.date, event.timeStart, event.timeEnd)}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <img src={locationIcon} alt="Location" className="w-5 h-5" />
            <span className="font-medium text-lg lg:text-xl text-gray-800">
              {event.location || "Location not specified"}
            </span>
          </div>

          {/* Category */}
          <div className="flex flex-wrap gap-3">
            <button className="border border-gray-300 px-3 py-1 rounded text-gray-700 text-sm">
              {event.category}
            </button>
          </div>

          {/* Title */}
          <h1 className="font-bold text-2xl lg:text-3xl text-gray-900">{event.title}</h1>

          {/* Host */}
          <p className="text-lg font-medium text-gray-800">
            Host: {event.host?.name || event.host || "Unknown"}
          </p>

          {/* Description */}
          <p className="font-normal text-base lg:w-[90%] leading-relaxed text-gray-700">
            {event.description}
          </p>
        </div>

        {/* Pricing Box */}
        <div className="w-full lg:w-[20%] bg-black px-4 py-5 rounded-lg text-white flex flex-col gap-5">
          <h1 className="text-center text-lg font-medium">Pricing</h1>
          {pricing.map((price, idx) => (
            <div key={idx} className="flex justify-between">
              <p>{price.type}</p>
              <p className="font-bold">
                {price.price > 0 ? `₦${price.price.toLocaleString()}` : "Free"}
              </p>
            </div>
          ))}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#9747FF] py-2 rounded hover:bg-purple-700 transition"
          >
            Select Ticket
          </button>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="page-container mt-12 mb-12 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-xl sm:text-2xl lg:text-3xl">
            Upcoming Events
          </h1>
          <Link
            to="/events"
            className="text-[#9747FF] hover:underline text-sm sm:text-base"
          >
            See All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allEvents
            .filter((e) => String(e._id) !== String(id))
            .slice(0, 3)
            .map((e) => (
              <SingleEvent key={e._id} {...e} />
            ))}
        </div>
      </section>
    </AppLayout>
  );
}
