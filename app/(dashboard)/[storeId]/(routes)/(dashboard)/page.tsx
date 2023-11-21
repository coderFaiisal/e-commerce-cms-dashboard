"use client";

import { CreditCard, DollarSign, Package } from "lucide-react";

import { Separator } from "@/components/ui/separator";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { formatter } from "@/lib/utils";
import { Overview } from "@/components/overview";
import { useGetAllOrdersQuery } from "@/redux/features/order/orderApi";
import { TotalRevenue } from "./components/totalRevenue";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import AdminProfile from "@/components/adminProfile";

interface GraphData {
  name: string;
  total: number;
}

interface DashboardPageProps {
  params: {
    storeId: string;
  };
}

const DashboardPage: React.FC<DashboardPageProps> = ({ params }) => {
  const storeId = params.storeId;

  const { data: orders, isLoading: isOrdersLoading } =
    useGetAllOrdersQuery(storeId);
  const { data: products, isLoading: isProductsLoading } =
    useGetAllProductsQuery(storeId);

  if (isOrdersLoading || isProductsLoading) {
    return null;
  }

  const paidOrders = orders?.map((order: any) =>
    order?.isPaid === true ? order : []
  );

  const monthlyRevenue: { [key: number]: number } = {};

  for (const order of paidOrders) {
    const month = new Date(order.createdAt).getMonth();

    const revenueForOrder = order.totalCost;

    // Adding the revenue for this order to the respective month
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  // Converting the grouped data into the format expected by the graph
  const graphData: GraphData[] = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];

  // Filling in the revenue data
  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  const totalRevenue = TotalRevenue(paidOrders) || 0;
  const graphRevenue = graphData;
  const salesCount = paidOrders?.length || 0;
  const stockCount = products?.length || 0;

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{salesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Products In Stock
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
