import { axiosInstance } from "../helpers/axiosInstance";

export const getAllListingsAPI = async (filters, page, limit) => {
    try {
     const filterString = new URLSearchParams(filters).toString();
      const urlString=filterString? `/api/listings/?page=${page}&limit=${limit}&${filterString}`:`/api/listings/?page=${page}&limit=${limit}`;
      const response = await axiosInstance.get(urlString);
      return response.data; 
    } catch (error) {
      throw error;
    }
  };

  export const getMyListingsAPI = async () => {
    try {
      const response = await axiosInstance.get('/api/listings/user');
      return response.data; 
    } catch (error) {
      throw error;
    }
  };

  export const getListingAPI = async (id) => {
    try {
      const response = await axiosInstance.get(`/api/listings/${id}`);
      return response.data; 
    } catch (error) {
      throw error;
    }
  };
  export const addListingAPI=async(listingData)=>{
    try {
        const response = await axiosInstance.post('/api/listings', listingData,{
            headers: {
              'Content-Type': 'multipart/form-data',
              
            }});
        return response.data; 
      } catch (error) {
        throw error;
      }
  }
  export const deleteListingAPI = async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/listings/${id}`);
      return response.data; 
    } catch (error) {
      throw error;
    }
  };
  export const updateListingAPI = async (id, updatedData) => {
    try {
      const response = await axiosInstance.put(`/api/listings/${id}`, updatedData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return response.data; 
    } catch (error) {
      throw error;
    }
  };