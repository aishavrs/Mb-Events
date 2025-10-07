import React from "react";
import AppLayout from "../Layouts/AppLayout";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="space-y-12 py-8 page-container"
      >
        <h1 className="text-5xl font-bold text-center text-purple-600">
          About MB Events
        </h1>

        {/* Mission Section */}
        <section className="flex flex-col lg:flex-row items-center gap-8">
          <img
            src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=600&q=80"
            alt="Event planning"
            className="w-full lg:w-1/2 h-72 object-cover rounded-lg shadow-lg"
          />
          <div className="lg:w-1/2 space-y-4">
            <h2 className="text-3xl font-semibold text-purple-600">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              At MB Events, we are passionate about creating unforgettable moments. 
              From concerts and parties to educational and religious gatherings, 
              we ensure every event is seamless, enjoyable, and memorable. 
              Our platform empowers hosts and attendees alike to connect, engage, and celebrate life’s special moments.
            </p>
          </div>
        </section>

        {/* Vision Section */}
        <section className="flex flex-col-reverse lg:flex-row items-center gap-8">
          <div className="lg:w-1/2 space-y-4">
            <h2 className="text-3xl font-semibold text-purple-600">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              We envision a world where creating and attending events is effortless. 
              Our vision is to build a vibrant community where people can share experiences, discover new connections, 
              and enjoy life to the fullest — all while having a platform that makes every step easy and intuitive.
            </p>
          </div>
          <img
            src="https://i.pinimg.com/1200x/a8/5a/ff/a85aff5fee93e8605fe7079a47b9603a.jpg"
            alt="Community gathering"
            className="w-full lg:w-1/2 h-72 object-cover rounded-lg shadow-lg"
          />
        </section>

        {/* Team Section */}
        <section className="text-center space-y-6">
          <h2 className="text-3xl font-semibold text-purple-600">Meet Our Team</h2>
          <p className="text-gray-700 leading-relaxed text-lg max-w-2xl mx-auto">
            Behind MB Events is a passionate team of creators, innovators, and event enthusiasts. 
            We value creativity, inclusivity, and excellence in everything we do. 
            Every feature and service we build is crafted with love and attention to detail.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-6">
            {/* Example Team Members */}
            <div className="w-40">
              <img
                src="https://i.pinimg.com/736x/3d/a3/eb/3da3eb8c2ed500f6c0ab6c2ef490c697.jpg"
                alt="Team Member"
                className="w-40 h-40 object-cover rounded-full shadow-md"
              />
              <p className="mt-2 font-semibold">Aisha</p>
              <p className="text-gray-500 text-sm">CEO</p>
            </div>
            <div className="w-40">
              <img
                src="https://randomuser.me/api/portraits/men/46.jpg"
                alt="Team Member"
                className="w-40 h-40 object-cover rounded-full shadow-md"
              />
              <p className="mt-2 font-semibold">Abiola</p>
              <p className="text-gray-500 text-sm">Community Manager</p>
            </div>
            <div className="w-40">
              <img
                src="https://i.pinimg.com/736x/77/fd/aa/77fdaac4afd5e8da46936e9490fdad06.jpg"
                alt="Team Member"
                className="w-40 h-40 object-cover rounded-full shadow-md"
              />
              <p className="mt-2 font-semibold">Mide</p>
              <p className="text-gray-500 text-sm">CTO</p>
            </div>
            <div className="w-40">
              <img
                src="https://randomuser.me/api/portraits/women/48.jpg"
                alt="Team Member"
                className="w-40 h-40 object-cover rounded-full shadow-md"
              />
              <p className="mt-2 font-semibold">Tobi</p>
              <p className="text-gray-500 text-sm">Designer</p>
            </div>
          </div>
        </section>

        {/* Closing Statement */}
        <section className="text-center space-y-3">
          <h2 className="text-3xl font-semibold text-purple-600">Join Us</h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Whether you’re planning your first event or your hundredth, MB Events is here to make it extraordinary. 
            Let’s create memories together, one event at a time.
          </p>
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
            alt="Celebration"
            className="w-full max-w-4xl mx-auto rounded-lg shadow-lg mt-4"
          />
        </section>
      </motion.div>
    </AppLayout>
  );
}
