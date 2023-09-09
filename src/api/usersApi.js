import { axiosInstance } from './Instance/Instance';

const registrationApi = {
  createItem: async (sendData) => {
    const { data } = await axiosInstance.post('/users', sendData);
    return data;
  },

  // Read
  getItems: async () => {
    const { data } = await axiosInstance.get('/users', {
      params: {
        populate: '*',
        filters: {
          role: {
            name: {
              $in: [
                'registrationAdmin',
                'registrationManagement',
                'registrationReviewer',
              ],
            },
          },
        },
      },
    });
    return data;
  },

  // Update
  updateItem: async (id, sendData) => {
    const { data } = await axiosInstance.put(
      `/users/`,
      {
        params: { id: id },
      },
      sendData
    );
    return data;
  },

  // Delete
  deleteItem: async (id) => {
    const { data } = await axiosInstance.delete(`/users/`, {
      params: { id: id },
    });
    return data;
  },
};

export default registrationApi;
