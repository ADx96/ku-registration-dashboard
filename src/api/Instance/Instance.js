import axios from 'axios';
import { getToken } from '../authApi';

export const axiosInstance = axios.create({
  baseURL: 'https://ku-assets-api.herokuapp.com/api',
  // Add other Axios configuration options here if needed
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token && config.url !== '/login') {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
