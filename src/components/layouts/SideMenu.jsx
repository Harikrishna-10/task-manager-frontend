import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../utils/data";
import { UserContext } from "../../context/userContext";
import { uploadImage } from "../../utils/uploadImage"; // Import the corrected helper
import toast from "react-hot-toast";
import { LuCamera } from "react-icons/lu";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser, updateUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handelClick = (route) => {
    if (route === "logout") {
      handelLogout();
      return;
    }
    navigate(route);
  };

  const handelLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  // --- Image Upload Logic ---
  const handleProfileClick = () => {
    // Open file dialog only if not currently uploading
    if (!isUploading) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // 1. Call the corrected upload helper
      const response = await uploadImage(file);
      
      // 2. Backend returns { imageUrl: "..." }
      const newImageUrl = response.imageUrl;

      if (newImageUrl) {
        // 3. Update User Context immediately
        // Ensure we keep existing user data and only overwrite the image
        updateUser({ ...user, profileImageUrl: newImageUrl });
        toast.success("Profile picture updated!");
      }
    } catch (error) {
      console.error("Upload failed", error);
      // Backend returns 400 if no file, or 500 if error
      toast.error(error.response?.data?.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
      // Reset input so you can select the same file again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // --- Helper for Initials (Fallback) ---
  const getInitials = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(
        user.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA,
      );
    }
  }, [user]);

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 sticky top-[61px] z-20 ">
      <div className="flex flex-col items-center justify-center mb-7 pt-5">
        
        {/* --- Profile Image / Initials Section --- */}
        <div 
          className="relative w-20 h-20 cursor-pointer group"
          onClick={handleProfileClick}
        >
          {/* 1. Show Image OR Initials Fallback */}
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="Profile Image"
              className={`w-full h-full border border-slate-400 rounded-full object-cover transition-opacity duration-300 ${isUploading ? 'opacity-50' : ''}`}
            />
          ) : (
            <div className={`w-full h-full border border-slate-400 rounded-full bg-slate-100 flex items-center justify-center text-3xl font-bold text-primary transition-opacity duration-300 ${isUploading ? 'opacity-50' : ''}`}>
              {getInitials(user?.name)}
            </div>
          )}

          {/* 2. Hover Overlay (Camera Icon) */}
          <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <LuCamera className="text-white text-xl" />
          </div>

          {/* 3. Loading Spinner */}
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* 4. Hidden Input */}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/jpeg, image/png, image/jpg" // Match backend allowed types
            onChange={handleFileChange}
          />
        </div>
        {/* ---------------------------------------- */}

        {user?.role === "admin" && (
          <div className="text-[10px] font-medium text-white bg-primary px-3 py-0.5 rounded mt-1">
            Admin
          </div>
        )}
        <h5 className="text-gray-950 font-medium leading-6 mt-3">
          {user?.name || "User"}
        </h5>
        <p className="text-[12px] text-gray-500">{user?.email || ""}</p>
      </div>

      {sideMenuData.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${activeMenu === item.label ? "text-primary bg-linear-to-r from-blue-50/40 to-blue-100/50 border-r-3 border-primary" : "text-slate-600 hover:bg-slate-50"} py-3 px-6 mb-3 cursor-pointer transition-colors`}
          onClick={() => handelClick(item.path)}
        >
          <item.icon className="text-xl" />
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default SideMenu;