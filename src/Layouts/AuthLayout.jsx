import React from 'react'

export default function AuthLayout({ children, image }) {
  return (
    <div className="container mx-auto flex justify-center h-screen">

      <div className="hidden lg:flex items-center h-full w-1/2 ">
        <img 
          src={image} 
          alt="" 
          className='objet-fit'
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center ">
        {children}
      </div>

    </div>
  )
}
