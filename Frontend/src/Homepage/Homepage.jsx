import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiHome, FiUsers, FiDollarSign } from "react-icons/fi";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // For parallax effect on hero background
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.25 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, rotate: -2 },
    show: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="flex flex-col items-center w-full font-sans scroll-smooth">
      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="fixed top-0 w-full bg-blue-800 text-white flex justify-between items-center px-8 py-4 z-50 shadow-md"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold tracking-wide"
        >
          Property Management System
        </motion.div>
        <div className="flex gap-6 text-sm">
          {["About Us", "Contact"].map((text, i) => (
            <motion.a
              key={i}
              href={`#${text.toLowerCase().replace(" ", "")}`}
              className="relative overflow-hidden px-1 hover:text-yellow-400 transition-colors"
              whileHover={{ color: "#FACC15" }} // Tailwind yellow-400 hex
            >
              <motion.span
                className="absolute left-0 bottom-0 w-full h-[2px] bg-yellow-400 origin-left scale-x-0"
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
              {text}
            </motion.a>
          ))}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 10px white" }}
            className="bg-white text-blue-800 px-4 py-2 rounded-md transition"
          >
            Login
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 12px 2px #FACC15",
              backgroundColor: "#FACC15",
              color: "#000",
            }}
            className="bg-yellow-400 text-black px-4 py-2 rounded-md transition"
            onClick={() => navigate("/signin")}
          >
            Sign Up
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section with parallax background */}
      <section
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg')",
          backgroundPositionY: offsetY * 0.5 + "px", // parallax effect
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <motion.div
          className="relative z-10 max-w-2xl text-center px-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.h1
            className="text-5xl font-extrabold mb-6 leading-tight relative inline-block"
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Effortless Property Management
            <motion.div
              className="absolute left-0 bottom-0 h-1 bg-yellow-400"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.7, delay: 1 }}
            />
          </motion.h1>

          <motion.p
            className="text-lg mb-8 text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Manage your properties, tenants, and payments seamlessly. Stay organized and maximize your rental income with ease.
          </motion.p>
          <motion.button
            whileHover={{
              scale: 1.07,
              boxShadow: "0 0 20px 4px #FACC15",
              backgroundColor: "#EAB308", // dark yellow
            }}
            className="bg-yellow-400 text-black px-8 py-3 rounded-md text-lg font-medium hover:brightness-90 transition"
            onClick={() => navigate("/maintenanceManagement")}
          >
            Explore More
          </motion.button>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="bg-gray-100 w-full py-20 px-6 text-center">
        <motion.h1
          className="text-4xl font-bold text-gray-800 mb-14 relative inline-block"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Efficiently Manage Your Properties
          <motion.div
            className="absolute left-0 bottom-0 h-1 bg-yellow-400"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          />
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {[{
            icon: FiHome,
            title: "Property Management",
            desc: "Manage all your properties in one place, including details, photos, and amenities.",
            color: "text-blue-500"
          }, {
            icon: FiUsers,
            title: "Tenant Management",
            desc: "Handle tenant onboarding, profiles, lease agreements, and communication.",
            color: "text-green-500"
          }, {
            icon: FiDollarSign,
            title: "Payments & Billing",
            desc: "Automate rent collection, track expenses, and generate invoices effortlessly.",
            color: "text-yellow-500"
          }].map(({ icon: Icon, title, desc, color }, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow relative cursor-default"
              whileHover={{ scale: 1.05, rotate: 1 }}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1, 1.1] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: i * 0.5 }}
                className={`mb-4 ${color} text-5xl`}
              >
                <Icon />
              </motion.div>
              <h2 className="text-2xl font-semibold mb-3">{title}</h2>
              <p className="text-gray-600">{desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {!user ? (
            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 20px 5px #2563EB", // blue glow
                textShadow: "0 0 8px white",
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
            >
              Get Started
            </motion.button>
          ) : (
            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 15px 4px #374151", // gray glow
                textShadow: "0 0 8px white",
              }}
              className="bg-gray-800 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-700 transition"
            >
              Go to Dashboard
            </motion.button>
          )}
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        className="w-full bg-gray-800 text-white text-sm text-center py-5"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        &copy; 2025 Property Management System. All Rights Reserved.
      </motion.footer>
    </div>
  );
}