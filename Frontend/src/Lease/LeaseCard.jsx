import { useState } from "react";
import moment from "moment";
import axios from "axios";

const LeaseCard = ({ lease, updateLease }) => {
  const [showRenew, setShowRenew] = useState(false);
  const [newEndDate, setNewEndDate] = useState("");

  const formattedStartDate = moment(lease.startDate).format("MMMM DD, YYYY");
  const formattedEndDate = moment(lease.endDate).format("MMMM DD, YYYY");

  // Handle Lease Renewal
  const handleRenewLease = async () => {
    if (!newEndDate) return;
    try {
      await axios.put(`http://localhost:5000/leases/${lease._id}`, {
        status: "renewed",
        endDate: newEndDate,
      });
      updateLease(lease._id, "renewed", newEndDate);
      setShowRenew(false);
    } catch (error) {
      console.error("Error renewing lease:", error);
    }
  };

  // Handle Lease Termination
  const handleTerminateLease = async () => {
    try {
      await axios.put(`http://localhost:5000/leases/${lease._id}`, {
        status: "terminated",
      });
      updateLease(lease._id, "terminated");
    } catch (error) {
      console.error("Error terminating lease:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:shadow-lg hover:scale-105">
      <div className="flex items-center gap-4">
        {lease.propertyImage && (
          <img
            src={`data:image/png;base64,${lease.propertyImage}`}
            alt="Property"
            className="w-24 h-24 rounded-lg object-cover"
          />
        )}
        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-800">{lease.tenantName}</h2>
          <p className="text-sm text-gray-600">Start: {formattedStartDate}</p>
          <p className="text-sm text-gray-600">End: {formattedEndDate}</p>
          <p className="text-sm text-gray-600">Property Address: {lease.propertyAddress || "N/A"}</p>
          <p
            className={`text-sm font-bold ${
              lease.status === "Active" ? "text-green-600" : "text-red-600"
            }`}
          >
            {lease.status}
          </p>
          {lease.agreement && (
            <a
              href={`data:application/pdf;base64,${lease.agreement}`}
              download="Lease_Agreement.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mt-2 inline-block"
            >
              View Agreement
            </a>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => setShowRenew(true)}
        >
          Renew
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          onClick={handleTerminateLease}
        >
          Terminate
        </button>
      </div>

      {showRenew && (
        <div className="mt-4 border-t pt-3">
          <input
            type="date"
            className="w-full p-2 border rounded mb-2"
            value={newEndDate}
            onChange={(e) => setNewEndDate(e.target.value)}
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg w-full hover:bg-green-700"
            onClick={handleRenewLease}
          >
            Confirm Renewal
          </button>
        </div>
      )}
    </div>
  );
};

export default LeaseCard;
