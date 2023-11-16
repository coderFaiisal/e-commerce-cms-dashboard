import { baseApi } from "./api/baseApi";
import storeReducer from "./features/store/storeSlice";

export const reducer = {
  store: storeReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};
