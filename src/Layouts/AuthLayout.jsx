import React from 'react'

export default function AuthLayout({ children, image }) {
  return (
    <div className="flex justify-center items-center gap-3 container mx-auto">

      <div className="hidden md:block w-1/2 lg:h-[850px] p-4">
        <img src={image} alt="" className=" w-full h-full object-cover rounded-[10px] " />
      </div>

      <div className="w-full md:w-1/2 flex flex-col ">
        {children}
      </div>
      
    </div>
  )
}
