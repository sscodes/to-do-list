import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authKeys } from '../query-key-factory';
import { AuthService } from './auth.service';

const authServices = new AuthService();

//authorization
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

export const useUpdateUserPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, newpassword }) => {
      return authServices.updateUserPassword(email, newpassword);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(authKeys.updateUserPassword);
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

export const useSendOTPMail = (type, email) => {
  const res = useQuery({
    queryKey: authKeys.sendOTPMail,
    queryFn: () => authServices.sendOTPMail(type, email),
  });

  return {
    otp: res.data,
    isSuccess: res.isSuccess,
    refetch: res.refetch,
  };
};

// authentication
export const useLoginUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ user }) => {
      return authServices.loginUser(user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(authKeys.loginUser);
    },
    onError: (err) => {
      console.error(err);
    },
  });
};
