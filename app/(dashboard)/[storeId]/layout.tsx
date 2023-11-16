"use client";

import { useIsStoreExistQuery } from "@/redux/features/store/storeApi";
import { getAdminInfo } from "@/services/auth.service";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const admin = getAdminInfo();
  const { data: store } = useIsStoreExistQuery({});

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
