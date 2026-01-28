import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";
export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("profile", imageFile);
  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE || "/auth/upload-image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
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