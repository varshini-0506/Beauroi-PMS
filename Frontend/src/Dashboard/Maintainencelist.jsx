import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Hourglass, XCircle } from "lucide-react";

const MaintenanceList = ({ maintenanceRequests = [] }) => {
  const statusIcons = {
    Pending: <Hourglass className="text-[#6366F1]" size={20} />,
    InProgress: (
      <Hourglass className="text-[#4F46E5] animate-spin" size={20} />
    ),
    Completed: <CheckCircle className="text-[#10B981]" size={20} />,
    Cancelled: <XCircle className="text-[#EF4444]" size={20} />,
  };

  const statusColors = {
    Pending: "border-[#6366F1] text-[#6366F1]",
    InProgress: "border-[#4F46E5] text-[#4F46E5]",
    Completed: "border-[#10B981] text-[#10B981]",
    Cancelled: "border-[#EF4444] text-[#EF4444]",
  };

  if (maintenanceRequests.length === 0) {
    maintenanceRequests = [
      {
        id: 1,
        title: "Leaky Faucet",
        description: "Kitchen sink faucet is leaking continuously.",
        tenantName: "John Doe",
        status: "Pending",
      },
      {
        id: 2,
        title: "Broken AC Unit",
        description: "Air conditioner not working in living room.",
        tenantName: "Jane Smith",
        status: "InProgress",
      },
      {
        id: 3,
        title: "Electrical Issue",
        description: "Power outage in the bedroom area.",
        tenantName: "Alice Johnson",
        status: "Completed",
      },
      {
        id: 4,
        title: "Clogged Drain",
        description: "Bathroom drain is clogged and not draining water.",
        tenantName: "Bob Brown",
        status: "Cancelled",
      },
    ];
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6 max-w-5xl mx-auto bg-[#FAFAFA] min-h-screen"
    >
      <h2 className="text-3xl font-bold mb-6 text-[#4F46E5]">
        Maintenance Requests
      </h2>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {maintenanceRequests.map((request) => (
          <motion.div
            key={request.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.015 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="bg-white rounded-2xl shadow-sm p-6 mb-4 transition duration-300 flex flex-col sm:flex-row justify-between gap-4 hover:shadow-md"
          >
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-[#374151]">
                {request.title}
              </h3>
              <p className="text-gray-500">{request.description}</p>
              <p className="text-sm text-gray-400 mt-2">
                Requested by: {request.tenantName}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {statusIcons[request.status]}
              <span
                className={`text-sm border px-3 py-1 rounded-full font-medium ${statusColors[request.status]}`}
              >
                {request.status}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default MaintenanceList;