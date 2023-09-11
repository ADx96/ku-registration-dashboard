import { axiosInstance } from './Instance/Instance';

const registrationApi = {
  createItem: async (sendData) => {
    try {
      const { data } = await axiosInstance.post('/users', sendData);
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Read
  getItems: async () => {
    try {
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
    } catch (error) {
      return error;
    }
  },

  // Update
  updateItem: async (id, sendData) => {
    try {
      const { data } = await axiosInstance.put(
        `/users/`,
        {
          params: { id: id },
        },
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
      const { data } = await axiosInstance.delete(`/users/`, {
        params: { id: id },
      });
      return data;
    } catch (error) {
      return error;
    }
  },
};

export default registrationApi;
