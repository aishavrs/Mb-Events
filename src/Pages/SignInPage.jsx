import React from 'react'
import AuthLayout from '../Layouts/AuthLayout'
import signInImage from '../assets/sign-in-image.png'
import MbEventLogo from '../assets/mb-event-logo.png'
import { Link } from 'react-router-dom'

export default function SignInPage() {
  return (
    <div>
            <AuthLayout image={signInImage}>
                <div  className='flex flex-col gap-[15px] lg:gap-[28px] lg:mt-[25%]'>
                  <div className='flex flex-col lg:justify-center items-center'>
                      <img src={MbEventLogo} alt="" className='mt-5 lg:mt-0'/>
                  </div>
                      <div className='flex flex-col px-6 lg:px-17 gap-[2px] lg:gap-[5px]'>
                        <div className=''>
                          <h1 className='text-[28px] lg:text-[32px] font-medium lg:font-bold'>Welcome Back</h1>
                          <p className='text-[15px] lg:text-[20px] font-normal lg:font-medium'>Sign In To Your Account</p>
                        </div>
                        <form className='flex flex-col gap-[12px] lg:gap-[15px] mt-5 lg:mt-4'>
                            <label htmlFor="email"></label>
                            <input type="text"
                            placeholder='Email'
                            className='h-[44px]  px-[10px] border-1 border-[#CDC7C7] rounded-[6px]'/>
                            
                            <label htmlFor="password"></label>
                            <input type="text"
                            placeholder='Password'
                            className='h-[44px]  px-[10px] border-1 border-[#CDC7C7] rounded-[6px]'
                            />
                           
                        
                        </form>
                  
                           <div className='flex flex-col gap-[20px] mt-5 lg:mt-10'>
                             <button className='rounded-[4px] py-[12px] px-[36px] bg-[#9747FF] text-white'>Sign In</button>
                             <p className='lg:text-[20px]'>Don't have an account?<Link to="/sign-up" className='font-extrabold text-[#9747FF]'> Sign Up</Link></p>
                           </div>
                      </div>
                </div>
    
            </AuthLayout>
        </div>
  )
}
