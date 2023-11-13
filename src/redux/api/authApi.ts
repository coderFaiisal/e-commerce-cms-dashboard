import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userSignUp: build.mutation({
      query: (signUpData) => ({
        url: "/auth/sign-up",
        method: "POST",
        data: signUpData,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useUserSignUpMutation } = authApi;
