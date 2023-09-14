import { axiosInstance } from './Instance/Instance';

const registrationApi = {
  createItem: async (sendData) => {
    try {
      const { data } = await axiosInstance.post('/registrations', sendData);
      return data;
    } catch (error) {
      return error;
    }
  },

  // Read
  getItems: async (params) => {
    try {
      const { data } = await axiosInstance.get('/registrations', {
        params: {
          populate: '*',
          ...params,
        },
      });
      return data;
    } catch (error) {
      return error;
    }
  },

  getItem: async (params) => {
    try {
      const id = params;
      const { data } = await axiosInstance.get(`/registrations/${id}`, {
        params: {
          populate: '*',
        },
      });
      return data.data.attributes;
    } catch (error) {
      return error;
    }
  },
  getCountItems: async (params) => {
    try {
      const { data } = await axiosInstance.get('/registrations', {
        params: {
          ...params,
        },
      });
      return data;
    } catch (error) {
      return error;
    }
  },
  // Update
  updateItem: async (id, sendData) => {
    try {
      const { data } = await axiosInstance.put(
        `/registrations/${id}`,
        sendData
      );
      return data;
    } catch (error) {
      return error;
    }
  },

  // Delete
  deleteItem: async (id) => {
    try {
      const { data } = await axiosInstance.delete(`/registrations/${id}`);
      return data;
    } catch (error) {
      return error;
    }
  },
};

export default registrationApi;
