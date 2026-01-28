import React from "react";

const Progress = ({ progress, status }) => {
  const getColor = () => {
    switch (status) {
      case "in progress":
        return "text-blue-500 bg-blue-500 border border-blue-500/10";
      case "completed":
        return "text-indigo-500 bg-indigo-50 border border-indigo-500/10";
      default:
        return "text-violet-500 bg-violet-50 border border-violet-500/10";
    }
  };
  return (
    <div className="w-full bg-gray-200 rounded-full h-1.5">
      <div
        className={`${getColor()} h-1.5 rounded-full text-center text-xs font-medium`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default Progress;
