import { axiosInstance } from './Instance/Instance';

const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

const authApi = {
  login: async (credentials) => {
    try {
      const { data } = await axiosInstance.post(`/auth/local`, credentials);
      const token = data.jwt;
      token && setToken(token);
      if (data) {
        return data;
      }
    } catch (error) {
      return error.response.data.error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  isAuthenticated: () => {
    const token = getToken();
    return !!token; // Check if the token exists
  },
  getProfile: async () => {
    try {
      const { data } = await axiosInstance.get(`/users/me`, {
        params: { populate: '*' },
      });
      if (data) {
        return data;
      }
    } catch (error) {
      return error;
    }
  },
};

export default authApi;
