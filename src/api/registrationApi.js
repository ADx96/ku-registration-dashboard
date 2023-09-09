import { axiosInstance } from './Instance/Instance';

const registrationApi = {
  createItem: async (sendData) => {
    const { data } = await axiosInstance.post('/registrations', sendData);
    return data;
  },

  // Read
  getItems: async (params) => {
    const { data } = await axiosInstance.get('/registrations', {
      params: {
        populate: '*',
        ...params,
      },
    });
    return data;
  },

  // Update
  updateItem: async (id, sendData) => {
    const { data } = await axiosInstance.put(`/registrations/${id}`, sendData);
    return data;
  },

  // Delete
  deleteItem: async (id) => {
    const { data } = await axiosInstance.delete(`/registrations/${id}`);
    return data;
  },
};

export default registrationApi;
