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
    mutationFn: createItem,
    onError: (error, variables, context) => {
      // An error happened!
    },
    onSuccess: (data, variables, context) => {
      return data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateItem,
    onError: (error, variables, context) => {
      // An error happened!
    },
    onSuccess: (data, variables, context) => {
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onError: (error, variables, context) => {
      // An error happened!
    },
    onSuccess: (data, variables, context) => {
      return data;
    },
  });

  return { createMutation, updateMutation, deleteMutation };
};

export default useUsers;
