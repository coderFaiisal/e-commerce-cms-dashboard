"use client";

import { useParams, useRouter } from "next/navigation";

import { Plus } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/dataTable";
import { useGetAllCaratsQuery } from "@/redux/features/carat/caratApi";
import { CaratColumn, columns } from "./columns";

export const CaratsClient = () => {
  const params = useParams();
  const router = useRouter();

  const { data: carats = [], isLoading } = useGetAllCaratsQuery({});

  if (isLoading) {
    return null;
  }

  const formattedCarats: CaratColumn[] = carats?.map((item: any) => ({
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
          title={`Carats (${formattedCarats?.length})`}
          description="Manage carats for your store"
        />
        <Button onClick={() => router.push(`/${params?.storeId}/carats/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={formattedCarats} />
    </>
  );
};
