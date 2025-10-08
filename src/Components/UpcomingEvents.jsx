import React, { useEffect, useContext } from "react";
import { EventContext } from "../Context/EventContext";
import EventsCard from "../Components/SingleEvent";
import { AuthContext } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function UpcomingEvents() {
  const { fetchUpcomingEvents, upcomingEvents, error } = useContext(EventContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchUpcomingEvents();
    }
  }, [user]);

  // === Error State ===
  if (error) {
    return (
      <section className="page-section">
        <div className="page-container">
          <p className="text-red-500 text-[18px] lg:text-[25px] text-center py-5">
            {error || "Failed to load upcoming events."}
          </p>
        </div>
      </section>
    );
  }

  // === Not Logged In ===
  if (!user) {
    return (
      <section className="page-section py-5">
        <div className="page-container">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-[26px] sm:text-[30px] font-semibold">
              Upcoming Events
            </h2>
            {/* Instead of disabled, it redirects to sign-in */}
            <button
              onClick={() => navigate("/sign-in")}
              className="text-base sm:text-lg lg:text-xl text-[#9747FF] hover:underline"
            >
              See All
            </button>
          </div>

          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-gray-500 text-[18px] lg:text-[25px] text-center">
              Oops! No events. Please{" "}
              <Link to="/sign-in">
                <span className="font-semibold text-purple-800">log in</span>
              </Link>{" "}
              to see upcoming events.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // === No Upcoming Events ===
  if (upcomingEvents.length === 0) {
    return (
      <section className="page-section py-5">
        <div className="page-container">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-[26px] sm:text-[30px] font-semibold">
              Upcoming Events
            </h2>
            <Link
              to="/event?filter=upcoming"
              className="text-base sm:text-lg lg:text-xl text-[#9747FF] hover:underline"
            >
              See All
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-gray-500 text-[18px] lg:text-[25px] text-center">
              No upcoming events at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // === Events Found ===
  return (
    <section className="page-section py-5">
      <div className="page-container">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-[26px] sm:text-[30px] font-semibold">
            Upcoming Events
          </h2>
          <Link
            to="/event?filter=upcoming"
            className="text-base sm:text-lg lg:text-xl text-[#9747FF] hover:underline"
          >
            See All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.slice(0, 3).map((event) => (
            <EventsCard key={event._id} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
}
