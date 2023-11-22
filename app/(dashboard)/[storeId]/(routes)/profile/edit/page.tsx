"use client";

import { useGetAdminProfileQuery } from "@/redux/features/admin/adminApi";
import { ProfileForm } from "./components/profileForm";
import { ChangePasswordForm } from "./components/changePasswordForm";

const EditProfilePage = () => {
  const { data = {}, isLoading } = useGetAdminProfileQuery({});

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProfileForm data={data} />
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default EditProfilePage;
