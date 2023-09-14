import { useMutation, useQuery, useQueryClient } from 'react-query';
import registrationApi from 'src/api/registrationApi';

export const useGetRegistrations = (params) => {
  const { getItems } = registrationApi;

  const getRegistrationsData = useQuery({
    queryKey: ['registrations', params],
    keepPreviousData: true,
    queryFn: () => getItems(params),
  });

  return getRegistrationsData;
};

export function useGetRegistrationsCount(params, status) {
  const { getCountItems } = registrationApi;

  const getRegistrationsData = useQuery({
    queryKey: ['count', status],
    queryFn: () => getCountItems(params),
  });

  return getRegistrationsData;
}

export const useGetRegistration = (params) => {
  const { getItem } = registrationApi;

  const getRegistrationsData = useQuery({
    queryKey: ['registration'],
    queryFn: () => getItem(params),
  });

  return getRegistrationsData;
};

const useRegistrationMutation = () => {
  const { createItem, updateItem, deleteItem } = registrationApi;

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data) => createItem(data),
    onError: (error, variables, context) => {
      // An error happened!
    },
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(['registrations', data.id], data);
      queryClient.invalidateQueries(['registrations'], { exact: true });

      return data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: (id, data) => updateItem(),
    onError: (error, variables, context) => {
      // An error happened!
    },
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(['registrations', data.id], data);

      queryClient.invalidateQueries(['registrations'], { exact: true });

      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteItem(id),
    onError: (error, variables, context) => {
      // An error happened!
    },
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(['registrations', data.id], data);

      queryClient.invalidateQueries(['registrations'], { exact: true });

      return data;
    },
  });

  return { createMutation, updateMutation, deleteMutation };
};

export default useRegistrationMutation;
