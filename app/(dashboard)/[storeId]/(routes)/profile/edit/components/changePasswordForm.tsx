"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CustomLoader from "@/components/customLoader";
import { RingLoader } from "react-spinners";
import { useChangePasswordMutation } from "@/redux/features/admin/adminApi";

const formSchema = z
  .object({
    oldPassword: z
      .string({ required_error: "Old password is required" })
      .min(6, { message: "Password must be 6 or more long" }),
    newPassword: z
      .string({ required_error: "New password is required" })
      .min(6, { message: "Password must be 6 or more long" }),
    confirmNewPassword: z
      .string({
        required_error: "Confirm new password is required",
      })
      .min(6, { message: "Password must be 6 or more long" }),
  })
  .refine(
    (values) => {
      return values.newPassword === values.confirmNewPassword;
    },
    {
      message: "Confirm passwords does not match!",
      path: ["confirmNewPassword"],
    }
  );

type ChangePasswordFormValues = z.infer<typeof formSchema>;

export const ChangePasswordForm = () => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [changePassword] = useChangePasswordMutation();

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: ChangePasswordFormValues) => {
    setLoading(true);

    const res: any = await changePassword(data);

    if (res?.data?.modified === true) {
      router.push(`/${params.storeId}/profile`);
      toast.success("Password changed successfully");
    } else if (res?.error) {
      toast.error(res?.error?.message);
    }

    setLoading(false);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Your old password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Your new password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Confirm new password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {loading ? (
              <>
                {"Change password"}
                <CustomLoader>
                  <RingLoader color="#ffffff" size={30} />
                </CustomLoader>
              </>
            ) : (
              "Change password"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};
