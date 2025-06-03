import { useState } from "react";
import { Link } from "react-router-dom";

const DashboardSidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="w-1/7 bg-gray-800 text-white p-5 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">ADMIN</h2>
      <ul className="space-y-2">
        <li className="p-2 hover:bg-gray-700">
          <Link to="/user/dashboard">Dashboard</Link>
        </li>

        {/* Dropdown Menu for "All Users" */}
        <li
          className="p-2 hover:bg-gray-700 cursor-pointer relative"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          All Users ▼
          {isDropdownOpen && (
            <ul className="absolute left-0 mt-2 w-48 bg-gray-700 text-white shadow-lg rounded">
              <li className="p-2 hover:bg-gray-600">
                <Link to="/user/tenantAdmin">Tenant</Link>
              </li>
              <li className="p-2 hover:bg-gray-600">
                <Link to="/user/propertymanager">Property Manager</Link>
              </li>
              <li className="p-2 hover:bg-gray-600">
                <Link to="/user/accountantlist">Accountant</Link>
              </li>
              <li className="p-2 hover:bg-gray-600">
                <Link to="/user/maintainencelist">Maintenance</Link>
              </li>
            </ul>
          )}
        </li>

        <li className="p-2 hover:bg-gray-700">State & City</li>
        <li className="p-2 hover:bg-gray-700">Property</li>
        <li className="p-2 hover:bg-gray-700">Contact, Feedback</li>
        <li className="p-2 hover:bg-gray-700">About Page</li>
      </ul>
    </div>
  );
};

export default DashboardSidebar;
