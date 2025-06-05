import React, { useEffect, useState } from "react";

const MaintenanceList = () => {
  const [maintenances, setMaintenances] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/maintenances");
        const data = await response.json();
        setMaintenances(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-6 ml-[250px]">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <h2 className="text-4xl font-bold text-center mb-10 text-[#4F46E5] tracking-tight">
          Maintenance Requests
        </h2>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {maintenances.map((item) => (
            <div
              key={item._id}
              className="bg-[#E0E7FF] rounded-2xl shadow-sm p-6 border border-[#D1D5DB] transition-transform hover:scale-[1.02] hover:shadow-md"
            >
              <h3 className="text-xl font-semibold text-black mb-3">
                {item.name}
              </h3>
              <div className="text-sm text-black space-y-1">
                <p>
                  <span className="font-semibold text-[#6366F1]">Type:</span>{" "}
                  {item.requestType}
                </p>
                <p>
                  <span className="font-semibold text-[#6366F1]">
                    Description:
                  </span>{" "}
                  {item.description}
                </p>
                <p>
                  <span className="font-semibold text-[#6366F1]">Contact:</span>{" "}
                  {item.contact}
                </p>
                <p>
                  <span className="font-semibold text-[#6366F1]">Email:</span>{" "}
                  {item.email}
                </p>
                <p>
                  <span className="font-semibold text-[#6366F1]">Location:</span>{" "}
                  {item.location}
                </p>
                <p className="text-xs text-gray-700 pt-2">
                  Submitted: {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {maintenances.length === 0 && (
          <p className="text-center mt-10 text-gray-500 text-lg">
            No maintenance requests found.
          </p>
        )}
      </div>
    </div>
  );
};

export default MaintenanceList;