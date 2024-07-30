import { axiosInstance } from "../helpers/axiosInstance";

export const getAllUsersAPI = async () => {
  try {
    const response = await axiosInstance.get("/api/users");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserAPI = async (id) => {
  try {
    const response = await axiosInstance.get("/api/users/${id}");
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteListingAPI = async (id) => {
  try {
    const response = await axiosInstance.delete("/api/listings/${id}");
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateUserAPI = async (id, updatedData) => {
  try {
    const response = await axiosInstance.put("/api/users/${id}", updateData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deactivateUserAPI = async (id) => {
  try {
    const response = await axiosInstance.put(
      "/api/users/${id}",
      { activated: false },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
