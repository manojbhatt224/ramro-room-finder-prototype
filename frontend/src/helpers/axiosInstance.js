import axios from 'axios';
import {store} from '../store'
import { selectToken } from '../slices/authSlice';


const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`, 
});
axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const token = selectToken(state);

  if (token) {
    config.headers.Authorization = `Bearer ${token.accessToken}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export {axiosInstance}