import React from "react";
import { MdLocationPin } from "react-icons/md";
import Button from "../Components/Button"
import { motion } from "framer-motion"

export default function EventPreview({ formData, photo, onEdit, onSubmit, isLoading }) {


  return (
    <motion.form onSubmit={onSubmit} initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-full space-y-2">
      <label className="block text-lg font-semibold">Uploaded Photo</label>
      <div className="w-full h-95 bg-gray-300 flex items-center justify-center rounded-lg overflow-hidden">
        {photo ? (
          <img
            src={URL.createObjectURL(photo)}
            alt="Event"
            className="h-full w-full object-cover"
          />
        ) : (
          <p className="italic text-gray-500">No photo uploaded</p>
        )}
      </div>


      <label className="block text-lg font-semibold">Event Title</label>
      <p className="w-[150px] lg:w-sm px-3 py-2 rounded bg-gray-200 text-black">
        {formData.title || "Not provided"}
      </p>


      <label className="block text-lg font-semibold">Hosted by</label>
      <p className="w-[150px] lg:w-sm px-3 py-2 rounded bg-gray-200 text-black">
        {formData.hostedBy || "Not provided"}
      </p>

      <h1 className="text-xl font-semibold py-2">Time & Location</h1>

      <label className="text-lg font-semibold">Date</label>

      <p  className="block w:xs lg:w-sm px-3 py-2 rounded bg-gray-200 text-black w-40">
        {formData.date || "Not set"}
      </p>

      <div className="flex gap-5">
        <div>
          <label className="text-lg font-semibold py-2">Time(start)</label>
          <p className="block w:xs lg:w-sm px-3 py-2 rounded bg-gray-200 text-black w-40">
            {formData.timeStart || "Not set"}
          </p>
        </div>

        <div>
          <label className="text-lg font-semibold py-2">Time(end)</label>
          <p className="block w:xs lg:w-sm px-3 py-2 rounded bg-gray-200 text-black w-40">
            {formData.timeEnd || "Not set"}
          </p>
        </div>
      </div>

      <label className="text-lg font-semibold py-2">Location</label>
      {formData.online ? (
        // <p className="px-3 py-2 rounded bg-green-200 text-green-800 w-60 font-semibold">
        //   Online Event
        // </p>
         <div className="flex items-center py-3 lg:py-0 gap-5">
         <label className="font-semibold" htmlFor="Online-toggle">Online</label>
        <div className="toggle-container">
            <input checked={true} id="Online-toggle" className="toggle-input" type="checkbox"/>
            <label htmlFor="Online-toggle" className="toggle-label"></label>
        </div>
       </div>
      ) : (
        <div className="relative w-full">
          <MdLocationPin className="absolute top-3 left-2 text-purple-600" />
          <p className="w-xs lg:w-4xl px-8 py-2 rounded bg-gray-200 text-black">
            {formData.location || "Not provided"}
          </p>
        </div>
      )}


      <label className="text-lg font-semibold block">Description</label>
      <p className="w-full h-50 px-3 py-2 rounded bg-gray-200 text-black">
        {formData.description || "No description"}
      </p>

      <h1 className="text-xl font-semibold py-2">Category</h1>
      <div className="flex items-center gap-3">
        <div>
          <label className="block text-lg font-semibold">Selected Category</label>
          <p className="px-3 py-3 rounded bg-gray-200 text-black w-[180px]">
            {formData.category || "None"}
          </p>
        </div>
        {/* <div>
          <label className="block text-lg font-semibold">Tags</label>
          <div className="flex flex-wrap bg-gray-200 py-3 px-3 rounded-md gap-2 mt-1">
            {formData.tags
              ? formData.tags.split(",").map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white rounded-md text-sm"
                  >
                    {tag.trim()}
                  </span>
                ))
              : <p className="px-3 py-2 rounded bg-gray-200 text-gray-500">No tags</p>}
          </div>
        </div> */}
        <div>
  <label className="block text-lg font-semibold">Tags</label>
  
  <div className="flex flex-wrap bg-gray-200 py-3 px-3 rounded-md gap-2 mt-1">
    {formData.tags && formData.tags.length > 0 ? (
      formData.tags.map((tag, i) => (
        <span
          key={i}
          className="px-3 py-1 bg-white rounded-md text-sm shadow-sm">{tag}
          </span>))) 
          :
           (<p className="px-3 py-2 text-gray-500">No tags</p>)}
           </div>
    </div>

    </div>



      <h1 className="text-lg font-semibold py-2">Pricing</h1>
      {formData.free ? (
        <>
       <div className="flex gap-10 items-center">
          <label className="font-semibold" htmlFor="free">Free</label>
         <div className="toggle-containerFree">
            <input checked={true}  id="free-toggle" className="toggle-inputFree" type="checkbox"/>
            <label htmlFor="free-toggle" className="toggle-labelFree"></label>
        </div>
       </div>
       <>
        <label className="block font-semibold"  htmlFor="regular">Regular</label>
       <div className="flex items-center gap-20 lg:gap-[250px]">
            <input className="w-[150px] lg:w-sm px-3 py-2 rounded bg-gray-200 text-black" type="text" />

         <div className="toggle-containerRegular">
            <input id="regular-toggle" className="toggle-inputRegular" type="checkbox" checked={false}
            />
            <label htmlFor="regular-toggle" className="toggle-labelRegular"></label>
        </div>
        </div>

         <label className="block font-semibold"  htmlFor="VIP">VIP</label>
       <div className="flex items-center gap-20 lg:gap-[250px]">
            <input className="w-[150px] lg:w-sm px-3 py-2 rounded bg-gray-200 text-black" type="text" />
         <div className="toggle-containerVIP">
            <input id="VIP-toggle" className="toggle-inputVIP" type="checkbox" checked={false}/>
            <label htmlFor="VIP-toggle" className="toggle-labelVIP"></label>
        </div>
        </div>
       </>
      </>
      ) : (
        <>
        <div className="flex gap-10 items-center">
          <label className="font-semibold" htmlFor="free">Free</label>
         <div className="toggle-containerFree">
            <input checked={false}  id="free-toggle" className="toggle-inputFree" type="checkbox"/>
            <label htmlFor="free-toggle" className="toggle-labelFree"></label>
        </div>
       </div>
          <label className="block font-semibold">Regular</label>
          <div className="flex items-center gap-10">
            <p className="px-3 py-2 rounded bg-gray-200 text-black w-[150px]">
              {formData.regularEnabled ? `₦${formData.regular}` : "Not available"}
            </p>
             <div className="toggle-containerRegular">
            <input checked={true} id="regular-toggle" className="toggle-inputRegular" type="checkbox"/>
            <label htmlFor="regular-toggle" className="toggle-labelRegular"></label>
        </div>
          </div>

          <label className="block font-semibold">VIP</label>
          <div className="flex items-center gap-10">
            <p className="px-3 py-2 rounded bg-gray-200 text-black w-[150px]">
              {formData.vipEnabled ? `₦${formData.vip}` : "Not available"}
            </p>
             <div className="toggle-containerVIP">
            <input checked={true} id="VIP-toggle" className="toggle-inputVIP" type="checkbox"/>
            <label htmlFor="VIP-toggle" className="toggle-labelVIP"></label>
        </div>
          </div>
        </>
      )}

       <div className="flex gap-25 py-5">
               <motion.button
               whileHover={{
                scale: 1.1,
                transition: { type: "spring", stiffness: 300, damping: 10 },
            }}
            whileTap={{
                scale: 0.9,
                transition: { type: "spring", stiffness: 500, damping: 20 },
            }}
            onClick={onEdit}
            type="button"
            className="w-[100px] font-bold border-2 rounded-md py-2 px-2 h-[50px] hover:bg-purple-5hover:border-0 hover:text-white">Edit</motion.button>
                <Button
                content={isLoading ? "Creating Event..." : "Create Event"}
                  type="submit"
                  className="w-[120px]"
                />
        </div>
    </motion.form>
  );
}