import { TSignIn, TSignUp } from '@/types/auth';
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

const useGetAllUsersQuery = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: async () =>
      axiosBaseQuery({
        url: '/users/all-users',
        method: 'GET',
      }),
  });

export {
  useCreateAdminMutation,
  useGetAllUsersQuery,
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
