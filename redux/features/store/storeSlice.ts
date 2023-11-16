import { createSlice } from "@reduxjs/toolkit";

export interface StoreModal {
  isOpen: boolean;
}

const initialState: StoreModal = {
  isOpen: false,
};

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    handleOpen: (state) => {
      state.isOpen = true;
    },
    handleClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { handleOpen, handleClose } = storeSlice.actions;

export default storeSlice.reducer;
