import { FaUsers, FaUserTie, FaUser, FaHome, FaBuilding, FaHotel } from "react-icons/fa";

const Dashboard = () => {
  const stats = [
    { icon: <FaUsers className="text-blue-500 text-5xl" />, label: "Tenants", value: 4 },
    { icon: <FaUserTie className="text-green-500 text-5xl" />, label: "Property Managers", value: 3 },
    { icon: <FaUser className="text-red-500 text-5xl" />, label: "Accountants", value: 1 },
    { icon: <FaHome className="text-blue-500 text-5xl" />, label: "Properties", value: 6 },
    { icon: <FaBuilding className="text-gray-500 text-5xl" />, label: "No. of Buildings", value: 0 },
    { icon: <FaHotel className="text-yellow-500 text-5xl" />, label: "No. of Apartments", value: 2 },
  ];

  return (
    <div className="flex h-screen bg-gray-100 w-full p-6 ml-[250px]">
      {/* Main Content */}
      <div className="flex-1">
        <h1 className="text-4xl font-bold mb-6">Welcome Admin!</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full">
          {stats.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg flex items-center w-full">
              <div className="mr-6">{item.icon}</div>
              <div>
                <p className="text-2xl font-bold">{item.value}</p>
                <p className="text-gray-600 text-lg">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
