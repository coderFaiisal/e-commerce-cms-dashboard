import { baseApi } from "@/redux/api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation({
      query: (orderData) => ({
        url: "/orders/create-order",
        method: "POST",
        data: orderData,
      }),
      invalidatesTags: ["order"],
    }),

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

    deleteOrder: build.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetSingleOrderQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
