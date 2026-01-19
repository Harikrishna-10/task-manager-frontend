import React from "react";
import UI_IMG from "../../assets/ui-image.png";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="w-full md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-xl font-semibold mb-6">Task Manager</h2>
        {children}
      </div>

      {/* Right Section */}
      <div className="hidden md:flex w-[40vw] items-center justify-center bg-blue-50 bg-[url('/bg-img.png')] bg-cover bg-no-repeat bg-center overflow-hidden p-8">
        <img
          src={UI_IMG}
          alt="Task manager UI preview"
          className="w-64 lg:w-[90%]"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
