import { baseApi } from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProduct: build.mutation({
      query: (productData) => ({
        url: "/products/create-product",
        method: "POST",
        data: productData,
      }),
      invalidatesTags: ["product"],
    }),

    getAllProducts: build.query({
      query: (storeId) => ({
        url: `/products/${storeId}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),

    getSingleProduct: build.query({
      query: (id) => ({
        url: `/products/single-product/${id}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),

    updateProduct: build.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["product"],
    }),

    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
