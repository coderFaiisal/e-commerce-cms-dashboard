"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";

import { useAdminSignInMutation } from "@/redux/api/authApi";
import { storeAdminInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [adminSignIn] = useAdminSignInMutation();
  const router = useRouter();

  const FormSchema = z.object({
    email: z.string().min(3, {
      message: "Name at least 3 characters.",
    }),
    password: z.string().min(6, {
      message: "Password at least 3 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res: any = await adminSignIn(data);

      if (res && res?.data?.accessToken) {
        toast.success("Sign in successfully!");
        storeAdminInfo(res?.data?.accessToken);
        router.push("/");
      } else {
        toast.message(res?.error?.message, {
          description: "Please, try again!",
        });
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-2/5 bg-slate-50 p-6 rounded-lg">
        <div className="text-center mb-4">
          <h1 className=" text-4xl font-semibold ">Sign In</h1>
          <p className="text-sm font-light">
            Please sign in to your Admin Account
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Email" type="email" {...field} />
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
                      placeholder="Your Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              <Button className="w-1/2 rounded-3xl">Sign In</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
