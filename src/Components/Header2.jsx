import React from 'react'
import mbLogo from '../assets/mb-event-logo.png'

export default function Header2() {
  return (
    <header className=' flex justify-between items-center px-[101px] py-[20px]'>
        <img src={mbLogo} alt="" className='w-[143px] h-[58px]' />

        <ul className='flex gap-[26px] font-medium text-[20px]'>
            <a href="">
                <li className=' hover:underline hover:text-[#9747FF]'>Home</li>
            </a>
            <a href="">
                <li className=' hover:underline hover:text-[#9747FF]'>Events</li>
            </a>
            <a href="">
                <li className=' hover:underline hover:text-[#9747FF]'>Create Events</li>
            </a>
        </ul>

        <div className='flex gap-[10px]'>
            <h1 className='w-[65px] h-[60px] rounded-full border border-[#9747FF] bg-[#D9D9D9] text-[38.41px] font-bold text-center'>JD</h1>
            <select name="" id="">
                <option value="">Your Events</option>
                <option value="">Profile</option>
                <option value="">Settings</option>
                <option value="">Help</option>
                <option value="">Logout</option>
            </select>
        </div>
    </header>
  )
}
