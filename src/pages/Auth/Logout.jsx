import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import toast from "react-hot-toast";

const Logout = () => {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext); 

  useEffect(() => {
    const performLogout = () => {
      localStorage.removeItem("token");
      if (updateUser) {
        updateUser(null);
      }

      toast.success("Logged out successfully");

      navigate("/login");
    };

    performLogout();
  }, [navigate, updateUser]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-500 font-medium">Logging you out...</p>
      </div>
    </div>
  );
};

export default Logout;
