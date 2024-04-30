import { TBillboard } from '@/types/billboard';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { axiosBaseQuery } from '../axios/axiosBaseQuery';

const queryClient = new QueryClient();

const useCreateBillboardMutation = () =>
  useMutation({
    mutationFn: async (billboardData: TBillboard) =>
      axiosBaseQuery({
        url: '/billboards/create',
        method: 'POST',
        data: billboardData,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billboards'] });
    },
  });

const useGetAllBillboardsQuery = (storeId: string) =>
  useQuery({
    queryKey: ['billboards'],
    queryFn: async () =>
      axiosBaseQuery({
        url: `/billboards/${storeId}`,
        method: 'GET',
      }),
  });

const useGetSingleBillboardQuery = (billboardId: string) =>
  useQuery({
    queryKey: ['billboard'],
    queryFn: async () =>
      axiosBaseQuery({
        url: `/billboards/single-billboard/${billboardId}`,
        method: 'GET',
      }),
  });

const useUpdateBillboardMutation = () =>
  useMutation({
    mutationFn: async ({
      billboardId,
      updatedData,
    }: {
      billboardId: string;
      updatedData: Partial<TBillboard>;
    }) =>
      axiosBaseQuery({
        url: `/billboards/${billboardId}`,
        method: 'PATCH',
        data: updatedData,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billboard', 'billboards'] });
    },
  });

const useDeleteBillboardMutation = () =>
  useMutation({
    mutationFn: async (billboardId: string) =>
      axiosBaseQuery({
        url: `/billboards/${billboardId}`,
        method: 'DELETE',
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billboards'] });
    },
  });

export {
  useCreateBillboardMutation,
  useDeleteBillboardMutation,
  useGetAllBillboardsQuery,
  useGetSingleBillboardQuery,
  useUpdateBillboardMutation,
};
