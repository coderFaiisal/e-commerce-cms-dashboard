import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    adminSignIn: build.mutation({
      query: (signInData) => ({
        url: "/admins/sign-in",
        method: "POST",
        data: signInData,
      }),
      invalidatesTags: ["admin"],
    }),
  }),
});

export const { useAdminSignInMutation } = authApi;
