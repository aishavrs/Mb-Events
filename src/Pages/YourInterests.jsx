import React from 'react'

export default function YourInterests() {
  const categories = [
    "Professional",
    "Sports",
    "Party",
    "Concert",
    "Education",
    "Religion",
    "Games",
    "Dance",
    "Cultural Activities",
    "Career",
    "Picnic",
    "Excursions",
    "Food & Drinks",
    "Exposition",
    "Beach",
    "Night",
    "Costume",
    "Anime"
  ];

  return (
    <div className='flex flex-col justify-center md:h-screen gap-[25px] md:gap-[28px] p-7 md:px-[5%]'>
      <div className=''>
        <h1 className='font-medium lg:font-bold text-[30px] md:text-[34px]'>Your Interests</h1>
        <p className=' md:font-medium text-[15px] md:text-[20px] md:w-[68%]'>To enhance your feed and tailor it to your preferences, select at least <span className='text-[#9747FF]'>5</span> areas of interest that resonate with you.
        </p>
      </div>

      <div className='flex flex-wrap gap-3'>
        {categories.map((category, index) => (
          <button key={index} className="border border-gray-500 px-3 md:px-6 py-2 rounded md:text-[16px] cursor-pointer">
            {category}
          </button>
        ))}
      </div>

      <div>
        <button className='bg-[#9747FF] text-white px-[36px] py-[12px] rounded-[4px]  md:w-[30%] md:mt-[10%]'>
          Continue
        </button>
      </div>
    </div>
  )
}
