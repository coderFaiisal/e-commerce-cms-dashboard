import { TProduct } from '@/types/product';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { axiosBaseQuery } from '../axios/axiosBaseQuery';

const queryClient = new QueryClient();

const useCreateProductMutation = () =>
  useMutation({
    mutationFn: async (productData: TProduct) =>
      axiosBaseQuery({
        url: '/products/create',
        method: 'POST',
        data: productData,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

const useGetAllProductsQuery = (storeId: string) =>
  useQuery({
    queryKey: ['products'],
    queryFn: async () =>
      axiosBaseQuery({
        url: `/products/${storeId}`,
        method: 'GET',
      }),
  });

const useGetSingleProductQuery = (productId: string) =>
  useQuery({
    queryKey: ['product'],
    queryFn: async () =>
      axiosBaseQuery({
        url: `/products/single-product/${productId}`,
        method: 'GET',
      }),
  });

const useUpdateProductMutation = () =>
  useMutation({
    mutationFn: async ({
      productId,
      updatedData,
    }: {
      productId: string;
      updatedData: Partial<TProduct>;
    }) =>
      axiosBaseQuery({
        url: `/products/${productId}`,
        method: 'PATCH',
        data: updatedData,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product', 'products'] });
    },
  });

const useDeleteProductMutation = () =>
  useMutation({
    mutationFn: async (productId: string) =>
      axiosBaseQuery({
        url: `/products/${productId}`,
        method: 'DELETE',
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

export {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
};
