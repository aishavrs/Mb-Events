import React, { useContext, useEffect } from 'react';
import SingleEvent from './SingleEvent';
import { EventContext } from '../Context/EventContext';

export default function AllEvents({ searchTerm = "", filters = {} }) {
  const { allEvents, fetchAllEvents, loading } = useContext(EventContext);
  const { location = [], date = [], category = [], tag = [], price = [] } = filters;

  useEffect(() => {
    fetchAllEvents();
  }, []);

  // Filter events based on searchTerm + selected filters
  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = location.length ? location.includes(event.location) : true;
    const matchesCategory = category.length ? category.includes(event.category) : true;
    const matchesTag = tag.length ? tag.some((t) => event.tags.includes(t)) : true;
    const matchesPrice = price.length ? price.includes(event.priceType) : true;

    return matchesSearch && matchesLocation && matchesCategory && matchesTag && matchesPrice;
  });

  return (
    <section className="page-section bg-white">
      <div className="page-container flex flex-col gap-8">

        <h1 className="font-medium text-2xl sm:text-3xl lg:text-[30px] mb-6 text-center lg:text-left">
          {filteredEvents.length ? "All Events" : "No events found"}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredEvents.map((event) => (
            <SingleEvent key={event.id || event._id} {...event} />
          ))}
        </div>

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
