import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { axiosBaseQuery } from '../axios/axiosBaseQuery';
import { TProductReview } from './../../types/product';

const queryClient = new QueryClient();

const useCreateProductReviewMutation = () =>
  useMutation({
    mutationFn: async (productReviewData: TProductReview) =>
      axiosBaseQuery({
        url: '/product-reviews/create',
        method: 'POST',
        data: productReviewData,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-reviews'] });
    },
  });

const useGetAllProductReviewsQuery = (productId: string) =>
  useQuery({
    queryKey: ['product-reviews'],
    queryFn: async () =>
      axiosBaseQuery({
        url: `/product-reviews/${productId}`,
        method: 'GET',
      }),
  });

const useUpdateProductReviewMutation = () =>
  useMutation({
    mutationFn: async ({
      productReviewId,
      updatedData,
    }: {
      productReviewId: string;
      updatedData: Partial<TProductReview>;
    }) =>
      axiosBaseQuery({
        url: `/product-reviews/${productReviewId}`,
        method: 'PATCH',
        data: updatedData,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-reviews'] });
    },
  });

const useDeleteProductReviewMutation = () =>
  useMutation({
    mutationFn: async (productReviewId: string) =>
      axiosBaseQuery({
        url: `/product-reviews/${productReviewId}`,
        method: 'DELETE',
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-reviews'] });
    },
  });

export {
  useCreateProductReviewMutation,
  useDeleteProductReviewMutation,
  useGetAllProductReviewsQuery,
  useUpdateProductReviewMutation,
};
