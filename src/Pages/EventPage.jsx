import React, { useState } from "react";
import AppLayout from "../Layouts/AppLayout";
import AllEvents from "../Components/AllEvents";
import DropdownFilter from "../Components/DropDownFilter";
import { CiSearch } from "react-icons/ci";

export default function EventPage() {
  // Temporary states for filter inputs
  const [tempLocation, setTempLocation] = useState([]);
  const [tempDate, setTempDate] = useState([]);
  const [tempCategory, setTempCategory] = useState([]);
  const [tempTag, setTempTag] = useState([]);
  const [tempPrice, setTempPrice] = useState([]);
  const [tempSearch, setTempSearch] = useState("");

  // Applied states that get sent to AllEvents
  const [location, setLocation] = useState([]);
  const [date, setDate] = useState([]);
  const [category, setCategory] = useState([]);
  const [tag, setTag] = useState([]);
  const [price, setPrice] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <AppLayout>
      <section className="page-section bg-black">
        <div className="page-container flex flex-col items-center">

          {/* Search bar */}
          <div className="flex gap-2 justify-start items-center w-full sm:w-[80%] md:w-[70%] bg-white px-3 py-3 rounded-md">
            <span className="text-xl text-gray-600">
              <CiSearch />
            </span>
            <input
              type="text"
              placeholder="Search Events"
              className="outline-0 w-full text-sm"
              value={tempSearch}
              onChange={(e) => setTempSearch(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mt-4 w-full sm:w-auto">
            <DropdownFilter
              label="Location"
              options={["Online", "Lagos", "Ogun", "Abuja", "Port-Harcourt", "Ibadan"]}
              selected={tempLocation}
              setSelected={setTempLocation}
              showSelectAll={false}
            />
            <DropdownFilter
              label="Date"
              options={["Today", "Tomorrow", "This Week", "This Month"]}
              selected={tempDate}
              setSelected={setTempDate}
              showSelectAll={false}
            />
            <DropdownFilter
              label="Category"
              options={[
                "Sports",
                "Party",
                "Education",
                "Tech",
                "Concerts",
                "Religion",
                "Games",
                "Dance",
              ]}
              selected={tempCategory}
              setSelected={setTempCategory}
              showSelectAll={false}
            />
            <DropdownFilter
              label="Tag"
              options={["Sports",
                "Party",
                "Education",
                "Tech",
                "Concerts",
                "Religion",
                "Games",
                "Dance",]}
              selected={tempTag}
              setSelected={setTempTag}
            />
            <DropdownFilter
              label="Price"
              options={["Free", "Paid"]}
              selected={tempPrice}
              setSelected={setTempPrice}
              showSelectAll={false}
            />

            {/* Apply + Reset buttons */}
            <button
              onClick={() => {
                setLocation(tempLocation);
                setDate(tempDate);
                setCategory(tempCategory);
                setTag(tempTag);
                setPrice(tempPrice);
                setSearchTerm(tempSearch);
              }}
              className="bg-[#9747FF] px-4 py-2 rounded-md font-medium text-xs text-white text-center hover:bg-purple-700 transition"
            >
              Apply
            </button>

            <button
              onClick={() => {
                setTempLocation([]);
                setTempDate([]);
                setTempCategory([]);
                setTempTag([]);
                setTempPrice([]);
                setTempSearch("");

                setLocation([]);
                setDate([]);
                setCategory([]);
                setTag([]);
                setPrice([]);
                setSearchTerm("");
              }}
              className="text-[#9747FF] rounded-md font-medium text-xs text-center hover:underline"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </section>

      {/* Events list */}
      <section className="page-section">
        <AllEvents
          searchTerm={searchTerm}
          filters={{ location, date, category, tag, price }}
        />
      </section>
    </AppLayout>
  );
}
