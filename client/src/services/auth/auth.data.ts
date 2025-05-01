import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authKeys } from '../query-key-factory';
import { AuthService } from './auth.service';
import { OTP_SRC } from '@/helpers/types';

const authServices = new AuthService();

//authorization
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      user,
    }: {
      user: { name: string; email: string; password: string } | undefined;
    }) => {
      const response = await authServices.createUser(user);
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('auth', JSON.stringify(data));
      } else if (!response.ok || response.status >= 400) {
        throw new Error(data.message);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authKeys.createUser(),
        refetchType: 'none',
      });
    },
    onError: (err) => {
      console.error(err);
    },
  });
};

export const useUpdateUserPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      email,
      newPassword,
    }: {
      email: string;
      newPassword: string;
    }) => {
      const response = await authServices.updateUserPassword(
        email,
        newPassword
      );
      const data = await response.json();
      if (!response.ok || response.status >= 400) {
        throw new Error(data.message);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authKeys.updateUserPassword(),
      });
    },
    onError: (err) => {
      console.error(err);
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      token,
      userId,
    }: {
      token: string;
      userId: string;
    }) => {
      const response = await authServices.deleteUser(token, userId);
      const data = await response.json();
      if (!response.ok || response.status >= 400) {
        throw new Error(data.message);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.deleteUser() });
    },
    onError: (err) => {
      console.error(err);
    },
  });
};

export const useSendOTPMail = ({
  type,
  email,
}: {
  type: OTP_SRC;
  email: string;
}) => {
  const res = useQuery({
    queryKey: authKeys.sendOTPMail(),
    queryFn: () => authServices.sendOTPMail(type, email),
    enabled: !!email,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
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
    mutationFn: async ({
      user,
    }: {
      user: { email: string; password: string };
    }) => {
      const response = await authServices.loginUser(user);
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('auth', JSON.stringify(data));
      } else if (!response.ok || response.status >= 400) {
        throw new Error(data.message);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.loginUser() });
    },
    onError: (err) => {
      console.error(err);
    },
  });
};
