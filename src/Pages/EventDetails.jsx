import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { LuChevronRight } from 'react-icons/lu'
import calendarIcon from '../assets/calendar-svgrepo-com.png'
import locationIcon from '../assets/location-svgrepo-com 1.png'
import SingleEvent from '../Components/SingleEvent'
import { events } from '../../data'
import AppLayout from '../Layouts/AppLayout'

export default function EventDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [quantities, setQuantities] = useState({})
  const { id } = useParams()
  const event = events.find(e => e.id === parseInt(id))

  // Pick some upcoming events
  const eventsNeeded = events.filter(e => e.id !== parseInt(id)).slice(0, 3)

  if (!event) {
    return (
      <AppLayout>
        <div className="page-container py-10">
          <h1 className="text-2xl font-bold">Event not found</h1>
        </div>
      </AppLayout>
    )
  }

  // Quantity handlers
  const increase = type => {
    setQuantities(prev => ({ ...prev, [type]: (prev[type] || 0) + 1 }))
  }

  const decrease = type => {
    setQuantities(prev => ({
      ...prev,
      [type]: Math.max((prev[type] || 0) - 1, 0)
    }))
  }

  // Calculate total
  const total = event.pricing?.reduce((acc, price) => {
    return acc + (quantities[price.type] || 0) * price.price
  }, 0)

  // Paystack Config
const paystackConfig = {
  reference: new Date().getTime().toString(),
  email: "customer@email.com", // later we'll make this dynamic
  amount: total * 100, // Paystack uses kobo (multiply Naira by 100)
  publicKey: "pk_test_xxxxxxxxxxxxxxxxxxxxx", // replace with your Paystack public key
}

const initializePayment = usePaystackPayment(paystackConfig)


  return (
    <AppLayout>
      {/* Breadcrumbs */}
      <section className="page-container mt-4 flex gap-2 items-center text-sm text-gray-600">
        <Link to="/" className="flex items-center hover:underline">
          Home <LuChevronRight className="mx-1" />
        </Link>
        <Link to="/event" className="flex items-center hover:underline">
          Events <LuChevronRight className="mx-1" />
        </Link>
        <p className="text-black font-medium">Event Details</p>
      </section>

      {/* Banner Image */}
      <section className="page-container mt-5">
        <img src={event.img} alt={event.title} className="w-full rounded-md" />
      </section>

      {/* Main Event Info */}
      <section className="page-container mt-8 flex flex-col lg:flex-row gap-10 items-start">
        <div className="lg:w-[80%] flex flex-col gap-5">
          {/* Date */}
          <div className="flex items-center gap-2">
            <img src={calendarIcon} alt="Date" className="w-4 h-4" />
            <span className="font-medium text-lg lg:text-xl">{event.date}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <img src={locationIcon} alt="Location" className="w-4 h-4" />
            <span className="font-medium text-lg lg:text-xl">
              {event.location}
            </span>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            {event.categories?.map((category, idx) => (
              <button
                key={idx}
                className="border border-gray-300 px-3 py-1 rounded text-gray-700 text-sm"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-bold text-2xl lg:text-3xl">{event.title}</h1>

          {/* Description */}
          <p className="font-normal text-base lg:w-[90%] leading-relaxed text-gray-700">
            {event.description}
          </p>
        </div>

        {/* Pricing */}
        <div className="w-full lg:w-[20%] bg-black px-4 py-5 rounded-lg text-white flex flex-col gap-5">
          <h1 className="text-center text-lg font-medium">Pricing</h1>
          {event.pricing?.map((price, idx) => (
            <div key={idx} className="flex justify-between">
              <p>{price.type}</p>
              <p className="font-bold">₦{price.price.toLocaleString()}</p>
            </div>
          ))}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#9747FF] py-2 rounded hover:bg-purple-700 transition"
          >
            Select Ticket
          </button>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="page-container mt-12 mb-12 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-xl sm:text-2xl lg:text-3xl">
            Upcoming Events
          </h1>
          <Link
            to="/event"
            className="text-[#9747FF] hover:underline text-sm sm:text-base"
          >
            See All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventsNeeded.map(event => (
            <SingleEvent key={event.id} {...event} />
          ))}
        </div>
      </section>

      {/* Ticket Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          {/* Overlay with just transparency */}
          <div
            className="absolute inset-0 bg-black/40 z-40"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal Box */}
          <div className="relative bg-black w-[90%] max-w-md rounded-lg shadow-lg p-6 text-white z-50">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <h2 className="text-center text-lg font-semibold mb-6">
              Select Ticket
            </h2>

            {/* Ticket Options */}
            <div className="flex flex-col gap-4">
              {event.pricing?.map((price, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-3 items-center gap-3 border-b border-black pb-3"
                >
                  {/* Ticket Type */}
                  <p className="text-left">{price.type}</p>

                  {/* Quantity Selector */}
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => decrease(price.type)}
                      className="text-black bg-white w-7 h-7 rounded-full flex items-center justify-center"
                    >
                      -
                    </button>
                    <span>{quantities[price.type] || 0}</span>
                    <button
                      onClick={() => increase(price.type)}
                      className="bg-white text-black w-7 h-7 rounded-full flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <p className="font-semibold text-right">
                    ₦{price.price.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <hr className='border-[1px]' />

            {/* Total */}
            <div className="flex justify-between font-medium mt-6 mb-4">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>

            {/* Action Button */}
            <button onClick={() => initializePayment( (reference) => {
                  console.log("Payment success:", reference)
                  // TODO: you can call your backend here to verify payment
                  },
                  () => { console.log("Payment closed")})
              }
              className="w-full mt-5 bg-[#9747FF] text-white py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Proceed To Payment
            </button>


          </div>
        </div>
      )}
    </AppLayout>
  )
}
