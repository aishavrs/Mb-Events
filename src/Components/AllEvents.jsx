import React from 'react';
import { events } from '../../data';
import SingleEvent from './SingleEvent';

export default function AllEvents() {
  return (
    <section className="w-full bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-40 flex flex-col gap-8">
        
        {/* Heading */}
        <h1 className="font-medium text-2xl sm:text-3xl lg:text-[30px] mb-5 text-center lg:text-left">
          All Events
        </h1>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-[29px]">
          {events.map((event) => (
            <SingleEvent key={event.id} {...event} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 my-10">
          <button className="border border-black rounded-md px-4 sm:px-6 py-2 sm:py-3 w-full sm:w-36 text-center">
            Previous
          </button>
          <p className="text-base sm:text-lg text-center">Page 1 of 10</p>
          <button className="bg-[#9747FF] text-white rounded-md px-4 sm:px-6 py-2 sm:py-3 w-full sm:w-36 text-center">
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
