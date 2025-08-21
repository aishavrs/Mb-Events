import React from 'react'
import AuthLayout from '../Layouts/AuthLayout'
import signUpImage from '../assets/sign-up-image.png'
import MbEventLogo from '../assets/mb-event-logo.png'
import { Link } from 'react-router-dom'


export default function SignInPage() {
  return (
    <div>
        <AuthLayout image={signUpImage}>
            <div  className='flex flex-col gap-[15px] lg:gap-[28px]'>
              <div className='flex flex-col lg:justify-center items-center'>
                  <img src={MbEventLogo} alt="" className='mt-5 lg:mt-0'/>
              </div>
                  <div className='flex flex-col px-6 lg:px-17 gap-[2px] lg:gap-[5px]'>
                    <div className=''>
                      <h1 className='text-[28px] lg:text-[32px] font-semibold lg:font-bold'>Create Account</h1>
                      <p className='text-[15px] lg:text-[20px] font-medium lg:font-semibold'>Let’s get you started so you can start joining and creating events</p>
                    </div>
                    <form className='flex flex-col gap-[12px] lg:gap-[15px] mt-5 lg:mt-4'>
                        <label htmlFor="email"></label>
                        <input type="text"
                        placeholder='Email'
                        className='h-[44px]  px-[10px] border-1 border-[#CDC7C7] rounded-[6px]'/>
                        <label htmlFor="fullName"></label>
                        <input type="text"
                        placeholder='Fullname'
                        className='h-[44px]  px-[10px] border-1 border-[#CDC7C7] rounded-[6px]'
                        />
                        <label htmlFor="password"></label>
                        <input type="text"
                        placeholder='Password'
                        className='h-[44px]  px-[10px] border-1 border-[#CDC7C7] rounded-[6px]'
                        />
                        <label htmlFor="confirmPassword"></label>
                        <input type="text"
                        placeholder='Confirm Password'
                        className='h-[44px] px-[10px] border-1 border-[#CDC7C7] rounded-[6px]'
                        />
                        <div className='flex gap-2'>
                          <input type="checkbox" />
                          <label htmlFor="agreeTerms" className='text-[13px]'>I agree to the <a href="#">terms</a> & <a href="#">conditions</a></label>
                        </div>
                    </form>
              
                       <div className='flex flex-col gap-[20px] mt-5 lg:mt-10'>
                         <button className='rounded-[4px] py-[12px] px-[36px] bg-[#9747FF] text-white'>Sign Up</button>
                         <p className='lg:text-[20px]'>Already have an account?<Link to="/sign-in" className='font-extrabold text-[#9747FF]'> Sign In</Link></p>
                       </div>
                  </div>
            </div>

        </AuthLayout>
    </div>
  )
}
