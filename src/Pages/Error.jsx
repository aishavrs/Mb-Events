import React from 'react'
import Header from '../Components/Header'
import Error404 from '../assets/Error404.png'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <div>
        <Header/>
        <section className='flex flex-col justify-center items-center gap-2'>
            <img src={Error404} alt="" className='w-md' />
            <h1 className='font-bold text-2xl'>Oh snap! This is awkward.</h1>
            <p className='font-medium text-lg'>This page you're looking for doesn't exist.</p>
            <p className='font-medium text-md'>Go to <Link to="/" className='underline text-purple-500'>Homepage</Link></p>
        </section>
    </div>
  )
}
