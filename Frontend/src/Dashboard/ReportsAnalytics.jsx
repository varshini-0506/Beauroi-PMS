import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";

// Sample data
const rentData = [
  { month: "Jan", rent: 4000 },
  { month: "Feb", rent: 4600 },
  { month: "Mar", rent: 4800 },
  { month: "Apr", rent: 5000 },
  { month: "May", rent: 5200 },
];

const occupancyData = [
  { month: "Jan", rate: 85 },
  { month: "Feb", rate: 88 },
  { month: "Mar", rate: 90 },
  { month: "Apr", rate: 92 },
  { month: "May", rate: 93 },
];

const revenueData = [
  { source: "Rent", value: 7000 },
  { source: "Parking", value: 1000 },
  { source: "Others", value: 500 },
];

const COLORS = ["#4F46E5", "#6366F1", "#E0E7FF"];

const expenseData = [
  { type: "Maintenance", expense: 1500 },
  { type: "Utilities", expense: 1200 },
  { type: "Staff", expense: 800 },
];

const ReportsAnalytics = () => {
  return (
    <div className="bg-[#FAFAFA] min-h-screen p-8 w-full ml-[250px]">
      <h2 className="text-2xl font-semibold text-[#374151] mb-6">
        📊 Reports & Analytics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Rent Collection Trends */}
        <div className="bg-white rounded-2xl shadow border border-[#E0E7FF] p-6">
          <h3 className="text-lg font-semibold text-[#4F46E5] mb-4">
            Rent Collection Trends
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={rentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="rent" stroke="#6366F1" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Occupancy Rate */}
        <div className="bg-white rounded-2xl shadow border border-[#E0E7FF] p-6">
          <h3 className="text-lg font-semibold text-[#4F46E5] mb-4">
            Occupancy Rate
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={occupancyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis unit="%" />
              <Tooltip />
              <Bar dataKey="rate" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Reports */}
        <div className="bg-white rounded-2xl shadow border border-[#E0E7FF] p-6">
          <h3 className="text-lg font-semibold text-[#4F46E5] mb-4">
            Revenue Reports
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={revenueData}
                dataKey="value"
                nameKey="source"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {revenueData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Reports */}
        <div className="bg-white rounded-2xl shadow border border-[#E0E7FF] p-6">
          <h3 className="text-lg font-semibold text-[#4F46E5] mb-4">
            Expense Reports
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={expenseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="expense" fill="#E0E7FF" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
