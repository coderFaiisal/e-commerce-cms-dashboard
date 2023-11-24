"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { cn } from "@/lib/utils";
import { useGetSingleOrderQuery } from "@/redux/features/order/orderApi";
import { format } from "date-fns";
import { CreditCard, ScrollText, ShoppingCart, User2 } from "lucide-react";
import { ProductsTable } from "./components/client";

const OrderDetails = ({ params }: { params: { orderId: string } }) => {
  const id = params.orderId;

  const { data: order = {}, isLoading } = useGetSingleOrderQuery(id);

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title={`Order Details`} description="All about this order" />
        <Card>
          <CardHeader>
            <CardDescription className=" font-bold">
              Order: #{order?.trackingNumber}
            </CardDescription>
            <CardDescription>
              {format(new Date(order?.createdAt), "MMMM do, yyyy")}
            </CardDescription>
            <CardDescription
              className={cn(
                "w-20 text-center p-1 rounded-xl",
                order?.orderStatus === "pending"
                  ? "bg-red-200 text-red-700"
                  : order?.orderStatus === "processing"
                  ? "bg-blue-200 text-blue-700"
                  : "bg-green-200 text-green-700"
              )}
            >
              {order?.orderStatus}
            </CardDescription>
            <CardContent className="p-12 ">
              <div className="grid gap-4 grid-cols-1  md:grid-cols-3">
                <div className="flex space-x-2">
                  <User2 className="h-8 w-8 p-2 mt-2 text-white dark:text-black bg-black dark:bg-white rounded-full" />
                  <div>
                    <h1 className="text-xl font-medium">Customer</h1>
                    <p className="text-sm text-muted-foreground">
                      Name: {order?.contactInformation?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Email: {order?.contactInformation?.email}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Address: {order?.contactInformation?.address}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Phone: {order?.contactInformation?.phoneNumber}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <ShoppingCart className="h-8 w-8 p-2 mt-2 text-white dark:text-black bg-black dark:bg-white rounded-full" />
                  <div>
                    <h1 className="text-xl font-medium">Order Info</h1>
                    <p className="text-sm text-muted-foreground">
                      Shipping: {order?.deliveryMethod}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Payment Method: {order?.paymentMethod}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Status: {order?.orderStatus}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <CreditCard className="h-8 w-8 p-2 mt-2  text-white dark:text-black bg-black dark:bg-white rounded-full" />
                  <div>
                    <h1 className="text-xl font-medium">Payment Info</h1>
                    <p className="text-sm text-muted-foreground">
                      Total Cost: ${order?.totalCost}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Shipping Charge: ${order?.shippingCharge}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Payment Status:
                      {order?.isPaid === true ? "Paid" : "Unpaid"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Discounts: {order?.discounts}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 my-8">
                <ScrollText className="h-8 w-8 p-2 mt-2 text-white dark:text-black bg-black dark:bg-white rounded-full" />
                <div>
                  <h1 className="text-xl font-medium">Notes</h1>
                  <p className="text-sm text-muted-foreground">
                    Shipping Address : {order?.shippingAddress}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Gift Message : {order?.giftMessage}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Return Policy: {order?.returnPolicy}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Gift Wrapping: {order?.giftWrapping}
                  </p>
                </div>
              </div>

              <div className="flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                  <ProductsTable products={order?.orderItems} />
                </div>
              </div>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default OrderDetails;
