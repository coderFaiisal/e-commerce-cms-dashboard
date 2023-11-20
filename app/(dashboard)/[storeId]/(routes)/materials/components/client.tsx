"use client";

import { useParams, useRouter } from "next/navigation";

import { Plus } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/dataTable";
import { useGetAllMaterialsQuery } from "@/redux/features/material/materialApi";
import { MaterialColumn, columns } from "./columns";

export const MaterialsClient = () => {
  const params = useParams();
  const storeId = params.storeId;

  const router = useRouter();

  const { data: materials = [], isLoading } = useGetAllMaterialsQuery(storeId);

  if (isLoading) {
    return null;
  }

  const formattedMaterials: MaterialColumn[] = materials?.map((item: any) => ({
    id: item._id,
    name: item.name,
    value: item.value,
    storeId: item.storeId._id,
    categoryId: item.categoryId._id,
    categoryName: item.categoryId.name,
    createdAt: format(new Date(item.createdAt), "MMMM do, yyyy"),
  }));

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Materials (${formattedMaterials?.length})`}
          description="Manage materials for your store"
        />
        <Button
          onClick={() => router.push(`/${params?.storeId}/materials/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={formattedMaterials} />
    </>
  );
};
