import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";
export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("profile", imageFile);
  const token = localStorage.getItem("token");
  const BASE_URL = "https://task-manager-backend-rho-tawny.vercel.app/api";
  const url = `${BASE_URL}/auth/upload-image`;
  try {
    const response = await axiosInstance.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export default uploadImage;
