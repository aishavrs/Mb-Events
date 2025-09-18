import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

export default function ComingSoon() {


  return (
    <>
      <Header />
      <section className="flex flex-col justify-center items-center gap-6 px-4 py-20 text-center">
        <h1 className="font-bold text-3xl sm:text-4xl text-gray-800">
        This feature is coming soon!
        </h1>
        <p className="text-gray-600 max-w-md">
          We’re working hard to bring this feature to life. Drop your email and
          we’ll notify you once it’s ready.
        </p>

        <form
          className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md"
        >
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 rounded-md border border-gray-300 outline-none placeholder:text-gray-500"
          />
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-700 transition text-white px-6 py-3 rounded-md"
          >
            Notify Me
          </button>
        </form>

         <p className='font-medium text-md'>Go to <Link to="/" className='underline text-purple-500'>Homepage</Link>
         </p>
        
      </section>
    </>
  );
}
