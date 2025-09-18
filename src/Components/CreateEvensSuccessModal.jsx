import React from 'react'
import { Link } from "react-router";
import check from '../assets/check.png'
import Button from './Button';

export default function CreateEventsSuccessModal({showModal, setShowModal}) {
      if (!showModal) return null;

  return (
    <>
       <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md text-center p-6 relative animate-fadeIn">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <img src={check} alt="Success" className="mx-auto w-16 h-16" />
        <h2 className="text-2xl font-bold mt-4">Awesome</h2>
        <p className="text-gray-600 mt-2">Your event has been created</p>
        <div className="mt-6">
          <Link to="/" onClick={() => setShowModal(false)}>
            <Button content="Back to home" />
          </Link>
        </div>
      </div>
    </div>
</>
  )
}