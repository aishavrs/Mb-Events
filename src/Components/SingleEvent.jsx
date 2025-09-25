import React from 'react'
import { Link } from 'react-router-dom'
import locationIcon from '../assets/location-svgrepo-com 1.png'
import calendarIcon from '../assets/calendar-svgrepo-com.png'
import ticketIcon from '../assets/ticket-svgrepo-com.png'

export default function SingleEvent({ id, img, title, host, category, location, date, pricing }) {
  return (
    <Link 
      to={`/event/${id}`} 
      className="flex flex-col gap-3 text-md lg:text-lg hover:shadow-lg transition rounded-md p-2"
    >
      <img src={img} alt={title} className="w-full rounded-md" />

      <h1 className="font-bold text-xl">{title}</h1>
      <p><span className="font-bold">Host:</span> {host}</p>
      <p><span className="font-bold">Category:</span> {category}</p>

      <div className="flex items-center gap-2">
        <img src={locationIcon} alt="Location" className="w-5 h-5" />
        <span>{location}</span>
      </div>

      <div className="flex items-center gap-2">
        <img src={calendarIcon} alt="Date" className="w-5 h-5" />
        <span>{date}</span>
      </div>

      <div className="flex items-center gap-2">
        <img src={ticketIcon} alt="Tickets" className="w-5 h-5" />
        <span>
          {pricing?.map(ticket => ticket.type).join(', ')}
        </span>
      </div>
    </Link>
  )
}
