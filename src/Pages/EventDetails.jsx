import React, { useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { LuChevronRight } from "react-icons/lu";
import calendarIcon from "../assets/calendar-svgrepo-com.png";
import locationIcon from "../assets/location-svgrepo-com 1.png";
import SingleEvent from "../Components/SingleEvent";
import moment from "moment";
import { EventContext } from "../Context/EventContext";
import AppLayout from "../Layouts/AppLayout";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";

export default function EventDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantities, setQuantities] = useState({});
  const { id } = useParams();
  const { allEvents } = useContext(EventContext);
  const { user } = useContext(AuthContext);

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

  // Pricing logic
  const pricing = [];
  if (event.free) pricing.push({ type: "Free", price: 0 });
  if (event.regular) pricing.push({ type: "Regular", price: Number(event.regular) });
  if (event.vip) pricing.push({ type: "VIP", price: Number(event.vip) });

  // Total price
  const total = pricing.reduce(
    (acc, price) => acc + (quantities[price.type] || 0) * price.price,
    0
  );

  // Date + time formatter
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

  // ✅ Fixed Payment Logic
  const handlePayment = async () => {
    try {
      if (!user) {
        toast.error("Please log in before purchasing a ticket");
        return;
      }

      const userId = user.id || user._id;
      if (!userId) {
        toast.error("Invalid user data. Please log in again.");
        return;
      }

      // Get counts for each ticket type
      const vipCount = quantities["VIP"] || 0;
      const regularCount = quantities["Regular"] || 0;
      const freeCount = quantities["Free"] || 0;

      // Get prices from the event
      const vipPrice = Number(event.vip) || 0;
      const regularPrice = Number(event.regular) || 0;

      let selectedTicket = "";
      let amount = 0;

      if (vipCount > 0) {
        selectedTicket = "VIP";
        amount = vipCount * vipPrice;
      } else if (regularCount > 0) {
        selectedTicket = "Regular";
        amount = regularCount * regularPrice;
      } else if (freeCount > 0) {
        selectedTicket = "Free";
        amount = 0;
      } else {
        toast.error("Please select at least one ticket");
        return;
      }

      const paymentData = {
        email: user.email,
        amount,
        eventId: event._id,
        ticketType: selectedTicket,
        userId,
      };
      console.log("Sending paymentData:", paymentData);


      // ✅ Handle free events (no Paystack)
      if (amount === 0) {
        const response = await fetch(
          "http://localhost:5000/api/payments/initiate",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(paymentData),
          }
        );

        const data = await response.json();
        if (data.success || data.ticket) {
          toast.success("Free event ticket registered successfully!");
          setIsModalOpen(false);
        } else {
          toast.error(data.message || "Failed to register for free event");
        }
        return;
      }

      // ✅ Paid events (Paystack flow)
      const response = await fetch(
        "http://localhost:5000/api/payments/initiate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(paymentData),
        }
      );

      const data = await response.json();
      if (data.success && data.authorization_url) {
        toast.info("Redirecting to Paystack...");
        window.location.href = data.authorization_url;
      } else {
        toast.error(data.message || "Payment initialization failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("An error occurred while initializing payment");
    }
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
          className="w-full h-[500px] object-cover rounded-md"
        />
      </section>

      {/* Main Info */}
      <section className="page-container mt-8 flex flex-col lg:flex-row gap-10 items-start">
        <div className="lg:w-[80%] flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <img src={calendarIcon} alt="Date" className="w-5 h-5" />
            <span className="font-medium text-lg lg:text-xl text-gray-800">
              {formatDateTime(event.date, event.timeStart, event.timeEnd)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <img src={locationIcon} alt="Location" className="w-5 h-5" />
            <span className="font-medium text-lg lg:text-xl text-gray-800">
              {event.location
                ? event.location
                : event.online
                ? "Online"
                : "Location not specified"}
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="border border-gray-300 px-3 py-1 rounded text-gray-700 text-sm">
              {event.category}
            </button>
          </div>

          <h1 className="font-bold text-2xl lg:text-3xl text-gray-900">
            {event.title}
          </h1>

          <p className="text-lg font-medium text-gray-800">
            Host: {event.host?.name || event.host || "Unknown"}
          </p>

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
            to="/event"
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

      {/* Ticket Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div className="relative bg-white w-[90%] max-w-md rounded-lg shadow-xl p-6 text-gray-900 z-10">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-center text-lg font-semibold mb-6">
              Select Ticket
            </h2>

            <div className="flex flex-col gap-4">
              {pricing.map((price, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-3 items-center gap-3 border-b border-gray-300 pb-3"
                >
                  <p className="text-left font-medium">{price.type}</p>

                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => decrease(price.type)}
                      className="bg-gray-200 w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span>{quantities[price.type] || 0}</span>
                    <button
                      onClick={() => increase(price.type)}
                      className="bg-gray-200 w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>

                  <p className="font-semibold text-right">
                    {price.price > 0
                      ? `₦${price.price.toLocaleString()}`
                      : "Free"}
                  </p>
                </div>
              ))}
            </div>

            <hr className="my-4 border-gray-300" />

            <div className="flex justify-between font-medium text-gray-800">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>

            <button
              onClick={handlePayment}
              className="w-full mt-5 bg-[#9747FF] text-white py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Proceed To Payment
            </button>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
