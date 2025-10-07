import React, { useState, useEffect, useContext } from "react";
import AppLayout from "../Layouts/AppLayout";
import { EventContext } from "../Context/EventContext";
import SingleEvent from "../Components/SingleEvent";

export default function YourEvents() {
  const { fetchUsersEvents,userEvents, loading, error } = useContext(EventContext);
  const [activeBtn, setActiveBtn] = useState(1);

  const btns = [
    { id: 1, content: "Hosting", type: "hosting" },
    { id: 2, content: "Attending", type: "attending" },
    { id: 3, content: "Previous", type: "previous" },
  ];

  const activeType = btns.find((b) => b.id === activeBtn).type;
  const currentEvents = userEvents[activeType] || [];
  useEffect(() => {
      fetchUsersEvents(activeType).then((res) => {
      console.log("Events for", activeType, res);});
  }, [activeType,]);

  return (
    <AppLayout>
      <div className="flex-row items-center py-5 page-container">
        <div className="container mx-auto">
          <h1 className="text-start text-2xl font-bold pb-5">Your Events</h1>

          <div className="flex gap-4 rounded-md my-3 mx-auto">
            {btns.map((btn) => {
              const isActive = btn.id === activeBtn;
              const btnClass = isActive
                ? "h-[40px] lg:h-[60px] lg:w-1/3 bg-black text-white text-lg font-semibold px-4 py-2 rounded-md"
                : "h-[40px] lg:h-[60px] lg:w-1/3 text-black text-lg font-semibold border-2 border-black px-4 py-2 rounded-md";
              return (
                <button
                  onClick={() => setActiveBtn(btn.id)}
                  className={btnClass}
                  key={btn.id}
                >
                  {btn.content}
                </button>
              );
            })}
          </div>

          <div className="mt-6">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : currentEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentEvents.map((event) => (
                  <SingleEvent key={event._id} {...event} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No events found</p>
            )}
          </div>

        </div>
      </div>
    </AppLayout>
  );
}