import { useState, useEffect } from "react";
import LeaseCard from "../Lease/LeaseCard";
import LeaseForm from "../Lease/LeaseForm";

const AdminLeaseView = () => {
  const [leases, setLeases] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/getleases")
      .then((res) => res.json())
      .then((data) => setLeases(data))
      .catch((err) => console.error("Error fetching leases:", err));
  }, []);

  const addLease = (lease) => {
    setLeases((prev) => [...prev, lease]);
  };

  const updateLease = (id, status, newEndDate = null) => {
    setLeases((prevLeases) =>
      prevLeases.map((lease) =>
        lease._id === id
          ? {
              ...lease,
              status: status === "renewed" ? "Active" : "Terminated",
              endDate: status === "renewed" ? newEndDate : lease.endDate,
            }
          : lease
      )
    );
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen w-full p-6 text-[#374151]">
      <h1 className="text-3xl font-bold mb-6 text-[#4F46E5]">Lease Management</h1>

      <div className="mb-8 bg-white p-4 rounded-md shadow border-l-4 border-[#4F46E5]">
        <LeaseForm addLease={addLease} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {leases.map((lease) => (
          <div
            key={lease._id}
            className="bg-white p-4 rounded-md shadow border-l-4 border-[#A78BFA]"
          >
            <LeaseCard lease={lease} updateLease={updateLease} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminLeaseView;