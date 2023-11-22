"use client";

import { getAdminInfo } from "@/services/auth.service";
import { SettingsForm } from "./components/settingsForm";
import { useGetSingleStoreQuery } from "@/redux/features/store/storeApi";
import { redirect } from "next/navigation";

const SettingsPage = ({ params }: { params: { storeId: string } }) => {
  const admin = getAdminInfo();
  if (!admin) {
    redirect("/signIn");
  }

  const id = params.storeId;
  const { data, isLoading } = useGetSingleStoreQuery(id);

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={data} />
      </div>
    </div>
  );
};

export default SettingsPage;
