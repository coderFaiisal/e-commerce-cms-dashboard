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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: store } = useIsStoreExistQuery({});

  if (store) {
    redirect(`/${store._id}`);
  }

  return <>{children}</>;
}
