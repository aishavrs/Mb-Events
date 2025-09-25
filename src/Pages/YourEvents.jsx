import React, {useEffect, useState, useContext} from 'react'
import AppLayout from "../Layouts/AppLayout"
import SingleEvent from "../Components/SingleEvent"
import { EventContext } from '../Context/EventContext';

export default function YourEvents() {
  const [activeTab, setActiveTab] = useState(1);
  const { fetchEvents, loading, error, events} = useContext(EventContext)
  const tabs = [
    { id: 1, content: "Hosting", type: "hosting" },
    { id: 2, content: "Attending", type: "attending" },
    { id: 3, content: "Previous", type: "previous" }
  ];

  const activeType = tabs.find((t) => t.id === activeTab).type;
  const currentEvents = event[activeType] || []

  useEffect (()=>{
    fetchEvents(activeType);
  }, [activeTab, activeType, fetchEvents])

  return (
    <div>
      <AppLayout>
        <section className="page-container flex flex-col gap-6 mt-3">
          <div>
            <h1 className='font-bold text-3xl'>Your Events</h1>
          </div>
          <div className="flex gap-3 ">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab;
              const tabClassName = isActive
              ? "bg-black px-4 py-3 rounded text-xs text-white md:text-[16px] cursor-pointer w-full"
              : "border border-black px-4 py-3 rounded text-xs md:text-[16px] cursor-pointer w-full";
              return(
                <button onClick={()=> setActiveTab(tab.id)}
                  className={tabClassName}
                  key={tab.id}>{tab.content}
                </button>
              )
            })}
          </div>
        </section>

        <div className='page-container mt-3 mb-3'>
         {loading ? (
          <p>Loading...</p>
         ) :
         error ? (
          <p className='text-red-500'>{error}</p>
         ) : 
         currentEvents.length > 0 ? (
          <div className='grid grid-cols-1'>
            {currentEvents.map((event)=> (
              <SingleEvent key={event._id} event={event} />
            ))}
          </div>
         ) :
         
         (<p className='text-gray-500'>
            No events found
         </p>)
         }
           
        </div>
      </AppLayout>
    </div>
  )
}
