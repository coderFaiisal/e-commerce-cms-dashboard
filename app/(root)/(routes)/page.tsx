"use client";

import { handleOpen } from "@/redux/features/store/storeSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useEffect } from "react";

const SetupPage = () => {
  const { isOpen } = useAppSelector((state) => state.store);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isOpen) {
      dispatch(handleOpen());
    }
  }, [dispatch, isOpen]);

  return null;
};

export default SetupPage;
