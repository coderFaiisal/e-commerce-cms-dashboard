"use client";

import { useIsStoreExistQuery } from "@/redux/features/store/storeApi";
import { getAdminInfo } from "@/services/auth.service";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const { data: store } = useIsStoreExistQuery({});

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const admin = getAdminInfo();

  if (!admin) {
    redirect("/signIn");
  }
  if (store) {
    redirect(`/${store._id}`);
  } else {
    return <>{children}</>;
  }
}
