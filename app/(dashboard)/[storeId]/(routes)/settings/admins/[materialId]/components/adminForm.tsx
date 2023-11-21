"use client";

import * as z from "zod";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
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
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import CustomLoader from "@/components/customLoader";
import { RingLoader } from "react-spinners";
import { useCreateAdminMutation } from "@/redux/features/admin/adminApi";
import ImageUpload from "@/components/ui/imageUpload";

const formSchema = z
  .object({
    name: z.string({ required_error: "Name is required" }).min(1),
    email: z.string({ required_error: "Email is required" }).email(),
    image: z.string({ required_error: "Image is required" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password must be 6 or more long" }),
    confirmPassword: z
      .string({
        required_error: "Confirm password is required",
      })
      .min(6, { message: "Password must be 6 or more long" }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Confirm passwords does not match!",
      path: ["confirmPassword"],
    }
  );

type AdminFormValues = z.infer<typeof formSchema>;

export const AdminForm = () => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [createAdmin] = useCreateAdminMutation();

  const form = useForm<AdminFormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: AdminFormValues) => {
    setLoading(true);

    const adminData = {
      name: data.name,
      email: data.email,
      password: data.password,
      image: data.image,
    };

    const res: any = await createAdmin(adminData);

    if (res?.data?._id) {
      router.push(`/${params.storeId}/settings/admins`);
      toast.success("Admin created successfully");
    } else if (res?.error) {
      toast.error(res?.error?.message);
    }

    setLoading(false);
  };

  return (
    <>
      <Heading title="Create Admin" description="Create a new admin" />
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admin Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="md:grid md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Admin Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Admin Email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Admin password"
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
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Confirm password"
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
                {"Create"}
                <CustomLoader>
                  <RingLoader color="#ffffff" size={30} />
                </CustomLoader>
              </>
            ) : (
              "Create"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};
