import axios from 'axios';

// Create an instance of axios with a custom config
const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.65:5000', // Replace with your backend API URL
});

export const loginAPI = async (username, password) => {
  try {
    // await new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve('Processing completed after 5 seconds');
    //     }, 5000); // 5000 milliseconds = 5 seconds
    //   });
    const response = await axiosInstance.post('/api/auth/login', { username, password });
    return response.data; // Assuming your API returns user data and token upon successful login
  } catch (error) {
    throw error;
  }
};
export const signupAPI = async (firstName, lastName, username, email, password, confirm_password) => {
  try {
    const response = await axiosInstance.post('/api/auth/signup', { firstName, lastName, username, email, password, confirm_password });
    return response.data; // Assuming your API returns user data and token upon successful signup
  } catch (error) {
    console.log("Error in sign up:", error)
    throw error;
  }
};

export default axiosInstance;
