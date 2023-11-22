"use client";

import { useParams, useRouter } from "next/navigation";

import { Plus } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/dataTable";

import { columns, BillboardColumn } from "./columns";
import { useGetAllBillboardsQuery } from "@/redux/features/billboard/billboardApi";

export const BillboardsClient = () => {
  const params = useParams();
  const storeId = params.storeId;
  const router = useRouter();

  const { data: billboards = [], isLoading } =
    useGetAllBillboardsQuery(storeId);

  if (isLoading) {
    return null;
  }

  const formattedBillboards: BillboardColumn[] = billboards?.map(
    (item: any) => ({
      id: item?._id,
      storeId: item?.storeId,
      label: item?.label,
      createdAt: format(new Date(item?.createdAt), "MMMM do, yyyy"),
    })
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${formattedBillboards?.length})`}
          description="Manage billboards for your store"
        />
        <Button
          onClick={() => router.push(`/${params?.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKey="label"
        columns={columns}
        data={formattedBillboards}
      />
    </>
  );
};
