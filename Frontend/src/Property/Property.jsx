import React, { useState } from "react";
import PropertyManager from "./Propertymanager";
import PropertyUser from "./propertyuser";

const Property = () => {
  const [activePage, setActivePage] = useState("manager");
  const [properties, setProperties] = useState([]); // Store properties here

  return (
    <div className="min-h-screen bg-gray-100 w-full flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-900 text-white p-4 flex justify-center shadow-lg fixed top-0 w-full z-10">
        <button
          className={`px-6 py-2 mx-2 rounded-lg transition-all duration-300 ${
            activePage === "manager"
              ? "bg-blue-700 scale-105"
              : "bg-blue-500 hover:bg-blue-600 hover:scale-105"
          }`}
          onClick={() => setActivePage("manager")}
        >
          Property Manager
        </button>
        <button
          className={`px-6 py-2 mx-2 rounded-lg transition-all duration-300 ${
            activePage === "user"
              ? "bg-blue-700 scale-105"
              : "bg-blue-500 hover:bg-blue-600 hover:scale-105"
          }`}
          onClick={() => setActivePage("user")}
        >
          Property User
        </button>
      </nav>

      {/* Page Content */}
      <div className="p-5 w-full flex justify-center items-center mt-16">
        {activePage === "manager" ? (
          <PropertyManager properties={properties} setProperties={setProperties} />
        ) : (
          <PropertyUser properties={properties} />
        )}
      </div>
    </div>
  );
};

export default Property;

