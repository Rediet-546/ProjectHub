import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api.js';
import { useAuthStore } from './authStore.js';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (credentials) =>
      api.post('/auth/login', credentials).then((res) => res.data.data), // <-- FIX: Extract payload
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      setAuth(data.token, data.user);
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (userData) =>
      api.post('/auth/register', userData).then((res) => res.data.data), // <-- FIX: Extract payload
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      setAuth(data.token, data.user);
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
    },
  });
};

export const useAuthUser = () => {
  const token = useAuthStore((state) => state.token);
  return useQuery({
    queryKey: ['authUser'],
    queryFn: () => api.get('/auth/me').then((res) => res.data.data.user), // <-- FIX: Extract user payload
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};