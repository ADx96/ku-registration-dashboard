import { useMutation, useQuery } from 'react-query';
import registrationApi from 'src/api/registrationApi';

export const useGetRegistrations = (params) => {
  const { getItems } = registrationApi;

  const getRegistrationsData = useQuery({
    queryKey: ['registrations'],
    queryFn: () => getItems(params),
  });
  return getRegistrationsData;
};

const useRegistrationMutation = () => {
  const { createItem, updateItem, deleteItem } = registrationApi;

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

export default useRegistrationMutation;
