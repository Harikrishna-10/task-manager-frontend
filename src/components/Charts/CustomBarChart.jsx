import React from "react";
import {
  CartesianGrid,
  ResponsiveContainer,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
} from "recharts";

// Define Tooltip outside the component to prevent re-rendering issues
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
        <p className="text-xs font-semibold text-purple-800 mb-1">
          {payload[0].payload.priority}
        </p>
        <p className="text-sm text-gray-600">
          Count:{" "}
          <span className="text-sm font-medium text-gray-900">
            {payload[0].payload.count}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomBarChart = ({ data }) => {
  
  const getBarColor = (entry) => {
    // FIX: Convert to lowercase to ensure it matches "Low", "Medium", "High"
    const priority = entry?.priority ? entry.priority.toLowerCase() : "";
    
    switch (priority) {
      case "low":
        return "#00BC7D";
      case "medium":
        return "#FE9900";
      case "high":
        return "#FF1F57";
      default:
        return "#00BC7D";
    }
  };

  return (
    <div className="bg-white mt-6 w-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />
          <XAxis
            dataKey="priority"
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />

          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
          
          <Bar
            dataKey="count"
            fill="#ff8042"
            radius={[10, 10, 0, 0]}
            // activeBar={{ fill: "#22c55e" }}
          >
            {data?.map((entry, index) => (
              <Cell key={index} fill={getBarColor(entry)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;