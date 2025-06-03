import {UserPlus,FileText, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import TenantList from "../Dashboard/Teanantlist";

const TenantAdmin = () => {
  const actions = [
    {
      title: "Tenant Boarding",
      description: "Add a new tenant and assign property.",
      icon: <UserPlus className="h-6 w-6 text-green-600" />,
      //onClick: () => console.log("Navigate to onboard form"),
      link:"/user/tenantBoarding"
    },
    {
      title: "Active Leases",
      description: "See all currently active leases.",
      icon: <FileText className="h-6 w-6 text-blue-600" />,
      onClick: () => console.log("Navigate to active leases")
    },
    {
      title: "Expiring Soon",
      description: "Check leases that will end soon.",
      icon: <Clock className="h-6 w-6 text-yellow-500" />,
      onClick: () => console.log("Navigate to expiring leases")
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Tenant Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {actions.map((action, index) => (
            <Link key={index} to={action.link}>
          <div
            onClick={action.onClick}
            className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-md transition"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-gray-100 p-3 rounded-full">
                {action.icon}
              </div>
              <h2 className="text-lg font-semibold text-gray-700">{action.title}</h2>
            </div>
            <p className="text-sm text-gray-500">{action.description}</p>
          </div>
          </Link>
        ))}
      </div>
      <TenantList/>
    </div>
  );
};

export default TenantAdmin;
