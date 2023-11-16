import { baseApi } from "@/redux/api/baseApi";

const storeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createStore: build.mutation({
      query: (storeData) => ({
        url: "/stores/create-store",
        method: "POST",
        data: storeData,
      }),
    }),

    isStoreExist: build.query({
      query: () => ({
        url: "/stores/isStoreExist",
        method: "GET",
      }),
    }),

    getSingleStore: build.query({
      query: (id) => ({
        url: `/stores/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateStoreMutation,
  useIsStoreExistQuery,
  useGetSingleStoreQuery,
} = storeApi;
