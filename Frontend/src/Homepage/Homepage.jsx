/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiHome, FiUsers, FiDollarSign } from "react-icons/fi";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";

// Same imports as before...

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col items-center w-full scroll-smooth bg-gray-50 text-gray-700">
      {/* ✅ Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 transition-all duration-300 ${
          scrolled
            ? "bg-white/70 backdrop-blur-lg shadow-sm text-gray-700"
            : "bg-transparent text-white"
        }`}
      >
        <div className="text-2xl font-bold">
          Property Management
        </div>
        <div className="flex gap-6 items-center">
          <a href="#about" className="hover:text-indigo-700 transition">About Us</a>
          <a href="#contact" className="hover:text-indigo-700 transition">Contact</a>
          <button className="border border-current px-4 py-2 rounded-lg transition hover:bg-indigo-600 hover:text-white">
            Login
          </button>
          <button
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-500"
            onClick={() => navigate("/signin")}
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* ✅ Hero Section */}
      <div
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 max-w-xl text-center text-white">
          <h1 className="text-4xl font-bold mb-4">
            Effortless Property Management
          </h1>
          <p className="text-lg mb-6">
            Manage your properties, tenants, and payments seamlessly with our
            modern solution.
          </p>
          <button
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-500"
            onClick={() => navigate("/maintenanceManagement")}
          >
            Explore More
          </button>
        </div>
      </div>

      {/* ✅ About Section */}
      <section id="about" className="text-center py-20 px-4 w-full bg-gray-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-3xl font-bold text-indigo-700 mb-12">
            Efficiently Manage Your Properties
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[{
            icon: <FiHome className="text-indigo-600 text-5xl mb-4" />,
            title: "Property Management",
            text: "Manage all your properties in one place, including details, photos, and amenities."
          }, {
            icon: <FiUsers className="text-indigo-600 text-5xl mb-4" />,
            title: "Tenant Management",
            text: "Handle tenant onboarding, profiles, lease agreements, and communication."
          }, {
            icon: <FiDollarSign className="text-indigo-600 text-5xl mb-4" />,
            title: "Payments & Billing",
            text: "Automate rent collection, track expenses, and generate invoices effortlessly."
          }].map(({ icon, title, text }, i) => (
            <div key={i} className="bg-white p-8 rounded-xl shadow hover:shadow-md transition">
              {icon}
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>
              <p className="text-sm text-gray-600">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          {!user ? (
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-500">
              Get Started
            </button>
          ) : (
            <button className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:opacity-90">
              Go to Dashboard
            </button>
          )}
        </div>
      </section>

      {/* ✅ Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center bg-indigo-100 w-full">
        <div className="bg-white p-8 rounded-2xl shadow-md flex w-full max-w-6xl flex-col md:flex-row gap-6">
          {/* Image */}
          <div className="w-full md:w-1/2">
            <img
              src="https://images.pexels.com/photos/8867436/pexels-photo-8867436.jpeg"
              alt="Support"
              className="rounded-2xl w-full h-full object-cover"
            />
          </div>

          {/* Form */}
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-3xl font-semibold mb-6 text-indigo-700">Contact Us</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-2 border-b-2 border-gray-300 focus:outline-none"
              />
              <input
                type="email"
                placeholder="E-mail"
                className="w-full p-2 border-b-2 border-gray-300 focus:outline-none"
              />
              <textarea
                placeholder="Message"
                className="w-full p-2 border-b-2 border-gray-300 focus:outline-none"
              ></textarea>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-500"
              >
                Contact Us
              </button>
            </form>

            <div className="mt-6 text-sm text-gray-600">
              <p className="font-semibold">Email</p>
              <p className="mb-3">hi@green.com</p>
              <p className="font-semibold">Locations</p>
              <p>New York, California, Ohio</p>
            </div>

            <div className="mt-6 flex space-x-4 text-indigo-600 text-xl">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTwitter /></a>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Footer */}
      <footer className="w-full bg-indigo-600 text-white text-center py-4 mt-10">
        &copy; 2025 Property Management System. All Rights Reserved.
      </footer>
    </div>
  );
}