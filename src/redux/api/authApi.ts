import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    adminSignUp: build.mutation({
      query: (signUpData) => ({
        url: "/auth/sign-up",
        method: "POST",
        data: signUpData,
      }),
      invalidatesTags: ["admin"],
    }),
  }),
});

export const { useAdminSignUpMutation } = authApi;
