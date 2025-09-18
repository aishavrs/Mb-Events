import React, {useContext} from 'react';
import heroSectionImage from '../assets/hero-section.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

export default function HeroSection() {
  const {user} = useContext(AuthContext)
  return (
    <section
      className="w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${heroSectionImage})` }}
    >
      <div className="max-w-7xl mx-auto flex items-center px-6 sm:px-12 md:px-16 lg:px-24 py-32 sm:py-40 lg:py-52">
        <div className="flex flex-col items-start justify-start gap-3 max-w-lg">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
            Discover Unforgettable Experiences With Ease
          </h1>

          <p className="text-base sm:text-md md:text-lg lg:text-xl text-white leading-relaxed">
            Find, book, and manage tickets for concerts, workshops, and social
            gatherings with ease. Create events, connect with your audience, and
            start making lasting memories today!
          </p>

          {user ? (
            <Link
              to="/createevent"
              className="bg-[#9747FF] text-white rounded-md px-8 py-3 sm:px-10 sm:py-4 md:px-12 md:py-4 text-center text-base sm:text-md md:text-lg hover:bg-purple-700 transition flex items-center justify-center"
            >
              Create Event
            </Link>
          ) : (
            <Link
              to="/sign-up"
              className="bg-[#9747FF] text-white rounded-md px-8 py-3 sm:px-10 sm:py-4 md:px-12 md:py-4 text-center text-base sm:text-md md:text-lg hover:bg-purple-700 transition flex items-center justify-center"
            >
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
