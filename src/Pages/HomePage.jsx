import React from 'react';
import AppLayout from '../Layouts/AppLayout';
import HeroSection from '../Components/HeroSection';
import { Link } from 'react-router-dom';
import { events } from '../../data';
import SingleEvent from '../Components/SingleEvent';
import party from '../assets/party.png';
import concerts from '../assets/concerts.png';
import education from '../assets/education.png';

export default function HomePage() {
  const eventsNeeded = events.filter(event => [3, 5, 6].includes(event.id));
  const eventsNeededTwo = events.filter(event => [1, 4, 7].includes(event.id));

  return (
    <AppLayout>
      <HeroSection />

      {/* Upcoming Events */}
      <section className="page-section">
        <div className="page-container flex flex-col gap-6">
          {/* Heading */}
          <div className="flex justify-between items-center mt-5 lg:mt-7">
            <h1 className="font-medium text-xl sm:text-2xl lg:text-3xl">
              Upcoming Events
            </h1>
            <Link to="#" className="text-base sm:text-lg lg:text-xl text-[#9747FF] hover:underline">
              See All
            </Link>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {eventsNeeded.map(event => (
              <SingleEvent key={event.id} {...event} />
            ))}
          </div>
        </div>
      </section>

      {/* Event Categories */}
      <section className="page-section">
        <div className="page-container flex flex-col gap-6">
          <div className="flex justify-between items-center mt-5 lg:mt-7">
            <h1 className="font-medium text-xl sm:text-2xl lg:text-3xl">
              Event Categories
            </h1>
            <Link to="#" className="text-base sm:text-lg lg:text-xl text-[#9747FF] hover:underline">
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
            <div className="bg-[#9747FF0F] px-6 sm:px-8 py-8 sm:py-10 flex flex-col justify-between gap-4 rounded-lg flex-1">
              <h1 className="font-bold text-2xl sm:text-3xl">Join An Event</h1>
              <p className="text-sm sm:text-base">
                Discover exciting events that match your interests and join with just a few clicks. Whether it's a concert, workshop, or social gathering, our platform makes it simple to find and book tickets. Stay updated with event details and enjoy seamless entry with digital tickets. Join the fun and make memories!
              </p>
              <button className="bg-[#9747FF] px-4 py-2 text-white rounded-sm w-full sm:w-[60%]">
                Join Event
              </button>
            </div>

            <div className="bg-[#0000000F] px-6 sm:px-8 py-8 sm:py-10 flex flex-col justify-between gap-4 rounded-lg flex-1">
              <h1 className="font-bold text-2xl sm:text-3xl">Create An Event</h1>
              <p className="text-sm sm:text-base">
                Bring your vision to life by creating and hosting your own event. From intimate meetups to large-scale gatherings, our easy-to-use platform helps you manage everything—from ticketing to promotion. Engage with your audience, track your attendees, and make your event a success in just a few steps.
              </p>
              <button className="bg-[#0E021E] px-4 py-2 text-white rounded-sm w-full sm:w-[60%]">
                Create Event
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Near You */}
      <section className="page-section">
        <div className="page-container flex flex-col gap-6">
          <div className="flex justify-between items-center mt-5 lg:mt-7">
            <h1 className="font-medium text-xl sm:text-2xl lg:text-3xl">
              Events Near You
            </h1>
            <Link to="#" className="text-base sm:text-lg lg:text-xl text-[#9747FF] hover:underline">
              See All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {eventsNeededTwo.map(event => (
              <SingleEvent key={event.id} {...event} />
            ))}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
