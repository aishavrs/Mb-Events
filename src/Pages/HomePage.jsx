import React, { useContext, useEffect, useState } from "react";
import AppLayout from "../Layouts/AppLayout";
import HeroSection from "../Components/HeroSection";
import UpcomingEvents from "../Components/UpcomingEvents";
import { Link } from "react-router-dom";
import SingleEvent from "../Components/SingleEvent";
import { EventContext } from "../Context/EventContext";
import party from "../assets/party.png";
import concerts from "../assets/concerts.png";
import education from "../assets/education.png";
import { AuthContext } from "../Context/AuthContext";

export default function HomePage() {
  const { user } = useContext(AuthContext);
  const { allEvents, fetchAllEvents, loading } = useContext(EventContext);
  const [userLocation, setUserLocation] = useState(null);

  // Fetch all events when homepage loads
  useEffect(() => {
    fetchAllEvents();
  }, []);

  // Get user’s location (optional — falls back to showing "Online" events)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => setUserLocation(null)
      );
    }
  }, []);

  // Helper to check if event date is in the future
  const isUpcoming = (date) => {
    const eventDate = new Date(date);
    return eventDate >= new Date();
  };

  // Filter upcoming events
  const upcomingEvents = allEvents.filter((event) => isUpcoming(event.date));

  // Filter nearby events (or "online")
  const nearbyEvents = allEvents.filter((event) => {
    if (!userLocation) {
      return event.location?.toLowerCase().includes("online");
    }
    // If event has coordinates (future improvement), you can measure distance
    return (
      event.location?.toLowerCase().includes("nigeria") ||
      event.location?.toLowerCase().includes("online")
    );
  });

  return (
    <AppLayout>
      <HeroSection />
      <UpcomingEvents />

      {/* Event Categories */}
      <section className="page-section">
        <div className="page-container flex flex-col gap-6">
          <div className="flex justify-between items-center mt-5 lg:mt-7">
            <h1 className="font-medium text-xl sm:text-2xl lg:text-3xl">
              Event Categories
            </h1>
            <Link
              to="/categories"
              className="text-base sm:text-lg lg:text-xl text-[#9747FF] hover:underline"
            >
              See All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            <img src={concerts} alt="Concerts" />
            <img src={education} alt="Education" />
            <img src={party} alt="Party" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="page-section">
        <div className="page-container flex flex-col gap-6">
          <div className="flex justify-center items-center">
            <h1 className="font-medium text-xl sm:text-2xl lg:text-3xl">
              How It Works
            </h1>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 md:gap-8 mb-10 w-full">
            {/* Join Event */}
            <div className="bg-[#9747FF0F] px-6 sm:px-8 py-8 sm:py-10 flex flex-col justify-between gap-4 rounded-lg flex-1">
              <h1 className="font-bold text-2xl sm:text-3xl">Join An Event</h1>
              <p className="text-sm sm:text-base">
                Discover exciting events that match your interests and join with
                just a few clicks. Whether it's a concert, workshop, or social
                gathering, our platform makes it simple to find and book
                tickets. Stay updated with event details and enjoy seamless
                entry with digital tickets. Join the fun and make memories!
              </p>
              <Link
                to="/event"
                className="bg-[#9747FF] px-4 py-2 text-white text-center rounded-sm w-full sm:w-[60%]"
              >
                Join Event
              </Link>
            </div>

            {/* Create Event */}
            <div className="bg-[#0000000F] px-6 sm:px-8 py-8 sm:py-10 flex flex-col justify-between gap-4 rounded-lg flex-1">
              <h1 className="font-bold text-2xl sm:text-3xl">
                Create An Event
              </h1>
              <p className="text-sm sm:text-base">
                Bring your vision to life by creating and hosting your own
                event. From intimate meetups to large-scale gatherings, our
                easy-to-use platform helps you manage everything—from ticketing
                to promotion. Engage with your audience, track your attendees,
                and make your event a success in just a few steps.
              </p>
              <Link
                to="/create-event"
                className="bg-[#0E021E] px-4 py-2 text-white text-center rounded-sm w-full sm:w-[60%]"
              >
                Create Event
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Events Near You */}
      <section className="page-section">
        <div className="page-container flex flex-col gap-6">
          {/* Always show heading and See All */}
          <div className="flex justify-between items-center mt-5 lg:mt-7">
            <h1 className="font-medium text-xl sm:text-2xl lg:text-3xl">
              Events Near You
            </h1>
            <Link
              to="/event?filter=nearby"
              className="text-base sm:text-lg lg:text-xl text-[#9747FF] hover:underline"
            >
              See All
            </Link>
          </div>

          {/* Conditional content */}
          {loading ? (
            <p>Loading events...</p>
          ) : user ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {nearbyEvents.length > 0 ? (
                nearbyEvents.slice(0, 3).map((event) => (
                  <SingleEvent key={event._id} {...event} />
                ))
              ) : (
                <p>No nearby or online events found.</p>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
                        <p className="text-gray-500 text-[18px] lg:text-[25px] text-center">
                          Oops! No events. Please{" "}
                          <Link to="/sign-in">
                            <span className="font-semibold text-purple-800">log in</span>
                          </Link>{" "}
                          to see upcoming events.
                        </p>
                      </div>
          )}
        </div>
      </section>
    </AppLayout>
  );
}
