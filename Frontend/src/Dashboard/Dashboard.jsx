import React from "react";
import {
  FaUsers,
  FaUserTie,
  FaUser,
  FaHome,
  FaBuilding,
  FaHotel,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Dashboard = () => {
  const stats = [
    {
      icon: <FaUsers className="text-blue-500 text-5xl" />,
      label: "Tenants",
      value: 4,
    },
    {
      icon: <FaUserTie className="text-green-500 text-5xl" />,
      label: "Property Managers",
      value: 3,
    },
    {
      icon: <FaUser className="text-red-500 text-5xl" />,
      label: "Accountants",
      value: 1,
    },
    {
      icon: <FaHome className="text-blue-500 text-5xl" />,
      label: "Properties",
      value: 6,
    },
    {
      icon: <FaBuilding className="text-gray-500 text-5xl" />,
      label: "No. of Buildings",
      value: 0,
    },
    {
      icon: <FaHotel className="text-yellow-500 text-5xl" />,
      label: "No. of Apartments",
      value: 2,
    },
  ];

  const maintenanceData = [
    { name: "Property", requests: 4 },
    { name: "Lease", requests: 2 },
    { name: "Payment", requests: 1 },
  ];

  const pieData = [
    { name: "Tenants", value: 4 },
    { name: "Managers", value: 3 },
    { name: "Accountants", value: 1 },
  ];

  const pieColors = ["#6366F1", "#22C55E", "#F43F5E"];

  return (
    <div className="min-h-screen bg-gray-100 p-8 w-full ml-[250px]">
      <h1 className="text-4xl font-bold mb-6 text-[#4F46E5] text-center">Welcome Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-10">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md flex items-center"
          >
            <div className="mr-6">{item.icon}</div>
            <div>
              <p className="text-2xl font-bold">{item.value}</p>
              <p className="text-gray-600 text-lg">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center">Maintenance Requests Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={maintenanceData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="requests" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center">User Role Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;