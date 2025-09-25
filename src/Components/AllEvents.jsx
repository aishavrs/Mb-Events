import React from 'react';
import { events } from '../../data';
import SingleEvent from './SingleEvent';

export default function AllEvents() {
  return (
    <section className="page-section bg-white">
      <div className="page-container flex flex-col gap-8">
        
        {/* Heading */}
        <h1 className="font-medium text-2xl sm:text-3xl lg:text-[30px] mb-6 text-center lg:text-left">
          All Events
        </h1>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {events.map((event) => (
            <SingleEvent key={event.id} {...event} />
          ))}
        </div>

        {/* Pagination */}
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
