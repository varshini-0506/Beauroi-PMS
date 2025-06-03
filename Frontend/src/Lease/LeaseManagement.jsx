import { useState, useEffect } from "react";
import LeaseCard from "./LeaseCard";
import LeaseForm from "./LeaseForm";

const LeaseManagement = () => {
  const [leases, setLeases] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/getleases")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Leases:", data);
        setLeases(data);
      })
      .catch((err) => console.error("Error fetching leases:", err));
  }, []);

  const addLease = (lease) => {
    setLeases([...leases, lease]);
    addNotification("Lease added successfully!");
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
    addNotification(`Lease ${status} successfully!`);
  };

  const addNotification = (message) => {
    setNotifications((prev) => [
      ...prev,
      { message, time: new Date().toLocaleTimeString() },
    ]);
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full relative">
  <div className="ml-64 p-6">
    <h1 className="text-3xl font-bold mb-6 text-gray-800">Lease Management</h1>

    <div className="flex justify-between mb-6 items-start">
      <LeaseForm addLease={addLease} />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        onClick={() => setDrawerOpen(!drawerOpen)}
      >
        View Notifications ({notifications.length})
      </button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {leases.map((lease) => (
        <LeaseCard key={lease._id} lease={lease} updateLease={updateLease} />
      ))}
    </div>
  </div>

  {/* Drawer - Overlay on right side */}
  {drawerOpen && (
    <div className="fixed top-0 right-0 w-80 h-full bg-gray-200 shadow-lg z-50 p-4">
      <h2 className="text-lg font-bold">Notifications</h2>
      <button
        className="bg-red-600 text-white px-2 py-1 mt-2 rounded"
        onClick={() => setNotifications([])}
      >
        Clear All
      </button>
      <ul className="mt-4">
        {notifications.map((note, index) => (
          <li key={index} className="border-b py-2 text-sm">
            {note.message}{" "}
            <span className="text-gray-500 text-xs">({note.time})</span>
          </li>
        ))}
      </ul>
    </div>
  )}
</div>

  );
};

export default LeaseManagement;
