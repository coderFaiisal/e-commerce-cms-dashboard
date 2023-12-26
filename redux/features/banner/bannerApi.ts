import { baseApi } from "@/redux/api/baseApi";

const bannerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBanner: build.mutation({
      query: (bannerData) => ({
        url: "/banners/create-banner",
        method: "POST",
        data: bannerData,
      }),
      invalidatesTags: ["banner"],
    }),

    getAllBanners: build.query({
      query: (storeId) => ({
        url: `/banners/${storeId}`,
        method: "GET",
      }),
      providesTags: ["banner"],
    }),

    getSingleBanner: build.query({
      query: (id) => ({
        url: `/banners/single-banner/${id}`,
        method: "GET",
      }),
    }),

    updateBanner: build.mutation({
      query: ({ id, data }) => ({
        url: `/banners/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["banner"],
    }),

    deleteBanner: build.mutation({
      query: (id) => ({
        url: `/banners/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["banner"],
    }),
  }),
});

export const {
  useCreateBannerMutation,
  useGetAllBannersQuery,
  useGetSingleBannerQuery,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} = bannerApi;
