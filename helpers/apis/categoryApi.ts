import { TCategory } from '@/types/category';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { axiosBaseQuery } from '../axios/axiosBaseQuery';

const queryClient = new QueryClient();

const useCreateCategoryMutation = () =>
  useMutation({
    mutationFn: async (categoryData: TCategory) =>
      axiosBaseQuery({
        url: '/categories/create',
        method: 'POST',
        data: categoryData,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

const useGetAllCategoriesQuery = (storeId: string) =>
  useQuery({
    queryKey: ['categories'],
    queryFn: async () =>
      axiosBaseQuery({
        url: `/categories/${storeId}`,
        method: 'GET',
      }),
  });

const useGetSingleCategoryQuery = (categoryId: string) =>
  useQuery({
    queryKey: ['category'],
    queryFn: async () =>
      axiosBaseQuery({
        url: `/categories/single-category/${categoryId}`,
        method: 'GET',
      }),
  });

const useUpdateCategoryMutation = () =>
  useMutation({
    mutationFn: async ({
      categoryId,
      updatedData,
    }: {
      categoryId: string;
      updatedData: Partial<TCategory>;
    }) =>
      axiosBaseQuery({
        url: `/categories/${categoryId}`,
        method: 'PATCH',
        data: updatedData,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['category', 'categories'] });
    },
  });

const useDeleteCategoryMutation = () =>
  useMutation({
    mutationFn: async (categoryId: string) =>
      axiosBaseQuery({
        url: `/categories/${categoryId}`,
        method: 'DELETE',
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

export {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
};
