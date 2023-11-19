"use client";

import { useParams, useRouter } from "next/navigation";

import { Plus } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/dataTable";
import { useGetAllOrdersQuery } from "@/redux/features/order/orderApi";
import { OrderColumn, columns } from "./columns";

export const OrdersClient = () => {
  const params = useParams();
  const router = useRouter();

  const { data: orders = [], isLoading } = useGetAllOrdersQuery({});

  if (isLoading) {
    return null;
  }

  const formattedOrders: OrderColumn[] = orders?.map((item: any) => ({
    id: item._id,
    categoryName: item.categoryId.name,
    createdAt: format(new Date(item.createdAt), "MMMM do, yyyy"),
  }));

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Orders (${formattedOrders?.length})`}
          description="Manage orders for your store"
        />
        <Button onClick={() => router.push(`/${params?.storeId}/orders/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={formattedOrders} />
    </>
  );
};
