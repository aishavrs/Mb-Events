import React, { useContext, useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import SingleEvent from "./SingleEvent";
import { EventContext } from "../Context/EventContext";

export default function AllEvents({ searchTerm = "", filters = {} }) {
  const { allEvents, fetchAllEvents, loading } = useContext(EventContext);
  const { location = [], date = [], category = [], tag = [], price = [] } = filters;

  const locationHook = useLocation();
  const queryParams = new URLSearchParams(locationHook.search);
  const filterType = queryParams.get("filter");

  const [userCity, setUserCity] = useState("");

  // ✅ Fetch all events once
  useEffect(() => {
    fetchAllEvents();
  }, []);

  // ✅ Detect user city for “nearby” events
  useEffect(() => {
    if (filterType === "nearby" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await res.json();
            const city =
              data.address.city ||
              data.address.town ||
              data.address.state ||
              "";
            setUserCity(city);
            console.log("📍 Detected city:", city);
          } catch (err) {
            console.error("Error fetching location:", err);
          }
        },
        (err) => {
          console.error("Geolocation error:", err);
        }
      );
    }
  }, [filterType]);

  // ✅ Helper: Check if event is upcoming
  const isUpcoming = (eventDate) => {
    const now = new Date();
    const date = new Date(eventDate);
    return date >= now;
  };

  // ✅ Compute filtered events
  const filteredEvents = useMemo(() => {
    let events = allEvents;

    // ---- Handle homepage quick filters ----
    if (filterType === "upcoming") {
      events = events.filter((event) => isUpcoming(event.date));
    }

    if (filterType === "nearby") {
      events = events.filter((event) => {
        const loc = event.location?.toLowerCase() || "";
        return (
          loc.includes("online") ||
          event.online === true ||
          (userCity && loc.includes(userCity.toLowerCase()))
        );
      });
    }

    // ---- Handle dropdown filters + search ----
    return events.filter((event) => {
      const title = event.title?.toLowerCase() || "";
      const loc = event.location?.toLowerCase() || "";
      const cat = event.category?.toLowerCase() || "";
      const tags = Array.isArray(event.tags)
        ? event.tags.map((t) => t.toLowerCase())
        : [];

      // 🔍 Search
      const matchesSearch = searchTerm
        ? title.includes(searchTerm.toLowerCase())
        : true;

      // 📍 Location
      const matchesLocation = location.length
        ? location.some((l) => {
            const option = l.toLowerCase();
            if (option === "online") return event.online === true || loc.includes("online");
            if (option === "on-site") return event.online === false && loc && !loc.includes("online");
            if (option === "hybrid") return event.online === true && loc;
            return loc.includes(option);
          })
        : true;

      // 🗓️ Date (Today, Tomorrow, This Week, This Month)
      const matchesDate = date.length
        ? date.some((filter) => {
            const eventDate = new Date(event.date);
            const today = new Date();
            if (filter === "Today")
              return eventDate.toDateString() === today.toDateString();
            if (filter === "Tomorrow") {
              const tomorrow = new Date();
              tomorrow.setDate(today.getDate() + 1);
              return eventDate.toDateString() === tomorrow.toDateString();
            }
            if (filter === "This Week") {
              const start = new Date(today);
              start.setDate(today.getDate() - today.getDay());
              const end = new Date(start);
              end.setDate(start.getDate() + 7);
              return eventDate >= start && eventDate <= end;
            }
            if (filter === "This Month")
              return eventDate.getMonth() === today.getMonth();
            return true;
          })
        : true;

      // 🎭 Category
      const matchesCategory = category.length
        ? category.some((c) => cat.includes(c.toLowerCase()))
        : true;

      // 🏷️ Tag
      const matchesTag = tag.length
        ? tag.some((t) => tags.includes(t.toLowerCase()))
        : true;

      // 💰 Price
      const isFree = event.free === true || event.priceType === "Free";
      const isPaid =
        (event.regularEnabled && event.regular > 0) ||
        (event.vipEnabled && event.vip > 0) ||
        event.priceType === "Paid";
      const matchesPrice = price.length
        ? price.some((p) =>
            p.toLowerCase() === "free" ? isFree : p.toLowerCase() === "paid" && isPaid
          )
        : true;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesDate &&
        matchesCategory &&
        matchesTag &&
        matchesPrice
      );
    });
  }, [allEvents, filterType, userCity, searchTerm, location, date, category, tag, price]);

  // ✅ Dynamic Page Title
  const pageTitle =
    filterType === "nearby"
      ? "Events Near You"
      : filterType === "upcoming"
      ? "Upcoming Events"
      : "All Events";

  return (
    <section className="page-section bg-white">
      <div className="page-container flex flex-col gap-8">
        {/* Page Title */}
        <h1 className="font-medium text-2xl sm:text-3xl lg:text-[30px] mb-6 text-center lg:text-left">
          {loading ? "Loading..." : pageTitle}
        </h1>

        {/* Event List */}
        {loading ? (
          <p className="text-center text-gray-500">Loading events...</p>
        ) : filteredEvents.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredEvents.map((event) => (
              <SingleEvent key={event.id || event._id} {...event} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No events found.</p>
        )}

        {/* Pagination Placeholder */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10">
          <button className="border border-black rounded-md px-6 py-3 w-full sm:w-36 text-center">
            Previous
          </button>
          <p className="text-base sm:text-lg text-center">Page 1 of 10</p>
          <button className="bg-[#9747FF] text-white rounded-md px-6 py-3 w-full sm:w-36 text-center hover:bg-purple-700 transition">
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
