import { useState } from "react";
import { FaFilePdf, FaImage, FaCalendarAlt } from "react-icons/fa";

const LeaseForm = ({ addLease }) => {
  const [open, setOpen] = useState(false);
  const [tenantName, setTenantName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [agreement, setAgreement] = useState(null);
  const [propertyImage, setPropertyImage] = useState(null);

  const handleAdd = async () => {
    if (!tenantName || !startDate || !endDate || !propertyAddress || !agreement || !propertyImage) {
      alert("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("tenantName", tenantName);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("propertyAddress", propertyAddress);
    formData.append("agreement", agreement);
    formData.append("propertyImage", propertyImage);

    try {
      const response = await fetch("http://localhost:5000/leases", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        addLease(data.lease);
        alert("Lease added successfully!");
        
        // Reset form fields
        setTenantName("");
        setStartDate("");
        setEndDate("");
        setPropertyAddress("");
        setAgreement(null);
        setPropertyImage(null);
        setOpen(false);
      } else {
        alert("Failed to add lease.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding lease.");
    }
  };

  const handleFileChange = (e, setter, allowedTypes) => {
    const file = e.target.files[0];
    if (file && allowedTypes.includes(file.type)) {
      setter(file);
    } else {
      alert(`Invalid file type. Allowed types: ${allowedTypes.join(", ")}`);
    }
  };

  return (
    <div className="text-center">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        onClick={() => setOpen(true)}
      >
        Add Lease
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-11/12 max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add Lease</h2>

            {/* Tenant Name */}
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Tenant Name"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={tenantName}
                onChange={(e) => setTenantName(e.target.value)}
              />
            </div>

            {/* Lease Start Date */}
            <div className="relative mb-3">
              <FaCalendarAlt className="absolute left-3 top-4 text-gray-500" />
              <input
                type="date"
                className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            {/* Lease End Date */}
            <div className="relative mb-3">
              <FaCalendarAlt className="absolute left-3 top-4 text-gray-500" />
              <input
                type="date"
                className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Property Address"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={propertyAddress}
                onChange={(e) => setPropertyAddress(e.target.value)}
              />
            </div>

            {/* Lease Agreement Upload (PDF) */}
            <div className="relative mb-3">
              <FaFilePdf className="absolute left-3 top-4 text-red-500" />
              <input
                type="text"
                placeholder={agreement ? agreement.name : "Upload Lease Agreement (PDF)"}
                className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                readOnly
                onClick={() => document.getElementById("pdfUpload").click()}
              />
              <input
                type="file"
                id="pdfUpload"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => handleFileChange(e, setAgreement, ["application/pdf"])}
              />
            </div>

            {/* Property Image Upload (JPG/PNG) */}
            <div className="relative mb-3">
              <FaImage className="absolute left-3 top-4 text-blue-500" />
              <input
                type="text"
                placeholder={propertyImage ? propertyImage.name : "Upload Property Image (JPG/PNG)"}
                className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                readOnly
                onClick={() => document.getElementById("imageUpload").click()}
              />
              <input
                type="file"
                id="imageUpload"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={(e) => handleFileChange(e, setPropertyImage, ["image/png", "image/jpeg"])}
              />
            </div>

            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-2 border border-gray-500 text-gray-700 rounded-lg hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={handleAdd}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaseForm;
