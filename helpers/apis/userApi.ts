import { TChangePassword, TSignIn, TSignUp } from '@/types/user';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { axiosBaseQuery } from '../axios/axiosBaseQuery';

const queryClient = new QueryClient();

const useUserSignInMutation = () =>
  useMutation({
    mutationFn: async (signInData: TSignIn) =>
      axiosBaseQuery({
        url: '/users/sign-in',
        method: 'POST',
        data: signInData,
      }),
  });

const useUserSignUpMutation = () =>
  useMutation({
    mutationFn: async (signUpData: TSignUp) =>
      axiosBaseQuery({
        url: '/users/sign-up',
        method: 'POST',
        data: signUpData,
      }),
  });

const useCreateAdminMutation = () =>
  useMutation({
    mutationFn: async (adminData: TSignUp) =>
      axiosBaseQuery({
        url: '/users/create-admin',
        method: 'POST',
        data: adminData,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
    },
  });

const useChangePasswordMutation = () =>
  useMutation({
    mutationFn: async (data: TChangePassword) =>
      axiosBaseQuery({
        url: '/users/change-password',
        method: 'POST',
        data: data,
      }),
  });

const useForgotPasswordMutation = () =>
  useMutation({
    mutationFn: async (data: { email: string }) =>
      axiosBaseQuery({
        url: '/users/forgot-password',
        method: 'POST',
        data: data,
      }),
  });

const useResetPasswordMutation = () =>
  useMutation({
    mutationFn: async (data: { newPassword: string }) =>
      axiosBaseQuery({
        url: '/users/reset-password',
        method: 'POST',
        data: data,
      }),
  });

const useGetAllUsersQuery = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: async () =>
      axiosBaseQuery({
        url: '/users/all-users',
        method: 'GET',
      }),
  });

const useGetAllStoreOwnersQuery = () =>
  useQuery({
    queryKey: ['store-owners'],
    queryFn: async () =>
      axiosBaseQuery({
        url: '/users/all-store-owners',
        method: 'GET',
      }),
  });

const useGetAllAdminsQuery = () =>
  useQuery({
    queryKey: ['admins'],
    queryFn: async () =>
      axiosBaseQuery({
        url: '/users/all-admins',
        method: 'GET',
      }),
  });

const useGetMyProfileQuery = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: async () =>
      axiosBaseQuery({
        url: '/users/my-profile',
        method: 'GET',
      }),
  });

const useGetSingleUserQuery = (userId: string) =>
  useQuery({
    queryKey: ['user'],
    queryFn: async () =>
      axiosBaseQuery({
        url: `/users/${userId}`,
        method: 'GET',
      }),
  });

const useUpdateMyProfileMutation = () =>
  useMutation({
    mutationFn: async (updatedData: Partial<TSignUp>) =>
      axiosBaseQuery({
        url: '/users/my-profile',
        method: 'PATCH',
        data: updatedData,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'users'] });
    },
  });

const useDeleteUserMutation = () =>
  useMutation({
    mutationFn: async (userId: string) =>
      axiosBaseQuery({
        url: `/users/${userId}`,
        method: 'DELETE',
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

export {
  useChangePasswordMutation,
  useCreateAdminMutation,
  useDeleteUserMutation,
  useForgotPasswordMutation,
  useGetAllAdminsQuery,
  useGetAllStoreOwnersQuery,
  useGetAllUsersQuery,
  useGetMyProfileQuery,
  useGetSingleUserQuery,
  useResetPasswordMutation,
  useUpdateMyProfileMutation,
  useUserSignInMutation,
  useUserSignUpMutation,
};

// const {data } = useGetAllUsersQuery()

// const myMutation = useUserSignInMutation();

//   const onSubmit = async () => {
//     const data = await myMutation.mutateAsync({
//       email: 'xyz@gmail.com',
//       password: '123456',
//     });

//     console.log(data);
//   };

//   <button onClick={onSubmit}>Click here</button>;

// const { data } = useGetAllProductsQuery('66275e32d243b8879d49a9bf');
