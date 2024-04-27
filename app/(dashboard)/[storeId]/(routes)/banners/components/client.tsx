"use client";

import { redirect, useParams, useRouter } from "next/navigation";

import { Plus } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/dataTable";

import { BannerColumn, columns } from "./columns";

import { getAdminInfo } from "@/services/auth.service";
import { useGetAllBannersQuery } from "@/redux/features/banner/bannerApi";

export const BannersClient = () => {
  const admin = getAdminInfo();
  if (!admin) {
    redirect("/signIn");
  }

  const params = useParams();
  const storeId = params.storeId;
  const router = useRouter();

  const { data: banners = [], isLoading } = useGetAllBannersQuery(storeId);

  if (isLoading) {
    return null;
  }

  const formattedBanners: BannerColumn[] = banners?.map((item: any) => ({
    id: item?._id,
    storeId: item?.storeId,
    label: item?.label,
    createdAt: format(new Date(item?.createdAt), "MMMM do, yyyy"),
  }));

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Banners (${formattedBanners?.length})`}
          description="Manage banners for your store"
        />
        <Button onClick={() => router.push(`/${params?.storeId}/banners/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={formattedBanners} />
    </>
  );
};
