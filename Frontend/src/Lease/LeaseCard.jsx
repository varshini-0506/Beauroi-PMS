import { useState } from "react";
import moment from "moment";
import axios from "axios";

const LeaseCard = ({ lease, updateLease }) => {
  const [showRenew, setShowRenew] = useState(false);
  const [newEndDate, setNewEndDate] = useState("");

  const formattedStartDate = moment(lease.startDate).format("MMMM DD, YYYY");
  const formattedEndDate = moment(lease.endDate).format("MMMM DD, YYYY");

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
    <div className="bg-white shadow-md rounded-xl p-6 transition-transform transform hover:shadow-lg hover:scale-105 border border-[#E0E7FF]">
      <div className="flex items-center gap-4">
        {lease.propertyImage && (
          <img
            src={`data:image/png;base64,${lease.propertyImage}`}
            alt="Property"
            className="w-24 h-24 rounded-lg object-cover border border-[#E0E7FF]"
          />
        )}
        <div className="flex-1">
          <h2 className="text-lg font-bold text-[#374151]">{lease.tenantName}</h2>
          <p className="text-sm text-[#6B7280]">Start: {formattedStartDate}</p>
          <p className="text-sm text-[#6B7280]">End: {formattedEndDate}</p>
          <p className="text-sm text-[#6B7280]">
            Property Address: {lease.propertyAddress || "N/A"}
          </p>
          <p
            className={`text-sm font-semibold mt-1 ${
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
              className="text-[#4F46E5] underline mt-2 inline-block hover:text-[#6366F1]"
            >
              View Agreement
            </a>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-4 space-x-2">
        <button
          className="bg-[#4F46E5] text-white px-4 py-2 rounded-lg hover:bg-[#6366F1] transition"
          onClick={() => setShowRenew(true)}
        >
          Renew
        </button>
        <button
          className="bg-[#E0E7FF] text-[#4F46E5] px-4 py-2 rounded-lg hover:bg-[#6366F1] hover:text-white transition"
          onClick={handleTerminateLease}
        >
          Terminate
        </button>
      </div>

      {showRenew && (
        <div className="mt-4 border-t border-[#E5E7EB] pt-3">
          <input
            type="date"
            className="w-full p-2 border border-[#E0E7FF] rounded mb-2 text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            value={newEndDate}
            onChange={(e) => setNewEndDate(e.target.value)}
          />
          <button
            className="bg-[#6366F1] text-white px-4 py-2 rounded-lg w-full hover:bg-[#4F46E5] transition"
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