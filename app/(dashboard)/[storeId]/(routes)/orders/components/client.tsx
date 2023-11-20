"use client";

import { format } from "date-fns";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/dataTable";
import { useGetAllOrdersQuery } from "@/redux/features/order/orderApi";
import { OrderColumn, columns } from "./columns";

export const OrdersClient = () => {
  const { data: orders = [], isLoading } = useGetAllOrdersQuery({});

  if (isLoading) {
    return null;
  }

  const formattedOrders: OrderColumn[] = orders?.map((item: any) => ({
    id: item._id,
    trackingNumber: item.trackingNumber,
    phoneNumber: item.contactInformation.phoneNumber,
    totalCost: item.totalCost,
    isPaid: item.isPaid,
    orderStatus: item.orderStatus,
    createdAt: format(new Date(item.createdAt), "MMMM do, yyyy"),
  }));

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Orders (${formattedOrders?.length})`}
          description="Manage orders for your store"
        />
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={formattedOrders} />
    </>
  );
};
