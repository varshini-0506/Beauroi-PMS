import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaCity,
  FaBuilding,
  FaComments,
  FaInfoCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const DashboardSidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-64 bg-[#1F2937] text-white min-h-screen p-6 shadow-xl border-r border-[#4F46E5]"
    >
      <h2 className="text-2xl font-bold mb-8 tracking-wide text-center text-[#E0E7FF]">
        Admin Panel
      </h2>

      <ul className="space-y-3">
        <li>
          <Link
            to="/user/dashboard"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#4F46E5] hover:text-white transition duration-200"
          >
            <FaTachometerAlt className="text-[#E0E7FF]" />
            <span>Dashboard</span>
          </Link>
        </li>

        <li>
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#4F46E5] hover:text-white cursor-pointer transition duration-200"
          >
            <FaUsers className="text-[#E0E7FF]" />
            <span>All Users</span>
            <span className="ml-auto text-sm">
              {isDropdownOpen ? "▲" : "▼"}
            </span>
          </div>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="ml-6 mt-2 space-y-2 text-sm overflow-hidden"
              >
                <li>
                  <Link
                    to="/user/tenantAdmin"
                    className="block px-3 py-1 rounded hover:bg-[#4F46E5] hover:text-white transition"
                  >
                    Tenant
                  </Link>
                </li>
                <li>
                  <Link
                    to="/user/propertymanager"
                    className="block px-3 py-1 rounded hover:bg-[#4F46E5] hover:text-white transition"
                  >
                    Property Manager
                  </Link>
                </li>
                <li>
                  <Link
                    to="/user/accountantlist"
                    className="block px-3 py-1 rounded hover:bg-[#4F46E5] hover:text-white transition"
                  >
                    Accountant
                  </Link>
                </li>
                <li>
                  <Link
                    to="/user/maintainencelist"
                    className="block px-3 py-1 rounded hover:bg-[#4F46E5] hover:text-white transition"
                  >
                    Maintenance
                  </Link>
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </li>

        <li>
          <Link
            to="#"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#4F46E5] hover:text-white transition duration-200"
          >
            <FaCity className="text-[#E0E7FF]" />
            <span>State & City</span>
          </Link>
        </li>

        <li>
          <Link
            to="#"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#4F46E5] hover:text-white transition duration-200"
          >
            <FaBuilding className="text-[#E0E7FF]" />
            <span>Property</span>
          </Link>
        </li>

        <li>
          <Link
            to="#"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#4F46E5] hover:text-white transition duration-200"
          >
            <FaComments className="text-[#E0E7FF]" />
            <span>Contact & Feedback</span>
          </Link>
        </li>

        <li>
          <Link
            to="#"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#4F46E5] hover:text-white transition duration-200"
          >
            <FaInfoCircle className="text-[#E0E7FF]" />
            <span>About Page</span>
          </Link>
        </li>
      </ul>
    </motion.div>
  );
};

export default DashboardSidebar;
