import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authKeys } from '../query-key-factory';
import { AuthService } from './auth.service';

const authServices = new AuthService();

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ user }) => {
      return authServices.createUser(user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(authKeys.createUser);
    },
    onError: (err) => {
      console.error(err);
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ token, userId }) => {
      console.log(userId)
      return authServices.deleteUser(token, userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(authKeys.deleteUser);
    },
    onError: (err) => {
      console.error(err);
    },
  });
};
