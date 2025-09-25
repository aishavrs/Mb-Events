import React, { useState, useEffect } from 'react'
import CreateEventForm from '../Components/CreateEventForm'
import CreateEventsSuccessModal from '../Components/CreateEvensSuccessModal'
import AppLayout from '../Layouts/AppLayout'
// import Loader from '../Components/Loader'

export default function CreateEvent() {
  const [showModal, setShowModal] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // if (pageLoading) return <Loader />

  return (
    <AppLayout>
      <div className="page-container py-6 lg:py-10">
        <h1 className="text-2xl font-bold pb-5">Create event</h1>

        {showModal && (
          <CreateEventsSuccessModal
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}

        <CreateEventForm />
      </div>
    </AppLayout>
  )
}
