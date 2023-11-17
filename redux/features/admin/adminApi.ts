import { baseApi } from "@/redux/api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllAdmins: build.query({
      query: () => ({
        url: "/admins",
        method: "GET",
      }),
    }),

    getAdminProfile: build.query({
      query: () => ({
        url: "/admins/my-profile",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllAdminsQuery, useGetAdminProfileQuery } = adminApi;
