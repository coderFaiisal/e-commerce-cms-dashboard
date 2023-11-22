"use client";

import { useGetSingleOrderQuery } from "@/redux/features/order/orderApi";
import { OrderForm } from "./components/orderForm";

const OrderPage = ({ params }: { params: { orderId: string } }) => {
  const { data: order = {}, isLoading } = useGetSingleOrderQuery(
    params.orderId
  );

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderForm order={order} />
      </div>
    </div>
  );
};

export default OrderPage;
