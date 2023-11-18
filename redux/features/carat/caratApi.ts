import { baseApi } from "@/redux/api/baseApi";

const caratApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCarat: build.mutation({
      query: (caratData) => ({
        url: "/carats/create-carat",
        method: "POST",
        data: caratData,
      }),
      invalidatesTags: ["carat"],
    }),

    getAllCarats: build.query({
      query: () => ({
        url: "/carats",
        method: "GET",
      }),
      providesTags: ["carat"],
    }),

    getSingleCarat: build.query({
      query: (id) => ({
        url: `/carats/${id}`,
        method: "GET",
      }),
      providesTags: ["carat"],
    }),

    updateCarat: build.mutation({
      query: ({ id, data }) => ({
        url: `/carats/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["carat"],
    }),

    deleteCarat: build.mutation({
      query: (id) => ({
        url: `/carats/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["carat"],
    }),
  }),
});

export const {
  useCreateCaratMutation,
  useGetAllCaratsQuery,
  useGetSingleCaratQuery,
  useUpdateCaratMutation,
  useDeleteCaratMutation,
} = caratApi;
