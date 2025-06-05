import React, { useState } from "react";

const RequestForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    requestType: "",
    description: "",
    contact: "",
    location: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/maintenances", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Maintenance request submitted successfully!");
        setFormData({
          name: "",
          requestType: "",
          description: "",
          contact: "",
          location: "",
          email: "",
        });
      } else {
        alert(data.error || "Failed to submit the form.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex bg-[#FAFAFA] text-[#374151] ml-[250px]">
      {/* Layout: Image + Form */}
      <div className="md:flex flex-1">
        {/* Left: Image */}
        <div className="md:w-1/2 w-full flex items-center justify-center bg-[#E0E7FF] p-6">
          <img
            src="https://i.pinimg.com/736x/f1/7f/64/f17f64af78deac801bb7d43e35731a33.jpg"
            alt="Property"
            className="w-auto max-w-full h-auto max-h-[500px] object-contain rounded-lg shadow-lg"
          />
        </div>

        {/* Right: Form */}
        <div className="md:w-1/2 w-full bg-[#FFFFFF] p-8 shadow-xl rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#374151]">
            Property Management System
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Form Fields */}
            {["name", "contact", "location", "email"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium capitalize">
                  {field === "email" ? "Email ID" : field}
                </label>
                <input
                  type={field === "email" ? "email" : field === "contact" ? "tel" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-[#E0E7FF] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium">Request Type</label>
              <select
                name="requestType"
                value={formData.requestType}
                onChange={handleChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-[#E0E7FF] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              >
                <option value="">Select</option>
                <option value="Property">Property</option>
                <option value="Lease">Lease</option>
                <option value="Payment">Payment</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="3"
                className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-[#E0E7FF] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-[#6366F1] hover:bg-[#4F46E5] text-white px-6 py-2 rounded-md transition-all"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestForm; 