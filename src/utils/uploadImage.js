import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";
export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("profile", imageFile);
  const token = localStorage.getItem("token");
  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE || "/auth/upload-image",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
export default uploadImage;
