import { baseApi } from "@/redux/api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllOrders: build.query({
      query: (storeId) => ({
        url: `/orders/${storeId}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),

    getSingleOrder: build.query({
      query: (id) => ({
        url: `/orders/single-order/${id}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),

    updateOrder: build.mutation({
      query: ({ id, data }) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetSingleOrderQuery,
  useUpdateOrderMutation,
} = orderApi;
