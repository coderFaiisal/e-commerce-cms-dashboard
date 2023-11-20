"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";

import CustomLoader from "@/components/customLoader";
import { RingLoader } from "react-spinners";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateOrderMutation } from "@/redux/features/order/orderApi";

const formSchema = z.object({
  orderStatus: z.string({ required_error: "Order status is required" }),
});

type OrderFormValues = z.infer<typeof formSchema>;

interface OrderFormProps {
  order: any;
}

export const OrderForm: React.FC<OrderFormProps> = ({ order }) => {
  const params = useParams();
  const id = params.orderId;

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [updateOrder] = useUpdateOrderMutation();

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderStatus: order?.orderStatus,
    },
  });

  const onSubmit = async (data: OrderFormValues) => {
    setLoading(true);

    const res: any = await updateOrder({ id, data });

    if (res?.data?._id) {
      router.push(`/${params.storeId}/orders`);
      toast.success("Order updated successfully");
    } else if (res?.error) {
      toast.error(res?.error?.message);
    }

    setLoading(false);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Edit order" description="Edit a order" />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="orderStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order Status</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Update order status"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem key="deliverd" value="deliverd">
                        deliverd
                      </SelectItem>
                      <SelectItem key="pending" value="pending">
                        pending
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {loading ? (
              <>
                {"Save changes"}
                <CustomLoader>
                  <RingLoader color="#ffffff" size={30} />
                </CustomLoader>
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};
