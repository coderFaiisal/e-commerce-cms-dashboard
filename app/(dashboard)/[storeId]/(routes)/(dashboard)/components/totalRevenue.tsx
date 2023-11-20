"use client";

import { useGetAllOrdersQuery } from "@/redux/features/order/orderApi";

export const TotalRevenue = (paidOrders: any) => {

  const totalRevenue = paidOrders.reduce((total: number, order: any) => {
    const grandTotal = total + order.totalCost;
    return grandTotal;
  }, 0);

  return totalRevenue;
};
