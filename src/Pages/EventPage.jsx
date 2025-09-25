import React from 'react'
import AppLayout from '../Layouts/AppLayout'
import AllEvents from '../Components/AllEvents'
import { CiSearch } from "react-icons/ci";

export default function EventPage() {
  const selectItems = [
    { id: "location", label: "Location" },
    { id: "date", label: "Date" },
    { id: "category", label: "Category"},
    { id: "tag", label: "Tag"},
    { id: "price", label: "Price" }
  ];

  return (
    <AppLayout>
      {/* Search + Filters Section */}
      <section className="page-section bg-black">
        <div className="page-container flex flex-col items-center">
          
          {/* Search bar */}
          <div className="flex gap-2 justify-start items-center w-full sm:w-[80%] md:w-[70%] bg-white px-3 py-3 rounded-md">
            <span className="text-xl text-gray-600"><CiSearch /></span>
            <input 
              type="text" 
              placeholder="Search Events"
              className="outline-0 w-full text-sm"
            />
          </div>

          {/* Filter options */}
          <div className="flex flex-wrap justify-center gap-3 mt-4 w-full sm:w-auto">
            {selectItems.map((selectItem, index) => (
              <div 
                key={index} 
                className="flex flex-col sm:flex-row justify-center items-center text-center bg-white px-3 py-2 rounded-md text-xs"
              >
                <label 
                  htmlFor={selectItem.id} 
                  className="text-[#00000099] mb-1 sm:mb-0 sm:mr-1"
                >
                  {selectItem.label}
                </label>
                <select
                  id={selectItem.id}
                  name={selectItem.id}
                  className="border border-gray-300 rounded-sm text-xs px-1 py-0.5"
                >
                  <option value="">Select</option>
                </select>
              </div>
            ))}
            <button className="bg-[#9747FF] px-4 py-2 rounded-md font-medium text-xs text-white text-center hover:bg-purple-700 transition">
              Apply
            </button>
            <button className="text-[#9747FF] rounded-md font-medium text-xs text-center hover:underline">
              Reset Filter
            </button>
          </div>
        </div>
      </section>

      {/* Events list */}
      <section className="page-section">
          <AllEvents />
      </section>
    </AppLayout>
  )
}
