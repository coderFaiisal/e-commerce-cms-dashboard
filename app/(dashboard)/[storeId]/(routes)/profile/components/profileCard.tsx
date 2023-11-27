"use client";

import { redirect, useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { useGetAdminProfileQuery } from "@/redux/features/admin/adminApi";
import CustomImage from "@/components/customImage";
import { getAdminInfo } from "@/services/auth.service";

export const ProfileCard = () => {
  const isAdminExist = getAdminInfo();
  if (!isAdminExist) {
    redirect("/signIn");
  }

  const params = useParams();
  const router = useRouter();

  const { data: admin = {}, isLoading } = useGetAdminProfileQuery({});

  if (isLoading) {
    return null;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Your Profile" description="Manage your profile" />
        <Button onClick={() => router.push(`/${params?.storeId}/profile/edit`)}>
          <Plus className="mr-2 h-4 w-4" /> Edit Profile
        </Button>
      </div>
      <Separator />
      <div className="flex gap-4">
        <div className="w-56">
          <CustomImage
            src={admin?.image}
            alt="Admin profile image"
            priority={true}
          />
        </div>
        <div>
          <h1 className="text-base md:text-xl font-semibold mb-2 md:mb-0">
            Name : {admin?.name}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Email : {admin?.email}
          </p>
        </div>
      </div>
    </>
  );
};
