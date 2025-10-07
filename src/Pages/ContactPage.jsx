import React, { useState } from "react";
import AppLayout from "../Layouts/AppLayout";
import { motion } from "framer-motion";
import Button from "../Components/Button";
import { toast } from "react-toastify";
import { MdEmail, MdPhone, MdLocationOn, MdAccessTime } from "react-icons/md";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      return toast.error("Please fill in all fields");
    }
    console.log("Contact form submitted:", formData);
    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="page-container  py-10"
      >
        {/* Hero Section */}
        <div className="relative w-full h-80 rounded-xl overflow-hidden mb-16 ">
          <img
            src="https://i.pinimg.com/1200x/74/ab/57/74ab57050711c52ad1840e1f5136f328.jpg"
            alt="Events Banner"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for dimming */}
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-5">
            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-extrabold text-white drop-shadow-lg"
            >
              Let’s Connect
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-4 text-lg text-white max-w-xl"
            >
              We’re here to listen, support, and help you create amazing events. 
              Whether you have a question, idea, or just want to say hello, reach out and let’s make magic happen together!
            </motion.p>
          </div>
        </div>

        {/* Form + Info Cards */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 bg-white shadow-2xl rounded-xl p-10"
          >
            <h2 className="text-3xl font-bold text-purple-600 mb-6">Send Us a Message</h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none h-40 resize-none"
              />
              <Button
                type="submit"
                content="Send Message"
                className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition"
              />
            </form>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 grid grid-cols-2 gap-6"
          >
            <a
              href="mailto:support@mbevents.com"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl shadow-xl flex flex-col items-center justify-center hover:scale-105 transition-transform"
            >
              <MdEmail size={40} />
              <h3 className="font-bold text-xl mt-2">Email</h3>
              <p className="mt-1">support@mbevents.com</p>
            </a>

            <a
              href="tel:+2348001234567"
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-6 rounded-xl shadow-xl flex flex-col items-center justify-center hover:scale-105 transition-transform"
            >
              <MdPhone size={40} />
              <h3 className="font-bold text-xl mt-2">Phone</h3>
              <p className="mt-1">+234 800 123 4567</p>
            </a>

            <a
              href="https://www.google.com/maps/search/?api=1&query=123+Event+Street,+Lagos,+Nigeria"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl shadow-xl flex flex-col items-center justify-center hover:scale-105 transition-transform"
            >
              <MdLocationOn size={40} />
              <h3 className="font-bold text-xl mt-2">Address</h3>
              <p className="mt-1">123 Event Street, Lagos, Nigeria</p>
            </a>

            <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-6 rounded-xl shadow-xl flex flex-col items-center justify-center hover:scale-105 transition-transform">
              <MdAccessTime size={40} />
              <h3 className="font-bold text-xl mt-2">Working Hours</h3>
              <p className="mt-1">Mon - Fri, 9am - 6pm</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AppLayout>
  );
}
