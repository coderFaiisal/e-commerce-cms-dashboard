import { baseApi } from "@/redux/api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAdmin: build.mutation({
      query: (adminData) => ({
        url: "/admins/create-admin",
        method: "POST",
        data: adminData,
      }),
      invalidatesTags: ["admin"],
    }),

    changePassword: build.mutation({
      query: (passwordData) => ({
        url: "/admins/change-password",
        method: "POST",
        data: passwordData,
      }),
    }),

    getAllAdmins: build.query({
      query: () => ({
        url: "/admins",
        method: "GET",
      }),
      providesTags: ["admin"],
    }),

    getSingleAdmin: build.query({
      query: (id) => ({
        url: `/admins/${id}`,
        method: "GET",
      }),
    }),

    getAdminProfile: build.query({
      query: () => ({
        url: "/admins/my-profile",
        method: "GET",
      }),
      providesTags: ["admin"],
    }),

    updateAdminProfile: build.mutation({
      query: (data) => ({
        url: "/admins/my-profile",
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["admin"],
    }),

    deleteAdmin: build.mutation({
      query: (id) => ({
        url: `/admins/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin"],
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useChangePasswordMutation,
  useGetAllAdminsQuery,
  useGetSingleAdminQuery,
  useGetAdminProfileQuery,
  useUpdateAdminProfileMutation,
  useDeleteAdminMutation,
} = adminApi;
