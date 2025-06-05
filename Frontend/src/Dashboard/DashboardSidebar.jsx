import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUsers,
  FaCity,
  FaBuilding,
  FaComments,
  FaInfoCircle,
  FaChartPie,
} from 'react-icons/fa';
import { LogOut } from 'lucide-react';

const DashboardSidebar = () => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-[#FAFAFA] border-r border-[#E0E7FF] text-[#374151] shadow-md z-50">
      {/* Sidebar Header */}
      <div className="flex items-center justify-center h-20 bg-[#4F46E5] text-white">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>

      {/* Sidebar Menu */}
      <nav className="mt-4">
        <ul>
          <li>
            <Link
              to="/user/dashboard"
              className={`flex items-center px-6 py-3 transition-colors duration-200 rounded-r-full ${
                isActive('/user/dashboard') ? 'bg-[#E0E7FF] text-[#4F46E5]' : 'text-[#374151] hover:bg-[#F3F4F6]'
              }`}
            >
              <span className={`mr-3 ${isActive('/user/dashboard') ? 'text-[#4F46E5]' : 'text-[#6366F1]'}`}>
                <FaTachometerAlt />
              </span>
              <span className="font-medium">Dashboard</span>
            </Link>
          </li>

          <li>
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center px-6 py-3 transition-colors duration-200 rounded-r-full cursor-pointer ${
                location.pathname.includes('/user/tenantAdmin') ||
                location.pathname.includes('/user/propertymanager') ||
                location.pathname.includes('/user/accountantlist') ||
                location.pathname.includes('/user/maintainencelist')
                  ? 'bg-[#E0E7FF] text-[#4F46E5]'
                  : 'text-[#374151] hover:bg-[#F3F4F6]'
              }`}
            >
              <span className="mr-3 text-[#6366F1]">
                <FaUsers />
              </span>
              <span className="font-medium">All Users</span>
              <span className="ml-auto text-xs">{isDropdownOpen ? '▲' : '▼'}</span>
            </div>
            {isDropdownOpen && (
              <ul className="ml-10 mt-2 space-y-1 text-sm">
                {[
                  { name: 'Tenant', path: '/user/tenantAdmin' },
                  { name: 'Property Manager', path: '/user/propertymanager' },
                  { name: 'Accountant', path: '/user/accountantlist' },
                  { name: 'Maintenance', path: '/user/maintainencelist' },
                ].map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`block px-3 py-1 rounded hover:bg-[#E0E7FF] hover:text-[#4F46E5] ${
                        isActive(subItem.path) ? 'text-[#4F46E5] font-medium' : ''
                      }`}
                    >
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li>
            <Link
              to="/user/propertymanager"
              className="flex items-center px-6 py-3 transition-colors duration-200 rounded-r-full text-[#374151] hover:bg-[#F3F4F6]"
            >
              <span className="mr-3 text-[#6366F1]">
                <FaBuilding />
              </span>
              <span className="font-medium">Property</span>
            </Link>
          </li>
          <li>
            <Link
              to="/user/adminreport"
              className="flex items-center px-6 py-3 transition-colors duration-200 rounded-r-full text-[#374151] hover:bg-[#F3F4F6]"
            >
              <span className="mr-3 text-[#6366F1]">
                <FaChartPie />
              </span>
              <span className="font-medium">Reports & Analytics</span>
            </Link>
          </li>
          <li className="mt-6">
            <Link
              to="/signin"
              className="flex items-center px-6 py-3 transition-colors duration-200 rounded-r-full text-[#374151] hover:bg-[#F3F4F6]"
            >
              <span className="mr-3 text-[#6366F1]">
                <LogOut size={20} />
              </span>
              <span className="font-medium">Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DashboardSidebar;