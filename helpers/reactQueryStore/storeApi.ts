import { TStore } from '@/types/store';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { axiosBaseQuery } from '../axios/axiosBaseQuery';

const queryClient = new QueryClient();

const useCreateStoreMutation = () =>
  useMutation({
    mutationFn: async (storeData: Partial<TStore>) =>
      axiosBaseQuery({
        url: '/stores/create',
        method: 'POST',
        data: storeData,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stores'] });
    },
  });

const useGetIsStoreExistQuery = () =>
  useQuery({
    queryKey: [],
    queryFn: async () =>
      axiosBaseQuery({
        url: '/stores/isStoreExist',
        method: 'GET',
      }),
  });

const useGetAllStoresQuery = () =>
  useQuery({
    queryKey: ['stores'],
    queryFn: async () =>
      axiosBaseQuery({
        url: '/stores',
        method: 'GET',
      }),
  });

const useGetSingleStoreQuery = (storeId: string) =>
  useQuery({
    queryKey: ['store'],
    queryFn: async () =>
      axiosBaseQuery({
        url: `/stores/${storeId}`,
        method: 'GET',
      }),
  });

const useUpdateStoreMutation = () =>
  useMutation({
    mutationFn: async ({
      storeId,
      updatedData,
    }: {
      storeId: string;
      updatedData: Partial<TStore>;
    }) =>
      axiosBaseQuery({
        url: `/stores/${storeId}`,
        method: 'PATCH',
        data: updatedData,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['store', 'stores'] });
    },
  });

const useDeleteStoreMutation = () =>
  useMutation({
    mutationFn: async (storeId: string) =>
      axiosBaseQuery({
        url: `/stores/${storeId}`,
        method: 'DELETE',
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stores'] });
    },
  });

export {
  useCreateStoreMutation,
  useDeleteStoreMutation,
  useGetAllStoresQuery,
  useGetIsStoreExistQuery,
  useGetSingleStoreQuery,
  useUpdateStoreMutation,
};
