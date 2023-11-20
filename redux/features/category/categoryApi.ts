import { baseApi } from "@/redux/api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCategory: build.mutation({
      query: (categoryData) => ({
        url: "/categories/create-category",
        method: "POST",
        data: categoryData,
      }),
      invalidatesTags: ["category"],
    }),

    getAllCategories: build.query({
      query: (storeId) => ({
        url: `/categories/${storeId}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),

    getSingleCategory: build.query({
      query: (id) => ({
        url: `/categories/single-category/${id}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),

    updateCategory: build.mutation({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["category"],
    }),

    deleteCategory: build.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
