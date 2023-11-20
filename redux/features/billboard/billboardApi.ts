import { baseApi } from "@/redux/api/baseApi";

const billBoardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBillboard: build.mutation({
      query: (billboardData) => ({
        url: "/billboards/create-billboard",
        method: "POST",
        data: billboardData,
      }),
      invalidatesTags: ["billboard"],
    }),

    getAllBillboards: build.query({
      query: (storeId) => ({
        url: `/billboards/${storeId}`,
        method: "GET",
      }),
      providesTags: ["billboard"],
    }),

    getSingleBillboard: build.query({
      query: (id) => ({
        url: `/billboards/single-billboard/${id}`,
        method: "GET",
      }),
    }),

    updateBillboard: build.mutation({
      query: ({ id, data }) => ({
        url: `/billboards/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["billboard"],
    }),

    deleteBillboard: build.mutation({
      query: (id) => ({
        url: `/billboards/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["billboard"],
    }),
  }),
});

export const {
  useCreateBillboardMutation,
  useGetAllBillboardsQuery,
  useGetSingleBillboardQuery,
  useUpdateBillboardMutation,
  useDeleteBillboardMutation,
} = billBoardApi;
