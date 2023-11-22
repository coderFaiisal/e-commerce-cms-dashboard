import { baseApi } from "@/redux/api/baseApi";

const storeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createStore: build.mutation({
      query: (storeData) => ({
        url: "/stores/create-store",
        method: "POST",
        data: storeData,
      }),
      invalidatesTags: ["store"],
    }),

    isStoreExist: build.query({
      query: () => ({
        url: "/stores/isStoreExist",
        method: "GET",
      }),
      providesTags: ["store"],
    }),

    getAllStores: build.query({
      query: () => ({
        url: "/stores",
        method: "GET",
      }),
      providesTags: ["store"],
    }),

    getSingleStore: build.query({
      query: (id) => ({
        url: `/stores/${id}`,
        method: "GET",
      }),
      providesTags: ["store"],
    }),

    updateStore: build.mutation({
      query: ({ id, data }) => ({
        url: `/stores/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["store"],
    }),

    deleteStore: build.mutation({
      query: (id) => ({
        url: `/stores/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["store"],
    }),
  }),
});

export const {
  useCreateStoreMutation,
  useIsStoreExistQuery,
  useGetAllStoresQuery,
  useGetSingleStoreQuery,
  useUpdateStoreMutation,
  useDeleteStoreMutation,
} = storeApi;
