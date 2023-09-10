import { useMutation, useQuery } from 'react-query';
import authApi from '../api/authApi';
import { useNavigate } from 'react-router-dom';

export function useGetUserData() {
  const { getProfile } = authApi;
  return useQuery({
    queryKey: ['me'],
    queryFn: getProfile,
  });
}

export function useLogin() {
  const navigate = useNavigate();
  const { login, logout } = authApi;
  const mutation = useMutation({
    mutationFn: login,
    onError: (data) => {
      return data.error;
    },
    onSuccess: (data) => {
      if (!data.message) {
        navigate('/dashboard');
      }
      return data;
    },
  });

  const logOutMutation = useMutation({
    mutationFn: logout,
    onError: (error) => {
      return error;
    },
    onSuccess: (data) => {
      navigate('/');
      return true;
    },
  });
  return { logOutMutation, mutation };
}
