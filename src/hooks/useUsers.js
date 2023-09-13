import { useMutation, useQuery } from 'react-query';
import usersApi from 'src/api/usersApi';

export const useGetUsers = () => {
  const { getItems } = usersApi;

  const getProfileData = useQuery({
    queryKey: ['users'],
    queryFn: getItems,
  });
  return getProfileData;
};

const useUsers = () => {
  const { createItem, updateItem, deleteItem } = usersApi;

  const createMutation = useMutation({
    mutationFn: (data) => createItem(data),
    onError: (error) => {
      return error;
    },
    onSuccess: (data) => {
      return data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateItem,
    onError: (error) => {
      // An error happened!
    },
    onSuccess: (data) => {
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteItem(id),
    onError: (error) => {
      // An error happened!
    },
    onSuccess: (data) => {
      return data;
    },
  });

  return { createMutation, updateMutation, deleteMutation };
};

export default useUsers;
