import React from "react";
import { Card, CardContent, Chip as Badge } from "@mui/material";
import { CheckCircle, Hourglass, XCircle } from "lucide-react";

const MaintenanceList = ({ maintenanceRequests = [] }) => {
  // Status icon mapping
  const statusIcons = {
    Pending: <Hourglass className="text-yellow-500" size={20} />, 
    InProgress: <Hourglass className="text-blue-500 animate-spin" size={20} />, 
    Completed: <CheckCircle className="text-green-500" size={20} />, 
    Cancelled: <XCircle className="text-red-500" size={20} />,
  };

  // Default sample maintenance requests
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
      {
        id: 5,
        title: "Window Damage",
        description: "Broken window in the guest bedroom.",
        tenantName: "Chris Green",
        status: "Pending",
      },
      {
        id: 6,
        title: "Heating Issue",
        description: "Central heating system not functioning properly.",
        tenantName: "Daisy Blue",
        status: "InProgress",
      },
    ];
  }

  return (
    <div className="p-6 max-w-8xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Maintenance Requests</h2>

      {/* Maintenance Request Cards */}
      {maintenanceRequests.map((request) => (
        <Card
          key={request.id}
          sx={{
            mb: 2,
            width: "150%", // Increased width
            minHeight: "150px", // Increased height
            marginLeft: "-30px", // Move to the left
            transition: "box-shadow 0.3s",
            "&:hover": { boxShadow: 6 },
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 4,
            }}
          >
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{request.title}</h3>
              <p className="text-gray-600">{request.description}</p>
              <p className="text-sm text-gray-400 mt-2">Requested by: {request.tenantName}</p>
            </div>

            {/* Sidebar at the rightmost end */}
            <div className="flex items-center gap-3 ml-auto">
              {statusIcons[request.status]}
              <Badge
                variant="outlined"
                sx={{
                  textTransform: "capitalize",
                  borderColor:
                    request.status === "Pending"
                      ? "yellow.400"
                      : request.status === "InProgress"
                      ? "blue.400"
                      : request.status === "Completed"
                      ? "green.400"
                      : "red.400",
                  color:
                    request.status === "Pending"
                      ? "yellow.600"
                      : request.status === "InProgress"
                      ? "blue.600"
                      : request.status === "Completed"
                      ? "green.600"
                      : "red.600",
                }}
              >
                {request.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Ensure the prop is never undefined
MaintenanceList.defaultProps = {
  maintenanceRequests: [],
};

export default MaintenanceList;
