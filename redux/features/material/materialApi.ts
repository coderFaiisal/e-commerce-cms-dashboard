import { baseApi } from "@/redux/api/baseApi";

const materialApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createMaterial: build.mutation({
      query: (materialData) => ({
        url: "/materials/create-material",
        method: "POST",
        data: materialData,
      }),
      invalidatesTags: ["material"],
    }),

    getAllMaterials: build.query({
      query: () => ({
        url: "/materials",
        method: "GET",
      }),
      providesTags: ["material"],
    }),

    getSingleMaterial: build.query({
      query: (id) => ({
        url: `/materials/${id}`,
        method: "GET",
      }),
      providesTags: ["material"],
    }),

    updateMaterial: build.mutation({
      query: ({ id, data }) => ({
        url: `/materials/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["material"],
    }),

    deleteMaterial: build.mutation({
      query: (id) => ({
        url: `/materials/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["material"],
    }),
  }),
});

export const {
  useCreateMaterialMutation,
  useGetAllMaterialsQuery,
  useGetSingleMaterialQuery,
  useUpdateMaterialMutation,
  useDeleteMaterialMutation,
} = materialApi;
