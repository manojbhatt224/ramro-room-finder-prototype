import { axiosInstance } from "../helpers/axiosInstance";

export const fetchChatsAPI = async () => {
    try {
      const response = await axiosInstance.get('/api/chats');
      return response.data; 
    } catch (error) {
      throw error;
    }
  };

 