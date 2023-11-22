"use client";

import Navbar from "@/components/navbar";
import { useIsStoreExistQuery } from "@/redux/features/store/storeApi";
import { handleClose } from "@/redux/features/store/storeSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getAdminInfo } from "@/services/auth.service";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const storeId = params.storeId;
  const admin = getAdminInfo();

  const [isMounted, setIsMounted] = useState(false);
  const { data: store, isLoading } = useIsStoreExistQuery({});

  const { isOpen } = useAppSelector((state) => state.store);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      dispatch(handleClose());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (!isMounted || isLoading) {
    return null;
  }

  if (!admin) {
    redirect("/signIn");
  }

  if (!store) {
    redirect("/");
  }

  return (
    <div className="max-w-7xl mx-auto">
      <Navbar storeId={storeId} />
      {children}
    </div>
  );
}
