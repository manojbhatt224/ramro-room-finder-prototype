import { axiosInstance } from "../helpers/axiosInstance";

export const getListingReviewsAPI = async (listingId) => {
    try {
      const response = await axiosInstance.get('/api/reviews', {listingId});
      return response.data; 
    } catch (error) {
      throw error;
    }
  };

  export const addReviewAPI=async(reviewData)=>{
    try {
        const response = await axiosInstance.post('/api/reviews', reviewData);
        return response.data; 
      } catch (error) {
        throw error;
      }
  }
  export const deleteReviewAPI = async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/reviews/${id}`);
      return response.data; 
    } catch (error) {
      throw error;
    }
  };
  export const updateReviewAPI = async (id, updateData) => {
    try {
      const response = await axiosInstance.put(`/api/reviews/${id}`,updateData)
      return response.data; 
    } catch (error) {
      throw error;
    }
  };