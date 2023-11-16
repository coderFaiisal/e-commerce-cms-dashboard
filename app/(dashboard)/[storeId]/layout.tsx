"use client";

import { useIsStoreExistQuery } from "@/redux/features/store/storeApi";
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
  const [isMounted, setIsMounted] = useState(false);
  const admin = getAdminInfo();
  const { data: store } = useIsStoreExistQuery({});

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (!admin) {
    redirect("/signIn");
  }

  if (!store) {
    redirect("/");
  }

  return (
    <>
      {/* <Navbar /> */}
      {children}
    </>
  );
}