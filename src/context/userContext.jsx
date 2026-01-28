import React, { createContext, useState, useEffect } from "react";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";

export const UserContext = createContext();

const userProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // if(user) return;

    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      // Fetch user data using the token
      setLoading(false);
      return;
    }
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data);
      } catch (error) {
        console.error("user not authenticated", error);
        clearUser();
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
    setLoading(false);
  };
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
    setLoading(false);
  };
  
  return (
    <UserContext.Provider value={{ user,setUser, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default userProvider;
