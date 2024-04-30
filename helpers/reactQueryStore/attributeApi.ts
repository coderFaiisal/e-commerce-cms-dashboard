import { TAttribute } from '@/types/attribute';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { axiosBaseQuery } from '../axios/axiosBaseQuery';

const queryClient = new QueryClient();

const useCreateAttributeMutation = () =>
  useMutation({
    mutationFn: async (attributeData: TAttribute) =>
      axiosBaseQuery({
        url: '/attributes/create',
        method: 'POST',
        data: attributeData,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attributes'] });
    },
  });

const useGetAllAttributesQuery = (storeId: string) =>
  useQuery({
    queryKey: ['attributes'],
    queryFn: async () =>
      axiosBaseQuery({
        url: `/attributes/${storeId}`,
        method: 'GET',
      }),
  });

const useGetSingleAttributeQuery = (attributeId: string) =>
  useQuery({
    queryKey: ['attribute'],
    queryFn: async () =>
      axiosBaseQuery({
        url: `/attributes/single-attribute/${attributeId}`,
        method: 'GET',
      }),
  });

const useUpdateAttributeMutation = () =>
  useMutation({
    mutationFn: async ({
      attributeId,
      updatedData,
    }: {
      attributeId: string;
      updatedData: Partial<TAttribute>;
    }) =>
      axiosBaseQuery({
        url: `/attributes/${attributeId}`,
        method: 'PATCH',
        data: updatedData,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attribute', 'attributes'] });
    },
  });

const useDeleteAttributeMutation = () =>
  useMutation({
    mutationFn: async (attributeId: string) =>
      axiosBaseQuery({
        url: `/attributes/${attributeId}`,
        method: 'DELETE',
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attributes'] });
    },
  });

export {
  useCreateAttributeMutation,
  useDeleteAttributeMutation,
  useGetAllAttributesQuery,
  useGetSingleAttributeQuery,
  useUpdateAttributeMutation,
};
