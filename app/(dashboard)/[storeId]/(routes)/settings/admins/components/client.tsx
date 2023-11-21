"use client";

import { useParams, useRouter } from "next/navigation";

import { Plus } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/dataTable";
import { useGetAllAdminsQuery } from "@/redux/features/admin/adminApi";
import { AdminColumn, columns } from "./columns";

export const AdminsClient = () => {
  const params = useParams();

  const router = useRouter();

  const { data: admins = [], isLoading } = useGetAllAdminsQuery({});

  if (isLoading) {
    return null;
  }

  const formattedAdmins: AdminColumn[] = admins?.map((item: any) => ({
    id: item._id,
    name: item.name,
    email: item.email,
    image: item.image,
    createdAt: format(new Date(item.createdAt), "MMMM do, yyyy"),
  }));

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Admins (${formattedAdmins?.length})`}
          description="Manage admins for your application"
        />
        <Button
          onClick={() => router.push(`/${params?.storeId}/settings/admins/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Create Admin
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={formattedAdmins} />
    </>
  );
};
