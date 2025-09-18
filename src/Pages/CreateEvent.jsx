import React, {useState, useEffect} from 'react'
import CreateEventForm from '../Components/CreateEventForm'
import CreateEventsSuccessModal from '../Components/CreateEvensSuccessModal'
import AppLayout from '../Layouts/AppLayout'

export default function CreateEvent() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
        const timer = setTimeout(() => setPageLoading(false), 1000);
        return () => clearTimeout(timer);
      }, []); 
  return (
    <>
    <AppLayout>
       <div className="flex items-center px-5 py-2 lg:px-20">
        <div className="container mx-auto">
             <h1 className="text-start text-2xl font-bold pb-5">Create event</h1>
             {showModal && ( <CreateEventsSuccessModal showModal={showModal} setShowModal={setShowModal} />)}
             <CreateEventForm />
        </div>
       </div>
    </AppLayout>
    </>
  )
}

// import React, { useState, useEffect } from 'react'
// import AppLayout from "../Layouts/AppLayout"
// import CreateEventForm from "../Components/CreateEventPageComponents/CreateEventForm"
// import CreateEventsSuccessModal from "../Components/CreateEventPageComponents/CreateEventsSuccessModal"
// import Loader from '../Components/Loader'

// export default function CreateEventPage() {
//    const [showModal, setShowModal] = useState(false);
//    const [pageLoading, setPageLoading] = useState(true);
   
//         useEffect(() => {
//         const timer = setTimeout(() => setPageLoading(false), 1000);
//         return () => clearTimeout(timer);
//       }, []); 
    
//        if (pageLoading) return <Loader/>;
//   return (
//     <>
//     <AppLayout>
//        <div className="flex items-center px-5 py-2 lg:px-20">
//         <div className="container mx-auto">
//              <h1 className="text-start text-2xl font-bold pb-5">Create event</h1>
//              {showModal && ( <CreateEventsSuccessModal showModal={showModal} setShowModal={setShowModal} />)}
//              <CreateEventForm />
//         </div>
//        </div>
//     </AppLayout>
//     </>
//   )
// }