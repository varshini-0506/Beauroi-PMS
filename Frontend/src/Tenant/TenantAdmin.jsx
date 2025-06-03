import {UserPlus, FileText, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import TenantList from "../Dashboard/Teanantlist";

const TenantAdmin = () => {
  const actions = [
    {
      title: "Tenant Boarding",
      description: "Add a new tenant and assign property.",
      icon: <UserPlus className="h-6 w-6" />,
      link:"/user/tenantBoarding"
    },
     {
      title: "Active Leases",
      description: "See all currently active leases.",
      icon: <FileText className="h-6 w-6" />,
      link: "/user/adminlease", 
    },
    {
      title: "Expiring Soon",
      description: "Check leases that will end soon.",
      icon: <Clock className="h-6 w-6" />,
      onClick: () => console.log("Navigate to expiring leases")
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] to-[#F3F4F6] p-8 ml-[250px]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-[#374151] mb-2">Admin Tenant Dashboard</h1>
            <p className="text-[#6B7280]">Manage your tenants and properties efficiently</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-sm text-[#374151]">Total Tenants</p>
            <p className="text-2xl font-bold text-[#4F46E5]">24</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {actions.map((action, index) => (
            <Link key={index} to={action.link} className="transform hover:scale-105 transition-transform duration-300">
              <div
                onClick={action.onClick}
                className="relative cursor-pointer bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#E0E7FF] group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E0E7FF] rounded-full -mr-16 -mt-16 opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-[#E0E7FF] p-3 rounded-xl group-hover:bg-[#4F46E5] transition-colors duration-300">
                      {action.icon}
                    </div>
                    <ChevronRight className="h-5 w-5 text-[#6B7280] group-hover:text-[#4F46E5] transition-colors duration-300" />
                  </div>
                  
                  <h2 className="text-xl font-semibold text-[#374151] mb-2 group-hover:text-[#4F46E5] transition-colors duration-300">
                    {action.title}
                  </h2>
                  <p className="text-sm text-[#6B7280] group-hover:text-[#374151] transition-colors duration-300">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-[#374151]">Tenant List</h2>
            <div className="flex space-x-2">
              <button className="px-4 py-2 text-sm font-medium text-[#4F46E5] bg-[#E0E7FF] rounded-lg hover:bg-[#4F46E5] hover:text-white transition-colors duration-300">
                Export
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-[#4F46E5] rounded-lg hover:bg-[#6366F1] transition-colors duration-300">
                Add New
              </button>
            </div>
          </div>
          <TenantList/>
        </div>
      </div>
    </div>
  );
};

export default TenantAdmin;