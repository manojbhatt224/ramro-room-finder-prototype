import { axiosInstance } from "../helpers/axiosInstance";

export const fetchMessagesAPI = async (chatId) => {
    try {
      const response = await axiosInstance.get(`/api/messages/${chatId}`);
      return response.data; 
    } catch (error) {
      throw error;
    }
  };

 