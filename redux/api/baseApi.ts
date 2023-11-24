import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://timeless-backend.vercel.app/api/v1",
  }),
  endpoints: () => ({}),
  tagTypes: [
    "admin",
    "store",
    "billboard",
    "category",
    "carat",
    "material",
    "product",
    "order",
  ],
});
